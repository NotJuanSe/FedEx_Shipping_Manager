/**
 * Tipos y catálogos del dominio de envíos.
 * Los valores enum corresponden a los de la FedEx Ship API v1 (ver doc/fedex-ship-api.md).
 */

export type Address = {
  personName: string;
  companyName: string;
  phoneNumber: string;
  streetLine: string;
  city: string;
  stateOrProvinceCode: string;
  postalCode: string;
  countryCode: string;
};

export type PackageDetail = {
  weight: string;
  length: string;
  width: string;
  height: string;
  packagingType: string;
};

export type ShipmentDraft = {
  shipper: Address;
  recipient: Address;
  packageDetail: PackageDetail;
  serviceType: string;
};

/** Servicios de entrega. `transit` es la promesa comercial que FedEx publica para cada uno. */
export const SERVICE_TYPES = [
  { value: "PRIORITY_OVERNIGHT", label: "Priority Overnight", transit: "Siguiente día hábil, 10:30" },
  { value: "STANDARD_OVERNIGHT", label: "Standard Overnight", transit: "Siguiente día hábil, 15:00" },
  { value: "FIRST_OVERNIGHT", label: "First Overnight", transit: "Siguiente día hábil, 08:00" },
  { value: "FEDEX_2_DAY", label: "FedEx 2Day", transit: "2 días hábiles, 17:00" },
  { value: "FEDEX_2_DAY_AM", label: "FedEx 2Day A.M.", transit: "2 días hábiles, 10:30" },
  { value: "FEDEX_EXPRESS_SAVER", label: "Express Saver", transit: "3 días hábiles, 17:00" },
  { value: "FEDEX_GROUND", label: "FedEx Ground", transit: "1 a 5 días hábiles" },
  { value: "GROUND_HOME_DELIVERY", label: "Home Delivery", transit: "1 a 7 días hábiles" },
  { value: "INTERNATIONAL_PRIORITY", label: "International Priority", transit: "1 a 3 días hábiles" },
  { value: "INTERNATIONAL_ECONOMY", label: "International Economy", transit: "2 a 5 días hábiles" },
] as const;

/** Abreviaturas tal como se imprimen en la banda de servicio de la etiqueta física. */
export const SERVICE_LABEL_CODES: Record<string, string> = {
  PRIORITY_OVERNIGHT: "PRIORITY OVERNIGHT",
  STANDARD_OVERNIGHT: "STANDARD OVERNIGHT",
  FIRST_OVERNIGHT: "FIRST OVERNIGHT",
  FEDEX_2_DAY: "2DAY",
  FEDEX_2_DAY_AM: "2DAY A.M.",
  FEDEX_EXPRESS_SAVER: "EXPRESS SAVER",
  FEDEX_GROUND: "GROUND",
  GROUND_HOME_DELIVERY: "HOME DELIVERY",
  INTERNATIONAL_PRIORITY: "IP EOD",
  INTERNATIONAL_ECONOMY: "INTL ECONOMY",
};

export const PACKAGING_TYPES = [
  { value: "YOUR_PACKAGING", label: "Embalaje propio" },
  { value: "FEDEX_ENVELOPE", label: "FedEx Envelope" },
  { value: "FEDEX_PAK", label: "FedEx Pak" },
  { value: "FEDEX_BOX", label: "FedEx Box" },
  { value: "FEDEX_TUBE", label: "FedEx Tube" },
  { value: "FEDEX_10KG_BOX", label: "FedEx 10kg Box" },
  { value: "FEDEX_25KG_BOX", label: "FedEx 25kg Box" },
] as const;

export const COUNTRIES = [
  { value: "US", label: "Estados Unidos" },
  { value: "CO", label: "Colombia" },
  { value: "MX", label: "México" },
  { value: "CA", label: "Canadá" },
  { value: "ES", label: "España" },
] as const;

/**
 * Países donde la Ship API exige `stateOrProvinceCode`.
 * En el resto (Colombia, España…) el campo es opcional y va sin código de 2 letras.
 */
export const STATE_REQUIRED_COUNTRIES = ["US", "CA", "MX", "PR"];

export function requiresState(countryCode: string): boolean {
  return STATE_REQUIRED_COUNTRIES.includes(countryCode);
}

export const EMPTY_ADDRESS: Address = {
  personName: "",
  companyName: "",
  phoneNumber: "",
  streetLine: "",
  city: "",
  stateOrProvinceCode: "",
  postalCode: "",
  countryCode: "US",
};

export const EMPTY_DRAFT: ShipmentDraft = {
  shipper: EMPTY_ADDRESS,
  recipient: EMPTY_ADDRESS,
  packageDetail: {
    weight: "",
    length: "",
    width: "",
    height: "",
    packagingType: "YOUR_PACKAGING",
  },
  serviceType: "FEDEX_GROUND",
};

/** Contenido declarado del envío de ejemplo, necesario por ser internacional. */
export const DEMO_CONTENTS = {
  description: "Manual de los Jóvenes Castores, edición impresa",
  declaredValue: "25",
};

/** Remitentes de ejemplo: se rota entre ellos para que el autocompletado no sea siempre idéntico. */
const DEMO_SENDERS = ["Hugo Duck", "Paco Duck", "Luis Duck"];

/** Ciclo en vez de azar: así los tres aparecen por turno y el resultado es reproducible. */
let demoSenderTurn = 0;

/**
 * Envío de ejemplo: Medellín (Provenza, El Poblado) a Times Square, Nueva York.
 * Internacional en FedEx Pak, que está habilitado para International Priority.
 */
export function buildDemoDraft(): ShipmentDraft {
  const sender = DEMO_SENDERS[demoSenderTurn % DEMO_SENDERS.length];
  demoSenderTurn += 1;

  return {
    shipper: {
      personName: sender,
      companyName: "Jóvenes Castores",
      phoneNumber: "6044441234",
      streetLine: "Calle 9 #37-16, Provenza, El Poblado",
      city: "Medellín",
      stateOrProvinceCode: "",
      postalCode: "050021",
      countryCode: "CO",
    },
    recipient: {
      personName: "Donald Duck",
      companyName: "",
      phoneNumber: "2125551234",
      streetLine: "1560 Broadway, Times Square",
      city: "New York",
      stateOrProvinceCode: "NY",
      postalCode: "10036",
      countryCode: "US",
    },
    packageDetail: {
      weight: "2",
      length: "15",
      width: "12",
      height: "2",
      packagingType: "FEDEX_PAK",
    },
    serviceType: "INTERNATIONAL_PRIORITY",
  };
}

/**
 * Peso dimensional: FedEx cobra el mayor entre peso real y volumétrico.
 * Divisor 139 para lb/in, que es el que aplica a envíos en EE. UU.
 */
export function dimensionalWeight({ length, width, height }: PackageDetail): number | null {
  const l = Number(length);
  const w = Number(width);
  const h = Number(height);
  if (!l || !w || !h) return null;
  // La API trunca decimales en dimensiones, así que replicamos ese comportamiento.
  return Math.ceil((Math.trunc(l) * Math.trunc(w) * Math.trunc(h)) / 139);
}

/** Peso facturable: el mayor entre el real y el dimensional. */
export function billableWeight(pkg: PackageDetail): number | null {
  const actual = Number(pkg.weight);
  const dim = dimensionalWeight(pkg);
  if (!actual && !dim) return null;
  return Math.max(actual || 0, dim || 0);
}
