"use client";

import { useState } from "react";
import {
  LoaderCircleIcon,
  PackageIcon,
  SendIcon,
  WandSparklesIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LabelPreview } from "@/components/label-preview";
import { GithubStarLink } from "@/components/github-link";
import {
  CredentialsDialog,
  EMPTY_CREDENTIALS,
  type FedexCredentials,
} from "@/components/credentials-panel";
import {
  AddressSection,
  PackageSection,
  type FieldErrors,
} from "@/components/shipment-form";
import {
  LabelError,
  LabelSuccess,
  type CreatedLabel,
  type LabelFailure,
} from "@/components/label-result";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  DEMO_CONTENTS,
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

/** Rutas que deben estar completas antes de habilitar la creación. */
const REQUIRED_PATHS = [
  ...REQUIRED_ADDRESS_FIELDS.map((field) => `shipper.${field}`),
  ...REQUIRED_ADDRESS_FIELDS.map((field) => `recipient.${field}`),
  "package.weight",
  "package.length",
  "package.width",
  "package.height",
];

/** Quita un error del mapa sin recrearlo si no estaba. */
function withoutError(errors: FieldErrors, key: string): FieldErrors {
  if (!errors[key]) return errors;
  const next = { ...errors };
  delete next[key];
  return next;
}

type LabelRequestResult =
  | { ok: true; label: CreatedLabel }
  | { ok: false; failure: LabelFailure };

/** Pide la etiqueta al endpoint y normaliza el éxito y el fallo en un solo tipo. */
async function requestLabel(
  draft: ShipmentDraft,
  contents: { description: string; declaredValue: string } | undefined,
  credentials: FedexCredentials,
): Promise<LabelRequestResult> {
  try {
    const response = await fetch("/api/labels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ draft, contents, credentials }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        failure: {
          message: data.error ?? "No se pudo crear la etiqueta.",
          problems: data.problems ?? [],
        },
      };
    }

    return { ok: true, label: data as CreatedLabel };
  } catch {
    return {
      ok: false,
      failure: { message: "No se pudo contactar al servidor.", problems: [] },
    };
  }
}

type Contents = { description: string; declaredValue: string };

/** Declaración de contenido: solo aparece cuando el envío cruza fronteras. */
function CustomsSection({
  contents,
  onChange,
}: Readonly<{
  contents: Contents;
  onChange: (update: (prev: Contents) => Contents) => void;
}>) {
  return (
    <>
      <Separator />
      <section aria-labelledby="customs-heading" className="space-y-4">
        <div>
          <h2
            id="customs-heading"
            className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Aduana
          </h2>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            El envío cruza fronteras, así que necesita declaración de contenido.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Field>
            <FieldLabel htmlFor="customs-description">
              Descripción del contenido
            </FieldLabel>
            <Input
              id="customs-description"
              value={contents.description}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Qué es, de qué está hecho y para qué sirve"
              autoComplete="off"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="customs-value">
              Valor declarado (USD)
            </FieldLabel>
            <Input
              id="customs-value"
              value={contents.declaredValue}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, declaredValue: e.target.value }))
              }
              inputMode="decimal"
              className="font-mono tabular-nums"
              autoComplete="off"
            />
          </Field>
        </div>
      </section>
    </>
  );
}

