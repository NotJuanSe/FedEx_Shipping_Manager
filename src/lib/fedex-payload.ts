/**
 * Traduce el borrador del formulario al cuerpo que espera POST /ship/v1/shipments.
 * Es lógica pura: no toca red ni entorno.
 */

import type { Address, ShipmentDraft } from "@/lib/shipping";

/** Datos aduaneros: solo se envían cuando el envío cruza fronteras. */
export type CustomsContents = {
  description: string;
  declaredValue: string;
  countryOfManufacture?: string;
};

/** Reemplazos que la descomposición Unicode no resuelve por sí sola. */
const ASCII_REPLACEMENTS: Record<string, string> = {
  ß: "ss",
  æ: "ae",
  Æ: "AE",
  œ: "oe",
  Œ: "OE",
  ø: "o",
  Ø: "O",
  đ: "d",
  Đ: "D",
  ł: "l",
  Ł: "L",
  "€": "EUR",
  "£": "GBP",
  "º": "o",
  "ª": "a",
  "–": "-",
  "—": "-",
  "“": '"',
  "”": '"',
  "‘": "'",
  "’": "'",
};

/**
 * La Ship API rechaza caracteres no ASCII y los imprime mal en la etiqueta
 * (doc/fedex-ship-api.md): "Medellín" saldría corrupto en el envío real.
 * Se descompone el texto y se descartan los signos diacríticos: Medellín -> Medellin.
 */
export function toAscii(value: string): string {
  return value
    .replace(/[\s\S]/g, (char) => ASCII_REPLACEMENTS[char] ?? char)
    .normalize("NFD")
    // Marcas diacríticas combinantes que deja la descomposición.
    .replace(/[̀-ͯ]/g, "")
    // Cualquier resto fuera de ASCII imprimible se descarta antes de enviarlo.
    .replace(/[^\x20-\x7E]/g, "")
    .trim();
}

function toParty(address: Address) {
  return {
    address: {
      streetLines: [toAscii(address.streetLine)],
      city: toAscii(address.city),
      // FedEx rechaza la cadena vacía: el campo se omite donde no aplica.
      ...(address.stateOrProvinceCode
        ? { stateOrProvinceCode: toAscii(address.stateOrProvinceCode) }
        : {}),
      postalCode: toAscii(address.postalCode),
      countryCode: toAscii(address.countryCode),
      residential: false,
    },
    contact: {
      personName: toAscii(address.personName),
      phoneNumber: toAscii(address.phoneNumber),
      ...(address.companyName
        ? { companyName: toAscii(address.companyName) }
        : {}),
    },
  };
}

export function isInternational(draft: ShipmentDraft): boolean {
  return draft.shipper.countryCode !== draft.recipient.countryCode;
}

/**
 * Declaración aduanera mínima para envíos internacionales.
 * La Ship API exige `commodities` y `commercialInvoice` en cuanto cambia el país.
 */
function buildCustomsClearanceDetail(
  draft: ShipmentDraft,
  contents: CustomsContents,
) {
  const declaredValue = Number(contents.declaredValue) || 0;
  const weight = Number(draft.packageDetail.weight) || 0;

  return {
    dutiesPayment: { paymentType: "SENDER" },
    commercialInvoice: { shipmentPurpose: "GIFT" },
    commodities: [
      {
        description: toAscii(contents.description),
        countryOfManufacture: toAscii(
          contents.countryOfManufacture ?? draft.shipper.countryCode,
        ),
        quantity: 1,
        quantityUnits: "PCS",
        weight: { units: "LB", value: weight },
        unitPrice: { amount: declaredValue, currency: "USD" },
        customsValue: { amount: declaredValue, currency: "USD" },
      },
    ],
  };
}

export type BuildPayloadOptions = {
  accountNumber: string;
  contents?: CustomsContents;
};

