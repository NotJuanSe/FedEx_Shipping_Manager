# FedEx Shipping Manager

[![Estrellas](https://img.shields.io/github/stars/NotJuanSe/FedEx_Shipping_Manager?style=flat&logo=github&label=estrellas&color=0b5cd5)](https://github.com/NotJuanSe/FedEx_Shipping_Manager/stargazers)
[![Forks](https://img.shields.io/github/forks/NotJuanSe/FedEx_Shipping_Manager?style=flat&logo=github&label=forks&color=0b5cd5)](https://github.com/NotJuanSe/FedEx_Shipping_Manager/network/members)
[![Último commit](https://img.shields.io/github/last-commit/NotJuanSe/FedEx_Shipping_Manager?style=flat&label=último%20commit)](https://github.com/NotJuanSe/FedEx_Shipping_Manager/commits/main)
[![Licencia](https://img.shields.io/github/license/NotJuanSe/FedEx_Shipping_Manager?style=flat&label=licencia)](LICENSE)

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.8-087ea4?style=flat&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![FedEx Ship API](https://img.shields.io/badge/FedEx-Ship_API_v1-4d148c?style=flat&logo=fedex&logoColor=white)](https://developer.fedex.com)

Mini app para crear etiquetas de envío reales usando la **FedEx Ship API** (v1).
Formulario con validación, vista previa en vivo de la etiqueta 4×6 y generación
de la etiqueta térmica junto con la factura comercial para envíos internacionales.

## Qué hace

- **Formulario de envío** con remitente, destinatario, paquete y servicio.
  Valida en el cliente y otra vez en el servidor: una llamada rechazada por
  FedEx consume cuota igual.
- **Vista previa en vivo** de la etiqueta 4×6 mientras escribes. Muestra el
  texto ya normalizado a ASCII, que es lo que FedEx imprime de verdad
  (`Medellín` sale como `MEDELLIN`).
- **Peso facturable**: calcula el peso dimensional (divisor 139) y lo compara
  con el peso real, igual que FedEx.
- **Envíos internacionales**: cuando cambia el país, pide la declaración de
  aduana y solicita a FedEx la factura comercial además de la etiqueta.
- **Etiqueta embebida**: el PDF se muestra en un `iframe` con la proporción del
  rollo térmico de 4×6, con descarga aparte para la etiqueta y la factura.
- **Envío de ejemplo**: un botón carga un envío de Medellín a Times Square en
  FedEx Pak, para probar el flujo sin llenar el formulario a mano.
- **Credenciales propias**: un botón del encabezado abre un diálogo donde
  escribes tu Client ID, Client Secret y número de cuenta y eliges entre sandbox
  y producción, sin tocar el `.env`. Mientras estén puestas, el botón queda en
  verde como «API propia configurada»; si las quitas, se vuelven a usar las del
  servidor.

## Stack

| Pieza | Versión |
| --- | --- |
| Next.js (App Router, Turbopack) | 16.3.4 |
| React / React DOM | 19.2.8 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| shadcn/ui sobre Base UI (`@base-ui/react`) | ^4.19.1 / ^1.7.0 |
| lucide-react | ^1.39.0 |
| ESLint + eslint-config-next | ^9.39.5 / 16.3.4 |

> ESLint se mantiene en la línea 9. `eslint-config-next@16.3.4` trae un
> `eslint-plugin-react` incompatible con ESLint 10 y el lint deja de correr.

## Privacidad

La app **no guarda nada**: ni credenciales, ni etiquetas, ni los envíos
generados. Lo que escribes en el diálogo de credenciales vive solo en el estado de
React, viaja en el cuerpo de la petición de camino a FedEx y desaparece al
recargar la página. No hay base de datos, ni `localStorage`, ni cookies, y el
registro de errores del servidor guarda el mensaje del error, nunca el cuerpo de
la petición.

El token OAuth2 sí se guarda en memoria del proceso mientras dura su hora de
vida, indexado por Client ID y entorno, para no pedir uno nuevo en cada envío.

Si prefieres no escribir tus claves en un despliegue ajeno, clona el repositorio
y móntalo en tu propio servidor con tu `.env.local`.

## Requisitos

- Cuenta en el [FedEx Developer Portal](https://developer.fedex.com)
- Credenciales sandbox: `client_id`, `client_secret` y número de cuenta FedEx

## Configuración

```bash
cp .env.example .env.local
```

| Variable | Para qué sirve |
| --- | --- |
| `FEDEX_CLIENT_ID` | Client ID del proyecto en el portal |
| `FEDEX_CLIENT_SECRET` | Client Secret del proyecto |
| `FEDEX_ACCOUNT_NUMBER` | Cuenta FedEx que paga el envío |
| `FEDEX_API_BASE_URL` | `https://apis-sandbox.fedex.com` (sandbox) o `https://apis.fedex.com` |

> Las credenciales de producción no funcionan contra el sandbox: FedEx responde
> `FORBIDDEN.ERROR: Live credentials not allowed in this environment`. Y apuntar
> a producción genera envíos reales y facturables.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build      # build de producción
npm run lint       # ESLint
npx tsc --noEmit   # chequeo de tipos
```

## Cómo está organizado

```
src/
  app/
    page.tsx              Pantalla principal: formulario + panel de resultado
    api/labels/route.ts   POST /api/labels: valida y llama a FedEx
  components/
    shipment-form.tsx     Secciones de dirección y paquete
    label-preview.tsx     Réplica visual de la etiqueta 4×6
    label-result.tsx      Etiqueta creada, iframe del PDF y descargas
    credentials-panel.tsx Diálogo de credenciales propias y selector de entorno
    ui/                   Componentes generados por shadcn
  lib/
    fedex.ts              OAuth2 con caché de token y transporte HTTP
    fedex-payload.ts      Borrador -> payload de la Ship API, y respuesta -> etiqueta
    shipping.ts           Tipos del dominio, catálogos y cálculo de pesos
doc/
  fedex-ship-api.md       Resumen de la Ship API
  ship.json               Esquema OpenAPI
```

### Detalles de la integración

- **Token OAuth2 en caché**: FedEx emite tokens de una hora. Se guardan en
  memoria del proceso con un margen de 60 s, y ante un 401 se limpia la caché y
  se reintenta una vez. La caché se indexa por Client ID y URL base, así que
  quien prueba sus credenciales nunca recibe el token de otra cuenta.
- **URL base como interruptor**: solo hay dos valores posibles, así que la
  interfaz elige entre sandbox y producción y el servidor resuelve la URL. El
  cliente nunca manda una URL arbitraria.
- **Normalización ASCII**: la Ship API rechaza caracteres fuera de ASCII y los
  imprime mal. `toAscii()` descompone el texto (NFD), descarta los diacríticos y
  traduce los símbolos que la descomposición no resuelve (`ß`, `æ`, `€`…).
- **Etiqueta térmica**: `labelStockType: "STOCK_4X6"` es inventario en rollo;
  los `PAPER_*` son hoja para impresora láser.
- **Factura comercial**: FedEx no la genera sola. Hay que pedirla con
  `shippingDocumentSpecification`, y llega a nivel de envío, aparte de la etiqueta.

## Calidad

`sonar-project.properties` excluye `src/components/ui/**` del análisis: es
código generado por `npx shadcn add`, y cualquier corrección ahí se pierde en la
siguiente actualización del componente.

## Licencia

MIT — ver [LICENSE](LICENSE).

## Referencias

- Documentación de la Ship API resumida en `doc/fedex-ship-api.md`
- Esquema OpenAPI en `doc/ship.json`