/** Botón principal: crea la etiqueta, o vuelve al borrador si ya existe una. */
function CreateAction({
  hasLabel,
  isComplete,
  sending,
  onCreate,
  onBackToDraft,
}: Readonly<{
  hasLabel: boolean;
  isComplete: boolean;
  sending: boolean;
  onCreate: () => void;
  onBackToDraft: () => void;
}>) {
  if (hasLabel) {
    return (
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-11 w-full"
        onClick={onBackToDraft}
      >
        Volver al borrador
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size="lg"
      className="h-11 w-full bg-accent text-accent-foreground hover:bg-accent/90"
      disabled={!isComplete || sending}
      onClick={onCreate}
    >
      {sending ? (
        <>
          <LoaderCircleIcon className="size-4 animate-spin" aria-hidden="true" />
          Creando etiqueta…
        </>
      ) : (
        <>
          <SendIcon className="size-4" aria-hidden="true" />
          Crear etiqueta
        </>
      )}
    </Button>
  );
}

/** Qué falta para poder crear, o por qué falló el último intento. */
function StatusMessages({
  isComplete,
  missingCount,
  customsReady,
  failure,
}: Readonly<{
  isComplete: boolean;
  missingCount: number;
  customsReady: boolean;
  failure: LabelFailure | null;
}>) {
  return (
    <div aria-live="polite" className="space-y-4">
      {!isComplete && missingCount > 0 ? (
        <p className="text-sm text-muted-foreground text-pretty">
          Faltan {missingCount} {missingCount === 1 ? "campo" : "campos"} por
          completar.
        </p>
      ) : null}

      {!isComplete && missingCount === 0 && !customsReady ? (
        <p className="text-sm text-muted-foreground text-pretty">
          Falta la declaración de aduana.
        </p>
      ) : null}

      {failure ? <LabelError failure={failure} /> : null}
    </div>
  );
}

/** Columna lateral: vista previa o etiqueta creada, pesos y acción principal. */
function ResultPanel({
  draft,
  label,
  onBackToDraft,
  dimWeight,
  billable,
  isComplete,
  sending,
  onCreate,
  missingCount,
  customsReady,
  failure,
}: Readonly<{
  draft: ShipmentDraft;
  label: CreatedLabel | null;
  onBackToDraft: () => void;
  dimWeight: number | null;
  billable: number | null;
  isComplete: boolean;
  sending: boolean;
  onCreate: () => void;
  missingCount: number;
  customsReady: boolean;
  failure: LabelFailure | null;
}>) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {label ? "Etiqueta creada" : "Vista previa"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">
          {label
            ? "Lista para imprimir en rollo térmico de 4x6."
            : "Se actualiza mientras escribes."}
        </p>
      </div>

      {/* Una vez creada, la etiqueta real ocupa el lugar del borrador. */}
      {label ? <LabelSuccess label={label} /> : <LabelPreview draft={draft} />}

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

      <CreateAction
        hasLabel={label !== null}
        isComplete={isComplete}
        sending={sending}
        onCreate={onCreate}
        onBackToDraft={onBackToDraft}
      />

      <StatusMessages
        isComplete={isComplete}
        missingCount={missingCount}
        customsReady={customsReady}
        failure={failure}
      />
    </aside>
  );
}

export default function Home() {
  const [draft, setDraft] = useState<ShipmentDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [contents, setContents] = useState({
    description: "",
    declaredValue: "",
  });
  // Solo en memoria: recargar la página las borra, que es justo lo que promete
  // el aviso del panel.
  const [credentials, setCredentials] =
    useState<FedexCredentials>(EMPTY_CREDENTIALS);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [label, setLabel] = useState<CreatedLabel | null>(null);
  const [failure, setFailure] = useState<LabelFailure | null>(null);

  const updateAddress =
    (section: "shipper" | "recipient") =>
    (field: keyof Address, value: string) => {
      setDraft((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
      // Al corregir, el error se retira de inmediato en vez de esperar al próximo blur.
      setErrors((prev) => withoutError(prev, `${section}.${field}`));
    };

  const updatePackage = (field: keyof PackageDetail, value: string) => {
    setDraft((prev) => ({
      ...prev,
      packageDetail: { ...prev.packageDetail, [field]: value },
    }));
    setErrors((prev) => withoutError(prev, `package.${field}`));
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

  const missingPaths = REQUIRED_PATHS.filter(
    (path) => validatePath(draft, path) !== null,
  );

  const international =
    draft.shipper.countryCode !== draft.recipient.countryCode;

  // Un envío entre países necesita declaración aduanera o FedEx lo rechaza.
  const customsReady =
    !international ||
    (contents.description.trim() !== "" && Number(contents.declaredValue) > 0);

  const isComplete = missingPaths.length === 0 && customsReady;
  const dimWeight = dimensionalWeight(draft.packageDetail);
  const billable = billableWeight(draft.packageDetail);

  async function createLabel() {
    setStatus("sending");
    setFailure(null);
    setLabel(null);

    const result = await requestLabel(
      draft,
      international ? contents : undefined,
      credentials,
    );

    if (result.ok) setLabel(result.label);
    else setFailure(result.failure);

    setStatus("idle");
  }

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
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <GithubStarLink />
            <CredentialsDialog
              credentials={credentials}
              onChange={setCredentials}
            />
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-11"
              onClick={() => {
                setDraft(buildDemoDraft());
                setContents(DEMO_CONTENTS);
                setErrors({});
                setLabel(null);
                setFailure(null);
              }}
            >
              <WandSparklesIcon className="size-4" aria-hidden="true" />
              Cargar envío de ejemplo
            </Button>
          </div>
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

          {international ? (
            <CustomsSection contents={contents} onChange={setContents} />
          ) : null}

        </form>

        <ResultPanel
          draft={draft}
          label={label}
          onBackToDraft={() => setLabel(null)}
          dimWeight={dimWeight}
          billable={billable}
          isComplete={isComplete}
          sending={status === "sending"}
          onCreate={createLabel}
          missingCount={missingPaths.length}
          customsReady={customsReady}
          failure={failure}
        />
      </main>
    </div>
  );
}
