"use client";

import { useState } from "react";
import { PackageIcon, SendIcon, WandSparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LabelPreview } from "@/components/label-preview";
import {
  AddressSection,
  PackageSection,
  type FieldErrors,
} from "@/components/shipment-form";
import {
  EMPTY_DRAFT,
  billableWeight,
  buildDemoDraft,
  dimensionalWeight,
  requiresState,
  type Address,
  type PackageDetail,
  type ShipmentDraft,
} from "@/lib/shipping";

/** Campos que la Ship API exige para crear un envío de una sola pieza. */
const REQUIRED_ADDRESS_FIELDS: (keyof Address)[] = [
  "personName",
  "phoneNumber",
  "streetLine",
  "city",
  "stateOrProvinceCode",
  "postalCode",
];

function validatePath(draft: ShipmentDraft, path: string): string | null {
  const [section, field] = path.split(".");

  if (section === "package") {
    const value = draft.packageDetail[field as keyof PackageDetail];
    if (!value.trim()) return "Requerido para calcular la tarifa.";
    if (Number(value) <= 0) return "Debe ser mayor que cero.";
    return null;
  }

  const address = draft[section as "shipper" | "recipient"];
  const value = address[field as keyof Address];

  if (field === "stateOrProvinceCode") {
    // Solo unos pocos países lo exigen; en el resto se envía vacío.
    if (!requiresState(address.countryCode)) return null;
    if (!value.trim()) return "Requerido.";
    if (value.length !== 2) return "Usa el código de 2 letras.";
    return null;
  }

  if (!value.trim()) return "Requerido.";
  return null;
}

export default function Home() {
  const [draft, setDraft] = useState<ShipmentDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<FieldErrors>({});

  const updateAddress =
    (section: "shipper" | "recipient") =>
    (field: keyof Address, value: string) => {
      setDraft((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
      // Al corregir, el error se retira de inmediato en vez de esperar al próximo blur.
      setErrors((prev) => {
        const key = `${section}.${field}`;
        if (!prev[key]) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
    };

  const updatePackage = (field: keyof PackageDetail, value: string) => {
    setDraft((prev) => ({
      ...prev,
      packageDetail: { ...prev.packageDetail, [field]: value },
    }));
    setErrors((prev) => {
      const key = `package.${field}`;
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleBlur = (path: string) => {
    const message = validatePath(draft, path);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[path] = message;
      else delete next[path];
      return next;
    });
  };

  const missingPaths = [
    ...REQUIRED_ADDRESS_FIELDS.map((f) => `shipper.${f}`),
    ...REQUIRED_ADDRESS_FIELDS.map((f) => `recipient.${f}`),
    "package.weight",
    "package.length",
    "package.width",
    "package.height",
  ].filter((path) => validatePath(draft, path) !== null);

  const isComplete = missingPaths.length === 0;
  const dimWeight = dimensionalWeight(draft.packageDetail);
  const billable = billableWeight(draft.packageDetail);

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <PackageIcon className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-base font-semibold leading-none text-balance">
              FedEx Shipping Manager
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Crea una etiqueta de envío y confírmala antes de generarla.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="ml-auto h-11"
            onClick={() => {
              setDraft(buildDemoDraft());
              setErrors({});
            }}
          >
            <WandSparklesIcon className="size-4" aria-hidden="true" />
            Cargar envío de ejemplo
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <section aria-labelledby="shipper-heading" className="space-y-4">
            <div>
              <h2
                id="shipper-heading"
                className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Remitente
              </h2>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">
                Desde dónde sale el paquete.
              </p>
            </div>
            <AddressSection
              section="shipper"
              address={draft.shipper}
              errors={errors}
              onChange={updateAddress("shipper")}
              onBlur={handleBlur}
            />
          </section>

          <Separator />

          <section aria-labelledby="recipient-heading" className="space-y-4">
            <div>
              <h2
                id="recipient-heading"
                className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Destinatario
              </h2>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">
                A dónde llega. La dirección se imprime tal cual en la etiqueta.
              </p>
            </div>
            <AddressSection
              section="recipient"
              address={draft.recipient}
              errors={errors}
              onChange={updateAddress("recipient")}
              onBlur={handleBlur}
            />
          </section>

          <Separator />

          <section aria-labelledby="package-heading" className="space-y-4">
            <div>
              <h2
                id="package-heading"
                className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Paquete y servicio
              </h2>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">
                FedEx cobra el mayor entre el peso real y el dimensional.
              </p>
            </div>
            <PackageSection
              draft={draft}
              errors={errors}
              onPackageChange={updatePackage}
              onServiceChange={(value) =>
                setDraft((prev) => ({ ...prev, serviceType: value }))
              }
              onBlur={handleBlur}
            />
          </section>
        </form>

        <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Vista previa
            </h2>
            <p className="mt-1 text-sm text-muted-foreground text-pretty">
              Se actualiza mientras escribes.
            </p>
          </div>

          <LabelPreview draft={draft} />

          <dl className="space-y-2 rounded-lg border border-border bg-card p-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Peso dimensional</dt>
              <dd className="font-mono tabular-nums">
                {dimWeight ? `${dimWeight} lb` : "—"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Peso facturable</dt>
              <dd className="font-mono font-semibold tabular-nums">
                {billable ? `${billable} lb` : "—"}
              </dd>
            </div>
          </dl>

          <Button
            type="submit"
            size="lg"
            className="h-11 w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={!isComplete}
            onClick={(e) => e.preventDefault()}
          >
            <SendIcon className="size-4" aria-hidden="true" />
            Crear etiqueta
          </Button>

          {!isComplete ? (
            <p className="text-sm text-muted-foreground text-pretty">
              Faltan {missingPaths.length}{" "}
              {missingPaths.length === 1 ? "campo" : "campos"} por completar.
            </p>
          ) : null}
        </aside>
      </main>
    </div>
  );
}
