# FedEx Shipping Manager

Mini app para crear etiquetas de envío usando la **FedEx Ship API** (v1).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS
- API Routes de Next.js como backend intermediario hacia FedEx (OAuth2 + Ship API)

## Requisitos

- Cuenta de desarrollador en el [FedEx Developer Portal](https://developer.fedex.com)
- Credenciales sandbox: `client_id`, `client_secret` y número de cuenta FedEx

## Configuración

Copia `.env.example` a `.env.local` y completa las credenciales:

```bash
cp .env.example .env.local
```

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estado del proyecto

En construcción — ver el historial de commits para el avance.

## Referencias

- Documentación de la Ship API resumida en `doc/fedex-ship-api.md`
- Esquema OpenAPI en `doc/ship.json`
