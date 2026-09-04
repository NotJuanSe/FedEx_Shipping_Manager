"use client";

import { useState } from "react";
import { CheckCircle2Icon, KeyRoundIcon, ShieldCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export type FedexCredentials = {
  clientId: string;
  clientSecret: string;
  accountNumber: string;
  environment: "sandbox" | "production";
};

export const EMPTY_CREDENTIALS: FedexCredentials = {
  clientId: "",
  clientSecret: "",
  accountNumber: "",
  environment: "sandbox",
};

const REPO_URL = "https://github.com/NotJuanSe/FedEx_Shipping_Manager";

/** Solo cuenta como configurada si están los tres datos que FedEx exige. */
export function hasOwnCredentials(credentials: FedexCredentials): boolean {
  return (
    credentials.clientId.trim() !== "" &&
    credentials.clientSecret.trim() !== "" &&
    credentials.accountNumber.trim() !== ""
  );
}

/**
 * Botón del encabezado que abre el formulario de credenciales propias.
 * Va en un diálogo para no cargar la pantalla principal: lo normal es usar la
 * cuenta de demostración y no abrirlo nunca.
 */
export function CredentialsDialog({
  credentials,
  onChange,
}: Readonly<{
  credentials: FedexCredentials;
  onChange: (next: FedexCredentials) => void;
}>) {
  const [open, setOpen] = useState(false);
  // Se edita sobre una copia: cerrar sin guardar deja intacto lo que ya había.
  const [draft, setDraft] = useState(credentials);
  const configured = hasOwnCredentials(credentials);

  function openDialog(next: boolean) {
    if (next) setDraft(credentials);
    setOpen(next);
  }

  function save() {
    onChange(draft);
    setOpen(false);
  }

  function clear() {
    setDraft(EMPTY_CREDENTIALS);
    onChange(EMPTY_CREDENTIALS);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={openDialog}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="lg"
            className={
              configured
                ? "h-11 border-emerald-600/40 bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600/15 dark:text-emerald-400"
                : "h-11"
            }
          />
        }
      >
        {configured ? (
          <>
            <CheckCircle2Icon className="size-4" aria-hidden="true" />
            API propia configurada
          </>
        ) : (
          <>
            <KeyRoundIcon className="size-4" aria-hidden="true" />
            Usar mi API
          </>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Prueba tus propias credenciales</DialogTitle>
          <DialogDescription>
            Déjalo vacío para usar la cuenta sandbox de demostración, o pon las
            tuyas del{" "}
            <a
              href="https://developer.fedex.com"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              FedEx Developer Portal
            </a>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
          <ShieldCheckIcon
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <div className="space-y-1 text-sm text-muted-foreground text-pretty">
            <p>
              <strong className="font-medium text-foreground">
                No guardamos nada.
              </strong>{" "}
              Ni las credenciales, ni las etiquetas, ni los envíos generados.
              Los datos solo pasan por el servidor de camino a FedEx y se
              pierden al recargar la página.
            </p>
            <p>
              Si prefieres no escribir tus claves en un sitio ajeno, clona{" "}
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                el repositorio
              </a>{" "}
              y móntalo en tu propio servidor con tu <code>.env.local</code>.
            </p>
          </div>
        </div>

        <CredentialsFields draft={draft} onChange={setDraft} />

        <DialogFooter>
          {configured ? (
            <Button type="button" variant="ghost" onClick={clear}>
              Quitar mis credenciales
            </Button>
          ) : null}
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button type="button" onClick={save}>
            Guardar en esta sesión
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CredentialsFields({
  draft,
  onChange,
}: Readonly<{
  draft: FedexCredentials;
  onChange: (next: FedexCredentials) => void;
}>) {
  const set = (field: keyof FedexCredentials) => (value: string) =>
    onChange({ ...draft, [field]: value });

  return (
    <div className="grid gap-4">
      <Field>
        <FieldLabel htmlFor="credentials-client-id">Client ID</FieldLabel>
        <Input
          id="credentials-client-id"
          value={draft.clientId}
          onChange={(e) => set("clientId")(e.target.value)}
          placeholder="l7xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          autoComplete="off"
          spellCheck={false}
          className="font-mono"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="credentials-client-secret">
          Client Secret
        </FieldLabel>
        <Input
          id="credentials-client-secret"
          type="password"
          value={draft.clientSecret}
          onChange={(e) => set("clientSecret")(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          className="font-mono"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="credentials-account">
            Número de cuenta
          </FieldLabel>
          <Input
            id="credentials-account"
            value={draft.accountNumber}
            onChange={(e) => set("accountNumber")(e.target.value)}
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            className="font-mono tabular-nums"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="credentials-environment">Entorno</FieldLabel>
          {/* La URL base de FedEx solo tiene dos valores posibles, así que se
              elige el entorno y la URL se resuelve en el servidor. */}
          <div
            id="credentials-environment"
            role="radiogroup"
            aria-label="Entorno de la API"
            className="flex h-9 items-center rounded-md border border-border bg-background p-0.5"
          >
            <EnvironmentOption
              value="sandbox"
              label="Sandbox"
              current={draft.environment}
              onSelect={set("environment")}
            />
            <EnvironmentOption
              value="production"
              label="Producción"
              current={draft.environment}
              onSelect={set("environment")}
            />
          </div>
          <FieldDescription>
            {draft.environment === "production"
              ? "Crea envíos reales y facturables."
              : "No genera envíos reales."}
          </FieldDescription>
        </Field>
      </div>
    </div>
  );
}

function EnvironmentOption({
  value,
  label,
  current,
  onSelect,
}: Readonly<{
  value: FedexCredentials["environment"];
  label: string;
  current: FedexCredentials["environment"];
  onSelect: (value: string) => void;
}>) {
  const selected = current === value;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(value)}
      className={
        selected
          ? "h-full flex-1 rounded-[5px] bg-primary text-sm font-medium text-primary-foreground"
          : "h-full flex-1 rounded-[5px] text-sm text-muted-foreground hover:text-foreground"
      }
    >
      {label}
    </button>
  );
}
