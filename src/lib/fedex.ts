/**
 * Cliente de la FedEx Ship API. Solo debe importarse desde código de servidor:
 * lee credenciales de entorno que nunca deben llegar al navegador.
 */

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
};

export type FedexConfig = {
  clientId: string;
  clientSecret: string;
  accountNumber: string;
  baseUrl: string;
};

/** Error con los datos que la API devuelve, ya normalizados para mostrarlos. */
export class FedexError extends Error {
  readonly status: number;
  readonly issues: { code: string; message: string }[];

  constructor(
    message: string,
    status: number,
    issues: { code: string; message: string }[] = [],
  ) {
    super(message);
    this.name = "FedexError";
    this.status = status;
    this.issues = issues;
  }
}

export function readConfig(): FedexConfig {
  const clientId = process.env.FEDEX_CLIENT_ID;
  const clientSecret = process.env.FEDEX_CLIENT_SECRET;
  const accountNumber = process.env.FEDEX_ACCOUNT_NUMBER;
  const baseUrl =
    process.env.FEDEX_API_BASE_URL ?? "https://apis-sandbox.fedex.com";

  const missing = [
    !clientId && "FEDEX_CLIENT_ID",
    !clientSecret && "FEDEX_CLIENT_SECRET",
    !accountNumber && "FEDEX_ACCOUNT_NUMBER",
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new FedexError(
      `Faltan variables de entorno: ${missing.join(", ")}. Copia .env.example a .env.local y complétalo.`,
      500,
    );
  }

  return {
    clientId: clientId as string,
    clientSecret: clientSecret as string,
    accountNumber: accountNumber as string,
    baseUrl: baseUrl.replace(/\/$/, ""),
  };
}

/**
 * Caché del token en memoria del proceso.
 * FedEx los emite por una hora; pedir uno nuevo en cada request gasta cuota sin necesidad.
 */
let cachedToken: { value: string; expiresAt: number } | null = null;

/** Margen para no usar un token que caduca mientras viaja la petición. */
const TOKEN_EXPIRY_MARGIN_MS = 60_000;

export async function getAccessToken(config: FedexConfig): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const response = await fetch(`${config.baseUrl}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: config.clientId,
      client_secret: config.clientSecret,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    // FedEx describe el motivo real (credenciales de producción contra sandbox,
    // proyecto sin habilitar, clave revocada) y su respuesta no repite las
    // credenciales, así que el mensaje se propaga tal cual.
    const issues = await parseErrors(response);
    throw new FedexError(
      issues[0]?.message ??
        "FedEx rechazó las credenciales. Revisa FEDEX_CLIENT_ID y FEDEX_CLIENT_SECRET.",
      response.status,
      issues,
    );
  }

  const token = (await response.json()) as TokenResponse;

  cachedToken = {
    value: token.access_token,
    expiresAt: Date.now() + token.expires_in * 1000 - TOKEN_EXPIRY_MARGIN_MS,
  };

  return token.access_token;
}

/** Vacía la caché del token. Se usa al recibir un 401 para reintentar una vez. */
export function clearTokenCache(): void {
  cachedToken = null;
}

type FedexErrorBody = {
  errors?: { code?: string; message?: string }[];
};

async function parseErrors(
  response: Response,
): Promise<{ code: string; message: string }[]> {
  try {
    const body = (await response.json()) as FedexErrorBody;
    return (body.errors ?? []).map((error) => ({
      code: error.code ?? "UNKNOWN",
      message: error.message ?? "Error sin descripción.",
    }));
  } catch {
    return [];
  }
}

/**
 * Envía la solicitud de envío. Si el token guardado ya no sirve, lo renueva
 * y reintenta una sola vez.
 */
export async function createShipment(
  payload: unknown,
  config: FedexConfig = readConfig(),
): Promise<unknown> {
  const request = async (token: string) =>
    fetch(`${config.baseUrl}/ship/v1/shipments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-locale": "es_ES",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

  let response = await request(await getAccessToken(config));

  if (response.status === 401) {
    clearTokenCache();
    response = await request(await getAccessToken(config));
  }

  if (!response.ok) {
    const issues = await parseErrors(response);
    throw new FedexError(
      issues[0]?.message ?? "FedEx rechazó la solicitud de envío.",
      response.status,
      issues,
    );
  }

  return response.json();
}
