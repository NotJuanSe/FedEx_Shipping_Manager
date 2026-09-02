"use client";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COUNTRIES,
  PACKAGING_TYPES,
  SERVICE_TYPES,
  requiresState,
  type Address,
  type PackageDetail,
  type ShipmentDraft,
} from "@/lib/shipping";

export type FieldErrors = Record<string, string>;

const DIMENSION_LABELS = {
  length: "Largo",
  width: "Ancho",
  height: "Alto",
} as const;

type AddressSectionProps = Readonly<{
  section: "shipper" | "recipient";
  address: Address;
  errors: FieldErrors;
  onChange: (field: keyof Address, value: string) => void;
  onBlur: (path: string) => void;
}>;

function AddressSection({
  section,
  address,
  errors,
  onChange,
  onBlur,
}: AddressSectionProps) {
  // El id lleva la sección como prefijo: hay dos direcciones en la misma página.
  const id = (field: string) => `${section}-${field}`;
  const err = (field: string) => errors[`${section}.${field}`];

  return (
    <FieldGroup className="gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field data-invalid={Boolean(err("personName"))}>
          <FieldLabel htmlFor={id("personName")}>Nombre completo</FieldLabel>
          <Input
            id={id("personName")}
            value={address.personName}
            onChange={(e) => onChange("personName", e.target.value)}
            onBlur={() => onBlur(`${section}.personName`)}
            aria-invalid={Boolean(err("personName"))}
            autoComplete="off"
          />
          {err("personName") ? (
            <FieldError>{err("personName")}</FieldError>
          ) : null}
        </Field>

        <Field>
          <FieldLabel htmlFor={id("companyName")}>
            Empresa <span className="text-muted-foreground">(opcional)</span>
          </FieldLabel>
          <Input
            id={id("companyName")}
            value={address.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
            autoComplete="off"
          />
        </Field>
      </div>

      <Field data-invalid={Boolean(err("streetLine"))}>
        <FieldLabel htmlFor={id("streetLine")}>Dirección</FieldLabel>
        <Input
          id={id("streetLine")}
          value={address.streetLine}
          onChange={(e) => onChange("streetLine", e.target.value)}
          onBlur={() => onBlur(`${section}.streetLine`)}
          aria-invalid={Boolean(err("streetLine"))}
          autoComplete="off"
        />
        {err("streetLine") ? <FieldError>{err("streetLine")}</FieldError> : null}
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field data-invalid={Boolean(err("city"))}>
          <FieldLabel htmlFor={id("city")}>Ciudad</FieldLabel>
          <Input
            id={id("city")}
            value={address.city}
            onChange={(e) => onChange("city", e.target.value)}
            onBlur={() => onBlur(`${section}.city`)}
            aria-invalid={Boolean(err("city"))}
            autoComplete="off"
          />
          {err("city") ? <FieldError>{err("city")}</FieldError> : null}
        </Field>

        <Field data-invalid={Boolean(err("stateOrProvinceCode"))}>
          <FieldLabel htmlFor={id("stateOrProvinceCode")}>
            Estado{" "}
            {requiresState(address.countryCode) ? null : (
              <span className="text-muted-foreground">(opcional)</span>
            )}
          </FieldLabel>
          <Input
            id={id("stateOrProvinceCode")}
            value={address.stateOrProvinceCode}
            onChange={(e) =>
              onChange("stateOrProvinceCode", e.target.value.toUpperCase())
            }
            onBlur={() => onBlur(`${section}.stateOrProvinceCode`)}
            aria-invalid={Boolean(err("stateOrProvinceCode"))}
            maxLength={2}
            placeholder={requiresState(address.countryCode) ? "NY" : "—"}
            className="font-mono uppercase"
            autoComplete="off"
          />
          {err("stateOrProvinceCode") ? (
            <FieldError>{err("stateOrProvinceCode")}</FieldError>
          ) : null}
        </Field>

        <Field data-invalid={Boolean(err("postalCode"))}>
          <FieldLabel htmlFor={id("postalCode")}>Código postal</FieldLabel>
          <Input
            id={id("postalCode")}
            value={address.postalCode}
            onChange={(e) => onChange("postalCode", e.target.value)}
            onBlur={() => onBlur(`${section}.postalCode`)}
            aria-invalid={Boolean(err("postalCode"))}
            inputMode="numeric"
            className="font-mono tabular-nums"
            autoComplete="off"
          />
          {err("postalCode") ? (
            <FieldError>{err("postalCode")}</FieldError>
          ) : null}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={id("countryCode")}>País</FieldLabel>
          <Select
            items={COUNTRIES as unknown as { label: string; value: string }[]}
            value={address.countryCode}
            onValueChange={(value) => onChange("countryCode", String(value))}
          >
            <SelectTrigger id={id("countryCode")} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field data-invalid={Boolean(err("phoneNumber"))}>
          <FieldLabel htmlFor={id("phoneNumber")}>Teléfono</FieldLabel>
          <Input
            id={id("phoneNumber")}
            value={address.phoneNumber}
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            onBlur={() => onBlur(`${section}.phoneNumber`)}
            aria-invalid={Boolean(err("phoneNumber"))}
            inputMode="tel"
            className="font-mono tabular-nums"
            autoComplete="off"
          />
          {err("phoneNumber") ? (
            <FieldError>{err("phoneNumber")}</FieldError>
          ) : null}
        </Field>
      </div>
    </FieldGroup>
  );
}

type PackageSectionProps = Readonly<{
  draft: ShipmentDraft;
  errors: FieldErrors;
  onPackageChange: (field: keyof PackageDetail, value: string) => void;
  onServiceChange: (value: string) => void;
  onBlur: (path: string) => void;
}>;

function PackageSection({
  draft,
  errors,
  onPackageChange,
  onServiceChange,
  onBlur,
}: PackageSectionProps) {
  const pkg = draft.packageDetail;
  const service = SERVICE_TYPES.find((s) => s.value === draft.serviceType);

  return (
    <FieldGroup className="gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="packagingType">Embalaje</FieldLabel>
          <Select
            items={
              PACKAGING_TYPES as unknown as { label: string; value: string }[]
            }
            value={pkg.packagingType}
            onValueChange={(value) =>
              onPackageChange("packagingType", String(value))
            }
          >
            <SelectTrigger id="packagingType" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PACKAGING_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field data-invalid={Boolean(errors["package.weight"])}>
          <FieldLabel htmlFor="weight">Peso (lb)</FieldLabel>
          <Input
            id="weight"
            value={pkg.weight}
            onChange={(e) => onPackageChange("weight", e.target.value)}
            onBlur={() => onBlur("package.weight")}
            aria-invalid={Boolean(errors["package.weight"])}
            inputMode="decimal"
            className="font-mono tabular-nums"
            autoComplete="off"
          />
          {errors["package.weight"] ? (
            <FieldError>{errors["package.weight"]}</FieldError>
          ) : null}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {(["length", "width", "height"] as const).map((dimension) => (
          <Field key={dimension} data-invalid={Boolean(errors[`package.${dimension}`])}>
            <FieldLabel htmlFor={dimension}>
              {DIMENSION_LABELS[dimension]} (in)
            </FieldLabel>
            <Input
              id={dimension}
              value={pkg[dimension]}
              onChange={(e) => onPackageChange(dimension, e.target.value)}
              onBlur={() => onBlur(`package.${dimension}`)}
              aria-invalid={Boolean(errors[`package.${dimension}`])}
              inputMode="decimal"
              className="font-mono tabular-nums"
              autoComplete="off"
            />
            {errors[`package.${dimension}`] ? (
              <FieldError>{errors[`package.${dimension}`]}</FieldError>
            ) : null}
          </Field>
        ))}
      </div>

      <Field>
        <FieldLabel htmlFor="serviceType">Servicio</FieldLabel>
        <Select
          items={
            SERVICE_TYPES as unknown as { label: string; value: string }[]
          }
          value={draft.serviceType}
          onValueChange={(value) => onServiceChange(String(value))}
        >
          <SelectTrigger id="serviceType" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {service ? (
          <p className="text-sm text-muted-foreground">{service.transit}</p>
        ) : null}
      </Field>
    </FieldGroup>
  );
}

export { AddressSection, PackageSection };
