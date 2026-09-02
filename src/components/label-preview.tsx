import {
  SERVICE_LABEL_CODES,
  billableWeight,
  type Address,
  type ShipmentDraft,
} from "@/lib/shipping";
import { cn } from "@/lib/utils";

/** Marcador de posición mientras el campo sigue vacío, para que la etiqueta no colapse. */
function Slot({
  value,
  placeholder,
}: Readonly<{ value: string; placeholder: string }>) {
  if (value) return <>{value}</>;
  return <span className="text-neutral-400">{placeholder}</span>;
}

function AddressBlock({
  heading,
  address,
  placeholders,
}: Readonly<{
  heading: string;
  address: Address;
  placeholders: { name: string; street: string; city: string };
}>) {
  return (
    <div className="space-y-0.5">
      <p className="text-[9px] font-bold uppercase tracking-wide text-neutral-500">
        {heading}
      </p>
      <p className="font-semibold uppercase">
        <Slot value={address.personName} placeholder={placeholders.name} />
      </p>
      {address.companyName ? (
        <p className="uppercase">{address.companyName}</p>
      ) : null}
      <p className="uppercase">
        <Slot value={address.streetLine} placeholder={placeholders.street} />
      </p>
      <p className="uppercase tabular-nums">
        <Slot
          value={[address.city, address.stateOrProvinceCode, address.postalCode]
            .filter(Boolean)
            .join(" ")}
          placeholder={placeholders.city}
        />
      </p>
      <p className="uppercase">{address.countryCode}</p>
    </div>
  );
}

/**
 * Réplica visual de una etiqueta térmica 4x6. No es la etiqueta real de FedEx:
 * sirve para que el usuario confirme los datos antes de gastar una transacción de la API.
 */
export function LabelPreview({ draft }: Readonly<{ draft: ShipmentDraft }>) {
  const billable = billableWeight(draft.packageDetail);
  const serviceCode = SERVICE_LABEL_CODES[draft.serviceType] ?? "—";

  return (
    <div
      className="mx-auto w-full max-w-[340px] bg-white font-mono text-[11px] leading-tight text-neutral-900 shadow-sm ring-1 ring-neutral-300"
      style={{ aspectRatio: "4 / 6" }}
      aria-label="Vista previa de la etiqueta"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between border-b border-neutral-300 px-3 py-2">
          <AddressBlock
            heading="Desde"
            address={draft.shipper}
            placeholders={{
              name: "Remitente",
              street: "Dirección",
              city: "Ciudad ST 00000",
            }}
          />
          <div className="text-right">
            <p className="text-[9px] uppercase text-neutral-500">Peso fact.</p>
            <p className="text-sm font-bold tabular-nums">
              {billable ? `${billable} lb` : "— lb"}
            </p>
          </div>
        </div>

        <div className="border-b border-neutral-300 px-3 py-3">
          <p className="text-[9px] font-bold uppercase tracking-wide text-neutral-500">
            Para
          </p>
          <p className="text-base font-bold uppercase leading-snug">
            <Slot value={draft.recipient.personName} placeholder="Destinatario" />
          </p>
          {draft.recipient.companyName ? (
            <p className="uppercase">{draft.recipient.companyName}</p>
          ) : null}
          <p className="uppercase">
            <Slot value={draft.recipient.streetLine} placeholder="Dirección" />
          </p>
          <p className="uppercase">
            <Slot value={draft.recipient.city} placeholder="Ciudad" />
          </p>
          <p className="mt-1 text-2xl font-bold uppercase tabular-nums tracking-tight">
            <Slot
              value={[
                draft.recipient.stateOrProvinceCode,
                draft.recipient.postalCode,
              ]
                .filter(Boolean)
                .join(" ")}
              placeholder="ST 00000"
            />
          </p>
          <p className="uppercase">{draft.recipient.countryCode}</p>
        </div>

        <div className="flex items-center justify-between bg-neutral-900 px-3 py-2 text-white">
          <span className="text-sm font-bold uppercase tracking-wide">
            {serviceCode}
          </span>
          <span className="text-[10px] uppercase tabular-nums">
            {draft.packageDetail.length &&
            draft.packageDetail.width &&
            draft.packageDetail.height
              ? `${draft.packageDetail.length}×${draft.packageDetail.width}×${draft.packageDetail.height} in`
              : "— × — × — in"}
          </span>
        </div>

        {/* Zona del código de barras: patrón decorativo hasta que la API devuelva la etiqueta real. */}
        <div className="mt-auto space-y-2 px-3 py-3">
          <div
            className="flex h-16 items-end gap-px overflow-hidden"
            aria-hidden="true"
          >
            {Array.from({ length: 64 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "bg-neutral-300",
                  i % 5 === 0 ? "w-1" : "w-px",
                  i % 3 === 0 ? "h-full" : "h-5/6",
                )}
              />
            ))}
          </div>
          <p className="text-center text-[10px] uppercase tracking-widest text-neutral-400">
            Número de rastreo pendiente
          </p>
        </div>
      </div>
    </div>
  );
}
