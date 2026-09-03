"use client";

import { useMemo } from "react";
import { CircleAlertIcon, DownloadIcon, FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export type ShipmentDocument = {
  contentType: string;
  encodedLabel: string;
  docType: string;
  copiesToPrint: number;
};

export type CreatedLabel = {
  trackingNumber: string;
  serviceName: string;
  encodedLabel: string;
  docType: string;
  documents: ShipmentDocument[];
};

/** Nombres legibles de los documentos que devuelve FedEx. */
const DOCUMENT_NAMES: Record<string, string> = {
  COMMERCIAL_INVOICE: "Factura comercial",
  CERTIFICATE_OF_ORIGIN: "Certificado de origen",
  PRO_FORMA_INVOICE: "Factura proforma",
};

export type LabelFailure = {
  message: string;
  problems: string[];
};

const MIME_TYPES: Record<string, string> = {
  PDF: "application/pdf",
  PNG: "image/png",
};

function base64ToBlob(base64: string, mimeType: string): Blob {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}

/**
 * Descarga con una URL propia y de vida corta, independiente de la que usa el
 * iframe: así una no invalida a la otra.
 */
function downloadBase64(base64: string, docType: string, fileName: string) {
  const mimeType = MIME_TYPES[docType] ?? "application/pdf";
  const url = URL.createObjectURL(base64ToBlob(base64, mimeType));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${fileName}.${docType.toLowerCase()}`;
  anchor.click();
  // Se libera cuando el navegador ya tomó los datos.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export function LabelSuccess({ label }: Readonly<{ label: CreatedLabel }>) {
  const mimeType = MIME_TYPES[label.docType] ?? "application/pdf";

  // Chrome bloquea los PDF servidos como data: dentro de un iframe,
  // así que la etiqueta se expone como blob del propio origen.
  //
  // La URL no se revoca: en StrictMode el ciclo montar/limpiar/montar la
  // invalidaría mientras el iframe y la descarga siguen usándola. Es una URL
  // por etiqueta creada y el navegador la libera al cerrar la pestaña.
  const objectUrl = useMemo(() => {
    if (typeof window === "undefined") return null;
    return URL.createObjectURL(base64ToBlob(label.encodedLabel, mimeType));
  }, [label.encodedLabel, mimeType]);

  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-4">
      <div>
        <p className="text-sm text-muted-foreground">Número de rastreo</p>
        <p className="font-mono text-lg font-semibold tabular-nums">
          {label.trackingNumber}
        </p>
        {label.serviceName ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {label.serviceName}
          </p>
        ) : null}
      </div>

      {/* Se conserva la proporción 4x6 del rollo térmico para verla a escala real. */}
      <div
        className="overflow-hidden rounded-md border border-border bg-white"
        style={{ aspectRatio: "4 / 6" }}
      >
        {objectUrl ? (
          <iframe
            src={`${objectUrl}#toolbar=0&view=Fit`}
            title={`Etiqueta de envío ${label.trackingNumber}`}
            className="size-full"
          />
        ) : null}
      </div>

      <Button
        type="button"
        onClick={() =>
          downloadBase64(
            label.encodedLabel,
            label.docType,
            `etiqueta-${label.trackingNumber}`,
          )
        }
        variant="outline"
        size="lg"
        className="h-11 w-full"
      >
        <DownloadIcon className="size-4" aria-hidden="true" />
        Descargar etiqueta
      </Button>

      {label.documents.map((doc) => {
        const name = DOCUMENT_NAMES[doc.contentType] ?? doc.contentType;
        return (
          <div key={doc.contentType} className="border-t border-border pt-3">
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <p className="text-sm font-medium">{name}</p>
              {doc.copiesToPrint > 1 ? (
                <p className="text-sm text-muted-foreground">
                  Imprime {doc.copiesToPrint} copias
                </p>
              ) : null}
            </div>
            <Button
              type="button"
              onClick={() =>
                downloadBase64(
                  doc.encodedLabel,
                  doc.docType,
                  `${doc.contentType.toLowerCase()}-${label.trackingNumber}`,
                )
              }
              variant="outline"
              size="lg"
              className="h-11 w-full"
            >
              <FileTextIcon className="size-4" aria-hidden="true" />
              Descargar {name.toLowerCase()}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export function LabelError({ failure }: Readonly<{ failure: LabelFailure }>) {
  return (
    <div
      role="alert"
      className="space-y-2 rounded-lg border border-destructive/40 bg-destructive/5 p-4"
    >
      <p className="flex items-start gap-2 text-sm font-medium text-destructive">
        <CircleAlertIcon
          className="mt-0.5 size-4 shrink-0"
          aria-hidden="true"
        />
        {failure.message}
      </p>
      {failure.problems.length > 0 ? (
        <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
          {failure.problems.map((problem) => (
            <li key={problem}>{problem}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