export function buildShipmentPayload(
  draft: ShipmentDraft,
  { accountNumber, contents }: BuildPayloadOptions,
) {
  const weight = Number(draft.packageDetail.weight) || 0;
  const international = isInternational(draft);

  const dimensions = {
    // La API solo usa la parte entera de cada dimensión.
    length: Math.trunc(Number(draft.packageDetail.length) || 0),
    width: Math.trunc(Number(draft.packageDetail.width) || 0),
    height: Math.trunc(Number(draft.packageDetail.height) || 0),
    units: "IN" as const,
  };

  return {
    accountNumber: { value: accountNumber },
    labelResponseOptions: "LABEL",
    requestedShipment: {
      shipper: toParty(draft.shipper),
      recipients: [toParty(draft.recipient)],
      pickupType: "DROPOFF_AT_FEDEX_LOCATION",
      serviceType: draft.serviceType,
      packagingType: draft.packageDetail.packagingType,
      totalWeight: weight,
      shippingChargesPayment: {
        paymentType: "SENDER",
        payor: {
          responsibleParty: { accountNumber: { value: accountNumber } },
        },
      },
      labelSpecification: {
        imageType: "PDF",
        // STOCK_* es inventario térmico en rollo; PAPER_* es hoja para láser.
        // 4x6 pulgadas sin pestaña de documento.
        labelStockType: "STOCK_4X6",
        labelFormatType: "COMMON2D",
      },
      requestedPackageLineItems: [
        {
          sequenceNumber: 1,
          weight: { units: "LB", value: weight },
          dimensions,
        },
      ],
      ...(international && contents
        ? {
            customsClearanceDetail: buildCustomsClearanceDetail(
              draft,
              contents,
            ),
            // Sin pedirla explícitamente, FedEx no genera la factura comercial
            // y el envío internacional se queda sin el documento de aduana.
            shippingDocumentSpecification: {
              shippingDocumentTypes: ["COMMERCIAL_INVOICE"],
              commercialInvoiceDetail: {
                documentFormat: { stockType: "PAPER_LETTER", docType: "PDF" },
              },
            },
          }
        : {}),
    },
  };
}

/** Un documento devuelto por FedEx, ya listo para descargar o mostrar. */
export type ShipmentDocument = {
  /** LABEL o COMMERCIAL_INVOICE. */
  contentType: string;
  encodedLabel: string;
  docType: string;
  /** Copias que FedEx indica imprimir; en la factura son requisito aduanero. */
  copiesToPrint: number;
};

/** Etiqueta y número de rastreo extraídos de la respuesta de FedEx. */
export type CreatedLabel = {
  trackingNumber: string;
  serviceName: string;
  encodedLabel: string;
  docType: string;
  /** Documentos adicionales del envío, como la factura comercial. */
  documents: ShipmentDocument[];
};

type RawDocument = {
  encodedLabel?: string;
  docType?: string;
  contentType?: string;
  copiesToPrint?: number;
  url?: string;
};

type ShipmentResponse = {
  output?: {
    transactionShipments?: {
      masterTrackingNumber?: string;
      serviceName?: string;
      shipmentDocuments?: RawDocument[];
      pieceResponses?: {
        trackingNumber?: string;
        packageDocuments?: RawDocument[];
      }[];
    }[];
  };
};

/** Saca de la respuesta lo único que la interfaz necesita mostrar. */
export function extractLabel(response: unknown): CreatedLabel | null {
  const shipment = (response as ShipmentResponse)?.output
    ?.transactionShipments?.[0];
  const piece = shipment?.pieceResponses?.[0];
  const document = piece?.packageDocuments?.[0];

  if (!document?.encodedLabel) return null;

  // La factura comercial llega aparte de la etiqueta, a nivel de envío.
  const documents = (shipment?.shipmentDocuments ?? [])
    .filter((doc): doc is RawDocument & { encodedLabel: string } =>
      Boolean(doc.encodedLabel),
    )
    .map((doc) => ({
      contentType: doc.contentType ?? "DOCUMENT",
      encodedLabel: doc.encodedLabel,
      docType: doc.docType ?? "PDF",
      copiesToPrint: doc.copiesToPrint ?? 1,
    }));

  return {
    trackingNumber:
      piece?.trackingNumber ?? shipment?.masterTrackingNumber ?? "",
    serviceName: shipment?.serviceName ?? "",
    encodedLabel: document.encodedLabel,
    docType: document.docType ?? "PDF",
    documents,
  };
}
