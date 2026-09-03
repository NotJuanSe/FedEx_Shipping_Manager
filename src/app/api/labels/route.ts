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
 * Revalida en el servidor lo mismo que el formulario ya exige.
 * El cliente puede mandar cualquier cosa, y una llamada rechazada por FedEx
 * consume cuota igual.
 */
function validate(body: RequestBody): string[] {
  const problems: string[] = [];
  const draft = body.draft;

  if (!draft) return ["Falta el cuerpo del envío."];

  for (const section of ["shipper", "recipient"] as const) {
    const address = draft[section];
    if (!address) {
      problems.push(`Falta la dirección de ${section}.`);
      continue;
    }

    for (const field of REQUIRED_ADDRESS_FIELDS) {
      if (!address[field]?.trim()) {
        problems.push(`${section}.${field} es obligatorio.`);
      }
    }

    if (
      requiresState(address.countryCode) &&
      !address.stateOrProvinceCode?.trim()
    ) {
      problems.push(
        `${section}.stateOrProvinceCode es obligatorio para ${address.countryCode}.`,
      );
    }
  }

  if (!draft.serviceType) problems.push("Falta el tipo de servicio.");
  if (!draft.packageDetail?.packagingType) problems.push("Falta el embalaje.");

  if (!(Number(draft.packageDetail?.weight) > 0)) {
    problems.push("El peso debe ser mayor que cero.");
  }

  for (const dimension of ["length", "width", "height"] as const) {
    if (!(Number(draft.packageDetail?.[dimension]) > 0)) {
      problems.push(`La dimensión ${dimension} debe ser mayor que cero.`);
    }
  }

  // Sin declaración aduanera FedEx rechaza cualquier envío entre países distintos.
  if (draft.shipper && draft.recipient && isInternational(draft)) {
    if (!body.contents?.description?.trim()) {
      problems.push(
        "Un envío internacional necesita la descripción del contenido.",
      );
    }
    if (!(Number(body.contents?.declaredValue) > 0)) {
      problems.push(
        "Un envío internacional necesita un valor declarado mayor que cero.",
      );
    }
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
