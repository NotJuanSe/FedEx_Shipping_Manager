# FedEx Developer Portal

> **Fuente:** <https://developer.fedex.com/wirc/browser/> (redirige a `#/en-us/home`)
> **Capturado:** 2026-09-02 · Locale: United States / English
> **Nota:** `/wirc/browser/` es la ruta base de la SPA del portal; toda la navegación
> del sitio ocurre sobre esa base mediante rutas con hash (`#/en-us/...`).

---

## Índice

- [Navegación del portal](#navegación-del-portal)
- [Aviso vigente](#aviso-vigente)
- [Propuesta de valor](#propuesta-de-valor)
- [Productos principales](#productos-principales)
- [Beneficios](#beneficios)
- [Ruta de integración: Test → Learn → Integrate](#ruta-de-integración-test--learn--integrate)
- [¿Es la integración adecuada para tu negocio?](#es-la-integración-adecuada-para-tu-negocio)
- [Preguntas frecuentes](#preguntas-frecuentes)
- [Clientes existentes (Web Services / Ship Manager Server)](#clientes-existentes-web-services--ship-manager-server)
- [Referencia rápida de enlaces](#referencia-rápida-de-enlaces)

---

## Navegación del portal

Menú lateral principal:

| Sección | Descripción |
|---|---|
| Sign Up / Log In | Registro y acceso al portal |
| Getting Started | Guía paso a paso de arranque |
| API Catalog | Catálogo completo de APIs |
| API Recipes | Recetas / ejemplos de uso combinado |
| Guides | Guías (pricing, rate limits, best practices, etc.) |
| Announcements | Anuncios y cambios de plataforma |
| API Validation | Validación / certificación de la integración |
| Support/FAQs | Soporte y preguntas frecuentes |
| Other Products | Enlaces externos: **FedEx Web Services**, **FedEx Ship Manager Server** |

---

## Aviso vigente

> **FedEx Authenticated Delivery** — el nuevo requisito de entrega con código QR — ya está
> disponible para envíos **FedEx Express** dentro de **EE. UU. y Canadá**.
> Detalles: [Anuncio de Authenticated Delivery](https://developer.fedex.com/wirc/browser/#/en-us/announcements/authenticated_delivery)

---

## Propuesta de valor

**"Your business, powered from FedEx"**

- Las soluciones de integración de envíos conectan tu aplicación de negocio actual con las
  soluciones logísticas de FedEx.
- Suite completa de APIs modernas + webhooks de **Advanced Integrated Visibility**.

Acciones de entrada: `SIGN UP` · `LOG IN`

---

## Productos principales

### APIs

Permiten traer información de las soluciones logísticas de FedEx hacia tus propias
aplicaciones para: comparar tarifas, crear etiquetas, procesar devoluciones y más.

**APIs más populares**

| API | Enlace |
|---|---|
| Ship API | <https://developer.fedex.com/wirc/browser/#/en-us/catalog/ship> |
| Rate and Transit Time | <https://developer.fedex.com/wirc/browser/#/en-us/catalog/rate> |

→ [Explorar el catálogo de APIs](https://developer.fedex.com/wirc/browser/#/en-us/catalog)

### Advanced Integrated Visibility (webhooks)

- Actualizaciones de tracking **push en casi tiempo real**, enviadas directamente a tus
  servidores mediante tecnología de webhooks.
- Alcance: cuentas y números de rastreo **con base en EE. UU.**
- Eventos incluidos: fecha estimada de entrega y ventana horaria, *picture proof of delivery*,
  entre otros.
- Opciones de configuración flexibles para adaptarse a las necesidades del negocio.

**Modelo de cobro:** cuota mensual basada en la **cantidad de números de rastreo procesados
por mes**. Ver [guía de precios](https://developer.fedex.com/wirc/browser/#/en-us/guides/pricing-guide).

→ [Documentación de Advanced Integrated Visibility](https://developer.fedex.com/wirc/browser/#/en-us/catalog/shipment-visibility-webhook)

### FedEx Integrator Program

Ruta de onboarding guiada hacia las APIs y Advanced Integrated Visibility, diseñada para
proveedores de tecnología y logística:

- Acceso simplificado a capacidades de shipping, tracking y delivery.
- Validaciones simplificadas para el integrador.
- **Sin requisitos de certificación para los clientes finales.**

---

## Beneficios

Las APIs y webhooks de FedEx ofrecen una forma simple y costo-efectiva de mantener a los
clientes en tu sitio y agregar velocidad y eficiencia al proceso de envío.

| Beneficio | Detalle |
|---|---|
| **Streamline processes** | Acceso a soluciones de integración personalizadas e independientes de la interfaz. |
| **Improve efficiency** | Gestión de devoluciones sencilla y reducción de costos de servicio al cliente. |
| **Support customers** | Los clientes rastrean el estado de sus pedidos dentro de tu propia aplicación. |

---

## Ruta de integración: Test → Learn → Integrate

### 1. Test

Explora la documentación de los webhooks de Advanced Integrated Visibility y de las APIs, y
prueba en el **sandbox — sin necesidad de cuenta**.

- [Advanced Integrated Visibility Documentation](https://developer.fedex.com/wirc/browser/#/en-us/catalog/shipment-visibility-webhook)
- [API Catalog](https://developer.fedex.com/wirc/browser/#/en-us/catalog)

### 2. Learn

Revisa las guías de cuotas/límites y de buenas prácticas.

- [Quotas & rate limits guide](https://developer.fedex.com/wirc/browser/#/en-us/guides/ratelimits)
- [Integration best practices](https://developer.fedex.com/wirc/browser/#/en-us/guides/best-practices)

### 3. Integrate

Sigue la guía paso a paso y crea una organización en el Developer Portal.

- [Getting started guide](https://developer.fedex.com/wirc/browser/#/en-us/getting-started)
- [Create Organization](https://developer.fedex.com/wirc/browser/#/en-us/createorganization)

---

## ¿Es la integración adecuada para tu negocio?

### FedEx Compatible

Si tu aplicación de envíos está destinada a **reventa**, conviértete en miembro de
**FedEx® Compatible** para integrar funcionalidad FedEx en tu solución.

### Solutions to support your business

Si aún no tienes claro si estás listo para integrarte, revisa la sección de soluciones para
entender cómo la integración puede apoyar tu negocio.

---

## Preguntas frecuentes

### ¿Qué es una API y cuáles son sus beneficios?

Una API es la puerta de enlace entre tu aplicación de negocio actual y las soluciones
logísticas que impulsan la empresa global FedEx. Tu aplicación se comunica con los sistemas
de procesamiento de FedEx enviando peticiones por internet y recibiendo a cambio información
en tiempo real que puedes presentar a tus clientes de forma unificada.

Las APIs de FedEx pueden apoyar en: **tracking, order entry, servicio al cliente, logística
inversa, facturación** y operaciones de envío. Ejemplos de APIs disponibles: *Address
Validation*, *Rate*, *Basic Integrated Visibility*.

### ¿Necesito una cuenta FedEx para integrarme?

**Sí.** Los administradores del FedEx Developer Portal deben **asociar cuentas FedEx a su
organización** para poder ejecutar transacciones. Se puede crear una cuenta personal o
empresarial en cualquier momento y **no hay costo por abrir una cuenta**.

---

## Clientes existentes (Web Services / Ship Manager Server)

Los clientes actuales de **FedEx Web Services** o **FedEx Ship Manager Server** siguen
teniendo acceso al **Developer Resource Center**:
<https://www.fedex.com/en-us/developer.html>

---

## Referencia rápida de enlaces

| Recurso | URL |
|---|---|
| Portal (home) | https://developer.fedex.com/wirc/browser/#/en-us/home |
| Getting Started | https://developer.fedex.com/wirc/browser/#/en-us/getting-started |
| API Catalog | https://developer.fedex.com/wirc/browser/#/en-us/catalog |
| Ship API | https://developer.fedex.com/wirc/browser/#/en-us/catalog/ship |
| Rate & Transit Time API | https://developer.fedex.com/wirc/browser/#/en-us/catalog/rate |
| Shipment Visibility Webhook | https://developer.fedex.com/wirc/browser/#/en-us/catalog/shipment-visibility-webhook |
| Pricing guide | https://developer.fedex.com/wirc/browser/#/en-us/guides/pricing-guide |
| Quotas & rate limits | https://developer.fedex.com/wirc/browser/#/en-us/guides/ratelimits |
| Integration best practices | https://developer.fedex.com/wirc/browser/#/en-us/guides/best-practices |
| Create Organization | https://developer.fedex.com/wirc/browser/#/en-us/createorganization |
| Announcement: Authenticated Delivery | https://developer.fedex.com/wirc/browser/#/en-us/announcements/authenticated_delivery |
| Developer Resource Center (legacy) | https://www.fedex.com/en-us/developer.html |
| Integration Solutions | https://www.fedex.com/en-us/integration.html |
| Support | https://www.fedex.com/en-us/integration/support.html |

---

© FedEx Corporate Services Inc. Contenido resumido del portal público con fines de
referencia técnica interna.
