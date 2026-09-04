import { NextResponse } from "next/server";

import { FedexError, createShipment, readConfig } from "@/lib/fedex";
import {
  buildShipmentPayload,
  extractLabel,
  isInternational,
  type CustomsContents,
} from "@/lib/fedex-payload";
import {
  requiresState,
  type Address,
  type ShipmentDraft,
} from "@/lib/shipping";

/** El token vive en memoria del proceso, así que el handler corre en Node, no en edge. */
export const runtime = "nodejs";

type RequestBody = {
  draft?: ShipmentDraft;
  contents?: CustomsContents;
};

const REQUIRED_ADDRESS_FIELDS: (keyof Address)[] = [
  "personName",
  "phoneNumber",
  "streetLine",
  "city",
  "postalCode",
  "countryCode",
];

/**
 * Un texto vacío y uno que no es número deben fallar igual.
 * `Number("abc")` da NaN, y NaN <= 0 es falso, así que la comparación directa
 * dejaría pasar la basura: hay que descartar lo no finito antes de comparar.
 */
function isPositiveNumber(value: string | undefined): boolean {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0;
}

function validateAddress(
  section: "shipper" | "recipient",
  address: Address | undefined,
): string[] {
  if (!address) return [`Falta la dirección de ${section}.`];

  const problems = REQUIRED_ADDRESS_FIELDS.filter(
    (field) => !address[field]?.trim(),
  ).map((field) => `${section}.${field} es obligatorio.`);

  if (
    requiresState(address.countryCode) &&
    !address.stateOrProvinceCode?.trim()
  ) {
    problems.push(
      `${section}.stateOrProvinceCode es obligatorio para ${address.countryCode}.`,
    );
  }

  return problems;
}

function validatePackage(draft: ShipmentDraft): string[] {
  const problems: string[] = [];
  const pkg = draft.packageDetail;

  if (!draft.serviceType) problems.push("Falta el tipo de servicio.");
  if (!pkg?.packagingType) problems.push("Falta el embalaje.");

  if (!isPositiveNumber(pkg?.weight)) {
    problems.push("El peso debe ser mayor que cero.");
  }

  for (const dimension of ["length", "width", "height"] as const) {
    if (!isPositiveNumber(pkg?.[dimension])) {
      problems.push(`La dimensión ${dimension} debe ser mayor que cero.`);
    }
  }

  return problems;
}

/** Sin declaración aduanera FedEx rechaza cualquier envío entre países distintos. */
function validateCustoms(contents: CustomsContents | undefined): string[] {
  const problems: string[] = [];

  if (!contents?.description?.trim()) {
    problems.push(
      "Un envío internacional necesita la descripción del contenido.",
    );
  }

  if (!isPositiveNumber(contents?.declaredValue)) {
    problems.push(
      "Un envío internacional necesita un valor declarado mayor que cero.",
    );
  }

  return problems;
}

/**
 * Revalida en el servidor lo mismo que el formulario ya exige.
 * El cliente puede mandar cualquier cosa, y una llamada rechazada por FedEx
 * consume cuota igual.
 */
function validate(body: RequestBody): string[] {
  const draft = body.draft;
  if (!draft) return ["Falta el cuerpo del envío."];

  const problems = [
    ...validateAddress("shipper", draft.shipper),
    ...validateAddress("recipient", draft.recipient),
    ...validatePackage(draft),
  ];

  if (draft.shipper && draft.recipient && isInternational(draft)) {
    problems.push(...validateCustoms(body.contents));
  }

  return problems;
}

export async function POST(request: Request) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la petición no es JSON válido." },
      { status: 400 },
    );
  }

  const problems = validate(body);
  if (problems.length > 0) {
    return NextResponse.json(
      { error: "El envío tiene datos incompletos.", problems },
      { status: 422 },
    );
  }

  try {
    const config = readConfig();
    const payload = buildShipmentPayload(body.draft as ShipmentDraft, {
      accountNumber: config.accountNumber,
      contents: body.contents,
    });

    const response = await createShipment(payload, config);
    const label = extractLabel(response);

    if (!label) {
      return NextResponse.json(
        { error: "FedEx aceptó el envío pero no devolvió la etiqueta." },
        { status: 502 },
      );
    }

    return NextResponse.json(label);
  } catch (error) {
    if (error instanceof FedexError) {
      // 5xx de FedEx no es culpa de quien llama: se reporta como fallo de la pasarela.
      const status = error.status >= 500 ? 502 : error.status;
      return NextResponse.json(
        { error: error.message, problems: error.issues.map((i) => i.message) },
        { status },
      );
    }

    console.error("Fallo inesperado al crear la etiqueta:", error);
    return NextResponse.json(
      { error: "No se pudo crear la etiqueta." },
      { status: 500 },
    );
  }
}
