# Ship API — Documentación (FedEx)

> **Fuente:** <https://developer.fedex.com/wirc/browser/#/es-us/catalog/ship/docs>  
> **Contenido servido por:** `https://developer.fedex.com/api/es-us/catalog/ship/v1/docs.html`  
> **Capturado:** 2026-09-02 · Locale: `es-us` · Versión de la API: **v1**  
> **Esquema JSON:** disponible en el portal mediante el botón *Download JSON Schema*.

> [!WARNING]
> A partir del 15 de septiembre de 2025: se requiere un número de cuenta FedEx para los envíos de mercancías del servicio FedEx International Connect Plus (FICP). Esto se aplica a los envíos desde países y territorios de la región Asia-Pacífico (APAC) a EE. UU. o Puerto Rico con facturación de impuestos y aranceles al destinatario si el país de fabricación de cualquier mercancía enviada es AU, CN, HK, ID, JP, KR, MO, MY, NZ, PH, SG, TH, TW, VN (países y territorios de la región APAC).

---

## Contenido

- [Introducción](#introducción)
- [Detalles de la API de Envío](#detalles-de-la-api-de-envío)
- [Cómo funciona la API de Envío](#cómo-funciona-la-api-de-envío)
- [Envíos Express en los EE. UU.](#envíos-express-en-los-ee-uu)
- [Envío internacional](#envío-internacional)
- [Opciones de embalaje y envíos internacionales](#opciones-de-embalaje-y-envíos-internacionales)
- [Cumplimiento regulatorio](#cumplimiento-regulatorio)
  - [Datos regulatorios de la CPSC](#datos-regulatorios-de-la-cpsc)
  - [Información regulatoria sobre la eliminación del régimen de minimis de la UE](#información-regulatoria-sobre-la-eliminación-del-régimen-de-minimis-de-la-ue)
  - [Uso de la API regulatoria](#uso-de-la-api-regulatoria)
- [Envío nacional](#envío-nacional)
- [FedEx Ground® Economy (antes conocido como FedEx SmartPost®)](#fedex-ground-economy-antes-conocido-como-fedex-smartpost)
- [Recargos por paquetes no autorizados](#recargos-por-paquetes-no-autorizados)
- [Servicios especiales](#servicios-especiales)
  - [Envío de alcohol](#envío-de-alcohol)
  - [Entrega Autenticada de FedEx](#entrega-autenticada-de-fedex)
  - [Monitoreo e intervención (MI) e identificadores de atención médica (HCID)](#monitoreo-e-intervención-mi-e-identificadores-de-atención-médica-hcid)
  - [Mercancías peligrosas](#mercancías-peligrosas)
  - [Mercancías peligrosas por carretera](#mercancías-peligrosas-por-carretera)
  - [Opciones de entrega con firma certificada](#opciones-de-entrega-con-firma-certificada)
  - [Opciones de FedEx Priority Alert](#opciones-de-fedex-priority-alert)
  - [Servicio los días sábado](#servicio-los-días-sábado)
  - [C.O.D. de Ground](#cod-de-ground)
  - [E.C.O.D. de Ground](#ecod-de-ground)
  - [FedEx International Broker Select](#fedex-international-broker-select)
  - [Declaración de exportación para envíos salientes de Canadá](#declaración-de-exportación-para-envíos-salientes-de-canadá)
  - [Información de exportación electrónica](#información-de-exportación-electrónica)
  - [Documentos comerciales electrónicos](#documentos-comerciales-electrónicos)
  - [Control de destino comercial](#control-de-destino-comercial)
  - [Día futuro](#día-futuro)
  - [Entrega en farmacia](#entrega-en-farmacia)
  - [Servicio de tercero consignatario de FedEx](#servicio-de-tercero-consignatario-de-fedex)
  - [Cobro contra entrega (C.O.D.)](#cobro-contra-entrega-cod)
  - [Retener en oficina de FedEx](#retener-en-oficina-de-fedex)
  - [FedEx OnSite](#fedex-onsite)
  - [FedEx Tarifa Única®](#fedex-tarifa-única)
- [Etiquetas de envío de FedEx](#etiquetas-de-envío-de-fedex)
- [Envíos FedEx Ground en EE. UU.](#envíos-fedex-ground-en-ee-uu)
- [Envío de piezas múltiples (MPS)](#envío-de-piezas-múltiples-mps)
- [Envío de devoluciones](#envío-de-devoluciones)
- [Flujo de envíos](#flujo-de-envíos)
- [Normas comerciales](#normas-comerciales)
- [Colección de JSON de la API](#colección-de-json-de-la-api)

---

## Introducción

Para usar las API de FedEx, primero debe conocer varios aspectos de los servicios de FedEx®. Esta documentación le permite recopilar información sobre envíos de FedEx a negocios y entender las diferentes opciones, reglas y pautas de envío. Estos recursos le ayudarán a responder todas sus preguntas relacionadas con los envíos y le darán las herramientas para usar las API de FedEx para sus envíos.

## Detalles de la API de Envío

La Ship API te permite integrar las capacidades de envío de FedEx en tu aplicación. Cuando usas la Ship API, puedes procesar y enviar solicitudes de envío de paquetes a FedEx para envíos nacionales e internacionales, así como para la devolución de envíos.

Cada solicitud de envío contendrá información detallada para el envío y los paquetes.

Envíos de FedEx clasificados como:

- Envío nacional
- Envío internacional

## Cómo funciona la API de Envío

Las siguientes funciones están disponibles con esta API.

**Crear envío**

Use este extremo para crear envíos de FedEx con toda la información de envío necesaria.

La información de entrada requerida relacionada con esta solicitud es la siguiente:

- Número de cuenta: el número de cuenta de envío de FedEx.
- Tipo de recolección: indica si el envío se entregará en una oficina de FedEx o si FedEx lo recogerá. Indica si es una recolección programada regularmente o si se programó una nueva recolección para este envío. Es obligatorio para FedEx Express, FedEx Ground y FedEx Ground® Economy (antes conocido como FedEx SmartPost®).
- Tipo de servicio: el tipo de servicio que se utiliza para enviar el paquete.
- Tipo de embalaje: el tipo de embalaje utilizado para el paquete.
- Información del remitente.
- Información del destinatario.
- Tipo de pago del envío (SENDER/RECIPIENT/THIRD_PARTY/ACCOUNT, etc.).
- Información del pagador: este elemento es opcional cuando el tipo de pago proporcionado es un REMITENTE.
- Peso de paquete individual.
- Especificación de etiqueta: detalles sobre el tipo de imagen, formato de impresión e inventario de etiquetas. También puede especificar los detalles concretos del cliente como contenido de la pestaña del documento, etiquetas regulatorias y datos ocultos en la etiqueta.
- processingOptions: este campo es opcional. Selecciona INCLUDE_PICKUPRATES como el valor de enumeración y usa pickupDetail para recibir tarifas de recolección a petición y recargos por parada en el campo pickupRateDetail de la respuesta.
- requestType: selecciona el valor de enumeración adecuado para recibir cotizaciones de tarifas de recolección de envíos en un día futuro o en el mismo día.

La respuesta exitosa a esta solicitud proporcionará el número de rastreo e información de la etiqueta que serán útiles para rastrear el envío.

*Ten cuenta que al ingresar valores decimales para la longitud, el ancho o la altura en los servicios web, solo se utilizará la parte entera del número para calcular las tarifas. Por ejemplo, si ingresas 9.4, el sistema usará 9 para el cálculo.*

*Nota: para evitar ingresar datos erróneos en la etiqueta y en los sistemas de FedEx, no ingrese caracteres que no sean ASCII en su solicitud de Crear envío.*

**Validar envío**

Este extremo le permite validar la precisión de los detalles del envío antes de enviar la solicitud final del envío. Esta función también permite a los negocios que reciben pedidos de envío de los clientes usuarios finales validar la información del envío, antes de enviar una transacción de creación de envío a FedEx e imprimir una etiqueta. Si por algún motivo es necesario editar o cambiar la información, puede realizarse mientras el usuario final todavía está disponible para confirmar los cambios. Este extremo le ayuda a identificar y corregir los errores que tenga el envío antes de enviar el envío.

*Nota: esta solicitud no valida los detalles de la dirección postal.*

La información de entrada requerida relacionada con esta solicitud es la siguiente:

- Número de cuenta: el número de cuenta de envío de FedEx.
- Tipo de recolección: indica si el envío se entregará en una oficina de FedEx o si FedEx lo recogerá. Indica si es una recolección programada regularmente o si se programó una nueva recolección para este envío. Se requiere para FedEx Express, FedEx Ground y FedEx Ground® Economy.
- Tipo de servicio: el tipo de servicio que se utiliza para enviar el paquete.
- Tipo de embalaje: el tipo de embalaje utilizado para el paquete.
- Información del remitente.
- Información del destinatario.
- Tipo de pago del envío (REMITENTE/DESTINATARIO/TERCERO/CUENTA. etc.)
- Información del pagador: este elemento es opcional cuando el tipo de pago proporcionado es un REMITENTE.
- Peso de paquete individual.
- Especificación de etiqueta: detalles sobre el tipo de imagen, formato de impresión e inventario de etiquetas. También puede especificar los detalles concretos del cliente como contenido de la pestaña del documento, etiquetas regulatorias y datos ocultos en la etiqueta.

La respuesta exitosa a esta solicitud es «200 OK» con la id de la transacción. En caso de que se presente información del envío incorrecta o inválida, en la respuesta se devolverán los errores, las advertencias, las notas y las alertas a fin de que puedan corregirse y que se pueda revalidar el envío al arreglar esos problemas.

A continuación, encontrará los puntos importantes relacionados con este punto final:

- Esta validación del nivel de envío, por lo tanto, solo admite la validación de envíos de una sola pieza.
- Todos los envíos de Express y Ground nacionales, así como los envíos internacionales con todos los servicios especiales aplicables, admiten la validación de envíos.
- Se admite la validación de envíos de FedEx Ground® Economy.

**Recuperar envío asíncrono**

Use este extremo para recuperar los envíos procesados de manera asincrónica utilizando la ID del trabajo.

La información de entrada requerida relacionada con esta solicitud es la siguiente:

- ID del trabajo
- Núm. de cuenta

La respuesta exitosa a esta solicitud arrojará todos los detalles de los reportes de etiquetas y envíos para la Id del trabajo correspondiente. En caso de que el resultado arrojado tenga errores, vuelva a enviar y arregle los problemas del envío.

**Cancelar envío**

Use esta solicitud para cancelar los envíos/paquetes de FedEx ya creados que ya se hayan entregado a FedEx.

La información de entrada requerida relacionada con esta solicitud es la siguiente:

- Número de rastreo.
- Número de cuenta: el número de cuenta de envío de FedEx.

*Nota: Si el envío que se va a cancelar es una devolución de envío por correo electrónico, especifica emailReturnShipment como «verdadero».*

El resultado de esta solicitud arrojará un indicador y un mensaje para confirmar si el envío se canceló.

Notas importantes:

- Con el valor del parámetro controlado (control de eliminación), puede especificar si se debe eliminar solo uno o todos los paquetes en un envío.
- Para los envíos internacionales de paquetes múltiples de FedEx Express, si ingresa el número de rastreo principal, se eliminan todos los paquetes asociados con este envío. Si intenta eliminar un paquete en un envío, el número de secuencia de la etiqueta será incorrecto y es posible que tenga problemas de declaración en la aduana si no puede justificar todos los paquetes del envío.
- Para envíos de paquetes múltiples de FedEx International Ground, si ingresa cualquier número de rastreo relacionado con el envío principal, todos los paquetes relacionados con el envío se eliminarán.
- Para envíos de paquetes múltiples de FedEx Ground en los EE. UU., puede ingresar un solo número de rastreo para eliminar un paquete en el envío. Debido a que las etiquetas de envíos de paquetes múltiples en los EE. UU. de FedEx Ground no están asociadas con los números secuenciales (1 de 2, 2 de 2), no es necesario eliminar todo el envío.
- Para envíos de paquetes múltiples de cobro contra entrega (COD) de FedEx Express, ingrese cualquier número de rastreo en el envío para eliminar el envío completo. Para los envíos de paquetes múltiples de COD de FedEx Ground®, debe eliminar cada paquete de manera individual.

**Condición de error y consejos:**

Si no puede eliminar el paquete o envío, recibirá una condición de error. Esta condición de error indica que:

- Para los envíos de FedEx Express, el paquete ya se entregó a FedEx.
- Ingresó un número de cuenta inválido.
- El número de cuenta, aunque es válido, no está relacionado con el número de rastreo.
- Ingresó un número de rastreo inválido. Esto se aplica solo a los envíos de FedEx Ground. FedEx Express acepta cualquier número con el número correcto de dígitos.

**Crear etiqueta**

FedEx crea y entrega una etiqueta de devolución de envío a un cliente y recoge el artículo para la devolución. El cliente debe tener el paquete listo para la recolección cuando llegue el conductor de FedEx. Utilice esta opción para crear solicitudes de etiqueta para envíos de FedEx Express y FedEx Ground.

La información de entrada necesaria y alguna información clave relacionada con esta solicitud es la siguiente:

- Número de cuenta: el número de cuenta de envío de FedEx.
- Detalles de recolección: detalles para programar la recolección.
- Tipo de servicio: el tipo de servicio que se utiliza para enviar el paquete.
- Tipo de embalaje: el tipo de embalaje utilizado para el paquete.
- Información del remitente.
- Información del destinatario.
- Tipo de pago del envío (REMITENTE/DESTINATARIO/TERCERO/CUENTA. etc.)
- Servicios especiales: servicios especiales opcionales solicitados para el envío.
- Especificación de etiqueta: detalles sobre el tipo de imagen, formato de impresión e inventario de etiquetas. También puede especificar los detalles concretos del cliente como contenido de la pestaña del documento, etiquetas regulatorias y datos ocultos en la etiqueta.

El resultado de esta solicitud arrojará un número de confirmación, el servicio de FedEx Express aplicable y la fecha de envío para la solicitud de Crear etiqueta exitosa.

**Cancelar etiqueta**

Utilice esta opción para cancelar una etiqueta de devolución de FedEx y las recolecciones relacionadas para envíos de FedEx Express y FedEx Ground si el envío aún no lo recoge el mensajero.

Se requieren los siguientes elementos para cancelar una etiqueta:

- Número de cuenta: el número de cuenta de envío de FedEx.
- Tipo de servicio
- Número de confirmación
- Fecha de despacho
- Ubicación

El resultado de esta solicitud arrojará un indicador, p. ej., valor de la etiqueta cancelada (verdadero o falso), junto con un mensaje para la solicitud exitosa de la cancelación de la etiqueta de FedEx.

## Envíos Express en los EE. UU.

Usted puede hacer envíos dentro de los EE. UU. con una variedad de servicios de entrega de FedEx, desde opciones de entrega de emergencia para el mismo día hasta opciones de entrega menos urgentes.

Servicios relacionados con envíos Express en los EE. UU.:

**Entrega al siguiente día hábil**

FedEx First Overnight®

FedEx ofrece entrega en la mañana del siguiente día hábil a las 08:00, 08:30, 09:00 o 09:30 horas en la mayoría de las áreas y a las 10:00, 11:00 o 14:00 horas en las áreas ampliadas. La recolección y los servicios de entrega en sábado están disponibles en muchas áreas con un cargo adicional. [Servicio ENUM: FIRST_OVERNIGHT]

FedEx Priority Overnight®

FedEx ofrece entregas al siguiente día hábil a las 10:30 horas a la mayoría de las direcciones de los EE. UU., al mediodía o a las 17:00 horas. Las entregas también se realizan el sábado al mediodía, a las 13:30 o a las 17:00 horas. También ofrece entregas en 2 días hábiles para ciertos envíos para y desde Alaska y Hawái. [Servicio ENUM: PRIORITY_OVERNIGHT]

FedEx Standard Overnight®

FedEx ofrece entregas el siguiente día hábil por la tarde a las 15:00 horas a la mayoría de las direcciones en los EE. UU. y a las 17:00 horas o a las 20:00 horas a residencias. [Servicio ENUM: STANDARD_OVERNIGHT]

**Entrega en 2 o 3 días hábiles**

FedEx 2Day® A.M.

FedEx ofrece entregas al segundo día hábil antes de las 10:30 horas a la mayoría de las direcciones en los EE. UU. y al mediodía a áreas rurales. Días de servicio de lunes a viernes con recolección disponible en sábado en varias áreas por un cargo adicional. [Servicio ENUM: FEDEX_2_DAY_AM]

FedEx 2Day®

FedEx ofrece entregas al segundo día hábil antes de las 17:00 horas a la mayoría de las áreas (antes de las 20:00 horas a residencias). Los días de servicio son de lunes a viernes, con recolección y entrega disponibles los sábados en varias áreas por un cargo adicional. También ofrece entregas en 3 días hábiles para ciertos envíos hasta Alaska y Hawái. [Servicio ENUM: FEDEX_2_DAY]

FedEx Express Saver®

FedEx ofrece entregas al tercer día hábil antes de las 17:00 horas. a la mayoría de las áreas (antes de las 20:00 horas a residencias). FedEx Express Saver no está disponible para devoluciones de envíos por correo electrónico. [Servicio ENUM: FEDEX_EXPRESS_SAVER]

**Entrega a negocios por tierra**

FedEx Ground®

FedEx ofrece una entrega en un día definido en 1 a 5 días hábiles (de 3 a 7 días hábiles hasta y desde Alaska y Hawái) según la distancia al destino. También ofrece entregas al final del día hábil. La clasificación FedEx Ground Multiweight® puede ayudarle a ahorrar dinero en envíos de piezas múltiples que pesan 90 kg o más. [Servicio ENUM: FEDEX_GROUND]

**Entrega residencial por tierra**

FedEx Home Delivery®

Entrega residencial de día definido en 1 a 7 días hábiles (de 3 a 7 días hábiles hasta y desde Alaska y Hawái) según la distancia al destino. El peso y el tamaño del paquete puede ser hasta 68 kg, 2,74 m de largo o 4,19 m de largo más circunferencia (largo + [2 veces] ancho + [2 veces] alto). El envío puede originarse en y entregarse en los 50 estados de los EE. UU., aunque se aplican tiempos en tránsito más largos para Alaska y Hawái. La entrega al final del día está disponible para todas las direcciones residenciales en los EE. UU., de lunes a viernes, los sábados para la mayoría y para muchos en domingo. [Servicio ENUM: GROUND_HOME_DELIVERY]

FedEx Date Certain Home Delivery

FedEx guarda la información del destinatario (el número de teléfono del destinatario se requiere en la transacción) y programa la entrega del paquete para una fecha específica. [Servicio ENUM: DATE_CERTAIN]

FedEx Evening Home Delivery

Justo como en «Entrega en fecha concertada», FedEx guarda la información del cliente (el número de teléfono del destinatario se requiere en la transacción) y programa la entrega del paquete por la tarde. [Servicio ENUM: EVENING]

FedEx Appointment Home Delivery

Esta opción es para una hora específica. Por ejemplo, si deseas que tu paquete se entregue a las 13:30 hrs. en martes, FedEx llama al destinatario para confirmar la fecha y la hora. El número de teléfono del destinatario se requiere en la transacción. [Servicio ENUM: APPOINTMENT]

*Nota:*

- *Las opciones de entrega convenientes de FedEx Home Delivery se solicitan a nivel de envío y generan recargos.*
- *Para recibir el enlace de notificación de las opciones de entrega convenientes (CDO), debes especificar en la solicitud un número correcto de teléfono celular que pueda recibir un mensaje de texto (SMS).*

**FedEx Ground® Economy (antes conocido como FedEx SmartPost®)**

FedEx ofrece envíos para paquetes de peso bajo a residencias; apartados postales, oficinas postales del ejército (APO), oficinas postales de la flota (FPO) y oficinas postales diplomáticas (DPO). Entregas generalmente en 2 a 7 días hábiles, según la distancia al destino (más tiempo en tránsito fuera de los 48 estados contiguos). FedEx dirige paquetes a una instalación de una oficina postal de EE. UU. para su entrega final. Este es un servicio solo por contrato y se permiten paquetes de hasta 31,75 kg. [Servicio ENUM: SMART_POST]

Para obtener más información, busca la sección FedEx Ground® Economy.

## Envío internacional

FedEx ofrece envíos internacionales desde y hacia cualquier lugar, lo que significa que puedes crear transacciones de envíos desde y hacia cualquier país en el que FedEx ofrezca sus servicios. FedEx te permite implementar los servicios de FedEx como una solución de envío integrada para tu negocio internacional.

A continuación, se agrupan los servicios de envío internacional, según su velocidad de entrega:

****Entrega más rápida (entrega en 1, 2 o 3 días hábiles)****

FedEx International First®

FedEx ofrece entregas de paquetes en 1, 2 o 3 días hábiles a códigos postales seleccionados en 20 ubicaciones mundiales clave. Entrega antes de las 10:00 horas en 1 día hábil en Canadá y antes de las 11:00 horas en 1 día hábil para México (2 días hábiles para envíos de mercancías hacia México) y se proporcionan entregas a códigos postales seleccionados de EE. UU. a las 8:00, 8:30, 9:00 o 9:30 horas a la mayoría de las áreas. [Servicio ENUM: INTERNATIONAL_FIRST]

FedEx International Priority®

FedEx ofrece entregas de paquetes generalmente en 1, 2 o 3 días hábiles a más de 220 países y territorios. Ofrece las entregas más rápidas a las principales ciudades de Canadá y México, por lo general, en 1 día hábil y en las principales ciudades de Europa y Asia al mediodía, por lo general, en 2 días hábiles. También ofrece entregas entrantes de paquetes en los EE. UU. antes de las 10:30 horas o al mediodía en muchos lugares. [Servicio ENUM: INTERNATIONAL_PRIORITY]

FedEx International Priority® Express (2A)

Este es un nuevo servicio de entrega internacional con compromiso de tiempo al mediodía, con liberación aduanal y de puerta a puerta (DTD). Por lo general, la entrega es en 1 a 3 días hábiles y está respaldada por la Garantía de devolución del dinero de FedEx (MBG).

Para solicitar este servicio, envíe el valor de «ServiceType» como FEDEX_INTERNATIONAL_PRIORITY_EXPRESS.

A continuación, encontrará los beneficios asociados con este servicio:

- Entrega rápida y confiable
- La entrega se suele realizar en 1 a 3 días hábiles.
- El plazo estándar de entrega del envío es en 2 días hábiles, antes del mediodía, a docenas de ciudades.
- Entrega al día siguiente desde las ciudades principales en Europa, Medio Oriente, Asia, México y América del Sur a muchas ciudades de EE. UU.
- Peso del paquete: hasta 68 kilogramos o 150 lb.
- Más control sobre el compromiso de entrega
- Flexibilidad para destinatarios a fin de manejar la llegada de volumen entrante
- Más opciones de tiempos para los servicios de paquetes express internacionales.

*Identificación de etiquetas:*

Se muestra «IP EXP» en la etiqueta cuando se selecciona el servicio de FedEx International Priority Express.

FedEx International Priority® (2P)

Este es un nuevo servicio de entrega internacional con compromiso de tiempo al final del día, con liberación aduanal y de puerta a puerta (DTD). Por lo general, la entrega es en 1 a 3 días hábiles y está respaldada por la garantía de devolución del dinero (MBG) de FedEx.

Para solicitar este servicio, envíe el valor de ServiceType como FEDEX_INTERNATIONAL_PRIORITY.

A continuación, encontrará los beneficios asociados con este servicio:

- Entrega confiable
- Más control sobre el compromiso de entrega
- Flexibilidad para destinatarios a fin de manejar la llegada de volumen entrante
- Más opciones de tiempos para los servicios de paquetes express internacionales.
- Entrega al siguiente día antes de las 17:00 horas a la mayoría de los centros de empresariales clave en los EE. UU. con orígenes de EuroOne en muchos mercados europeos
- Tiempo de recolección de bulto tardía para envíos de paquetes a EE. UU. y otras partes
- Propuesta de valor mejorada de Europa a EE. UU.

*Identificación de etiquetas:*

Se muestra «IP EOD» en la etiqueta cuando se selecciona el servicio de FedEx International Priority.

**Envío internacional con tarifa fija**

FedEx® 10kg Box y FedEx® 25kg Box

Una manera fácil y económica de hacer envíos internacionales. Pague una tarifa fija (según el destino) cuando envíe hasta 9,97 kg en la FedEx 10kg Box y hasta 25,40 kg en la FedEx 25kg Box a través de FedEx International Priority, por lo general, en 1, 2 o 3 días hábiles a más de 220 países y territorios. [Servicio ENUM: FEDEX_10KG_BOX y FEDEX_25KG_BOX]

**Entrega en 2 a 5 días hábiles**

FedEx International Economy®

FedEx ofrece la entrega eficaz en función del costo de paquetes (por lo general en 2 a 5 días hábiles) a más de 215 países y territorios, y ofrece la entrega en 2 a 3 días hábiles a Canadá, México y Puerto Rico. [Servicio ENUM: INTERNATIONAL_ECONOMY]

FedEx International Connect PlusTM

El nuevo servicio contractual de FedEx International Connect Plus TM ofrece opciones de envío con diferentes precios que son menos costosos y similares al servicio de FedEx International Priority®. También le ofrece control total de su paquete con la ventaja de entregas más rápidas y convenientes. [Servicio ENUM: FEDEX_INTERNATIONAL_CONNECT_PLUS]

Detalles destacados:

- Una entrega internacional con día definido al final del día para su negocio de comercio electrónico.
- Generalmente las entregas se realizan en 2 a 5 días hábiles.
- Solo está disponible por contrato en mercados seleccionados.
- No hay garantía de devolución de dinero.

Para solicitar este servicio, especifica el dato que corresponde a enum del servicio en el elemento *serviceType*.

Nota: para obtener más información sobre este servicio, comuníquese con su representante de Soporte de FedEx.

**Entregas de 5 a 10 días hábiles**

FedEx International Deferred Freight (FDF)

FedEx International Deferred Freight (FDF) es un servicio global de envío de carga por vía aérea para envíos de carga por vía aérea internacionales con tiempos de entrega y tránsito extendidos a tarifas económicas. FDF también está disponible para servicios de entrega ATA, de domicilio a aeropuerto, de aeropuerto a domicilio y de puerta a puerta. [Servicio ENUM: FEDEX_INTERNATIONAL_DEFERRED_FREIGHT]

*Nota:*

- *Actualmente, este servicio solo está disponible para rutas seleccionadas entre países.*
- *No se permiten mercancías peligrosas ni restringidas. Por ejemplo: hielo seco o baterías de ion de litio. Comunícate con el servicio de atención al cliente de FedEx para obtener más información.*
- *No se permiten envíos domésticos dentro de EE. UU. ni envíos domésticos fuera de EE. UU.*

**Servicios Regional Economy**

FedEx® Regional Economy

FedEx® Regional Economy es un servicio económico puerta a puerta, con día definido, con liberación aduanal, dentro de Europa, para envíos menos urgentes de hasta 68 kg por paquete.

Para solicitar este servicio, envíe el valor de ServiceType FEDEX_REGIONAL_ECONOMY.

A continuación, encontrará los beneficios asociados con este servicio:

- Proporciona entregas generalmente en 1 a 4 días hábiles a destinos en Europa.
- Disponible en países europeos como origen y destino. (Austria, Bélgica, Bulgaria, Croacia, República Checa, Dinamarca, Estonia, Finlandia, Francia, Alemania, Grecia, Hungría, Irlanda, Italia, Letonia, Lituania, Luxemburgo, Países Bajos, Noruega, Polonia, Portugal, Rumania, Serbia, Eslovaquia, Eslovenia, España, Suecia, Suiza y el Reino Unido).
- Ofrece servicio de puerta a puerta y el compromiso de entrega en un día definido.

Estas son las normas comerciales que se aplican al servicio de FedEx® Regional Economy:

- Los días de servicio van de lunes a viernes, con entrega disponible los sábados en regiones donde el sábado es un día hábil regular.
- Se aplica al recargo por combustible (diésel), factor de peso dimensional (DIM) de 4 000 diferente (para nuevos clientes de FedEx), sin garantía de devolución de dinero (MBG), sin embalaje de la marca FedEx y sin guía aérea (AWB).

*Identificación de etiquetas*

Se muestra «RGNL ECONOMY» en la etiqueta cuando se selecciona el servicio FedEx® Regional Economy.

FedEx® Regional Economy Freight

FedEx® Regional Economy Freight es un servicio económico puerta a puerta, con día definido y liberación aduanal dentro de Europa para envíos menos urgentes de paquetes de más de 68 kg.

Para solicitar este servicio, envíe el valor de ServiceType como FFEDEX_REGIONAL_ECONOMY_FREIGHT.

A continuación, encontrará los beneficios asociados con este servicio:

- La entrega se hace en un tiempo definido, generalmente en 2 a 5 días hábiles, para destinos europeos y para envíos superiores a 68 kg por paquete.
- Disponible en 22 países europeos, los cuales pueden ser el origen o el destino. (Austria, Bélgica, República Checa, Dinamarca, Estonia, Finlandia, Francia, Alemania, Hungría, Irlanda, Italia, Letonia, Lituania, Luxemburgo, Países Bajos, Noruega, Polonia, Eslovenia, España, Suecia, Suiza y el Reino Unido).
- Los días de servicio son de lunes a viernes, con entrega disponible los sábados en países donde el sábado es un día hábil regular.
- Compromiso de entrega al final del día, según la ubicación.

Están permitidos los siguientes servicios especiales (dependiendo de la ubicación destino):

- Agente internacional de FedEx
- Retener en una oficina

Las normas comerciales que se aplican al servicio FedEx® Regional Economy Freight son las siguientes:

- Los días de servicio van de lunes a viernes, con entrega disponible los sábados en regiones donde el sábado es un día hábil regular.
- FedEx International Saturday se aplica según la región.
- Se aplica al recargo por combustible (diésel), factor de peso dimensional (DIM) de 4 000 diferente (para nuevos clientes de FedEx), sin garantía de devolución de dinero (MBG), sin embalaje de la marca FedEx y sin guía aérea (AWB).

*Identificación de etiquetas:*

Se muestra «RGNL ECON FRT» en la etiqueta cuando se selecciona el servicio FedEx® Regional Economy Freight.

**Normas para la Unión Europea (UE)**

Impuestos al valor agregado (IVA) para las importaciones a la UE

Las siguientes normas se aplican a las importaciones a la UE.

- Todas las mercancías que se importen a la UE están sujetas a IVA, ya sea que se hayan hecho o no excepciones al valor anteriores.
- Para consignaciones con un valor de 150 € o menos, el IVA puede cobrarse al momento de la venta, utilizando la nueva Ventanilla Única de Importación (IOSS) o bien, el declarante de aduanas (p. ej. FedEx) se lo puede cobrar al cliente final.
- Estas normas del IVA no se aplican a los negocios de la UE que realicen ventas entre los estados miembros de la UE.

Ventanilla Única de Importación (IOSS)

La Ventanilla Única de Importación (IOSS) es el portal electrónico de negocios que se utiliza para cumplir con las obligaciones de IVA en el comercio electrónico en ventas a distancia de mercancías importadas. La IOSS permite a los proveedores vender mercancías importadas a compradores en la Unión Europea (UE) para cobrar, declarar y pagar el IVA a las autoridades de impuestos.

*Nota: la información sobre las tarifas de IVA en la UE está disponible en el sitio web de la Comisión Europea y en los sitios web de las administraciones de impuestos nacionales.*

La IOSS cubre la venta de mercancías a distancia, que son:

- Despachadas o transportadas desde fuera de la UE al momento de la venta

- Despachadas o transportadas en consignaciones con un valor que no exceda un total de 150 € (mercancías de bajo valor), incluso si el pedido contiene más de un artículo

- Despachadas o transportadas en consignaciones con un valor que no exceda un total de 150 € (mercancías de bajo valor), incluso si el pedido contiene más de un artículo

Cómo usar el número de IOSS en un envío

Para usar el IOSS con un envío de importación a la UE

1. Regístrate en el sistema de la Ventanilla Única de Importación (IOSS) en Ventanilla Única de Importación (IOSS) y obtén el número de IOSS.
2. Especifique el número único de IOSS en el campo del elemento de solicitud de envío shipper\tins\number durante la transacción de solicitud de envío.

**Entregas de Ground a Canadá**

FedEx International Ground®

FedEx ofrece entrega terrestre y económica de paquetes en día definido a Canadá, por lo general, en 2 a 7 días hábiles. Los paquetes se entregan al final del día hábil. La clasificación FedEx Ground Multiweight puede ayudarte a ahorrar dinero en envíos de piezas múltiples que pesan 68 kg o más. La liberación aduanal se incluye mediante nuestro servicio de agente aduanal incluido (se aplica una tarifa). [Servicio ENUM : FEDEX_GROUND]

## Opciones de embalaje y envíos internacionales

Además del embalaje estándar de FedEx Express, también puede elegir una FedEx 10kg Box o una FedEx 25kg Box. El límite de peso es de 9,97 kg para una FedEx 10kg Box y 24,94 kg para una FedEx 25kg Box. Estas opciones de embalaje se permiten para FedEx International Priority® a más de 220 países y territorios.

- Envíos de documentos
- Envíos de mercancías

**Envíos de documentos**

Los contenidos del envío que no están sujetos a impuestos se conocen como envíos de documentos. Sin embargo, algunos países gravan un valor de aduana de 1 $ por el envío de documentos.

Para obtener más información, consulte [Países con valor de aduana mínimo](https://developer.fedex.com/api/es-us/guides/api-reference.html#minimumcustomsvaluecountriesorterritories)

*Nota: en el caso de envíos de piezas múltiples (MPS) por FedEx Express International, si uno de los paquetes es un documento, todos los paquetes del envío deben ser documentos. Esta regla también aplica a los envíos de mercancías. Los paquetes de mercancías y documentos no pueden enviarse juntos en el mismo envío de MPS.*

**Envío de mercancías**

Los contenidos del envío que están sujetos a impuestos se conocen como envíos de mercancías. Cuando se envía mercancía, se debe incluir la lista completa de todas las mercancías en el envío en la solicitud de envío de cada paquete para que se calculen correctamente los valores de la mercancía.

*Nota: en el caso de envíos de piezas múltiples por FedEx Express International, si un paquete es un envío de mercancías, todos los paquetes del envío deben contener mercancías. Los envíos de mercancías y documentos no se pueden combinar en un envío de piezas múltiples.*

Libre circulación de mercancías

La libre circulación de mercancías se refiere al movimiento sin restricciones de mercancías y productos dentro de un área o región específica, sin aranceles, cuotas u otras restricciones comerciales. Esto significa que las mercancías pueden transportarse, comprarse y venderse libremente dentro de esa región, sin ningún impedimento.

Libre circulación dentro de las regiones de la UE: las mercancías que entran en el territorio aduanero de la UE procedentes de un país no perteneciente a la UE se denominan «mercancías no comerciales». Antes de que estas mercancías puedan comercializarse en la UE, deben ponerse en libre circulación. Para ello, hay que registrar la mercancía en la aduana y pagar los aranceles o el IVA. Una vez cumplidas estas condiciones, los bienes que no son mercancías se convertirán en mercancías. Tendrán el mismo estatus que las mercancías producidas, cosechadas o extraídas en la UE y podrán transportarse libremente por toda la UE.

Envío simplificado de mercancía

El envío simplificado de mercancía te permite enviar mercancías en libre circulación en los países europeos con solo proporcionar la descripción de la mercancía en lugar de los datos completos en la solicitud de envío. *Nota: A fin de comprobar si tu par de origen y destino cumple los requisitos para el envío simplificado de mercancías, utiliza el extremo «Recuperar detalles normativos» en la Global Trade API.*

Descripción de mercancía

Un motivo común de retraso en las aduanas es una descripción del envío imprecisa o confusa. La descripción de mercancías debe responder las siguientes preguntas:

- ¿Qué es?
- ¿Cuántas unidades hay?
- ¿De qué están hechas?
- ¿Cuál es el uso previsto?
- ¿Cuál es el país o territorio de fabricación?

Según la mercancía y los servicios deseados, es posible que se requiera más información. Las descripciones de mercancías para mercancías peligrosas o materiales peligrosos tienen regulaciones y prohibiciones muy rigurosas. Si enviará una mercancía que entra en alguna de estas clasificaciones, asegúrese de investigar a fondo las restricciones de envío para su clasificación de mercancías.

*Nota: Las mercancías que se encuentran en libre circulación dentro de los países europeos, solo requieren la descripción de la mercancía en la solicitud de envío. No se requiere la información detallada completa de la mercancía, como el país del fabricante, el peso, el valor de aduana o los documentos de aduana, etc. Si se especifican otros detalles de la mercancía en la solicitud, los detalles se cargarán, pero no se tendrán en cuenta durante la creación del envío. Sin embargo, si el cliente especifica que la mercancía es «NOT_IN_FREE_CIRCULATION», se exigirán los datos completos de la mercancía y se realizará una validación completa de estos.*

Cómo identificar mercancías restringidas

Debe identificarse si la mercancía importada/exportada es mercancía restringida en el destino del envío o desde/hacia el destino al que se enviará dicha mercancía. Si envía una mercancía restringida, entonces el envío se detiene de inmediato y la mercancía se coloca en una jaula. Los siguientes elementos se usan para identificar y ayudarle con esta información:

- Prohibiciones de mercancía: este elemento brinda información sobre si la mercancía está prohibida o no. El código armonizado de la mercancía se compara con su valor asociado para determinar si la mercancía está prohibida o permitida. Los elementos de respuesta: *CódigoHarmonizadoderivado*, *Índicedemercancías*, *fuente*, *categorías* y *tipo* indican el tipo de mercancía y prohibición.
- Datos de referencia regulatoria: este elemento brinda información sobre si se requieren datos de referencia adicionales para el envío. Se muestran los elementos de respuesta asociados de *exenciones*, *mensaje, código*, *texto*.
- Recomendaciones regulatorias: este elemento brinda cualquier información adicional o aclaraciones sobre la mercancía. Las recomendaciones de elementos de respuesta enumeran todas las recomendaciones especificadas. También muestran el *código*, *texto*, *parámetro* y *Textolocalizado* como resultado.

Clasificación de mercancías

Toda mercancía importada o exportada debe clasificarse correctamente conforme a los códigos del Sistema de Tarifa Armonizado (HTS) para cumplir los requisitos aduanales de los EE. UU. y gobiernos extranjeros. Utilice el HTS para determinar el código de su mercancía. El HTS asigna códigos de seis dígitos para las categorías generales. Los países que usan el HTS pueden definir las mercancías en un nivel más detallado que seis dígitos, pero todas las definiciones deben corresponder al HTS de seis dígitos. EE. UU. define las mercancías utilizando códigos del HTS de 10 dígitos. Para ver los enlaces de agencias de los EE. UU. que administran códigos del HTS de exportación e importación, visite el Centro Internacional de Recursos de FedEx en fedex.com.

Licencia de exportación de mercancía

Una licencia de exportación es una concesión específica de autoridad del gobierno a un exportador particular para exportar un producto específico. Las licencias de exportación se otorgan según cada caso para una sola transacción o por un periodo específico. El exportador debe solicitar la licencia de exportación. Este número es un carácter alfabético más seis caracteres numéricos. Cada licencia se emite con una fecha de vigencia. Las mercancías que requieren una licencia del Departamento de Estado se envían solo por FedEx Express utilizando el servicio de Control de exportaciones «FedEx International Controlled Export» (FICE).

Cuando la descripción del contenido de su envío internacional es precisa y está bien redactada, los riesgos de retrasos aduanales se reducen. Estas son algunas pautas para brindar descripciones detalladas de su mercancía.

Documento o mercancía

- Empiece por determinar si lo que envía es un documento o mercancía. Diferentes países clasifican los documentos de forma distinta, por lo que debe entender cómo es que el país específico al que hará el envío los define.
- Por lo general, un documento es una mercancía sin valor comercial. Por lo general, se caracteriza por ser material escrito a máquina, a mano o impreso en papel u otro material y no requiere un recibo comercial. Si la mercancía tiene valor comercial o es parte de una transacción comercial, se considera que «no es un documento». Todos los envíos de mercancía requieren un recibo comercial.
- Para investigar la clasificación de su mercancía, use FedEx Global Trade Manager en línea en [fedex.com/gtm](http://www.fedex.com/gtm). Encontrará información específica del país para determinar si su mercancía se considerada o no un documento en el lugar de destino.

## Cumplimiento regulatorio

Los remitentes pueden incluir datos regulatorios por mercancía junto con las declaraciones aduanales utilizando la matriz `regulatoryDetails[]`.

Esta función admite datos de los siguientes organismos regulatorios:

- **Comisión de Seguridad de Productos del Consumidor de EE. UU. (CPSC):** datos del Certificado de Cumplimiento (CoC) enviados en forma de descargo de responsabilidad, referencia al Registro de Productos de la CPSC o certificado completo.
- **Comisión de la Unión Europea: eliminación del umbral de minimis.** Identificadores de productos exigidos en virtud de la eliminación por parte de la UE del umbral de minimis de €150, con vigencia a partir de julio de 2026, que deberán acompañar a los envíos de negocio a consumidor de bajo valor (menos de €150) que ingresen a la UE.

Si lo desea, puede utilizar la [API regulatoria](https://developer.fedex.com/api/es-us/catalog/regulatory/docs.html) para almacenar los datos regulatorios de cada producto una sola vez y, posteriormente, hacer referencia a esos datos desde Ship API. Si no almacena perfiles, puede enviar determinados datos integrados directamente en cada solicitud a Ship API.

Cada mercancía que requiera datos regulatorios debe incluir el siguiente elemento: `requestedShipment.customsClearanceDetail.commodities[].regulatoryDetails[]`.

Cada mercancía puede incluir cero, una o varias entradas de `regulatoryDetails[]`, pero el patrón habitual consiste en incluir una entrada por cada organismo regulatorio aplicable a cada mercancía. Si hay múltiples entradas con el mismo `regulationCode` en una misma mercancía, estas no se rechazarán, pero solo se tendrá en cuenta la última entrada. Si `regulatoryDetails[]` está completo, pero no contiene datos integrados directamente y no existe un perfil que coincida almacenado en la API regulatoria, su envío podría retrasarse hasta que se proporcionen los datos.

Los campos obligatorios incluyen lo siguiente:

- `regulationCode`*: la agencia regulatoria a la que se refieren los datos, por ejemplo, `CPSC` o `EU_DE_MINIMIS`. Este valor define el formato del elemento para la información regulatoria detallada.
- `productId`*: el identificador del producto del comerciante o cliente.
- `productIdType`*: el tipo de identificador del producto, por ejemplo, `SKU`, `PART_NUMBER`, `GTIN`, `UPC`, `EAN`, `MPN` y `OTHER`. Si está haciendo referencia a los datos regulatorios almacenados en la API regulatoria, este identificador forma parte de una clave de unión que combina los datos una vez creado el envío.
- `details[]`: la estructura de los elementos de esta matriz varía según el organismo regulatorio que haya seleccionado para el envío.

**Si está haciendo referencia a los datos regulatorios almacenados en la API regulatoria, este identificador forma parte de una clave de unión que combina los datos una vez creado el envío.*

Si no se proporciona `details` y solo se envían `regulationCode`, `productId` y `productIdType`, los envíos utilizarán los datos regulatorios de la mercancía ya almacenados en la API regulatoria. Para obtener más información, consulte Uso de la API regulatoria.

### Datos regulatorios de la CPSC

Para incluir los datos del CoC que la CBP y la CPSC exigen junto con la entrada ACE a través del conjunto de mensajes PGA, incluya los datos regulatorios de la mercancía y establezca `regulationCode = CPSC`.

El sistema de presentación electrónica de la CPSC admite los siguientes métodos:

- **Descargo de responsabilidad**: el Sistema Armonizado de Tarifas del Código de Estados Unidos (HTSUS) está señalado por la CPSC, pero este producto no requiere un certificado.
- **Referencia**: los datos completos del CoC ya se encuentran en el Registro de Productos de la CPSC; solo se transmiten los identificadores en el momento de la entrada. Esta API utiliza los identificadores del registro de la CPSC para las presentaciones de referencias, pero no crea, lee ni actualiza los registros de la CPSC.
- **Completo**: todos los datos del CoC se transmiten en el momento de la entrada, ya sea como un Certificado de Producto Infantil o un Certificado General de Conformidad.

Ship API admite conjuntos de mensajes de descargo de responsabilidad y referencia integrados directamente. Además de los campos obligatorios `regulationCode`, `productId` y `productIdType`, puede completar estos conjuntos de mensajes en el elemento `details[]` al crear el envío:

- `disclaimMessageSet`: los datos necesarios para el descargo de responsabilidad.

  - `disclaimCode`: A = el producto no está regulado por la CPSC; B = los datos no son obligatorios según las pautas de la agencia.
  - `intendedUseCode`: código base + subcódigo. Por ejemplo: `130.003`. Para obtener más información, consulte Códigos de uso previsto.
  - `intendedUseDescription`: texto libre. Obligatorio únicamente cuando `intendedUseCode` = «980.000» (para otros usos).

- `referenceMessageSet`: los datos necesarios para la referencia.

  - `productVersion`: el ID de la versión del certificado de producto actualmente asociado al certificado en el Registro de Productos de la CPSC.
  - `certificateId`: el ID de certificador que le asignó el Registro de Productos de la CPSC.
  - `registryProductId`: el ID que se utilizó cuando se registró el producto en el Registro de Productos de la CPSC. Este campo es opcional. Puedes usar el campo `regulatoryDetails.productId` de nivel superior para proporcionar este valor, pero si usas la Regulatory API para almacenar el perfil con un identificador de producto de nivel superior que difiere del ID que se utilizó para registrar el producto, puedes proporcionar el ID de registro aquí. Si omites este valor, el campo `regulatoryDetails.productId` se utiliza para hacer referencia al Registro de Productos de la CPSC.

*No se pueden incluir datos completos del conjunto de mensajes del CoC mediante Ship API*. Debe hacer referencia a los perfiles almacenados en la API regulatoria cuando utilice el método completo de presentación electrónica. Para hacer referencia los perfiles almacenados, solo debe proporcionar `regulationCode`, `productId` y `productIdType`. Los datos del perfil se combinan una vez creado el envío. Para obtener más información, consulte [API regulatoria](https://developer.fedex.com/api/es-us/catalog/regulatory/docs.html).

#### Códigos de uso previsto

`intendedUseCode` es un código de seis dígitos (###.###) que le indica a la CBP y a las agencias pertinentes cuál es el uso previsto del producto importado. Las definiciones de los códigos que brinda la CBP se pueden consultar en el Apéndice R del ACE CATAIR. La CPSC solo considera válido un subconjunto específico de esos códigos para sus presentaciones electrónicas, en función del conjunto de mensajes. Este campo siempre es obligatorio cuando se completa `disclaimMessageSet`.

La CPSC reconoce ocho códigos base: 081, 090, 100, 130, 155, 940, 970 y 980.

El código base 130 es el más utilizado por la CPSC, ya que el ámbito de actuación de la agencia son los productos de consumo. Los códigos del 130.000 al 130.006 son los únicos que pueden utilizarse en una presentación completa. Para la exención A se puede utilizar cualquier subcódigo 130, excepto del 130.001 al 130.005 (por ejemplo, 130.000 o 130.006). Para la exención B solo se puede utilizar el subcódigo 130.006.

### Información regulatoria sobre la eliminación del régimen de minimis de la UE

Ship API es compatible con las obligaciones en materia de datos introducidas por la eliminación, por parte de la UE, del umbral de minimis de €150. Si el envío tiene como destino un Estado miembro de la UE-27 con un valor de aduana inferior a €150, incluya la información regulatoria sobre la mercancía y establezca `regulationCode = EU_DE_MINIMIS`.

El campo `productId` es su identificador alfanumérico del producto. La UE considera este valor como el SKU del comerciante para el envío.

Además de los campos obligatorios `regulationCode`, `productId` y `productIdType`, utilice `details[]` para proporcionar lo siguiente:

- `merchantProductId`: el identificador del producto del comerciante. Este campo es distinto de `productId` si utiliza identificadores separados a nivel de comerciante y de SKU; de lo contrario, establezca `merchantProductId` igual a `productId`.
- `nonStandardManufacturerProductId`: el SKU o identificador interno del fabricante, por ejemplo, SH123456-L.
- `standardManufacturerProductId`: un identificador estándar, como GTIN, UPC o EAN. Por ejemplo: 01233456789012. Utilice la cadena literal `«NA»` cuando el producto no tenga ningún identificador estándar.

Los envíos sujetos a este organismo regulatorio que no incluyan identificadores de producto no deberían llegar al territorio de la UE, pero Ship API no bloquea la creación del envío.

Por defecto, FedEx factura al destinatario los impuestos y aranceles, por lo que siempre debes incluir la dirección de correo electrónico del destinatario al crear un envío y especificar un valor en `recipients.contact.emailAddress`. Sin ese dato, no podremos contactarlo para cobrar el pago, y los cargos recaerán en el remitente. Los pagos no realizados pueden causar retrasos, problemas de manejo o devoluciones.

Los remitentes pueden utilizar la matriz existente `shipper.tins[]` para proporcionar su número de Ventanilla Única de Importación (IOSS) si es necesario.

### Uso de la API regulatoria

Puede utilizar la [API regulatoria](https://developer.fedex.com/api/es-us/catalog/regulatory/docs.html) para almacenar los datos regulatorios de cada producto una sola vez y, posteriormente, hacer referencia a esos datos desde Ship API. Los datos de los perfiles regulatorios se incorporan al envío en las etapas posteriores a su creación.

Entre los flujos de trabajo habituales que utilizan Ship API o la API regulatoria se incluyen los siguientes:

- **Un enfoque en el que se prioriza el perfil.** Registre cada producto una sola vez mediante la API regulatoria y, posteriormente, proporcione únicamente `productId` + `productIdType` + `regulationCode` en `regulatoryDetails[]` para las mercancías de su envío. Los datos se incorporan al envío a partir del perfil registrado.
- **Un enfoque de integración directa exclusivamente.** Cada mercancía de su envío incluye `productId` + `productIdType` + `regulationCode` + el campo `details[]` completo en su totalidad. No es posible integrar directamente los datos completos de la CPSC; este patrón está limitado a los conjuntos de mensajes de exención y referencia de la CPSC, así como al regulador EU_DE_MINIMIS.
- **Un enfoque híbrido.** Puede sobrescribir los datos existentes de la API regulatoria en envíos concretos. Incluya `productId,` `productIdType,` `regulationCode` y los elementos correspondientes de `details[]`. Los datos de details integrados directamente sobrescriben cualquier dato almacenado por la API de perfiles regulatorios. Cualquier dato de details que no figure en los datos integrados directamente del envío, pero que sí esté presente en el perfil, se combinará una vez creado el envío.

Consejo: el elemento `regulatoryDetails[]` reproduce una entrada de la API regulatoria. Si almacenó datos regulatorios para una mercancía, puede copiar los datos de la API regulatoria y modificarlos para un envío puntual al realizar el envío.

**Liberación aduanal**

Cada país tiene leyes y regulaciones específicas para los envíos internacionales. Hay muchos recursos disponibles para ayudarle a determinar los requisitos de documentos y liberación aduanal. FedEx proporciona un recibo comercial y se requiere para todos los envíos internacionales.

Los envíos que requieran documentación, además de la guía aérea internacional de FedEx y la guía aérea de FIMS (por ejemplo, un recibo comercial) pueden requerir un mayor tiempo en tránsito.

Guías aéreas

Las guías aéreas son documentos de envío, etiquetas, entradas electrónicas o artículos similares que se usan en el sistema de FedEx para los servicios descritos en estos términos y condiciones. Se deben usar documentos originales (no se aceptan fotocopias).

Mercancías controladas

Al enviar las siguientes mercancías internacionalmente, asegúrese de que se acepten por el servicio de FedEx® que eligió para la entrega al país y ciudad de destino:

- Mercancías peligrosas en cantidades exentas*Nota: para enviar mercancías peligrosas en cantidades exentas, use la opción de servicio especial SMALL_QUANTITY_EXCEPTION.*
- Paquete radiactivo exento

Control de exportaciones internacional de FedEx (FICE)

El FICE ofrece un proceso de liberación aduanal preciso y que cumple las regulaciones para los clientes de EE. UU. y Puerto Rico que envían exportaciones controladas. El FICE reduce los tiempos de procesamiento, retrasos por liberación aduanal y tarifas de manejo de excepción.

Envío simplificado de mercancía en la UE

El cliente debe identificar si la mercancía está en libre circulación o no. Si una mercancía se identifica como «No en libre circulación», es necesario especificar la información completa sobre la mercancía en la solicitud a la API. Todos los envíos desde Irlanda del Norte (GB) a la UE y desde la UE a Irlanda del Norte (GB) NO son intracomunitarios y no se aplicarán las normas de relajación de mercancía para los envíos intracomunitarios. Sin embargo, todos los envíos desde la República de Irlanda (IE) a la UE y desde la UE a la República de Irlanda (IE) son intracomunitarios y se aplicarán las normas de relajación de mercancía para los envíos intracomunitarios.

Reglamentos de Tráfico Internacional en Armas (ITAR)

ITAR son un conjunto de regulaciones del gobierno de los EE. UU. que controlan el movimiento mundial de artículos relacionados con la defensa en la Lista de municiones de los EE. UU. (USML). FedEx permite el envío de artículos de conformidad con los ITAR mediante los servicios de FedEx International Priority (IP), FedEx International Premium (IP1) y FedEx International Airport-to-Airport (ATA).

**Normas específicas de liberación aduanal y envíos de algunos países**

Los siguientes son algunos de los países específicos con requisitos de liberación aduanal. Los requisitos pueden variar según el país. Para obtener más información, visita fedex.com o comunícate con tu ejecutivo de cuenta FedEx.

Normas de liberación aduanal y envíos del Reino Unido, Irlanda y Europa:

A continuación encontrarás las normas de envíos asociadas con el Reino Unido, Irlanda y Europa.

| **Origen y destino del envío** | **Normas de liberación aduanal y envíos** |
|---|---|
| De Irlanda del Norte (GB) al Reino Unido continental (GB) | No se requiere liberación aduanal (envíos nacionales). |
| Del Reino Unido continental (GB) a Irlanda del Norte (GB) | Se requiere liberación aduanal (documento de declaración aduanal). |
| De la UE a la UE | Libre circulación de mercancías. Envío simplificado de mercancía disponible. |
| De la República de Irlanda (IE) a la UE | Libre circulación de mercancías. Envío simplificado de mercancía disponible. |
| De la UE a la República de Irlanda (IE) | Libre circulación de mercancías. Envío simplificado de mercancía disponible. |
| De Irlanda del Norte (GB) a la República de Irlanda (IE) | Se requiere liberación aduanal (documento de declaración aduanal). |
| De Irlanda del Norte (GB) a la UE | Se requiere liberación aduanal (documento de declaración aduanal). |
| De la UE a Irlanda del Norte (GB) | Se requiere liberación aduanal (documento de declaración aduanal). |
| De Irlanda del Norte (GB) al resto del mundo o del resto del mundo a Irlanda del Norte (GB) | Se requiere liberación aduanal. |
| Del Reino Unido a la UE o de la UE al Reino Unido | Se requiere liberación aduanal. |
| Los servicios de envío se pueden utilizar para enviar a Irlanda del Norte desde otros países. | FedEx International Priority® (IP): entrega en un plazo de 1, 2 o 3 días hábiles. FedEx International Economy® (IE): entrega en un plazo de 2 a 5 días hábiles. FedEx Regional Economy®. FedEx International Connect Plus®. |
| Del Reino Unido continental (GB) a las Islas del Canal del Reino Unido (GB). | La descripción y el valor deben proporcionarse en la solicitud. Para este envío se generan una copia de la guía aérea y dos copias de la factura comercial o factura proforma. |
| De las Islas del Canal del Reino Unido (GB) al Reino Unido continental (GB) | La descripción y el valor deben proporcionarse en la solicitud. Para este envío se generan una copia de la guía aérea y dos copias de la factura comercial o factura proforma. |

Normas de International Priority Distribution (IPD) en el Reino Unido

- Las normas se aplican a clientes que hacen envíos del Reino Unido a la Unión Europea.
- Irlanda del Norte mantiene fronteras abiertas con la República de Irlanda, que forma parte de la Unión Europea (UE). En consecuencia, los envíos de IPD a la UE (SPOC) pueden incluir paquetes a Irlanda del Norte.

Liberación aduanal de Australia

- Requisito de liberación aduanal general
- Requisito de entrada formal
- Artículos prohibidos
- Consejos para la liberación aduanal
- Transferencias con depósito en aduana
- Impuestos de importación e impuesto sobre mercancías y servicios (GST)

Liberación aduanal de China

- Categorías de declaración
- Artículos prohibidos
- Documentos requeridos
- Consejos para la liberación aduanal
- Impuestos y aranceles de importación
- Zonas de libre comercio y zonas de proceso de exportación
- Transferencias con depósito en aduana

Liberación aduanal de exportaciones de China

- Documentos requeridos
- Consejos para una liberación aduanal sin problemas

Liberación aduanal de Hong Kong

- Categorías de declaración
- Artículos prohibidos
- Documentos requeridos
- Consejos para la liberación aduanal
- Transferencias con depósito en aduana
- Impuestos y aranceles de importación

Liberación aduanal de exportaciones de la India

- Documentos de liberación aduanal general
- Liberación aduanal del mensajero
- Liberación aduanal formal

Liberación aduanal de Indonesia

- Categorías de declaración
- Artículos prohibidos
- Consejos para la liberación aduanal

Liberación aduanal de Japón

- Categorías de declaración
- Requisitos de liberación aduanal
- Artículos prohibidos
- Documentos requeridos
- Consejos para la liberación aduanal
- Transferencias con depósito en aduana
- Zonas de libre comercio
- Impuestos y aranceles de importación

Liberación aduanal de Malasia

- Categorías de declaración
- Cargo de declaración de zona de libre comercio (FCZ)
- Artículos prohibidos
- Documento requerido
- Impuestos y aranceles de importación

Liberación aduanal de Nueva Zelanda

- Categorías de declaración
- Requisitos específicos de mercancía
- Artículos prohibidos
- Requisito de importador
- Transferencias con depósito en aduana
- Impuestos y aranceles de importación

Liberación aduanal de Filipinas

- Categorías de declaración
- Artículos prohibidos
- Documento requerido
- Carga auxiliar
- Impuestos y aranceles de importación

Liberación aduanal de Singapur

- Tipos de declaración
- Artículos prohibidos
- Documento requerido
- Impuestos y aranceles de importación
- Opciones de pago de impuestos y aranceles
- Zonas de libre comercio (FTZ)
- Agencias reguladoras y recursos para importador

Liberación aduanal de Corea del Sur

- Categorías de declaración y documentos requeridos
- Artículos prohibidos
- Transferencias con depósito en aduana
- Impuestos y aranceles de importación

Liberación aduanal de Taiwán

- Categorías de declaración
- Artículos prohibidos
- Documentos requeridos
- Impuestos y aranceles de importación
- Información de zona económica y libre comercio (FTZ)
- Especificaciones del almacén

Liberación aduanal de Tailandia

- Categorías de declaración
- Artículos prohibidos
- Mercancía de la Administración de Medicamentos y Alimentos
- Documentos requeridos
- Impuestos y aranceles de importación
- Cargas auxiliares y otras tarifas
- Zonas de libre comercio (FTZ)

Liberación aduanal de Vietnam

- Categorías de declaración
- Artículos prohibidos
- Documentos requeridos
- Requisitos específicos de mercancía
- Tarifas de almacén y aduanas
- Impuestos y aranceles de importación

**Documentos de envío y aduana**

La documentación precisa es una parte importante de los envíos nacionales e internacionales para evitar el enjaulado de los paquetes o retrasos, así como garantizar una entrega de los paquetes sin problemas. A continuación, encontrará los diferentes tipos de documentos de envío y aduanas.

Certificado de origen (COO)

El certificado de origen (COO) es un documento internacional que verifica el país o territorio en el que se fabricó un producto. Algunos países restringen las importaciones de ciertos países, muchos países limitan la cantidad de mercancía que se permite importar y algunos países le dan preferencia a la mercancía fabricada en ciertos países. [Servicio ENUM: CERTIFICATE_OF_ORIGIN]

Recibo comercial (CI)

Es un documento que proporciona el vendedor o exportador y que describe las partes involucradas en la transacción de envío y las mercancías que se transportan. Es el documento principal utilizado por la aduana. Si es posible, lo debes completar utilizando el idioma oficial del país o territorio al que se exportan las mercancías. La factura comercial debe incluir un desglose detallado de todos los artículos incluidos en el envío, así como una descripción adecuada de las mercancías (¿qué son?, ¿de qué están hechas?, ¿para qué se usan?), la cantidad, el país o territorio de fabricación, el precio o el costo, la moneda utilizada, el número del sistema armonizado para cada mercancía y los términos de entrega. Algunos países exigen que se entregue una factura original con el membrete del remitente. La factura siempre debe estar firmada y fechada por el exportador, lo que valida que los detalles que se proporcionan son representaciones verdaderas y correctas del contenido de la factura comercial. [Servicio ENUM: COMMERCIAL_INVOICE] Para obtener más información, visita nuestro [Global Trade Manager](https://www.fedex.com/GTM).

Documento del paquete del cliente

Este documento te permite agregar cualquier detalle adicional sobre el contenido del paquete. [Servicio ENUM: CUSTOM_PACKAGE_DOCUMENT]

Documento de envío del cliente

Puedes agregar detalles adicionales sobre el envío en este documento. [Servicio ENUM: CUSTOM_SHIPMENT_DOCUMENT]

Etiquetas especificadas del cliente

Este documento te permite agregar etiquetas personalizadas al paquete. [Servicio ENUM: CUSTOMER_SPECIFIED_LABELS]

Declaración del remitente sobre mercancías peligrosas

Esta es la declaración del remitente sobre mercancías peligrosas que contiene la naturaleza y la cantidad de la mercancía, así como la declaración firmada. [Servicio ENUM: DANGEROUS_GOODS_SHIPPERS_DECLARATION]

Declaración de exportación

La información de exportación electrónica (EEI) antes conocida como declaración de exportación del remitente (SED) es requerida por el Departamento del Censo de los EE. UU. para obtener datos estadísticos y por la Oficina de Industria y Seguridad (BIS) para ayudar a hacer cumplir los controles de exportación. La SED/EEI se requiere cuando el valor total de las mercancías clasificadas bajo cualquier número del Anexo B excede los 2 500 $ (USD) o las mercancías requieren una licencia de exportación. El exportador o su agente puede completar electrónicamente esta información. Se requiere que la información se envíe electrónicamente a través del Sistema de Automatizado de Exportación (AES) para las mercancías enumeradas en la Lista de control de comercio (CCL) o la Lista de Municiones de los Estados Unidos (USML). [Servicio ENUM: EXPORT_DECLARATION]

Mandato general

Un acuerdo de representación o poder notarial (POA) es la autorización legal que proporcionan los importadores a un agente aduanal para permitirle liberar o responder por los envíos ante la Agencia Canadiense de Ingresos (CRA) en nombre de la compañía del importador. Si un importador canadiense residente desea que FedEx Express actúe como su agente aduanal en Canadá de manera continua, debe llenar y devolver estos formularios, según la hoja de instrucciones, antes de enviarlos a Canadá. Este formulario es un acuerdo de representación limitado y se aplicaría únicamente a los envíos de FedEx Express. Este formulario está en un formato a completar para facilitar su uso en la sección de la biblioteca de documentos de este sitio web. [Servicio ENUM: EXPORT_DECLARATION]

ETIQUETA

Esta es la etiqueta de envío generada en el Envío con el servicio especial de Documentos comerciales en formato electrónico (ETD) con criterio de carga de documentos posterior al envío. Esta etiqueta también puede cargarse con el envío junto con otros documentos. [Servicio ENUM: LABEL]

Hoja de tarifas netas

Es una hoja de tarifas de una cuenta específica que muestra los cargos de transporte menos los descuentos aplicables. Se puede descargar en el sitio de FedEx para varios servicios disponibles y se genera una tabla de tarifas entre zonas y pesos aplicables. Los reportes descargables son almacenados para una mayor comodidad y puede acceder a los mismos cuando lo necesite. Estas tarifas estimadas se proporcionan como cortesía y no son legalmente vinculantes, tampoco cumplen la función de un contrato o parte de un contrato. Las tarifas netas se calculan sobre la base de los descuentos en transporte correspondientes y no incluyen los siguientes cargos: recargos, cargos auxiliares o de otro tipo, impuestos y aranceles, o tarifas por manejo especial. [Servicio ENUM: NET_RATE_SHEET]

OP900

Este es el formulario de declaración de Materiales peligrosos de FedEx Ground. [Servicio ENUM: OP_900]

Notificación de correo electrónico de envío pendiente

Documento para recibir notificaciones por correo electrónico para envíos pendientes. [Servicio ENUM: PENDING_SHIPMENT_EMAIL_NOTIFICATION]

Factura Proforma

La factura proforma se emite antes de que se realice la venta. Una vez que recibe la factura proforma del proveedor, el comprador envía una orden de compra o abre una carta de crédito al proveedor. Según la fecha de envío acordada, el vendedor se encarga de enviar la mercancía. [Servicio ENUM: PRO_FORMA_INVOICE]

Instrucciones de devolución

Esta es la etiqueta de devolución. [Servicio ENUM: RETURN_INSTRUCTIONS]

Conocimiento de embarque de VICS

El formulario de conocimiento de embarque de estándares de comercio interindustrial voluntario (VICS) se usa principalmente para envíos de industria minorista de mercancía general. [Servicio ENUM: VICS_BILL_OF_LADING]

Factura comercial y validación de origen del T-MEC

La factura comercial y la validación de origen del T-MEC/USMCA/CUSMA es una factura comercial combinada con los elementos de información de la validación de origen requeridos, incluida la declaración que proporcionará una manera tanto de hacer el envío como de reclamar un trato arancelario preferencial para las mercancías que califiquen al usar un documento según el Tratado entre México, Estados Unidos y Canadá. Las mercancías que califican para el trato arancelario preferencial deben provenir de, y exportarse desde EE. UU., México o Canadá. [Servicio ENUM: USMCA_COMMERCIAL_INVOICE_VALIDATION_OF_ORIGIN]

Validación de origen del T-MEC

La validación de origen del T-MEC/USMCA/CUSMA es un formulario que se usa para obtener un trato arancelario preferencial mediante el Tratado entre México, Estados Unidos y Canadá. La validación contiene un conjunto de elementos de información, incluida una declaración, y el exportador, productor o importador de las mercancías calificadas debe validar el documento. Las mercancías importadas deben ser originarias y exportarse desde EE. UU., México o Canadá. Este formulario puede usarse para cubrir un solo envío o por un periodo «global» de hasta doce meses. [Servicio ENUM: USMCA_VALIDATION_OF_ORIGIN]

Otro

La siguiente sección describe algunos de los documentos comunes que se clasifican dentro de otros documentos. No es obligatorio cargar estos documentos para un envío, pero es posible que se requieran para la liberación aduanal de su envío individual. Esto puede variar según el tipo de envío, origen, destino y otros factores. [Servicio ENUM: OTHER]

- **Lista de embalaje**

- **Declaración 740 de la FCC** sobre la importación de dispositivos de radiofrecuencia capaces de ocasionar una interferencia nociva

- **Declaración sobre películas y videos**

**Otras soluciones aduanales y regulatorias**

Soluciones aduanales y regulatorias para Canadá

El equipo de Resoluciones brinda a las ventas y a los clientes de Canadá la información reglamentaria y apoyo solo para envíos internacionales de FedEx Express.

Bonos aduanales para importaciones de FedEx Express

FedEx Express designó a las redes comerciales de FedEx (FTN) para actuar como agente aduanal para los envíos de importaciones a los EE. UU., a menos que se especifique lo contrario. Las FTN funcionan como el importador registrado (IOR) para fines aduanales para la gran mayoría de los envíos de importaciones Express; sin embargo, este papel lo puede ejercer el cliente, si así lo prefiere.

Exención de valor declarado (DV) para artículos que no son joyas

FedEx ofrece una autorización permanente (también conocida como una solicitud de exención de alto valor declarado [HDV]) para los clientes que califiquen para enviar artículos que no sean joyas y que excedan el valor del límite de 50 000 $ USD especificado en la Guía de servicios de FedEx.

Asistente de envíos internacionales de FedEx (FISA)

El asistente de envíos internacionales de FedEx (FISA) es un servicio gratuito centrado en pequeñas y medianas empresas, y personas que son nuevas o no tienen experiencia con los envíos internacionales.

Acuerdos comerciales mundiales y legislación comercial

Las empresas de todos los tamaños se benefician del comercio mundial. Los acuerdos de libre comercio (FTA) de los EE. UU. hacen más sencillo el comercio mundial al abrir mercados extranjeros a los exportadores de los EE. UU. y garantizar que los países socios sigan reglas y estándares en común. Los FTA crean un ambiente de comercio estable y transparente, facilitando a las compañías de los EE. UU. que exporten sus productos y servicios mundialmente.

Excepción única de valor declarado (DV)

Los remitentes que necesitan un aumento único de un límite de DV para un envío nacional en los EE. UU. o un envío Express de exportación internacional en los EE. UU. a un máximo de 250 000 $ USD pueden solicitar un aumento de carga de DV, también conocido como solicitud de *exención nacional.*

Carta de instrucción del remitente (SLI)

Una SLI captura la información de envío internacional para clientes de los EE. UU.

*Nota:*

## Envío nacional

Esto permite a los clientes hacer envíos nacionales. No todos los servicios están disponibles en todas las áreas. Los envíos nacionales dentro de varios países europeos y México requieren un número de cuenta específica para cada país.

**Servicio nacional de FedEx**

La siguiente información le brinda una descripción general de los servicios disponibles para los envíos nacionales. No todos los servicios se encuentran disponibles en todas las áreas.

FedEx Economy®

FedEx Economy® ofrece entregas en 3 días hábiles a negocios antes de las 17:00 hrs. y a las residencias antes de las 19:00 hrs. [Servicio ENUM : FEDEX_ECONOMY]

FedEx First Overnight®

FedEx First Overnight® ofrece entregas al siguiente día hábil a las 8:00, 8:30, 9:00 o 9:30 horas en la mayoría de las áreas y a las 10:00, 11:00 o 14:00 horas en las áreas ampliadas. [Servicio ENUM: FIRST_OVERNIGHT]

FedEx Priority Overnight®

FedEx Priority Overnight® ofrece entregas al siguiente día hábil a las 10:30 horas a la mayoría de las direcciones de los EE. UU., al mediodía, 17:00 horas. Las entregas también se realizan los sábados al mediodía, a las 13:30 o a las 17:00 horas.

Los días de servicio son de lunes a viernes, con recolección y entrega disponible en sábados en muchas áreas por un cargo adicional. [Servicio ENUM: PRIORITY_OVERNIGHT]

FedEx Standard Overnight®

FedEx Standard Overnight® ofrece entregas al siguiente día hábil antes de las 15:00 horas en la mayoría de las direcciones; a las 17:00 horas y antes de las 20:00 horas en residencias. Los días de servicio son de lunes a viernes con recolección disponible en sábado por un cargo extra. [Servicio ENUM: STANDARD_OVERNIGHT]

FedEx Ground

Entregas de lunes a viernes (de 8:00 horas al cierre del día hábil), según la distancia al destino.

La entrega de día definido es solo dentro de los Estados Unidos y Canadá. [Servicio ENUM: FEDEX_GROUND]

FedEx Home Delivery®

FedEx Home Delivery para entregas residenciales mediante [FedEx Ground](https://www.fedex.com/en-us/shipping/ground.html) de 1 a 7 días hábiles, según la distancia al destino. [Servicio ENUM: GROUND_HOME_DELIVERY]

FedEx Express Saver®

FedEx Express Saver® ofrece entregas al tercer día hábil antes de las 17:00 horas y en las residencias antes de las 20:00 horas.

Los días de servicio son de lunes a viernes, con recolección y entrega disponible en sábados en muchas áreas por un cargo adicional. [Servicio ENUM: FEDEX_EXPRESS_SAVER]

FedEx SameDay® Ciudad

El servicio de FedEx SameDay® City ofrece entregas entre ciudades en el plazo de unas horas en ciudades y códigos postales seleccionados. Las recolecciones y entregas pueden efectuarse de lunes a viernes. Utilice el elemento SAME_DAY_CITY para identificar este tipo de servicio cuando envíe un paquete. Se requiere un contrato para utilizar el servicio FedEx SameDay City. Consulte a su ejecutivo de cuenta FedEx para obtener más información sobre SameDay City. [Servicio ENUM: SAME_DAY_CITY]

*Nota: las guías aéreas manuales no se encuentran disponibles con el servicio SameDay City. Este servicio sólo está disponible para ciudades seleccionadas de México. Este no es el servicio de FedEx SameDay nacional de los EE. UU.*

FedEx Tarifa Única®

FedEx One Rate® es una tarifa fija para envíos en la que no es obligatorio pesar ni medir los envíos de menos de 22,67 kg y cuando el valor declarado es 100 $, que incluye combustible, recargos residenciales y de área de entrega. Puede elegir la caja o el tubo que se ajuste mejor al tamaño de lo que quiera enviar y llenar el paquete a su capacidad, siempre que el envío no exceda los 22,67 kg. Las opciones de pago de este servicio incluyen Remitente, Destinatario y Terceros seleccionados. Entregas de FedEx Express® en 2 a 3 días hábiles. La entrega en sábados está disponible en algunas áreas. Ruta de recolección o entrega gratis en 62 000 ubicaciones convenientes. [Servicio ENUM: FEDEX_ONE_RATE]

**Servicios nacionales en Europa**

FedEx® First

FedEx® First es un servicio de paquetería y ofrece entregas al siguiente día hábil a las 09:00 horas, 09:30 horas o 10:00 horas a direcciones comerciales o residenciales. [Servicio ENUM : FIRST_FIRST]

FedEx® Priority Express

FedEx® Priority Express es un servicio de paquetería y ofrece entregas al siguiente día hábil al mediodía a direcciones comerciales o residenciales. [Servicio ENUM : FEDEX_PRIORITY_EXPRESS]

FedEx® Priority

FedEx® Priority es un servicio de paquetería y ofrece el servicio de entregas al final del día a direcciones comerciales o residenciales. [Servicio ENUM : FEDEX_PRIORITY]

FedEx® Priority Express Freight

FedEx® Priority Express Freight ofrece entregas al siguiente día hábil al mediodía a direcciones comerciales o residenciales. [Servicio ENUM : FEDEX_PRIORITY_EXPRESS_FREIGHT]

FedEx® Priority Freight

FedEx® Priority Freight es un servicio de entregas al final del día a direcciones comerciales o residenciales. [Servicio ENUM : FEDEX_PRIORITY_FREIGHT]

FedEx® Economy

FedEx® Economy proporciona el servicio de entrega al final del día para paquetes de hasta 68 kg en 2 a 3 días hábiles. [Servicio ENUM: FEDEX_ECONOMY_SELECT]

Para obtener más información sobre las áreas de servicio para envíos nacionales, consulta [Cartera de servicios nacionales en Europa.](https://developer.fedex.com/api/es-us/guides/api-reference.html#europenewdomesticservicesportfolio)

## FedEx Ground® Economy (antes conocido como FedEx SmartPost®)

FedEx Ground® Economy y Devoluciones de FedEx Ground® Economy requieren cada uno un contrato de servicio. Para registrarte en envíos de salida de FedEx Ground® o en devoluciones de FedEx Ground®, comunícate con tu ejecutivo de cuenta FedEx.

FedEx Ground® Economy te ayuda a consolidar y entregar grandes volúmenes de bajo peso, así como paquetes de la empresa al consumidor que no son sensibles al tiempo, usando el Servicio Postal de los Estados Unidos (USPS) para la entrega final a las residencias. Este servicio ofrece entregas de lunes a sábado en todas las direcciones residenciales en EE. UU., incluidos apartados postales, destinos y oficinas postales del ejército (APO) y oficinas postales de la flota (FPO).

FedEx Ground® Economy también ofrece el servicio de Devoluciones de FedEx Ground® Economy, entregas y notificaciones de envíos por correo electrónico para envíos salientes de los EE. UU., etiquetas personalizables y envíos en un día futuro.

Detalles de servicio de FedEx Ground® Economy

El servicio de FedEx Ground® Economy incluye las siguientes funciones:

- FedEx Ground® Economy está disponible solo para envíos que se originan en los 48 estados contiguos de los Estados Unidos. Alaska, Hawái, Puerto Rico y los territorios de los EE. UU. no están incluidos como puntos de origen.
- El servicio de FedEx Ground® Economy permite la entrega en los 50 estados y territorios estadounidenses, incluidos apartados postales, ubicaciones militares (oficinas postales del ejército [APO], oficinas postales de la flota [FPO], oficinas postales diplomáticas [DPO]) y Puerto Rico.
- FedEx Ground® Economy admite solo el embalaje del cliente. Debido a que FedEx Ground® Economy usa USPS para la entrega final a las residencias, los paquetes están sujetos a las restricciones de USPS.
- El envío en día futuro está disponible para los envíos de FedEx Ground® Economy.
- La entrega los sábados es posible mediante USPS. No se aplican recargos por parte de FedEx en este caso.
- Las etiquetas de envío de FedEx Ground® Economy tienen un número de rastreo principal de 12 dígitos de FedEx con una cadena de código de barras de 34 dígitos de FedEx, un número de rastreo de USPS con una cadena de código de barras y un código de barras opcional de referencia del cliente. Los paquetes solo se pueden rastrear utilizando el número de rastreo de FedEx o USPS.
- Los tipos de pago elegibles son Facturar al remitente y Facturar al destinatario.
- Devoluciones de FedEx Ground® Economy proporciona un servicio de devoluciones dentro de los EE. UU. para todos los remitentes con más de 100 devoluciones al día. Una vez que se contrata, el remitente puede usar cualquier servicio para sus envíos salientes y seguir usando Devoluciones de FedEx Ground® Economy. Las opciones de etiquetas de devolución impresas y por correo electrónico están disponibles.
- FedEx Ground® Economy no hace recolección de paquetes que se originen fuera de los estados contiguos de los EE. UU.

*Nota: se proporciona un número de cuenta por separado para los envíos salientes de FedEx Ground® Economy y Devoluciones de FedEx Ground® Economy. Si un cliente contrata servicios de devolución, debe asociar la transferencia de la cuenta a un número nacional.*

*Para el correo estándar, material impreso encuadernado y medios con las siguientes dimensiones, se aplican las siguientes restricciones:*

- *Dimensiones: no más de 2,13 m de longitud y circunferencia combinadas (largo + [2 veces] ancho + [2 veces] alto).*
- *Ninguna dimensión debe superar los 1,52 m.*
- *Las dimensiones mínimas son 15,24 cm de largo x 10,16 cm de ancho x 2,54 cm de altura.*

*Para Parcel Select se aplican las siguientes restricciones:*

- *Dimensiones: no más de 3,3 m de longitud y circunferencia combinadas.*
- *Ninguna dimensión puede superar los 1,52 m.*
- *Las dimensiones mínimas son 15,24 cm de largo X 10,16 cm de ancho X 2,54 cm de altura.*
- *Si se ingresa un peso menor de 453,59 g para materiales impresos encuadernados o medios, automáticamente se redondea a 453,59 g.*

Detalles de las etiquetas de FedEx Ground® Economy

- Las etiquetas de envío de FedEx Ground® Economy (FGE) tienen un número de rastreo principal de 12 dígitos de FedEx con una cadena de código de barras de 34 dígitos de FedEx, un número de rastreo de USPS con una cadena de código de barras y un código de barras opcional de referencia del cliente. A continuación encontrarás los beneficios de esta actualización:

  - El número de rastreo de FedEx te permite buscar los detalles de rastreo, en consecuencia, va dirigido a tus consultas de rastreo de paquetes.
  - Esto mejora la facilidad para identificar un envío de FedEx.

- Cuando ingreses referencias del cliente para un envío de FGE, tu etiqueta incluirá un código de barras de referencia del cliente con hasta 24 caracteres. Otros sistemas de FedEx continuarán permitiendo 40 caracteres.
- Si emites o creas notificaciones personalizadas, te recomendamos usar el número de rastreo de FedEx para dirigir las consultas a fedex.com.

La siguiente imagen te proporciona información sobre el contenido de la etiqueta actualizada de FedEx Ground Economy.

![FGE label update.png](https://developer.fedex.com/api/content/dam/fedex-com/irc/businessdocimages/FGE%20label%20update.png)

Opciones de servicio de FedEx Ground® Economy

Las diferentes opciones de servicio de FedEx Ground® Economy, según el peso del paquete y las dimensiones:

| **Opciones de servicio** | **Peso mínimo** | **Peso máximo** | **Dimensiones** |
|---|---|---|---|
| Parcel Select Liviano | 4,53 gramos | < 453,59 gramos | La suma de la longitud y la circunferencia no puede superar los 2,13 m Mínimo: 15,24 cm (largo) x 10,16 cm (ancho) x 2,54 cm (altura) |
| Material impreso encuadernado | 4,53 gramos | 6,80 kg | La suma de la longitud y la circunferencia no puede superar los 2,13 m Mínimo: 15,24 cm (largo) x 10,16 cm (ancho) x 2,54 cm (altura) |
| Medios | 4,53 gramos | 31,75 kg | La suma de la longitud y la circunferencia no puede superar los 2,13 m Mínimo: 15,24 cm (largo) x 10,16 cm (ancho) x 2,54 cm (altura) |
| Parcel Select | 453,59 gramos | 31,75 kg | La suma de la longitud y la circunferencia no puede superar los 3,30 m Mínimo: 15,24 cm (largo) x 10,16 cm (ancho) x 2,54 cm (altura) |
| Devoluciones de FedEx Ground® Economy | 4,53 gramos | 31,75 kg | La suma de la longitud y la circunferencia no puede superar los 3,30 m Mínimo: 15,24 cm (largo) x 10,16 cm (ancho) x 2,54 cm (altura) |

Excepciones

Lo siguiente no está disponible para FedEx Ground® Economy:

- Cobro contra entrega
- Garantía de devolución de dinero
- Valor declarado
- Prueba de entrega firmado
- Entrega vespertina o con cita
- Servicio de materiales peligrosos

## Recargos por paquetes no autorizados

FedEx va a implementar nuevos recargos por paquetes no autorizados que excedan las dimensiones máximas permitidas. Se aplicarán dos nuevos cargos a paquetes exprés y unidades de carga exprés internacionales y dentro del país que excedan los límites máximos de dimensión o peso de nuestra red. **Puedes encontrar información adicional en tu «Guía de servicio» local.**

Este recargo ayuda a mejorar la eficiencia del manejo de paquetes de gran tamaño dentro de la red de FedEx y a compensar los costos de manejo adicionales asociados con los envíos que superan los límites establecidos. Se aplica cuando un paquete excede las restricciones de dimensiones del país de destino, y cada país establece sus propios límites. Los cargos se calculan por paquete.

## Servicios especiales

Consulta las siguientes secciones para obtener más información sobre los servicios especiales disponibles:

- Envíos de alcohol
- Entrega Autenticada de FedEx
- Monitoreo e intervención (MI) e identificadores de atención médica (HCID)
- Mercancías peligrosas

  - Hielo seco
  - Materiales radioactivos
  - Baterías de litio

- Mercancías peligrosas por carretera
- Opciones de entrega con firma certificada
- Opciones de FedEx Priority Alert
- Servicio los sábados
- COD de Ground
- Cobro electrónico contra entrega (E.C.O.D) de Ground
- FedEx International Broker Select
- Información de exportación electrónica
- Documentos comerciales electrónicos
- Control de destino comercial
- Día futuro
- Entrega en farmacia
- Destinatario tercero de FedEx
- C.O.D.
- Retener en oficina de FedEx
- FedEx Onsite
- FedEx Tarifa Única

### Envío de alcohol

Los requisitos de envío de alcohol de FedEx se aplican al vino, licor y cerveza. Cada tipo aparece por separado cuando las regulaciones difieren según el tipo de bebida. El vino es el único tipo de alcohol que se puede enviar directamente a los consumidores, dependiendo del servicio de envío seleccionado. El alcohol puede ser mercancía peligrosa (DG) con el servicio Express, dependiendo del porcentaje de alcohol por volumen.

¿Quién puede hacer envíos?

- Las personas no pueden enviar alcohol mediante FedEx.
- Las empresas que tienen licencias (titulares de licencias) y están inscritas en el programa de envío de alcohol de FedEx pueden enviar a personas en estados seleccionados o a titulares de licencias en otros estados o países.
- Algunos estados tienen regulaciones estrictas para enviar vino a los consumidores y algunos no lo permiten.

Regulaciones internacionales

- Las leyes de cada país prevalecen sobre el envío de alcohol internacional. Los clientes deben cumplir las leyes y regulaciones de los países de origen y destino.
- FedEx no acepta envíos internacionales de Ground que contengan alcohol.

### Entrega Autenticada de FedEx

Los remitentes pueden usar el servicio especial Entrega Autenticada de FedEx para proteger los envíos de alto valor y delicados contra el fraude, las entregas erróneas y el robo. Entrega Autenticada de FedEx añade un paso que requiere una autenticación digital del destinatario usando un código QR único, lo que garantiza que el paquete se entregue solo al destinatario previsto.

Disponible para los envíos de FedEx Express® en EE. UU. y Canadá, Entrega Autenticada de FedEx le da a los remitentes más control en el momento final de la entrega, ayuda a reducir conflictos y aumenta la confianza de los remitentes y destinatarios.

Para especificar que un envío requiere el servicio especial de Entrega Autenticada de FedEx, usa `shipmentSpecialServices.specialServiceType` y especifica `FEDEX_AUTHENTICATED_DELIVERY`.

Cuando se usa Entrega Autenticada de FedEx, se requiere una dirección de correo electrónico del destinatario. Usa `emailNotificationDetail.emailNotificationRecipients` para proporcionar la información de contacto. Asegúrate de que se proporcione `emailNotificationRecipientType` = `RECIPIENT` y un valor de `emailAddress` válido. Debido a que Entrega Autenticada de FedEx requiere que los destinatarios reciban un correo electrónico en HTML para mostrar el código QR, se sobrescribe un `notificationFormatType` de `TEXT`.

Limitaciones y consideraciones:

- Entrega Autenticada de FedEx no está disponible para envíos FedEx Ground.
- No se pueden combinar servicios de entrega con firma con el servicio Entrega Autenticada de FedEx. Puedes seleccionar Entrega Autenticada de FedEx o un servicio de entrega con firma, pero no ambos.
- Entrega Autenticada de FedEx no está disponible para Retener en oficina.
- Entrega Autenticada de FedEx no está disponible para envíos de alcohol, armas o mercancías peligrosas.
- Entrega Autenticada de FedEx no está disponible para entregas en farmacia en las que se requiere una firma.
- El código QR es válido por 45 días. Durante ese tiempo, el remitente y el destinatario pueden ponerse en contacto con el servicio de atención al cliente para que les envíen de nuevo un correo electrónico con el código QR.
- Una vez que el código QR caduca, el envío se devuelve al remitente.
- El rastreo de envíos con la Entrega Autenticada de FedEx no es compatible con la Track API. Los desarrolladores pueden usar las suscripciones basadas en el número de cuenta de FedEx Advanced Integrated Visibility para rastrear estos paquetes. Tanto los destinatarios como los remitentes pueden ver estos envíos a través de una experiencia autenticada en FedEx.com.

Para los envíos nacionales en EE. UU., los recargos por el servicio Entrega Autenticada de FedEx se calculan según el número de paquetes. Para los envíos internacionales, los recargos son por envío. Para obtener más información, consulta [Tarifa](https://developer.fedex.com/api/es-us/catalog/rate.html) y [Recargos en la referencia de API](https://developer.fedex.com/api/es-us/guides/api-reference.html).

### Monitoreo e intervención (MI) e identificadores de atención médica (HCID)

Las opciones de servicios especiales de Monitoreo e Intervención (MI) e Identificadores de atención médica (HCID) ayudan a monitorear de forma proactiva envíos críticos de atención médica, mitigar el riesgo y proporcionar apoyo en la intervención para proteger envíos de atención médica. Los servicios especiales de HCID identifican los envíos urgentes de atención médica y facilitan que sean tratados de manera prioritaria en la red de FedEx. La integración con MI proporciona monitoreo cercano de los envíos de HCID para permitir que rastrees tu paquete en tiempo real.

*Nota:*

- *Este es un servicio complementario, debes comunicarte con un representante de FedEx para que lo habilite para tu cuenta.*
- *Para seleccionar los servicios de MI y HCID para los envíos, debes tener una cuenta habilitada para la función de atención médica.*
- *Para seleccionar opciones de servicio no relacionadas con la atención de la salud, como Aeroespacial o Automotriz Críticos, la EAN debe estar habilitada para cada opción individual.*
- *Las opciones de atención médica solo son válidas para los servicios Express Premium. Primero, debes elegir la opción de «Servicios especiales de Monitoreo e Intervención (MI)» para enviar estas opciones de atención médica.*
- *También se aplican ciertos recargos para estos tipos de servicios especiales.*

Para obtener información sobre las opciones de servicios de MI y HCID, consulta la tabla de [opciones de MI y HCID](https://developer.fedex.com/api/en-us/guides/api-reference.html#monitoringandinterventionoptions). Los códigos de MI y HCID seleccionados se imprimirán en las etiquetas de envío.

*Nota:*

- *Aunque los envíos pueden contener varios identificadores de atención médica, las etiquetas solo muestran un único HCID. Si se incluyen varios identificadores en un envío, las etiquetas muestran el identificador que esté más arriba en la lista de opciones de HCID.*
- *El identificador de temperatura controlada (HCT: TEMPERATURE_CONTROLLED) requiere la selección de un identificador de rango de temperatura. Solo se puede seleccionar una única temperatura para un envío. Si se crea un envío con más de un HCID relacionado con la temperatura, se producirá un error.*

### Mercancías peligrosas

Los envíos que contengan mercancías peligrosas deben presentarse ante FedEx Express de acuerdo con la regulación actual de la Asociación Internacional de Transporte Aéreo (IATA) para transporte aéreo, así como los términos y condiciones de FedEx Express. Esto es obligatorio, independientemente del enrutamiento y si el envío se hace por transporte aéreo, terrestre o una combinación de ambos. Para mayor confianza, use una solución de FedEx® DG Ready para generar su declaración de artículos peligrosos. [Servicio ENUM: `DANGEROUS_GOODS`]

Explosivos División 1.3

FedEx Express no transporta explosivos División 1.3. Los explosivos División 1.3 están prohibidos en todos los servicios de FedEx Express®.

Hielo seco

Puede enviar paquetes que contengan hielo seco, siempre que los detalles del envío de hielo seco se incluyan en la transacción de envío. El hielo seco se considera un material de mercancías peligrosas. [Servicio ENUM: `DRY_ICE`]

*Nota:*

Materiales radioactivos

Dentro de los EE. UU., los materiales radiactivos en cantidad controlada enviados por autopista o materiales fisionables clase III no serán aceptados para envío sin acuerdo previo.

Sólo avión de carga

El servicio «solo avión de carga» se usa para paquetes que contienen mercancías peligrosas en cantidades que no se permiten en aviones de pasajeros. El cliente podrá indicar si el envío es adecuado para un avión de carga. El identificador DGD-CAO se agrega en la guía aérea para los envíos por avión de carga. La etiqueta «solo avión de carga» (DGD-CAO) advierte al personal de operaciones en tierra de las aerolíneas que no cargue mercancías peligrosas en un avión de pasajeros debido al peligro que puede representar para la seguridad del avión y sus pasajeros. Algunos ejemplos del servicio de «solo avión de carga» para mercancías peligrosas son: baterías de litio, materiales magnetizados, equipos alimentados por baterías, hielo seco (dióxido de carbono sólido).

Baterías de litio

Las baterías y celdas de litio se clasifican como mercancías peligrosas debido a su naturaleza potencialmente vulnerable en ciertas circunstancias que podría provocar un accidente de incendio. Por lo tanto, la Asociación Internacional de Transporte Aéreo (IATA) y la Organización de Aviación Civil Internacional (ICAO) establecieron ciertas pautas que deben seguirse al enviar baterías y celdas de litio por vía aérea:

Los pasos para enviar una batería o celda de iones de litio son: **Paso 1**. Determinar qué tipo de batería va a enviar **Paso 2**. Determinar la forma correcta de preparar el envío de la batería de litio **Paso 3**. Completar el papeleo **Paso 4**. Completar el paquete Para obtener orientación detallada e instrucciones paso a paso, [haz clic aquí.](https://www.fedex.com/content/dam/fedex/us-united-states/logistics/Lithium-Battery-Shipping-Tool.pdf)

Los paquetes que contienen cantidades más pequeñas o vatios hora más bajos de litio están sujetos a requisitos reglamentarios menos estrictos. Para identificar y controlar mejor los envíos, debes identificar y declarar las especificaciones técnicas del envío. Para obtener información sobre cómo enviar estas baterías y celdas, [haz clic aquí.](https://www.fedex.com/en-us/shipping/how-to-ship-batteries.html#3) [Haz clic aquí](https://www.fedex.com/content/dam/fedex/us-united-states/services/LithiumBattery_Overview_2022.pdf)para consultar la ayuda de trabajo que proporciona por FedEx a fin de determinar con rapidez qué tipo de envío de batería de litio vas a realizar.

Hay cuatro tipos de envíos de baterías de litio que se pueden transportar por vía aérea en condiciones simplificadas sin una Declaración del remitente de mercancías peligrosas (DG):

- Baterías de iones de litio embaladas con equipo ONU 3481, sección II, instrucción de embalaje (PI) 966
- Baterías de iones de litio contenidas en equipo ONU 3481, sección II, PI 967
- Baterías de metal de litio embaladas con equipo ONU 3091, sección II, PI 969
- Baterías de metal de litio contenidas en equipo ONU 3091, sección II, PI 970

Para estos cuatro tipos de batería, se necesita la declaración simplificada de batería de litio en la sección `batteryDetails` del elemento Gama de objetos, que se encuentra en `packageSpecialServices`. También debe proporcionarse el tipo de servicio especial de `Batería`. Este tipo de envío de batería de litio podrá identificarse con las etiquetas de envío de FedEx a través del código de manejo «ELB». Los requisitos de la International Air Transport Association/International Civil Aviation Organization (ICAO/IATA), especialmente con respecto al etiquetado y embalaje, siguen vigentes. Para otros tipos de envío LB, generalmente se requiere una Declaración de mercancías peligrosas (DG) completa (Declaración del remitente). Consulte [Cómo enviar mercancías peligrosas](https://www.fedex.com/en-us/service-guide/dangerous-goods/how-to-ship.html#lithium-batteries-dangerous-goods).

Para crear y validar una solicitud de envío, y para crear una etiqueta de envío, debe seleccionar `LITHIUM_ION`/`LITHIUM_METAL` ENUM (enumeración de iones de litio/metal de litio) como entrada para `batteryMaterialType` en `batteryDetails`. El `batteryMaterialType` indica la composición del material de la batería o celda.

*Nota: La información mencionada anteriormente se aplica solo a las cuatro secciones de ELB indicadas anteriormente y no a los envíos de baterías de litio que incluyan una declaración del remitente (DGD).*

El servicio de baterías de litio se aplica a los siguientes servicios de FedEx Express indicados en la tabla:

| Servicio nacional de FedEx | Servicios internacionales de FedEx |
|---|---|
| FedEx First Overnight® | International First Overnight de FedEx |
| FedEx Priority Overnight® | International Priority (IP) |
| FedEx Standard Overnight® | FedEx International Priority® |
| FedEx 2Day® | FedEx® Regional Economy |
| FedEx Express Saver® | FedEx® Regional Economy Freight |
| FedEx 1 Day® Freight (Express) | FedEx International Priority® Express |
| FedEx 2 Day® Freight (Express) | FedEx International Priority Overnight |
| FedEx 3 Day® Freight (Express) | FedEx International Economy® |
| FedEx® First | FedEx International Connect Plus (FICP) |
| FedEx® Priority Express | Servicio FedEx International Priority® Freight |
| FedEx® Priority | Servicio FedEx International Economy® Freight |
| FedEx® Priority Express Freight | FedEx Europe First® |
| FedEx® Priority Freight | FedEx First Overnight® Freight |
| FedEx® Economy | FedEx 2Day® AM |
|   | FedEx International Priority DirectDistribution Freight (IDF) |
|   | FedEx International Priority DirectDistribution (IPD) |
|   | FedEx International Economy DirectDistribution (IED) |
|   | FedEx Transborder Distribution Canadá (TD CA): Express |
|   | FedEx Transborder Distribution México (TD MX): Express |

Tarifas por manejo especial

Existen tarifas por manejo especial que se aplican a envíos que contienen mercancías peligrosas. Los recargos se basan en la clasificación y el tipo de manejo especial que se requiere, incluso si se necesita acceder a los artículos durante el envío.

### Mercancías peligrosas por carretera

Las mercancías peligrosas (DG) por carretera es una opción de servicio especial a nivel de paquete que le permite a los remitentes enviar sus paquetes con mercancías peligrosas por carretera de acuerdo con las normativas ADR dentro de Europa. La opción de enviar hielo seco, baterías de litio, cantidad limitada de mercancías peligrosas, etc., para envíos dentro del país a través de FedEx Regional Economy, FedEx Regional Economy Freight y FedEx Express Domestics, etc., estará disponible para el servicio de mercancías peligrosas por carretera dentro de los mercados clave de Europa.

Los siguientes servicios especiales se incluyen para habilitar capacidades de envío adicionales para mercancías peligrosas por carretera:

- Envíos de baterías de litio independientes
- Mercancías peligrosas totalmente reguladas por carretera
- Envíos de cantidad limitada por carretera
- (Micro)organismos genéticamente modificados
- Sustancias biológicas categoría B
- Cantidades exentas
- Materiales radioactivos

*Nota:*

- *Se debe especificar el enum `STANDALONE_BATTERY` en `specialServiceTypes` para tener la opción de seleccionar los detalles de la batería en el elemento `standaloneBatteryDetails`. Este tipo de servicio especial se aplica solo a regiones dentro de Europa.*
- *Las mercancías peligrosas completamente reguladas (FDG) y en cantidades limitadas (LDG) no estarán disponibles al hacer un envío MPS oneLabelAtATime. Necesitas especificar la `normativa` como ADR en el objeto `dangerousGoodsDetail` en la solicitud para que el envío se procese correctamente.*

### Opciones de entrega con firma certificada

Los remitentes pueden elegir entre cuatro opciones con entrega certificada de FedEx® para los envíos FedEx Express® y FedEx Ground®.

| **Opción con firma** | **Descripción del servicio** |
|---|---|
| Se requiere firma directa | Cualquier persona en la dirección del destinatario puede firmar la entrega. Si no hay nadie en la dirección, FedEx volverá a intentar la entrega. |
| Requiere una firma indirecta | Esta opción está disponible para entregas residenciales.FedEx obtiene una firma de una de estas tres formas: De alguna persona en la dirección de entrega. De un vecino, encargado del edificio u otra persona en una dirección vecina. El destinatario puede autorizar la liberación del paquete sin que haya alguien presente. |
| Requiere la firma de un adulto | FedEx obtendrá una firma de alguna persona que se encuentre en la dirección de entrega y que al menos se considere mayor de edad en el país de destino. |
| No se requiere firma | FedEx puede liberar el paquete sin que haya alguien presente. |

Detalles de opciones con entrega certificada

- Una vez que un envío se entregó a FedEx, usted no puede cambiar la opción de firma.
- El servicio «Se requiere firma directa» no está disponible para «Retener en oficina».
- El servicio «Se requiere la firma de un adulto» está disponible para «Retener en oficina».
- Todos los paquetes en un envío de múltiples piezas deben tener la misma opción de entrega con firma de FedEx.
- Todas las piezas con un valor declarado de 500 $ USD o 500 $ CAD o mayor necesitan una firma. El servicio «Se requiere firma directa» es el servicio predeterminado y se proporciona sin costo adicional. Si usted está despachando un envío de paquetes múltiples y uno o más paquetes tienen un valor declarado de 500 $ USD o CAD o mayor, procese primero el paquete con el menor valor para evitar cargos de entrega múltiple.
- No se pueden combinar servicios de entrega con firma con el servicio Entrega Autenticada de FedEx. Puedes seleccionar Entrega Autenticada o un servicio de entrega con firma, pero no ambos.

### Opciones de FedEx Priority Alert

FedEx Priority Alert™

Esto incluye el compromiso de monitoreo proactivo y conectividad las 24 horas para que sepa dónde está su envío en cada etapa del camino. El respaldo dedicado de FedEx significa seguridad para usted cuando más importa. [Servicio ENUM: PRIORITY_ALERT]

FedEx Priority Alert Plus™

Esto incluye una garantía aún mayor: defensa proactiva. En el caso improbable de demora, su envío crítico sensible a la temperatura (típicamente relacionado con la atención médica) tendrá la intervención necesaria, como reabastecimiento de hielo seco, reacondicionamiento de paquetes de gel y acceso a almacenamiento refrigerado. FedEx entiende que la puntualidad en la entrega de un envío crítico puede salvar vidas. Ofrecemos la garantía adicional de que su paquete urgente se vigilará de cerca desde la hora de partida hasta que se entregue en forma segura.

Rosa significa prioridad: los paquetes Priority Alert vienen equipados con cinta rosa brillante rodeando el paquete, que señala su prioridad cuando se carga y se descarga.

FedEx Priority Alert™ y FedEx Priority Alert Plus™ son servicios especializados con base en aranceles solo por contrato que combinan el soporte todos los días, las 24 horas, el monitoreo avanzado de envíos, la notificación proactiva y la recuperación personalizada de paquetes para envíos importantes y urgentes. Los envíos reciben prioridad en el embarque y en el manejo de la liberación. Para facilitar la visibilidad, toda la información de FedEx Priority Alert™ se imprime en la etiqueta de ASTRA de FedEx. Un recargo por paquete se asocia con el servicio FedEx Priority Alert™. [Servicio ENUM: PRIORITY_ALERT_PLUS]

FedEx Priority Alert Plus™ incluye todas las funciones de FedEx Priority Alert™ del nivel más alto de monitoreo avanzado para los envíos urgentes y sensibles a la temperatura, para satisfacer las necesidades de las industrias financieras, las aeroespaciales, las de fabricación electrónica y las de atención médica, además de estas opciones:

- Reabastecimiento de hielo seco
- Reabastecimiento de paquetes de gel
- Almacenamiento refrigerado

Como con FedEx Priority Alert™, se asocia un recargo con este servicio especial.

Servicio de FedEx Priority Alert

Los servicios de FedEx Priority Alert y Priority Alert Plus se admiten como una opción para los siguientes servicios de envío:

- FedEx First Overnight®
- FedEx Priority Overnight®
- FedEx International Priority®
- FedEx International First®
- FedEx Europe First®
- FedEx® First
- FedEx® Priority Express
- FedEx® Priority
- FedEx® Priority Express Freight
- FedEx® Priority Freight
- FedEx® Economy

Los servicios especiales de envío incluyen:

- Saturday Delivery (Entrega el sábado)
- Entrega los días de la semana
- Retener en una oficina

Los servicios especiales del paquete incluyen:

- Mercancías peligrosas
- Hielo seco
- Opciones del servicio de firmas

### Servicio los días sábado

Los servicios de recolección los sábados o servicios de entrega los sábados para envíos de FedEx Express® están disponibles por un recargo adicional. La tarifa se aplica a todas las paradas regulares, así como recolecciones y entregas a pedido. La entrega o recolección los sábados está disponible en la mayoría de las ciudades de los EE. UU. y en ubicaciones internacionales seleccionadas.

Servicios de envío y entrega los sábados

La entrega los sábados está disponible para los siguientes tipos de servicio de FedEx Express en los EE. UU.:

- FedEx Priority Overnight®
- FedEx 2Day®
- FedEx 2Day®A.M.

La recolección los sábados está disponible para los siguientes tipos de servicio de FedEx Express en los EE. UU.:

- FedEx Priority Overnight®
- FedEx Standard Overnight®
- FedEx 2Day®
- FedEx Express Saver®

El servicio de Retener en oficina los sábados está disponible para los siguientes tipos de servicio de FedEx Express en EE. UU.:

- FedEx Priority Overnight®
- FedEx 2Day®

El servicio de procesamiento prémium de los sábados está disponible para servicios de paquetes prémium de FedEx Express para la recolección de envíos salientes y de devolución de los sábados mediante recolecciones automatizadas, regulares y a pedido.

Este servicio está disponible solo en los EE. UU. (no incluye Puerto Rico ni ningún otro territorio estadounidense) y CA.

La recolección de los sábados está disponible para los siguientes servicios de paquetes Express prémium:

- FedEx Nacional 8:30AM
- FedEx Priority Overnight
- FedEx Nacional Día Siguiente
- Domestic 2Day
- FedEx 2-Day AM
- International First de FedEx
- FedEx International Priority Express
- FedEx International Priority
- Distribución de FedEx International Priority
- FedEx First Overnight Extra Hours
- FedEx Priority Overnight Extra Hours
- FedEx Standard Overnight Extra Hours
- FedEx Tarifa Única (F1R)

### C.O.D. de Ground

*Nota: Este servicio solo está disponible para FedEx Ground® para envíos dentro de Canadá.*

El COD de FedEx Ground® permite al remitente designar la cantidad de dinero que el conductor de FedEx Ground cobra al destinatario cuando se entrega el paquete. Si el conductor de FedEx Ground cobra los fondos garantizados o un cheque personal o de una compañía, el pago se envía directamente al remitente mediante el correo de los EE. UU. Si se cobra el efectivo, FedEx Ground emite un cheque al remitente el siguiente día hábil por la cantidad de efectivo cobrada. El cheque emitido por FedEx se envía al remitente mediante el Servicio Postal de EE. UU. El remitente debe designar el tipo de pago que FedEx Ground deberá cobrar. El COD de FedEx Ground no está disponible con el servicio de FedEx Home Delivery®.

*Nota: FedEx ofrece una opción de COD electrónico (ECOD) de FedEx Ground®. Cuando hace el contrato para usar esta opción, FedEx deposita electrónicamente su pago de COD en su cuenta bancaria en un plazo de 24 a 48 horas del cobro. Debido a que el ECOD es un servicio por contrato, debe comunicarse con su ejecutivo de cuenta FedEx para inscribirse en esta opción. No se requieren entradas adicionales para crear un envío con ECOD en la solicitud de envío.*

### E.C.O.D. de Ground

*Nota: Este servicio solo está disponible para FedEx Ground® para envíos dentro de Canadá.*

Use la opción del servicio de COD electrónico de FedEx Ground para recibir fondos en un plazo de 24 a 48 horas después de la entrega del envío. Los remitentes reciben el dinero mediante transferencias electrónicas de fondos. Comuníquese con su ejecutivo de cuenta FedEx para obtener más información sobre el ECOD.

El ECOD no está disponible con el servicio de FedEx Home Delivery. Puede hacer envíos con COD o ECOD, pero no puede usar ambos servicios al mismo tiempo.

Opciones disponibles con ECOD de FedEx Ground:

- Opciones de FedEx Priority Alert
- Prepago o solo facturación a terceros
- Valor declarado
- Envío de alcohol
- Opciones de entrega convenientes de FedEx Home Delivery
- Datos ocultos

### FedEx International Broker Select

FedEx International Broker Select® le permite designar un agente aduanal específico que no sea FedEx (o nuestro agente designado).

Detalles del servicio FedEx International Broker Select

FedEx International Broker Select se encuentra disponible cuando se utilizan los siguientes servicios para enviar a países seleccionados:

- FedEx International Priority®
- FedEx International Economy®
- FedEx International Ground® a Canadá

### Declaración de exportación para envíos salientes de Canadá

La Agencia de Servicios Fronterizos de Canadá (CBSA) requiere la declaración de exportación para reportar exportaciones desde Canadá en las siguientes condiciones.

- Todos los envíos salientes de Canadá que contengan mercancía no restringida cuando la mercancía comercial esté valuada en 2 000 $ CAD o más y el destino de la mercancía sea un país que no sea Estados Unidos, Puerto Rico o las Islas Vírgenes de los Estados Unidos.
- Todos los envíos salientes de Canadá que contengan mercancías controladas, restringidas o reguladas, sin importar su valor.

Los transportistas deben pedir al exportador el número de la prueba del reporte antes de que cualquier mercancía salga de Canadá. El exportador debe presentar la declaración de exportación antes de proporcionar el número de la prueba del reporte al transportista.

### Información de exportación electrónica

La información de exportación electrónica (EEI) es la versión electrónica equivalente de la declaración de exportación del remitente (SED), formulario 7525-V del Departamento de Comercio (Departamento de Censos) que ya no se puede presentar al Gobierno de los EE. UU. La EEI proporciona estadísticas de exportación y control al reportar todos los datos de exportación pertinentes para una transacción de envío internacional.

La EEI es obligatoria y el exportador o agente debe enviarla electrónicamente mediante el sistema de automatizado de exportación (AES) para las mercancías mencionadas en la Lista de control de comercio (CCL).

Para presentar tu información EEI con AESDirect, visita el sitio web del AES. Este sitio web que respalda el gobierno proporciona los requisitos de presentación y te da la identificación de remitente adecuada para tus paquetes. FedEx aplicará esta información a tu envío, pero no la mantendrá archivada para ti.

*Nota: También puedes utilizar el extremo «Presentar EEI» en la Global Trade API para presentar tu EEI ante la Aduana de EE. UU.*

Para obtener más información sobre la EEI, consulta las siguientes páginas:

- [Página de Envíos Internacionales de FedEx](http://www.fedex.com/en-us/shipping/international.html)
- FedEx Global Trade Manager
- Oficina del Censo de EE. UU.

¿Cuándo presentar una información de exportación electrónica?

La información de exportación electrónica se requiere cuando el valor total de las mercancías clasificadas según algún número del Programa B excede 2 500 dólares de EE. UU. o cuando las mercancías enumeradas requieren una licencia de exportación.

- Para cualquier mercancía o artículo que tenga valor superior a 2 500 $ es obligatorio presentar una información de exportación electrónica.
- Para una mercancía única con valor inferior o igual a 2 500 $, no se requiere presentar la información de exportación electrónica, con la exención de las Regulaciones de comercio exterior (FTR).

Si el envío se origina en EE. UU., las Islas Vírgenes de EE. UU. o Puerto Rico con destino a los países de China, Rusia, Venezuela y Hong Kong, sin importar el valor del envío, debes presentar la siguiente información:

- EEI que presente el número de transacción interna (ITN)
- El número de clasificación de control de las exportaciones (ECCN) correcto o el número de clasificación EAR99 para cada artículo, o
- Una exención de presentación aplicable

Las exenciones se permiten si el envío:

- Es elegible para una exención de licencia de GOV;
- Es elegible para exenciones de las Regulaciones de la Administración de Exportaciones y Regulaciones de Comercio Exterior (FTR); o
- Se compone únicamente de artículos clasificados como EAR99.

La presentación de la información de exportación electrónica también es obligatoria para los envíos entre los EE. UU. y Puerto Rico y desde los EE. UU. o Puerto Rico hacia las Islas Vírgenes, en las siguientes condiciones:

- El envío de mercancías con el mismo número de mercancía del Programa B tiene un valor de más de 2 500 $ dólares de los EE. UU y lo envía el mismo exportador al mismo destinatario en el mismo día. *Nota: los envíos hacia Canadá desde los EE. UU. están exentos de este requerimiento*
- El envío contiene mercancía que independientemente de su valor requiere una licencia o permiso de exportación.
- La mercancía está sujeta a los Reglamentos sobre el Tráfico Internacional de Armas (ITAR), independientemente de su valor.
- El envío, independientemente de su valor, se va a enviar a Cuba, Irán, Corea del Norte, Sudan o Siria.
- El envío contiene diamantes en bruto, independientemente de su valor (código de sistema armonizado de tarifas 7102.10, 7102.21 y 7102.31).

*Nota:*

- *La información de exportación electrónica no se requiere para envíos a otros territorios de los EE. UU. (Samoa Americana, Mancomunidad de las Islas Marianas del Norte, Guam, Isla Howland e Isla Wake) o desde las Islas Vírgenes de EE. UU. hacia EE. UU. o Puerto Rico.*
- *Para otros destinos, debes presentar la información de exportación electrónica para todos los envíos de exportación de los EE. UU. si una o más mercancías (número de Programa B) tiene un valor superior a 2 500 $ dólares de los EE.UU. en el envío consolidado de cualquier día.*

Envíos desde EE. UU. o Canadá

La información de exportación electrónica no se requiere para los envíos desde EE. UU. a Canadá, excepto en las siguientes circunstancias:

- La mercancía está sujeta a los Reglamentos sobre el Tráfico Internacional de Armas (ITAR).
- El envío requiere una licencia o permiso de exportación.
- Las mercancías que se envían son diamantes en bruto.

Para obtener más información sobre Información de exportación electrónica, consulta FedEx Global Trade Manager.

Identifica la siguiente información antes de completar la Información de exportación electrónica.

- EIN e ID de la parte principal que recibe el beneficio en EE. UU: Si el remitente es una sociedad, se necesita el EIN, Número de identificación de empleado (ID fiscal) de la parte principal que recibe el beneficio en EE. UU. Si el remitente es una persona, se necesita su número de seguro social.
- Se requiere la información de la relación entre las partes de la transacción. Esta información indica si el remitente y el destinatario son subsidiarias o divisiones de la misma compañía o si no tienen relación entre ellas.
- Número de referencia del transporte: requiere que proporciones tu número de guía aérea internacional de FedEx.
- Destinatario final: identifica el usuario final de la mercancía que envías solo si el destinatario final es distinto del destinatario que ingresaste en tu guía aérea internacional de FedEx.
- País de destina final: indica el país en el que el envío será utilizado al final.
- D/F/ o M (Nacional o extranjera en el sistema de automatizado de exportación): indica si la mercancía fue hecha o fabricada en EE. UU. (D=nacional) o hecha o fabricada fuera de los EE. UU. (F=extranjera).
- Número de Programa B (Número de clasificación de la mercancía en el sistema de automatizado de exportación): ingresa el número correcto de Programa B o el número de Código armonizado y las unidades. Para encontrar esta información, consulta el sitio de FedEx Global Trade Manager en fedex.com/gtm o llama a la Oficina del Censo de EE. UU. al 1.800.549.0595.
- Valor: ingresa el precio de venta o el costo de la mercancía si esta no ha sido vendida.
- Número de licencia/Símbolo de exención de licencia/Autorización (Número de licencia/Citación en AES): ingresa tu número de licencia de exportación o el símbolo de exención de licencia. Para determinar si es necesario aportar esta información, llama al Departamento de Comercio de EE. UU. al +1.202.482.4811 o al +1.714.660.0144 en Newport Beach, California, o consulta el sitio web de la Oficina de Industria y Seguridad.

Detalles de los códigos de la Información de exportación electrónica

Los envíos de Información de exportación electrónica (EEI) requieren un número de exención o un número de transacción interna (ITN), que se recibe cuando se presenta la información de tu envío EEI en AESDirect. Los elementos necesarios para presentar tu ITN o tu número de exención EEI a FedEx se encuentran en la API de envíos.

*Nota: También puedes utilizar el número de ITN recibido a través del extremo «Recuperar ITN» de la Global Trade API, en la solicitud a la Ship API.*

| **Elemento** | **Descripción** |
|---|---|
| Remitente/Tin/TinType | Como remitente, tu información de identificación fiscal se debe cargar en FedEx para los envíos EEI. Especifica el Número de identificación de empleado (EIN). Valores válidos: BUSINESS_NATIONAL BUSINESS_STATE BUSINESS_UNION PERSONAL_NATIONAL PERSONAL_STATE |
| Remitente/Tin/Número | Especifica el Número de Identificación Fiscal con el número de ID correspondiente del TinType. |
| CustomsClearanceDetail/ExportDetail/ ExportComplianceStatement | En el caso de los envíos que requieran un EEI, ingresa el número ITN que recibiste de parte de AES cuando presentaste tu envío o el número de exención de FTR (Regulaciones de comercio exterior). El formato apropiado para un número ITN es AES XYYYYMMDDNNNNNN en el que YYYYMMDD es fecha y NNNNNN son números generados por AES. |

*Nota: El ITN o el número de exención FTR que presentas en la solicitud de Envío se imprime en la etiqueta de envío internacional.*

### Documentos comerciales electrónicos

FedEx® Electronic Trade Documents (ETD) es un servicio especial a nivel de envío que te permite enviar tu documentación de aduana de manera electrónica cuando está permitido, lo que te ahorra tiempo y dinero. No tienes que imprimir, firmar, doblar ni adjuntar varias copias de la documentación comercial a cada envío internacional. De esta manera, tendrás más tiempo para enfocarte en otras prioridades comerciales y reducir el riesgo de que se pierda, falte o se dañe la documentación. Los escenarios que usan o están relacionados con ETD incluyen:

- FedEx puede generar documentos comerciales, enviarlos de manera electrónica y devolvértelos para que los puedas imprimir o los dejes registrados.
- FedEx puede aceptar documentos comerciales que crees y cargues antes o después de crear tu envío y etiqueta, y luego enviarlos de manera electrónica.
- FedEx puede generar documentos comerciales para que los imprimas y los guardes sin enviarlos de manera electrónica.

Al usar ETD como un servicio especial, puedes transmitir los documentos de aduana generados por FedEx o cargar los que creaste en tus propios sistemas en el formato de archivo que prefieras. En tu solicitad de Crear envío, pasa `ELECTRONIC_TRADE_DOCUMENTS` como el valor `shipmentSpecialService.specialServiceTypes`. Usa `etdDetail.requestedDocumentTypes` para especificar qué documentos enviarás de manera electrónica, como `COMMERCIAL_INVOICE`.

Para que FedEx genere y envíe tus documentos comerciales, también debes proporcionar los detalles necesarios en tu solicitud de Crear envío. Por ejemplo, para crear una factura comercial a partir de los datos requeridos de la mercancía que se incluyen en tu solicitud, pasa `COMMERCIAL_INVOICE` como el valor `shippingDocumentSpecification.shippingDocumentType` . Para ver qué tipo de documentos FedEx puede crear para ti, consulta los [Documentos de envío](https://developer.fedex.com/api/en-us/guides/api-reference.html#shippingdocuments) para la enumeración `shippingDocumentTypes`.

*Nota: No todos los países aceptan los documentos generados por FedEx. Para obtener la información más reciente, consulta la [lista de países disponibles](https://www.fedex.com/content/dam/fedex/us-united-states/services/Commercial_Invoice_Country_List.pdf) en las [Preguntas frecuentes sobre documentos comerciales electrónicos](https://www.fedex.com/en-us/electronic-trade-documents.html#faq).*

En algunos casos, las oficinas de aduana requieren que los documentos comerciales incluyan una firma o una imagen con membrete. FedEx puede guardar y adjuntar esas imágenes a los documentos generados por FedEx si los cargas con anticipación. Para obtener más información sobre cómo cargar tus imágenes, consulta la [documentación de la Document Upload API](https://developer.fedex.com/api/en-us/catalog/upload-documents.html#/api).

Si no necesitas que FedEx genere documentos comerciales porque lo harás tú mismo, pero igualmente quieres que los documentos se *envíen* electrónicamente, puedes crear tu envío, especificar el tipo de servicio ETD y asociar ese envío con tus documentos:

- Para usar documentos comerciales que aún no se cargaron, usa el valor `POST_SHIPMENT_UPLOAD_REQUESTED` para `etdDetail.attributes`.
- Si cargaste tus documentos antes de crear el envío, usa `etdDetail.attachedDocuments` para proporcionar más detalles.

Para obtener más información sobre cómo cargar tus documentos comerciales, consulta la documentación de la Document Upload API. Por ejemplo, para escenarios que usen la [Document Upload API](https://developer.fedex.com/api/en-us/catalog/upload-documents.html#/api), consulta la [guía de la Expedite Customs Clearance API](https://developer.fedex.com/api/en-us/Api-recipes/expedite-custom-clearance.html).

*Nota: No todos los países aceptan documentos comerciales electrónicos o documentos generados por FedEx. Para obtener la información más reciente, consulta la [lista de países disponibles](https://www.fedex.com/content/dam/fedex/us-united-states/services/Commercial_Invoice_Country_List.pdf) en las [Preguntas frecuentes sobre documentos comerciales electrónicos](https://www.fedex.com/en-us/electronic-trade-documents.html#faq).*

Si no se aceptan comerciales electrónicos (ETD) para tu envío, debes incluir los documentos comerciales físicos con tu envío. Igualmente, FedEx puede generar documentos para ti. Usa `shippingDocumentSpecification.shippingDocumentType` y envía la información requerida para que los documentos se devuelvan a tus solicitudes de Crear envío como cadenas codificadas en Base64. Para los países que no admitan ETD, la respuesta de la etiqueta y la etiqueta en sí indicarán «EWO», que significa Electrónico con original. En estos casos, los documentos se generaron de manera electrónica, pero igualmente deberás enviar copias en papel.

*Consejo: Independientemente del método que uses para crear y enviar tus documentos comerciales, FedEx recomienda que los guardes por hasta tres años en caso de una auditoría de aduana. FedEx no guarda tus documentos comerciales a largo plazo. Los remitentes deben conservar los documentos para cualquier necesidad futura.*

### Control de destino comercial

Para envíos que viajan bajo una exención de la ITAR o licencia de la ITAR saliente de los EE. UU., Puerto Rico, las Islas Vírgenes y otros territorios de los EE. UU. a todos los demás destinos internacionales, la Declaración de control de destino (DCS) Comercial del Departamento de Estado debe imprimirse en la etiqueta térmica o láser, el recibo comercial y cualquier documento de exportación de apoyo que acompañe estos envíos. La API de Envío proporciona tres elementos del servicio de envío para que tenga la DCS apropiada en su etiqueta de envío.

Detalles del servicio de control de destino comercial

Hay dos tipos de envíos del Departamento de Estado:

- Exento: las declaraciones de exención del Departamento de Estado se permiten para todos los servicios de FedEx International excepto para los envíos de FedEx International Ground® a Canadá.
- Requiere licencia: los envíos que requieren licencia del Departamento de Estado se permiten solo para el servicio de FedEx International Priority®.

*Nota: los envíos desde los EE. UU., Puerto Rico o las Islas Vírgenes hacia Guam, Samoa Americana, o Islas Marianas del Norte están exentos de este requisito.*

Cargo por entrega en interior

Cuando se le solicite, FedEx puede mover los envíos a posiciones más allá del área de carga adyacente. Cuando el mensajero de FedEx entrega un envío según esta solicitud, FedEx cobra un cargo por entrega en interior además de todos los cargos aplicables adicionales.

### Día futuro

Use el envío en día futuro para preparar un envío de FedEx Express hasta diez (10) días tras la fecha real del envío. Se imprime una etiqueta cuando se procesa el envío, pero se puede retener el envío hasta el día especificado para entregar el paquete al mensajero.

Día futuro está disponible para todos los servicios de envío de FedEx Express. Una etiqueta de FedEx Express aparece en la fecha de envío especificada.

Valor de enumeración FUTURE_DAY en el campo `requestType` junto con el campo `processingOptions` para recibir cotizaciones de tarifas de recolección para envíos en días futuros. Proporciona los datos correspondientes en los campos `requestedShipment.pickupDetail.readyPickupDateTime` y `requestedShipment.pickupDetail.latestPickupDateTime` para recibir valores precisos en la respuesta.

### Entrega en farmacia

«Entrega en farmacia» le permite designar una farmacia como la ubicación de entrega requerida para un envío, omitiendo estaciones de carga y áreas de recepción.

«Entrega en farmacia» proporciona a los clientes la capacidad de determinar si el tipo de servicio especial de «entrega en farmacia» está disponible para un destino de envío en un envío de paquete Express nacional en los EE. UU.

*Nota:*

### Servicio de tercero consignatario de FedEx

Una opción de servicio de entrega neutral que permite a un fabricante omitir el centro de distribución del importador y enviar directamente al destinatario final sin exponer el costo y los términos del importador con el fabricante. Una opción de servicio de valor agregado para clientes que no desean revelar el valor de aduana del envío al destinatario. Esto permite que los envíos se entreguen a los destinatarios sin un recibo comercial. La información aduanal no está disponible para el destinatario.

Beneficios del servicio

- Un mejor tiempo en tránsito de punta a punta: los productos se envían directamente al cliente final.
- Se eliminan los costos adicionales de manejo y almacenaje en destino.
- Los impuestos y aranceles de aduana se basan en la transacción de importación, no en el valor de venta subsiguiente al cliente final.

Tiempo en tránsito*

Tercero consignatario de FedEx le brinda los mismos tiempos de entrega que los especificados para el servicio particular de FedEx® que elija utilizar. Nuestro compromiso de tiempos en tránsito está respaldado por nuestra garantía de devolución de dinero.* *

Opciones de servicios

Puede elegir la opción del servicio de tercero consignatario de FedEx con FedEx International Priority® o FedEx International Priority® Freight y en la solicitud del envío, proporcione el tipo de servicio especial del nivel del envío como *specialServiceTypes*=THIRD_PARTY_CONSIGNEE.

Restricciones del servicio

- Requiere un importador designado y un destinatario separado para la entrega.
- Mercancías peligrosas, perecederos y la opción de *brokerselect* no están disponibles.
- No se permiten envíos dentro de un país y dentro de Europa.

* El tiempo de tránsito y los compromisos de entrega pueden variar según el origen y el destino. Comunícate con el servicio de atención al cliente de FedEx para obtener más detalles. * * Para obtener más información sobre la Garantía de reembolso de FedEx, consulta la sección Nuestros servicios en fedex.com. Para obtener más información, comunícate con tu ejecutivo de cuenta FedEx o visita [FedEx/TPC.](http://www.fedex.com/id/services/tpc.html)

### Cobro contra entrega (C.O.D.)

La opción de cobro contra entrega (COD) de FedEx® te permite designar la cantidad de dinero que el mensajero de FedEx Express cobra a tu destinatario cuando se entrega el paquete. No se requiere inscripción. Tu destinatario puede pagar con cheque personal, giro postal, cheque de caja, cheque de la compañía, cheque oficial, cheque validado, efectivo o cualquier opción. FedEx te devuelve el pago al siguiente día hábil mediante FedEx Standard Overnight® (donde esté disponible; de otro modo mediante FedEx 2Day®). Se aplica un recargo adicional a los envíos con COD.

### Retener en oficina de FedEx

El servicio «Retener en una oficina» (HAL) de FedEx de FedEx Express está disponible para los clientes que desean recoger un paquete en una oficina de FedEx designada. Por ejemplo, los remitentes de vino autorizados pueden utilizar el servicio de «Retener en una oficina» de FedEx de FedEx Express para los consumidores que prefieren recoger sus envíos de vino en una Oficina de FedEx® o en un mostrador de FedEx Express.

Si su transacción especifica que se debe «retener en oficina», debe especificar la ID de la oficina de FedEx que ofrece el servicio de «Retener en oficina». También se pueden especificar las oficinas de FedEx OnSite para el servicio de «Retener en oficina». Seleccione la oficina de recolección de FedEx (un Centro de impresión y envío de la Oficina de FedEx®, un Centro de envíos de la Oficina de FedEx® o un FedEx World Service Center® designado) utilizando el localizador de puntos de entrega (comuníquese con su consultor de integración del cliente de FedEx si necesita asistencia).

Cuando incluye esta opción, las etiquetas de FedEx Express muestran «Retener en oficina» para indicar que los paquetes no serán entregados por un mensajero.

### FedEx OnSite

El servicio de FedEx OnSite amplía la red de oficinas minoristas de FedEx al ofrecer recolecciones de FedEx Express y Ground y puntos de entrega en las oficinas de terceros aliados. Los clientes pueden interactuar con FedEx en aproximadamente 2 500 oficinas con personal de FedEx y aproximadamente 11 000 oficinas minoristas aliadas de FedEx; el 80 % de la población de EE. UU. está a 8 km de una oficina de FedEx OnSite.

FedEx OnSite permite que los clientes de FedEx elijan oficinas de FedEx OnSite que proporcionan la conveniencia de recoger y entregar un paquete en oficinas que no son propiedad de FedEx con horarios ampliados y almacenar paquetes de manera segura.

### FedEx Tarifa Única®

FedEx Tarifa Única es una tarifa fija para envíos en la que no es obligatorio pesar ni medir los envíos de menos de 22,67 kg. Puedes elegir la caja o el tubo que se ajuste mejor al tamaño de lo que quieras enviar y llenar el paquete a su capacidad, siempre que el envío no exceda 22,67 kg. Da una opción de envío con tarifa fija simple y predecible para tus paquetes de FedEx Express. FedEx Tarifa Única, una cartera de envíos basada en seis opciones de servicio de FedEx Express, combinadas con siete tipos de embalaje patentados de FedEx (blancos).

Embalaje de FedEx Tarifa Única

Los tipos de embalaje de FedEx válidos/disponibles con la opción de Tarifa Única son los siguientes:

- FEDEX_ENVELOPE
- FEDEX_EXTRA_SMALL_BOX
- FEDEX_SMALL_BOX
- FEDEX_MEDIUM_BOX
- FEDEX_LARGE_BOX
- FEDEX_EXTRA_LARGE_BOX
- FEDEX_PAK
- FEDEX_TUBE

Su propio embalaje no está disponible para la opción de precios de Tarifa Única

Para obtener más información sobre los servicios de embalaje, consulte [Tipos de embalaje](https://developer.fedex.com/api/en-us/guides/api-reference.html#packagetypes).

Cómo especificar precios de Tarifa Única

Para especificar la opción de precios de FedEx Tarifa Única, realice los siguientes pasos:

- Especifica la `FEDEX_ONE_RATE` como el servicio especial de envío.
- Especifique uno de los tipos de embalaje.
- Especifique el origen en EE. UU. y el destino en EE. UU.
- Especifique uno de los siguientes tipos de servicio de FedEx Express.

  - FIRST_OVERNIGHT
  - PRIORITY_OVERNIGHT
  - STANDARD_OVERNIGHT
  - FEDEX_2_DAY
  - FEDEX_2_DAY_AM
  - EXPRESS_SAVER

*Nota: los clientes de FedEx pueden solicitar tanto la Tarifa Única como las tarifas basadas en el peso (no Tarifa Única) en una única solicitud de tarifas al especificar \"FEDEX_ONE_RATE\" como tipo de opción de servicio en su solicitud.*

## Etiquetas de envío de FedEx

La API de FedEx admite una gran variedad de etiquetas. La API de FedEx admite tres tipos de opciones de etiqueta, incluidas las térmicas, de papel normal y etiquetas personalizables. Puede utilizar la API de Envío y los extremos de la API de Envío abierto para producir una gran variedad de etiquetas.

FedEx ofrece 2 formatos de etiqueta para los servicios de envío:

- Etiquetas térmicas
- Etiquetas láser

**Etiquetas térmicas**

La API FedEx le permite imprimir etiquetas de envío para todos los tipos de envío, como FedEx Express®, FedEx Ground® y FedEx International Ground® utilizando una variedad de impresoras de etiquetas térmicas.

La API de FedEx admite los siguientes tamaños de etiquetas térmicas:

- 10,16 cm x 15,24 cm: sin una pestaña de documento configurable (pestaña de documento)
- 10,16 cm x 17,14 cm: con o sin una pestaña de documento
- 10,16 cm x 20,32 cm: proporciona espacio para incluir un archivo gráfico o de texto de su elección
- 10,16 cm x 21,59 cm: con una etiqueta de documento configurable (se incluye específicamente la etiqueta para identificar neumáticos)
- 10,16 cm x 22,86 cm: proporciona espacio para gráficos o texto, así como una pestaña de documento
- 10,16 cm x 26,67 cm: con una etiqueta de documento configurable (se incluye específicamente la etiqueta para identificar neumáticos)

Los tipos de inventario de etiquetas de 10,16 cm x 21,59 cm y 10,16 x 26,67 incluyen una pestaña de documento adicional con un código de barras idéntico. Un código de barras se muestra en la etiqueta principal y el otro en la pestaña de documento. La información del tipo de inventario de etiquetas es útil para los paquetes de neumáticos, ya que puede colocarse en la banda de rodamiento del neumático y la pestaña de documento adicional, con una copia del código de barras e instrucciones operacionales, en el flanco del neumático. Utilizar este tipo de inventario de etiquetas reduce el reetiquetado de neumáticos y el aumento de los escaneos dimensionales optimiza la recuperación. Para obtener más información sobre el inventario de etiquetas, consulta [«Tipos de inventario de etiquetas»](https://developer.fedex.com/api/en-us/guides/api-reference.html#labelstocktypes).

*Nota: la pestaña de documento es una pestaña de etiqueta removible con información de envío adicional que se puede seleccionar para el inventario de etiquetas mientras se usa una impresora térmica para imprimir las etiquetas de envío.*

**Elementos de la etiqueta térmica**

Las etiquetas térmicas del envío contienen tres elementos básicos:

- Contenido legible para el ser humano: esta parte de la etiqueta contiene la información del envío de la API de Envío de FedEx.
- El código de barras de envío de Ground legible para el ser humano se encriptará en forma predeterminada.
- Código de barras bidimensional (2D): el código de barras dimensional alfanumérico almacena información para los envíos de FedEx Express y FedEx Ground utilizando el estándar MH 10.8.3 del Instituto Nacional de Estándares de los Estados Unidos (ANSI). El código de barras 2D se crea utilizando la simbología 417 del formato de documento portátil (PDF).
- Código de barras específico de FedEx:

  - Asistencia de enrutamiento de rastreo de clasificación avanzada (ASTRA) para los envíos de FedEx Express hasta que el código de barras FDX 1D se sincroniza por completo; código de barras «96» para FedEx Ground y FedEx Home Delivery®, FedEx Ground también admite el uso del código de barras SSCC-18 «00».
  - El código de barras de FedEx 1D (FDX 1D) para los envíos de FedEx Express se crea utilizando ANSI o AIM BC4-1995 (Código de especificación de simbología uniforme-128C).

Información clave para generar la etiqueta térmica

La siguiente es la información clave que se requiere para generar una etiqueta térmica:

- LabelFormatType: se requiere para recibir la imagen de etiqueta correcta en la Ship Reply API. Valores válidos:

  - COMMON2D: el tipo de formato de etiqueta para recibir una etiqueta.
  - LABEL_DATA_ONLY: el valor usado para recibir el dato del código de barras si crea una etiqueta personalizada.

- ImageType: se requiere para formatear la etiqueta térmica para la impresora que usa; proporciona el tipo de transmisión de datos o mapa de bits que se devuelve. Valores válidos:

  - EPL2 – Eltron (tipos de inventario de etiquetas)
  - ZPLII – Zebra (tipos de inventario de etiquetas)

*Nota: todas las etiquetas necesarias para un envío se generan y devuelven en un búfer simple.*

Impresoras térmicas aceptadas

Las siguientes impresoras térmicas se recomiendan para la API FedEx:

- Unimark
- Eltron

  - Orion (EPL2)
  - Eclipse (EPL2)

- Zebra

  - LP2443 (EPL2)
  - LP2844 (EPL2)
  - Gk420 (ZPL)
  - LP2348 Plus (EPL2/ZPL)
  - Z4M Plus (ZPL o EPL)
  - ZP500/ZP505 (EPL2/ZPL)
  - Z4M/Z4M+ (EPL2/ZPL)
  - ZM400 (EPL2/ZPL)
  - ZT410 (EPL2/ZPL)
  - Otras series de impresoras ZT4xx (EPL2/ZPL)

*Nota: estas impresoras son todas compatibles con el modo de página del Lenguaje de programación de Eltron ASCII (EPL2). Las impresoras térmicas son compatibles para escritura directa con la impresora conectada a un puerto de serie del sistema y como una impresora nativa de Windows instalada para conexiones LPT, serial o USB. Las versiones de firmware de las impresoras de FedEx proporcionadas pueden variar según la región.*

Número de etiquetas térmicas impresas por servicio

La siguiente tabla indica el número de cada tipo de etiqueta necesaria para un servicio especial específico. Todas las etiquetas necesarias se generan con una llamada al Servidor de etiqueta común (CLS) de FedEx y el CLS devuelve un búfer simple con la excepción de las etiquetas de devolución del COD.

**Impreso por servicio de EE. UU.**

| **Tipo de servicio** | **Etiquetas térmicas (el CLS de FedEx devolverá el número apropiado de etiquetas en la respuesta)** |
|---|---|
| FedEx Express EE. UU. | 1 etiqueta de envío |
| FedEx Ground EE. UU./FedEx Home Delivery | 1 etiqueta de envío |

**Impreso por el Servicio Internacional de Exportación de EE. UU.**

| **Tipo de servicio** | **Etiquetas térmicas (el CLS de FedEx devolverá el número apropiado de etiquetas en la respuesta)** |
|---|---|
| FedEx Express U.S. Export International | 1 etiqueta de envío 2 etiquetas de destinatario |
| Opc. selec. de agente aduanal de FedEx Express U.S. Export International | 1 etiqueta de envío 2 etiquetas de destinatario |
| FedEx Ground U.S. Export International | 1 etiqueta de envío |
| COD de FedEx Ground U.S. Export International | 1 etiqueta de envío 2 etiquetas de devolución de COD |

**Impreso por servicio dentro de Canadá**

| **Tipo de servicio** | **Etiquetas térmicas (el CLS de FedEx devolverá el número apropiado de etiquetas en la respuesta)** |
|---|---|
| FedEx Express dentro de Canadá | Envío sin mercancías peligrosas (DG)/hielo seco: 1 etiqueta de envío |
| FedEx Ground dentro de Canadá | 1 etiqueta de envío |
| COD de FedEx Ground dentro de Canadá | 1 etiqueta de envío 2 etiquetas de devolución de COD |

**Impreso por el Servicio Internacional de Exportación de Canadá**

| **Tipo de servicio** | **Etiquetas térmicas (el CLS de FedEx devolverá el número apropiado de etiquetas en la respuesta)** |
|---|---|
| FedEx Express Canada Export International | Envío sin DG/hielo seco: 1 etiqueta de envío 2 etiquetas de destinatario |
| FedEx Express Canada Export International Broker Select | Envío sin DG/hielo seco: 1 etiqueta de envío 2 etiquetas de destinatario |
| FedEx Ground Canada (CA) Export International | 1 etiqueta de envío |

**Impreso para envíos de entrada de Filipinas y Tailandia**

| **Tipo de servicio** | **Etiquetas térmicas (el CLS de FedEx devolverá el número apropiado de etiquetas en la respuesta)** |
|---|---|
| Envíos de entrada de Filipinas | 2 etiquetas de envío con número de cuenta impreso 1 etiqueta de destinatario sin el número de cuenta impreso 3 copias del recibo comercial |
| Envíos entrantes de mercancía de Tailandia | 3 etiquetas de envío con número de cuenta impreso 1 etiqueta de destinatario sin el número de cuenta impreso |
| Envíos de documentos entrantes de Tailandia | 2 etiquetas de envío con número de cuenta impreso 1 etiqueta de destinatario sin el número de cuenta impreso |

**Pestañas de documento**

Si imprimes etiquetas de envío utilizando una impresora térmica, puedes elegir de un inventario de etiquetas que incluye una pestaña de documento, una pestaña removible adhesiva con información del envío adicional. Puedes configurar esta información del envío desde tus datos de envío o elegir imprimir datos configurables que son específicos para las necesidades de tu envío.

**Etiquetas láser**

La API de FedEx admite la impresión de etiquetas en una impresora láser. Estas etiquetas se imprimen en general en tamaño carta o A4 de EE. UU. y se doblan por la mitad para adaptarse a la bolsa de la etiqueta estándar de FedEx. Las etiquetas impresas en una impresora láser se generan en formato PDF y no es necesario cambiar su tamaño o su escala. Para obtener más información sobre el inventario de etiquetas, consulta [«Tipos de inventario de etiquetas»](https://developer.fedex.com/api/en-us/guides/api-reference.html#labelstocktypes).

**Requisitos previos**

Los siguientes requisitos aplican a las etiquetas en PDF:

- Se requiere Adobe Reader 6.0 o superior para procesar la etiqueta.
- Los controladores de la impresora deben tener configurado el escalado de página en «ninguno».
- No es necesario usar un envoltorio HTML para mostrar una etiqueta PDF en papel normal en un navegador.
- Acrobat recomienda los siguientes navegadores para ver documentos PDF:

  - Microsoft® Internet Explorer 10 o superior
  - Firefox 1.0 o superior
  - Mozilla 1.7 o superior

La opción de etiqueta en PDF elimina la necesidad de especificar el parámetro de la orientación de la imagen (ancho y altura) o la resolución de la pantalla para mostrar la etiqueta de forma apropiada en el navegador.

**Elementos de la etiqueta láser**

Las etiquetas de envío láser contienen tres elementos básicos:

- Contenido legible para el ser humano: esta parte de la etiqueta contiene la información del envío de la API de Envío de FedEx.
- El código de barras de envío de Ground legible para el ser humano se encriptará en forma predeterminada.
- Código de barras bidimensional (2D): el código de barras dimensional alfanumérico almacena información para los envíos de FedEx Express y FedEx Ground utilizando el estándar MH 10.8.3 del Instituto Nacional de Estándares de los Estados Unidos (ANSI). El código de barras bidimensional (2D) se crea con el formato 417 de archivo de datos portátil (PDF).
- Código de barras específico de FedEx:

  - Asistencia de enrutamiento de rastreo de clasificación avanzada (ASTRA) para los envíos de FedEx Express hasta que el código de barras FDX 1D se sincroniza por completo; código de barras «96» para envíos de FedEx Ground y FedEx Home Delivery®. FedEx Ground también admite el uso del código de barras SSCC-18 «00», cuando corresponda.
  - El código de barras de FedEx 1D (FDX 1D) para los envíos de FedEx Express se crea utilizando ANSI o AIM BC4-1995 (Código de especificación de simbología uniforme-128C).

**Información clave para generar una etiqueta láser**

Se necesitan los siguientes elementos de la API de FedEx para generar una etiqueta láser:

- LabelSpecification/LabelFormatType: se requiere para recibir la imagen de etiqueta correcta en la Ship Reply API. Los valores válidos son:

  - COMMON2D: el tipo de formato de etiqueta para recibir una etiqueta.
  - LABEL_DATA_ONLY: el valor usado para recibir el dato del código de barras si crea una etiqueta personalizada.

- LabelSpecification/ImageType: se requiere para indicar el formato de la etiqueta. Tipo de secuencia de datos o mapa de bits a devolver. Los valores válidos son:

  - PDF: papel normal
  - PNG: papel normal

- LabelSpecification/LabelStockType: se requiere para todos los tipos de etiquetas. Especifique si el inventario de etiquetas tiene pestañas de documento en el extremo anterior o posterior de las etiquetas o si no tiene pestañas de documento. Cuando usa un ImageType (tipo de imagen) de PDF o PNG, estos valores muestran una etiqueta de formato láser:

  - PAPER_4X6
  - PAPER_4X8
  - PAPER_4X9
  - PAPER_4X675

- Estos valores muestran una etiqueta de envío de formato de papel normal:

  - PAPER_7X47
  - PAPER_85X11_BOTTOM_HALF_LABEL
  - PAPER_85X11_TOP_HALF_LABEL
  - PAPER_LETTER

*Nota: si solicita una etiqueta de papel normal, los datos devueltos son una imagen de etiqueta codificada en Base64, que debe decodificarse en Base64 antes de mostrar el archivo de la etiqueta.*

**Impresoras láser compatibles**

La mayoría de las impresoras láser son compatibles para este tipo de etiquetas; sin embargo, las etiquetas no se aceptarán si están impresas en una impresora de chorro de tinta.

*Nota: si usa una impresora láser a color, la definición del color debe establecerse en negro, incluso si la impresora solo tiene un cartucho negro instalado.*

**Número de etiquetas láser necesarias por servicio**

La siguiente tabla indica el número de cada tipo de etiqueta necesaria para un servicio especial específico. Todas las etiquetas necesarias se generan con una llamada al Servidor de etiqueta común (CLS) de FedEx y el CLS devuelve un búfer simple con la excepción de las etiquetas de devolución del COD.

**Impreso por servicio de EE. UU.**

| **Tipo de servicio** | **Etiqueta láser: formato PDF** |
|---|---|
| FedEx Ground/FedEx Home Delivery EE. UU. | 1 etiqueta de envío |

**Impreso por el Servicio Internacional de Exportación de EE. UU.**

| **Tipo de servicio** | **Etiqueta láser: formato PDF** |
|---|---|
| FedEx Express U.S. Export International | 1 etiqueta de envío en la respuesta; un mínimo de 3 etiquetas se debe imprimir: 1 etiqueta sobre el paquete y 2 en la bolsa del documento. |
| FedEx Express U.S. Export International Broker Select | 1 etiqueta de envío en la respuesta; un mínimo de 3 etiquetas se debe imprimir: 1 etiqueta sobre el paquete y 2 en la bolsa del documento. |
| FedEx Ground U.S. Export International | 1 etiqueta de envío |
| COD de FedEx Ground U.S. Export International | 1 etiqueta de envío 2 etiquetas de devolución de COD |

**Impreso por servicio dentro de México**

| **Tipo de servicio** | **Etiqueta láser: formato PDF** |
|---|---|
| FedEx Express dentro de México | FedEx Express dentro de México Envío sin mercancías peligrosas (DG)/hielo seco: 1 etiqueta de envío |

**Impreso por servicio dentro de Canadá**

| **Tipo de servicio** | **Etiqueta láser: formato PDF** |
|---|---|
| FedEx Express dentro de Canadá | FedEx Express dentro de Canadá Envío sin mercancías peligrosas (DG)/hielo seco: 1 etiqueta de envío |
| FedEx Ground dentro de Canadá | 1 etiqueta de envío |
| COD de FedEx Ground dentro de Canadá | 1 etiqueta de envío 2 etiquetas de devolución de COD |

**Impreso por el Servicio Internacional de Exportación de Canadá**

| **Tipo de servicio** | **Etiqueta láser: formato PDF** |
|---|---|
| FedEx Express Canada Export International | FedEx Express Canada Export International Envío sin DG/hielo seco: 1 etiqueta de envío 2 etiquetas de destinatario |
| FedEx Express Canada Export International Broker Select | FedEx Express Canada Export International Broker Select Envío sin DG/hielo seco: 1 etiqueta de envío 2 etiquetas de destinatario |
| FedEx Ground Canada (CA) Export International | 1 etiqueta de envío |

**Impreso para envíos de entrada de Filipinas y Tailandia**

| **Tipo de servicio** | **Etiquetas térmicas (el CLS de FedEx devolverá el número apropiado de etiquetas en la respuesta)** |
|---|---|
| Envíos de entrada de Filipinas | 2 etiquetas de envío con número de cuenta impreso 1 etiqueta de destinatario sin el número de cuenta impreso 3 copias del recibo comercial |
| Envíos entrantes de mercancía de Tailandia | 3 etiquetas de envío con número de cuenta impreso 1 etiqueta de destinatario sin el número de cuenta impreso |
| Envíos de documentos entrantes de Tailandia | 2 etiquetas de envío con número de cuenta impreso 1 etiqueta de destinatario sin el número de cuenta impreso |

**Etiqueta personalizada**

FedEx permite la personalización de la etiqueta generada por FedEx. Puede agregar texto pertinente a su negocio y elegir el tipo de código de barras (simbología) utilizado en los documentos y etiquetas de FedEx en la parte personalizada de las etiquetas térmicas.

Para dar soporte a su aplicación de envío, la API de Envío de FedEx proporciona dos opciones para personalizar su etiqueta de envío:

- Ubica el gráfico PNG en papel de 18 cm x 12 cm sobre el rollo de etiqueta. Por ejemplo, puedes crear una lista de embalaje en un formulario de 22 cm x 28 cm. Como parte de este formulario, también puedes ubicar el gráfico PNG en papel de 18 cm x 12 cm en vez de crear una etiqueta personalizada tú mismo.
- Agregue un gráfico o archivo de texto a la etiqueta térmica de 10 cm x 20 cm o 10 cm x 23 cm. Este tamaño de etiqueta proporciona 5 cm de espacio para su gráfico o texto.

*Nota: el contenido legible para el ser humano de la etiqueta y el código de barras en la parte común de la etiqueta no pueden alterarse.*

Etiqueta de validación personalizada

Puede crear etiquetas personalizadas que no son para envíos a nivel del paquete y del envío especificando qué información personalizada se precisa, cómo formatear esa información y dónde ubicarla en la etiqueta personalizada. Las etiquetas personalizadas están limitadas al formato de etiqueta térmica.

Personalice una etiqueta térmica

La API de FedEx proporciona dos formatos de etiquetas térmicas que usted puede personalizar con un gráfico o archivo de texto para evitar la necesidad de crear una etiqueta personalizada. Estas etiquetas admiten todos los servicios de envío de FedEx. Estos formatos son:

- Etiqueta térmica de 10 cm x 20 cm sin pestañas de documento
- Etiqueta térmica de 10 cm x 23 cm con pestañas de documento

Estos tipos de etiquetas proporcionan una sección personalizable de 5 cm. Esta característica es aplicable a la etiqueta térmica impresa en una impresora térmica establecida en 203 DPI o 300 DPI.

Reglas de etiquetas personalizadas

Las reglas para usar los formatos de etiquetas son:

- Solo se puede personalizar la etiqueta de envío. Por ejemplo, si imprime una etiqueta de envío Express de 10 cm x 20 cm con su logotipo, las etiquetas del destinatario secundario no lo mostrarán.
- El gráfico o texto personalizable no puede exceder los 5 cm de alto y 11 cm de ancho.
- FedEx no proporciona ninguna corrección. El gráfico o texto se imprime como se presenta en el servicio de envío.
- Si no se proporcionan todos los datos necesarios para imprimir el gráfico o texto (por ejemplo, coordenadas X o Y), la etiqueta de envío válida se devuelve sin los datos personalizados. Debes cancelar el envío representado por esta etiqueta si intentas recrear otra etiqueta con el gráfico o el texto.
- Para una impresora de 203 DPI (8 puntos por mm) de resolución, considerando la ubicación de las coordenadas X e Y, la coordenada de referencia del punto de inserción es la intersección de los bordes superior e izquierdo de la etiqueta térmica de 10 cm x 17 cm con la pestaña informativa (doc tab) en la parte inferior. Para las etiquetas térmicas de 10 cm x 17 cm con la pestaña informativa (doc tab) en la parte superior, incrementa los valores de la coordenada del punto de inserción Y en 164 puntos. Para las etiquetas de 10 cm x 15 cm sin pestaña informativa (doc tab), incrementa los valores de la coordenada del punto de inserción Y en 8 puntos. Los atributos del elemento de la etiqueta térmica están basados en una impresora de 203 DPI (8 puntos por mm) de resolución.
- Para una impresora de 300 DPI (12 puntos por mm) de resolución, considerando la ubicación de las coordenadas X e Y, la coordenada de referencia del punto de inserción es la intersección de los bordes superior e izquierdo de la etiqueta térmica de 10 cm x 17 cm con la pestaña informativa (doc tab) en la parte inferior. Para las etiquetas térmicas de 10 cm x 17 cm con la pestaña informativa (doc tab) en la parte superior, incrementa los valores de la coordenada del punto de inserción Y en 246 puntos. Para las etiquetas de 10 cm x 15 cm sin pestaña informativa (doc tab), incrementa los valores de la coordenada del punto de inserción Y en 12 puntos. Los atributos del elemento de la etiqueta térmica están basados en una impresora de 300 DPI (12 puntos por mm) de resolución. *Nota:*

  - *Para el código de barras FXD1D, la dimensión X (el ancho de la barra más estrecha del símbolo) es 0,381 mm (3 puntos) para una impresora de 203 DPI y 0,337 mm (4 puntos) para una impresora de 300 DPI.*
  - *Para el código de barras 2D PDF-417, la dimensión X es 0,254 mm (2 puntos) para una impresora de 203 DPI. Para obtener la dimensión X equivalente más cercana para una impresora de 300 DPI, se debe utilizar 0,253 mm (3 puntos).*
  - *Para el bloque de remitente o cargos varios en la parte superior de la etiqueta y el bloque de referencia del remitente debajo de la información del destinatario, para los que se utilizan tamaños de letra muy pequeños, los desarrolladores de etiquetas deben consultar la guía de programación ZPL para hacer una referencia cruzada de las características del conjunto de tamaños de letra y seleccionar un conjunto de tamaños equivalente que funcione con otras resoluciones del cabezal de la impresora.*

- El punto de inserción de caracteres es la esquina superior izquierda del primer carácter de la cadena, en la línea límite.
- Las restricciones de la impresora requieren que la posición se origine en el cuadrante superior izquierdo del frente. Por lo tanto, es posible que los datos se inicien en la sección personalizable de la etiqueta y se escriban en la porción de FedEx de la etiqueta (datos de etiqueta térmica real). Si esto ocurre, su logotipo o texto quedará sobrepuesto al contenido de la información de la etiqueta de FedEx. Debe corregir esta posición para utilizar la etiqueta de envío.
- La adición de la información de la pestaña de documento a la etiqueta de 10 cm x 23 cm debe configurarse utilizando el mismo proceso que usaría para una etiqueta térmica de pestaña de documento estándar de 10 cm x 15 cm.

*Nota: solo se deben agregar imágenes en color de un solo bit, ya que las etiquetas se imprimirán en blanco y negro.*

Elementos de entradas de gráficos de etiquetas personalizadas

La API ofrece imágenes PNG (gráfico de red portátil) para las etiquetas de FedEx Express y FedEx Ground. El gráfico de etiqueta PNG es una réplica de las etiquetas de papel térmico o normal compatibles con la API. Esta opción de etiqueta le permite colocar el gráfico de etiqueta PNG en su inventario de etiquetas para evitar la necesidad de crear una etiqueta personalizada.

Los siguientes requisitos aplican cuando se utiliza el gráfico PNG de 10 cm x 15 cm incorporado al documento de envío:

- Inventario de etiquetas
- Impresora
- Escalas

Inventario de etiquetas

Las etiquetas PNG de 10 cm x 15 cm solo deben usarse con inventarios de etiquetas adhesivas. Los equipos de validación de etiquetas de FedEx Ground y FedEx Express rechazarán las etiquetas PNG de 10 cm x 15 cm que no estén en los inventarios de etiquetas adhesivas, incluidas las etiquetas impresas en papel normal.

Impresora

Se recomienda usar impresoras láser para imprimir etiquetas. Las impresoras de inyección de tinta no deben utilizarse por la inconsistencia en la creación de códigos de barras escaneables. Las etiquetas PNG de 10 cm x 15 cm no se pueden imprimir con una impresora a color, a menos que la definición del color esté configurada en negro, incluso si la impresora solo tiene el cartucho de tinta negra instalado. Esta configuración es necesaria para lograr la definición de código de barras correcta a fin de escanear en los centros de distribución de FedEx.

Escalas

La imagen que se devuelve en su transacción de envío es de 200 puntos por pulgada (DPI) y mide 10 cm (ancho) x 15 cm (alto), u 800 x 1200 píxeles. Esta etiqueta tiene una orientación vertical y está diseñada para imprimir etiquetas en un área de 10 cm x 15 cm. Cuando se imprime, la etiqueta debe medir 10 cm x 15 cm.

Para producir la etiqueta y los códigos de barras con el DPI requerido, debe ajustar la escala de la imagen (o cambiar su tamaño) antes de imprimirla. La manera de ajustar la escala de la imagen depende de la aplicación que está utilizando para ver e imprimir la etiqueta. Para ajustar la escala de la imagen PNG para una etiqueta de 10 cm x 15 cm en centímetros: use 10 cm de ancho y 15 cm de largo exactamente.

**Lista de verificación de revisión de etiquetas**

Todos los códigos de barras

Para la validación se requiere:

- Zona silenciosa: debe tener siempre al menos 0,25 cm de espacio en blanco por encima y por debajo del código de barras.
- Zona silenciosa: Debe tener siempre al menos 0,51 cm de espacio en blanco a la izquierda y a la derecha del código de barras.
- Valide que todos los códigos de barras cumplan los requisitos mínimos de altura.

Calidad de impresión

Problemas comunes que generan el rechazo de las etiquetas:

- Barras de división
- Impresión descolorida/blancos nulos
- Repetición de blancos nulos (problema con los rodillos)
- Manchas (transferencia térmica)
- La descamación (láser) indica un problema de fusión del tóner
- Arrugas en la impresión (transferencia térmica)
- El contraste de impresión para las etiquetas térmicas directas debe ser al menos del 90 %

Detalles legibles para el ser humano para etiquetas de Ground

Para que las etiquetas de FedEx Ground sean legibles para el ser humano, se requieren los siguientes elementos de validación:

- Los datos deben coincidir con el código de barras.
- Logotipo de FedEx Ground: los logotipos están disponibles para su descarga desde el sitio web de FedEx Identity en fedex.com.
- Logotipo de FedEx Home Delivery: las etiquetas deben tener una «H» grande en una casilla a 2,54 cm de la dirección a enviar. La «H» debe ser de al menos 0,63 cm x 1,54 cm.
- Descripción del servicio
- Información del remitente
- Información del destinatario
- Código postal y enrutamiento
- Fecha de envío
- Peso real
- Información del dispositivo de automatización del cliente (medidor, aplicación/sistema, versión)
- Dimensiones
- Información de referencia variada
- Número de rastreo e ID de formulario (el número de rastreo debe tener 14 dígitos)
- ID de la rampa del aeropuerto
- Código postal

Detalles de etiquetas Express legibles para el ser humano

Los siguientes elementos deben estar impresos en la etiqueta para pasar la validación:

- Logotipo de FedEx Express: los logotipos están disponibles para su descarga desde el sitio web de FedEx Identity en fedex.com.
- Descripción del servicio
- Tipo de paquete, si es internacional
- Día de la semana para la entrega (ejemplo: LUN, para lunes)
- Fecha de entrega estimada
- Número de medidor
- Fecha de envío
- Formato del recuento de piezas, fraseología de la etiqueta principal, fraseología de la etiqueta del CRN en todos los MPS
- ID de la rampa del aeropuerto
- Código postal y enrutamiento
- Prefijo y sufijo del enrutamiento de URSA
- Códigos de manejo
- Compromiso del área de servicio
- Números de teléfono del destinatario y del remitente
- Peso
- Dimensiones, si corresponde
- Campo de referencia si es un envío de alcohol
- Número de rastreo e ID de formulario (el número de rastreo debe tener 14 dígitos)
- En la etiqueta ASTRA, el número de rastreo de 12 dígitos se encuentra en las posiciones 17 a 28 del código de barras de 32 caracteres. En el nuevo código de barras FDX 1D, el número de rastreo ocupa las posiciones 21 a 34. El número de rastreo de FedEx Express continuará siendo de 12 dígitos. Los ceros ocuparán las dos posiciones iniciales.

## Envíos FedEx Ground en EE. UU.

FedEx Ground® en EE. UU. es el servicio adecuado para un envío económico a direcciones comerciales en EE. UU. cuando selecciona un servicio de entrega terrestre. FedEx Home Delivery® es adecuado para las entregas a residencias en EE. UU. Ambos servicios están disponibles en los 50 estados de los EE. UU. y ofrecen entregas de día definido, según la distancia del destino.

**FedEx Home Delivery**

Use el servicio de FedEx Home Delivery cuando envíe paquetes a direcciones residenciales en los EE. UU. FedEx Ground designa el servicio de FedEx Home Delivery como el transportista para entregas residenciales de menos de 68 kg.

Los clientes residenciales pueden recibir una entrega de paquete al final del día de lunes a viernes, los sábados en la mayoría de los casos y muchos en domingo.

Los envíos de FedEx Ground, FedEx International Ground y FedEx Home Delivery muestran la cotización de tiempos en tránsito con una fecha y hora de entrega estimada precisa. [Servicio ENUM: GROUND_HOME_DELIVERY]

**Opciones del servicio de FedEx Ground en los EE. UU.**

Las siguientes son algunas de las opciones de envío clave disponibles:

- Envíos en día futuro
- Materiales peligrosos de FedEx Ground en EE. UU.
- Retener en una oficina de FedEx
- Detalles del servicio de FedEx Home Delivery
- Dirección alternativa de devolución
- Opciones con entrega certificada
- Notificación de envío en la solicitud de envío
- Cargos por manejo variables

**Envíos de FedEx International Ground**

FedEx International Ground es un método de envío directo por el que puede hacer envíos únicos o de paquetes pequeños de múltiples pesos directamente desde los EE. UU. a Canadá y de Canadá a EE. UU. No hay requisitos de paquetes mínimos.

FedEx International Ground ofrece entregas de día definido en todo Canadá:

- Tiempos de entrega: 2 a 7 días hábiles.
- Días de servicio: de lunes a viernes al final del día hábil.
- Área de entrega: Canadá.
- Tamaño y peso de paquete: hasta 68 kg, 2,74 m de largo o 4,19 m de largo más circunferencia (largo + [2 veces] ancho + [2 veces] alto). Para paquetes que pesan de 45,35 kg a 68 kg, se deben seguir pautas específicas para marcar los paquetes pesados. Para obtener más información, visite http://www.fedex.com/us/services/intl/ground.html.
- Excepciones: FedEx Ground® no puede hacer envíos a apartados postales.
- No se permiten materiales peligrosos (excepto para ciertos envíos a Canadá que contienen hielo seco o están clasificados como «Otros materiales regulados: nacionales» [ORM-D/cantidad limitada]).
- La liberación aduanal está incluida para envíos a Canadá mediante nuestro servicio de agente aduanal incluido. Se aplica una tarifa. El servicio de agente aduanal incluido puede no encontrarse disponible con todas las soluciones de envío electrónico.
- Se requiere un recibo comercial (CI) para todos los envíos.

**Detalles de servicio de FedEx International Ground**

Las siguientes opciones de servicio están disponibles para usarse con envíos de FedEx International Ground:

- Dirección alternativa de devolución
- Control de destino comercial
- Opciones con entrega certificada
- Envíos en día futuro
- Número de cuenta oculta (FedEx International Ground)
- Notificación de envío en la solicitud de envío
- Cargos por manejo variables

**Servicio de distribución de paquetes de International Ground**

El servicio de distribución de paquetes de Ground International permite a FedEx Ground consolidar los envíos de Ground International en una unidad que se libere y maneje como una sola entrada aduanal con una sola tarifa de agente aduanal. El servicio está disponible desde EE. UU. a Canadá y desde Canadá a EE. UU. usando la red de FedEx Ground. Este servicio se ofrece exclusivamente como agente aduanal seleccionado. La opción de agente aduanal incluido no está disponible.

**Requisitos de liberación aduanal**

Todos los documentos de exportación deben colocarse en la bolsa de documentos internacionales y adjuntarse al paquete de FedEx International Ground o al primer paquete de un envío de piezas múltiples (MPS). Cada envío debe incluir:

- 1 copia firmada y 4 originales para Canadá, y 1 copia firmada y 2 originales para Puerto Rico.
- La información del agente (incluida la designación de importador no residente [NRI], si corresponde) debe estar en el recibo comercial.
- El recibo comercial también debe tener los detalles del contrato para su destinatario, incluido un número de teléfono.
- El destinatario automáticamente es el importador registrado (IOR), a menos que se designe de otro modo en el recibo comercial.

**Opciones de agente y facturación entre EE. UU. y Canadá**

Funciones que mejorarán su experiencia de envíos y aumentarán la facilidad de envío transfronterizo de paquetes de FedEx International Ground entre EE. UU. y Canadá.

Servicios con agente incluido

Mediante la nueva opción predeterminada de servicio con agente incluido, los envíos de FedEx International Ground le brindan un punto de contacto e inician la liberación aduanal conforme a las reglamentaciones mientras los paquetes siguen en tránsito.

Opción Seleccionar agente aduanal

Si prefiere usar a su propio agente, tiene la opción de hacerlo.

Soluciones flexibles de facturación

Ahora tiene la opción de facturar aranceles, impuestos y tarifas auxiliares al remitente, destinatario o a un tercero.

## Envío de piezas múltiples (MPS)

Un envío de piezas múltiples (MPS) consiste en dos o más paquetes enviados a la misma dirección de destino. El primer paquete en la solicitud de envío se considera el paquete principal.

Para crear un envío de varias piezas:

- Incluya la información de nivel de envío, como *serviceType, packagingType, totalWeight, totalPackageCount* y detalles como *requestedPackageLineItems* para el paquete principal. [Nota: el *sequenceNumber* para el paquete principal debe ser igual a 1].
- Para imprimir la etiqueta por paquete, incluya los detalles de rastreo principal en el elemento *masterTrackingId* para todos los demás paquetes.

Las siguientes son las opciones de procesamiento de envíos de varias piezas disponibles con esta API:

**Imprimir una etiqueta de paquete a la vez**

Esta opción de procesamiento le permite procesar los envíos de MPS y obtener las etiquetas una a la vez. Es un método ideal en caso de que los paquetes se procesen secuencialmente y se deban generar las etiquetas por paquete.

Cuando necesite esta capacidad para sus envíos, proporcione el elemento *oneLabelAtATime como verdadero* en la solicitud de envío, junto con todos los elementos de MPS necesarios.

La salida de la primera solicitud debe generar la etiqueta y el número de rastreo, que es el número de rastreo principal. Proporcione este número de rastreo principal en el elemento *masterTrackingId* para procesar la solicitud de envío subsecuente y generar etiquetas con números de rastreo (números de rastreo secundarios) para el conteo total de paquetes definido (*groupPackageCount*).

*Nota:*

- *Los paquetes máximos permitidos en esta opción de procesamiento son 200.*
- *Los documentos/informes de envío finales se generarán si sequenceNumber es igual a groupPackageCount.*

**Imprimir todas las etiquetas de paquete a la vez**

Esta opción de procesamiento le permite procesar los envíos de MPS y obtener las etiquetas de una sola vez. Cuando se selecciona esta opción, sus envíos se procesarán de forma sincrónica o asincrónica, dependiendo del número de paquetes o de las mercancías a nivel de paquete en su envío.

Proceso sincrónico de envío

El procesamiento sincrónico es uno de los métodos de procesamiento ideales que se usa internamente cuando un envío tiene 40 paquetes o menos (*groupPackagecount<=40*) con mercancías limitadas en el envío y *oneLabelAtATime* como *falso*.

Las solicitudes de envío con 40 paquetes o menos se procesarán sincrónicamente y las etiquetas y otros documentos/informes de envío se generarán de manera instantánea. Este proceso es ideal para los remitentes si tienen una restricción de tiempo y si se deben imprimir las etiquetas de inmediato.

*Nota: el límite máximo de paquetes de 40 es indicativo y no es un límite fijo. El límite también depende de la combinación de paquetes y mercancías en el envío. Para obtener más información, comuníquese con su equipo de Soporte de FedEx.*

*Ejemplo:* su solicitud de envío consiste en 10 paquetes, cuando se envíe, se procesará sincrónicamente. En la respuesta se crearán 10 etiquetas y se proporcionarán etiquetas de URL o etiquetas codificadas, según lo solicitado en la respuesta.

El siguiente flujo de trabajo de alto nivel demuestra el procesamiento de envío sincrónico:

- Use el extremo ***Crear envío*** para crear un envío con 1 a 40 paquetes.
- Una solicitud exitosa debe generar las etiquetas y la respuesta de salida tendrá las etiquetas de URL o etiquetas codificadas, según lo solicitado.
- Si el envío tiene errores, los detalles de los errores se mostrarán en la respuesta.
- Después de corregir los errores, vuelva a crear y enviar el envío para una respuesta exitosa.

*Nota:*

- *En este método, si necesitas agregar más paquetes a un envío existente, solo puedes agregar hasta un total de 40 paquetes.*
- *En la solicitud de procesamiento sincrónico, el valor predeterminado para el elemento **processingOptionType** es **SYNCHRONOUS_ONLY** y el envío se procesará sincrónicamente, incluso si el elemento anterior no se proporciona o el valor pasado en la solicitud es **SYNCHRONOUS_ONLY** o **ALLOW_ASYNCHRONOUS**.*

Procesamiento asincrónico de envíos

Use la opción de procesamiento asincrónico cuando el envío de paquetes exceda 40 *totalPackageCount>40*. Este es un método muy conveniente cuando el volumen de paquetes es grande y desea enviar los envíos en lote periódicamente. Este envío en lote usa varios recursos y operaciones de FedEx que son costosos cuando se envían a la vez. Con esta opción de procesamiento, FedEx garantiza internamente que estos envíos en lote se procesen y usted puede obtener los datos de las etiquetas periódicamente.

Cuando se procesa la transacción asincrónicamente, la respuesta a esta solicitud solo confirma que la solicitud se puso en espera de manera exitosa, pero el envío podría no procesarse con éxito y también devuelve una *jobid* para recuperar el resultado después.

*Nota: este proceso requiere algo de tiempo para que el envío se procese con éxito antes de recuperar el resultado.*

Para recuperar el resultado asincrónico del envío, usa el extremo «Recuperar envío asincrónico» y proporciona la *jobId* y los detalles del *accountNumber* en la solicitud. La respuesta a esta solicitud arrojará los datos del resultado del envío con detalles de la etiqueta o detalles de error del envío.

*Ejemplo:* tu envío consiste en 45 paquetes y cuando se envíe se procesará de manera asincrónica. En respuesta, se arrojará una *jobId*. Entonces, deberás usará el extremo *«Recuperar envío asincrónico»* para recuperar el resultado del envío y obtener los datos de la etiqueta.

El siguiente flujo de trabajo de alto nivel demuestra el procesamiento del envío asincrónico:

- Use el extremo ***Crear envío*** para crear un envío con más de 40 paquetes.
- Especifique todos los detalles del envío que sean necesarios, junto con el elemento *processingOptionType*, como*ALLOW_ASYNCHRONOUS*, y especifique el elemento*labelResponseOptions* como *ETIQUETA*.
- El envío exitoso proporcionará una *jobId*.
- Use la *jobId* y *accountNumber* para recuperar los resultados de salida, usando el extremo ***Recuperar envío asinc***.
- La salida exitosa proporcionará los datos de resultado y los detalles de la etiqueta.
- Si el resultado tiene errores, los detalles de los errores se mostrarán en la respuesta.
- Después de corregir los errores, vuelva a crear y enviar el envío para una respuesta exitosa.

*Nota:*

- *En este método, para una única solicitud el máximo total de paquetes permitidos es de 300.o hasta 999 mercancías.*
- *En este método, una vez que se envía la solicitud, no puede agregar, modificar ni eliminar paquetes de la solicitud original.*
- *Si hay errores en la respuesta de envío asincrónico, no puede volver a confirmarlo o arreglarlo en la misma solicitud de envío. Debe modificar o arreglar los errores y enviar una nueva solicitud de envío*

## Envío de devoluciones

Las devoluciones están disponibles para los envíos nacionales e internacionales en diversas áreas, donde estén disponibles los servicios de FedEx Express. Puede asociar o «vincular» un envío saliente con un envío de devolución con los números de rastreo. Cuando procese su paquete de devolución global con la automatización de FedEx, será necesario que indique un motivo para dicha devolución con fines de liberación aduanal, tanto en los envíos salientes como de devolución, cuando procese su paquete. Identifique su paquete como una devolución e incluya el tipo de devolución. Seleccione la razón correcta de la devolución en la siguiente tabla.

| **SALIENTE ¿Cuál es el motivo para incluir una etiqueta de devolución?** | **DEVOLUCIÓN ¿Cuál es el motivo de la devolución?** | **¿Cuándo utilizar?** |
|---|---|---|
| Etiqueta de devolución de cortesía | Mercadería rechazada | Seleccione estos dos motivos cuando incluya una etiqueta de devolución para su cliente en el envío, pero que en general no espere devoluciones. |
| Para exposición/feria comercial | Devoluciones de exposición/feria comercial | Seleccione estas dos razones cuando las mercancías que esté enviando sean para una muestra, exposición, feria comercial o evento. |
| Artículo para préstamo | Devolución de artículo prestado | Seleccione estas dos razones cuando las mercancías que esté enviando sean para uso temporal del destinatario que se las devolverá en un estado inalterado. |
| Para reparación/procesamiento | Devoluciones para reparación/procesamiento | Seleccione estos dos motivos cuando las mercancías que esté enviando se repararán o de otro modo procesarán antes de que se le devuelvan. El procesamiento puede incluir, entre otras cosas, la modificación, incorporación o tratamiento de alguna clase. |
| Artículos para utilizar en una prueba | Devoluciones de prueba | Seleccione estos dos motivos cuando las mercancías que esté enviando sean para una prueba y se le devolverán. |
| Reemplazo | Artículo defectuoso que se envía | Seleccione estos dos motivos cuando envíe un artículo de reemplazo antes de recibir de vuelta un artículo defectuoso. |
| Exportación temporal: otros | Devolución: otros | Seleccione estos dos motivos cuando no aplique ninguno de los otros motivos indicados. Cuando seleccione estos motivos, podrá indicar su motivo exacto para la devolución. |
| Tras la reparación/procesamiento (FollowingRepair/Processing) | N/A | Seleccione este motivo cuando el destinatario de las mercancías le envió antes el artículo para reparación; sin embargo, no habían enviado antes con FedEx. |

Una vez generado el envío de devolución, puede rastrearlo mediante las aplicaciones de rastreo disponibles, aumentando así el plazo de visibilidad.

Las soluciones de Devolución de FedEx® proporcionan dos métodos de procesamiento de etiquetas de devolución: etiquetas de devolución de FedEx y pestañas de devolución de FedEx.

- Las soluciones de etiquetas de devolución de FedEx le permiten generar etiquetas de devolución impresas o etiquetas de devolución por correo electrónico, o utilizar etiquetas preimpresas (sellos facturables y programas de devoluciones de paquetes de Ground).
- Etiqueta de devolución impresa de FedEx: cree e imprima una etiqueta de devolución, después, inclúyala en el envío original a su cliente o en una correspondencia separada. Más adelante, su cliente puede usar esta etiqueta en el paquete, según sea necesario, y dejarlo en el punto de entrega de FedEx más cercano.
- Etiqueta de devolución por correo electrónico de FedEx: envíe por correo electrónico a sus clientes un URL de [fedex.com](http://www.fedex.com/) protegido por una contraseña al que pueden acceder para imprimir una etiqueta de devolución directamente desde su computadora. El cliente recibe un correo electrónico con un enlace a la etiqueta, después, imprime la etiqueta, la coloca en el paquete y lo entrega en el punto de entrega de FedEx más cercano.
- Las etiquetas de devolución impresas no caducan y son válidas para transporte en cualquier momento. Sin embargo, si la etiqueta tiene una antigüedad de más de 255 días, entonces, el cliente no podrá rastrear el envío, aunque la etiqueta todavía pueda usarse.
- Soluciones de Etiqueta de Devolución de FedEx (Etiqueta de FedEx Express® y etiqueta de llamada de FedEx Ground®) proporcionan etiquetas de devolución generadas por FedEx al momento de la recolección del paquete. Usted organiza que FedEx cree y entregue etiquetas de devolución de envíos a su cliente y recoja el artículo para devolución. Su cliente simplemente debe tener el paquete listo para la recolección cuando el mensajero de FedEx Express ®llegue. Se imprimirán en el lugar una etiqueta de envío y un recibo para el cliente.
- También puedes programar la recolección para FedEx Express; la recolección es el mismo día o al día hábil siguiente, de lunes a viernes. FedEx hace un intento de recolección como parte del servicio.
- También puede imprimir instrucciones de devolución para incluir sus envíos salientes usando el detalle de instrucciones de devolución.
- Inmediatamente después de imprimir la etiqueta, el sistema marca la transacción con la fecha de impresión original. La etiqueta está disponible para reimprimirse por un periodo de cinco días después de la impresión antes de ser eliminada.
- Se enviará por correo electrónico un código QR adjunto en el que se incluye la información que los sistemas de FedEx pueden procesar. El código QR no puede escanearse ni usarse por sí solo. Para usarlo, se debe visitar una oficina de FedEx y mostrar el código QR a un empleado de FedEx. Él te ayudará a procesar la información para el envío.

Esta sección describe cómo crear y eliminar solicitudes de etiqueta de devolución de FedEx Express y FedEx Ground, y cómo incluir una etiqueta de devolución de FedEx Express o FedEx Ground en su solicitud de Envío.

**Devoluciones Globales**

El programa devoluciones de FedEx Global amplía la oferta de productos de devoluciones actual al desarrollar una solución de devoluciones globales en todas las regiones (Asia Pacífico, Europa, Medio Oriente y África, América Latina y el Caribe, EE. UU. y Canadá) y dentro de las regiones para las devoluciones nacionales. Esto facilitará el proceso de documentación de las devoluciones al proporcionar una solución saliente/entrante y ofrecer un paquete completo de opciones de la oferta. También admite devoluciones de vuelta al origen original, devoluciones a una nueva ubicación o una devolución dentro del país, cuando estén disponibles.

Brinda la capacidad para que un comerciante solicite una etiqueta de devolución por correo electrónico y documentos comerciales para envíos de devolución internacionales y nacionales fuera de los EE. UU., y ponerlos a disposición del remitente de devolución. Muchas de las mejoras presentadas también se aplican a los envíos nacionales de etiquetas de devolución por correo electrónico en EE. UU., incluidos, entre otros: instrucciones de devolución, notificaciones para el comerciante, documentos comerciales y un periodo de vigencia ampliado (2 años).

**Etiquetas de devolución de FedEx**

FedEx crea y entrega una etiqueta de envío de devolución al cliente y recoge el artículo para la devolución. El cliente debe tener el paquete listo para la recolección cuando llegue el conductor de FedEx. Use la API de Envío para crear y borrar etiquetas de devolución para envíos de FedEx Express y FedEx Ground.

Antes de crear una etiqueta de devolución para envíos de FedEx Express, puede usar la disponibilidad de etiquetas Express desde el extremo de etiquetas de devolución para consultar los tiempos de recolección válidos.

Detalles del servicio de etiquetas de devolución

Para FedEx Ground, se harán hasta tres intentos de recolección y para FedEx Express, un intento de recolección para una etiqueta de devolución antes de que se cancele.

Los siguientes detalles del servicio se aplican a las etiquetas de devolución.

- Área de entrega

  - Disponible para las entregas de FedEx en los 50 estados de los EE. UU.
  - Las etiquetas de devolución de FedEx Express y FedEx Ground no están disponibles para envíos internacionales.
  - Se permiten ubicaciones comerciales y residenciales.
  - Las devoluciones nacionales también están disponibles.

- Excepciones

  - No hay servicio transfronterizo desde o hacia Canadá y Puerto Rico.
  - Materiales peligrosos de FedEx Ground EE. UU.
  - No se pueden hacer envíos de hielo seco y mercancías peligrosas.

- Información adicional

  - Las opciones de servicios adicionales incluyen recolección residencial.
  - El valor máximo declarado es de 25 000 $ USD

Para obtener información más detallada sobre los servicios que ofrece FedEx, consulte la [Guía de Servicios FedEx](https://www.fedex.com/en-us/service-guide.html) en formato electrónico.

Reglas de las etiquetas de devolución

Los siguientes detalles se aplican a las etiquetas de devolución:

- Puede solicitar una etiqueta de devolución en una sola solicitud.
- Puede solicitar hasta 99 piezas en una solicitud de etiquetas de devolución de múltiples piezas.
- No se requiere manifiesto de Ground
- Los envíos de etiquetas de FedEx® Express se pueden asociar a un envío saliente mediante el elemento de asociación «Devolver».
- Los envíos de etiquetas de llamada de FedEx Ground® se pueden asociar con un envío saliente mediante el siguiente elemento:

  - Tipo de referencia del cliente como RMA_ASSOCIATION y
  - Valor de referencia del cliente como el número RMA

Etiq. de dev. impresa FedEx

La etiqueta de devolución impresa de FedEx es ideal para productos minoristas, documentos legales, productos farmacéuticos y servicios de garantía/reparación. Use el extremo Crear envío a fin de imprimir una etiqueta de devolución e incluirla en el envío original para su cliente o envíela por separado. Para usar la etiqueta de devolución impresa, su cliente simplemente prepara su paquete para envío y coloca la etiqueta de devolución. Después, pueden entregar el paquete de FedEx Express® EE. UU. o internacional, o el paquete de FedEx International Ground® a FedEx mediante una recolección programada, usando una recolección programada regularmente, o al visitar un punto de entrega de FedEx.

Asimismo, puede incluirse un número de referencia de Autorización de material de devolución (RMA) en tu transacción de envío. El número de RMA se imprime en las etiquetas como código de barras y en formato legible para el ser humano cuando se agrega a la referencia RMA_Association de una etiqueta de devolución. También se imprime en tu factura FedEx y puede usarse para rastrear el paquete de devolución. Las etiquetas de devolución de FedEx Express y FedEx Ground son intercambiables, sin importar el servicio de envío original. Por ejemplo, puedes enviar el envío original usando el servicio de FedEx Express, pero incluir una etiqueta de devolución de FedEx Ground como parte de tus documentos de embalaje.

Detalles del servicio de etiqueta de devolución impresa de FedEx

Los siguientes detalles del servicio aplican a las etiquetas de devolución de FedEx Express y FedEx Ground:

- En EE. UU., las etiquetas de devolución están disponibles para First Overnight®, FedEx Priority Overnight®, FedEx Standard Overnight®, FedEx 2Day®, FedEx 2Day®A.M., FedEx Ground® y FedEx Home Delivery® en los 50 estados de los EE. UU.
- Para destinos internacionales, las etiquetas de devolución impresas están disponibles para FedEx International First®, FedEx International Priority® y FedEx International Ground®.
- Las opciones de servicio adicionales incluyen servicio en sábados, envíos de hielo seco y «Retener en una oficina».
- No se pueden enviar mercancías peligrosas ni materiales peligrosos.
- El valor máximo declarado es de

  - 1 000 $ USD para FedEx First Overnight, FedEx Priority Overnight, FedEx Standard Overnight y FedEx 2Day.
  - 100 $ para FedEx Ground y FedEx Home Delivery.

Para obtener información más detallada sobre los servicios que ofrece FedEx, consulte la [Guía de Servicios FedEx](https://www.fedex.com/en-us/service-guide.html) en formato electrónico.

Dirección alternativa de devolución

La API de Envío ofrece una opción de dirección de devolución alternativa que le permite anular su dirección de remitente e imprimir una dirección diferente en la etiqueta de envío. Por ejemplo, si envía un paquete que no puede entregarse, puede utilizar esta opción para mostrar la dirección de su oficina de procesamiento de devoluciones a fin de que FedEx devuelva el paquete a dicha dirección en lugar de a la dirección de su oficina de envío.

*Nota: el país especificado en la dirección de devolución alternativa no puede ser diferente del país del remitente de origen.*

## Flujo de envíos

FedEx sigue un proceso paso a paso para hacer envíos de un lugar a otro. El flujo de trabajo de los envíos que se sigue es el siguiente:

**Preparar/crear el envío**

Crear el envío es el primer paso en el proceso del flujo de los envíos. Antes de enviar los productos, el remitente debe elegir qué productos requiere y hacer el pedido con el fabricante. FedEx proporcionará una fecha de envío declarando cuándo estarán listos los productos para su recolección y el recibo comercial del pedido. Contiene información como los detalles del envío, incluida la fecha de envío, direcciones de origen y destino detalladas, así como las dimensiones del paquete.

Si hay requisitos especiales, como el envío de mercancías peligrosas o hielo seco, FedEx ofrece servicios especiales para estos propósitos.

Usa el campo opcional processingOptions para solicitar una cotización de tarifa y la información de los recargos de las recolecciones a petición, que se cobran por parada*. Incluye los campos requestType y pickupDetails y obtén esta información para el mismo día o para fechas futuras.

**Solo aplica para los EE. UU. (no aplica para Puerto Rico ni ningún otro territorio estadounidense) y Canadá. Para obtener más información, consulta*[*Red 2.0: optimización de tu experiencia de recolección y entrega | FedEx*](https://www.fedex.com/en-us/network-2-0.html#streamlined-pickup-pricing).

**Enrutamiento**

La información de enrutamiento ayuda a crear y computar las rutas planificadas para las operaciones de campo. Ayuda a desarrollar rutas que cubren todas las entregas y recolecciones desde y hacia diferentes clientes, así como encontrar las rutas más eficientes.

**Rastreo**

El rastreo le ayuda a monitorear las mercancías de sus envíos en transporte, según sus ubicaciones, es decir, la ubicación anterior, actual y siguiente. Recibirá información en tiempo real sobre su paquete a medida que se mueva hacia su destino.

Puedes utilizar la opción de tipo de evento de la notificación de servicios especiales de envío para configurar y personalizar las notificaciones de rastreo de los eventos que se recibirán para un envío. Utiliza un tipo de evento de la notificación para hacer que FedEx te notifique automáticamente a ti y a tu cliente o a un tercero. Las notificaciones se envían por correo electrónico y contienen eventos importantes de tu envío, como retrasos por liberación aduanal, intentos de entrega, liberaciones y preavisos. Puedes recibir notificaciones por correo electrónico para los siguientes eventos:

- Se está creando un envío
- Fecha de entrega estimada
- Se depositó un envío
- Cualquier excepción
- Entrega del envío

Es obligatorio que especifiques los correos electrónicos de los destinatarios con la solicitud de envío y que utilices uno o todos los tipos de notificación si quieres que se envíe una notificación por correo electrónico a los destinatarios. Esta notificación es compatible con FedEx Express, FedEx Ground y FedEx Ground® Economy. FedEx también ofrece una nueva notificación por correo electrónico para una entrega estimada, que desencadena un correo electrónico en la fecha de entrega. La información clave a ingresar en relación con esta solicitud es la siguiente:

- Nombre del remitente
- Correo electrónico
- Eventos de la notificación

Haz clic aquí para obtener más información sobre los [«Tipos de eventos de notificación».](https://developer.fedex.com/api/en-us/guides/api-reference.html#notificationeventtypes)

El resultado exitoso de esta solicitud iniciará los avisos de las notificaciones en los eventos indicados y los enviará a la dirección de correo electrónico proporcionada.

**Tarifas**

Cuando solicite cotizaciones de tarifas, es importante que especifique los detalles del envío. Esto incluye la fecha, las direcciones de origen y destino detalladas, así como las dimensiones de su envío. Al proporcionar estos detalles precisos, se asegurará de recibir las cotizaciones correctas para su mercancía. Si tiene requerimientos especiales, como enviar mercancías peligrosas, debe dejar claros dichos requerimientos.

**Etiquetado**

Las etiquetas describen y especifican lo que hay dentro de un paquete. Las etiquetas de envío pueden variar, dependiendo del transportista que use.

Por lo general, las etiquetas de envío incluyen la siguiente información:

- dirección de origen o devolución
- dirección de destino
- Peso del paquete
- clase de envío
- número y código de barras de rastreo electrónico

**Referencias del cliente**

Si tu compañía requiere el número de la orden de compra o cualquier otra referencia interna para que aparezca en cada factura de envío, puedes usar el campo Referenciasdelcliente. Tu implementación puede especificar que este campo es obligatorio durante la creación de la guía aérea (AWB).

En algunas organizaciones, la falta de información en referencias del cliente puede causar que se rechace la factura y se retrase el procesamiento del pago. Las implementaciones que usan este campo ayudan a garantizar que todos los envíos incluyan correctamente el número de orden de compra o la referencia interna que usa tu compañía, permitiendo así un proceso de pago más sencillo. Los usos para la referencia del cliente incluyen:

- **Orden de compra interna (P_O_NUMBER)** *Se usa para vincular el envío con la documentación de compra para los propósitos de comparación y auditoría.*
- **Referencia interna de envío (CUSTOMER_REFERENCE)** *Se usa como el identificador único de envío para vincular un envío de devolución y el envío original, o para vincular los eventos de la guía aérea con el registro de envío de tus sistemas internos.*
- **Centro de costos interno (DEPARTMENT_NUMBER)** *Se usa para asignar las cargas al departamento, presupuesto o entidad de contabilidad correcta dentro de tu organización.*

## Normas comerciales

**FedEx Express EE. UU.**

- Se requiere una ID con fotografía emitida por el gobierno para la recolección para todos los servicios de FedEx.
- El servicio FedEx SameDay® City sólo está disponible para ciudades seleccionadas de México.
- El servicio de FedEx Express Saver® está disponible en todos los estados, excepto Alaska y Hawái.
- El servicio FedEx 2Day®A.M. está disponible en los 50 estados (en Hawái solo saliente).
- El servicio FedEx Express en EE. UU. está disponible en los 50 estados de los Estados Unidos de América. Los tiempos en tránsito varían dependiendo del destino del paquete y el servicio que elija.
- Los paquetes hasta 31,75 kg se pueden enviar usando el servicio de FedEx Ground® Economy.
- FedEx proporciona embalaje personalizable para envíos de FedEx Express. Puede elegir enviar usando FedEx® Envelope, FedEx® Pak, FedEx® Box, o FedEx® Tube. También puede enviar usando su propio embalaje.
- Se pueden hacer envíos comerciales y residenciales usando los servicios de FedEx Express en EE. UU. Los paquetes residenciales deben identificarse en su transacción de envío.
- Hay varias opciones disponibles para que facture los cargos de la transacción. Estas opciones de facturación incluyen la cuenta FedEx de facturar al remitente, la cuenta FedEx de facturar al destinatario, FedEx Ground® COLLECT y la cuenta FedEx de facturar a tercero.
- El límite máximo de tamaño para un paquete de FedEx Express en EE. UU. es 68 kg y 3,02 m de longitud, o 4,19 m totales de largo más circunferencia (L + [2 veces] ancho + [2 veces] alto).

**Envíos FedEx Ground en EE. UU.**

Las siguientes normas se aplican a FedEx Ground en los EE. UU.:

- Los envíos pueden originarse y entregarse en los 50 estados de los Estados Unidos. Entrega entre 1 y 7 días hábiles en los EE. UU. continentales y entre 3 y 7 días hábiles hacia y desde Alaska y Hawái.
- Los servicios de FedEx Home Delivery proporcionan entregas al final del día disponibles en cada dirección residencial de EE. UU., de lunes a viernes, a la mayoría de las residencias en sábados y a muchas en domingo.
- FedEx Ground no hace envíos a apartados postales. No materiales peligrosos, excepto ORM-D y de cantidad limitada.
- El servicio de FedEx Ground® está disponible en cada dirección comercial en los 50 estados (solo servicio entrante para ciertas ubicaciones remotas en Alaska y Hawái).
- El servicio de FedEx Home Delivery® está disponible en cada dirección residencial de los EE. UU. Se pueden enviar paquetes de hasta 68 kg con este servicio.
- FedEx Ground acepta paquetes de hasta 68 kg. Las dimensiones del paquete no deben superar los 2,7 m de largo ni 4,1 m de largo más la circunferencia (L + [2 veces] ancho + [2 veces] alto).
- Se permiten envíos de materiales peligrosos con restricciones. No pueden enviarse materiales peligrosos hacia o desde Alaska y Hawái.
- Si el paquete se debe enviar a un comercio, use FedEx Ground como el tipo de servicio. Si el paquete se debe enviar a una residencia, use FedEx Home Delivery como el tipo de servicio.
- Cuando envíe paquetes de FedEx Ground en EE. UU., debe ingresar una dirección de envío válida para una ubicación comercial o de negocios dentro de los cincuenta estados de los EE. UU.
- Use el servicio de FedEx Home Delivery cuando envíe paquetes a direcciones residenciales en los EE. UU. FedEx Ground designa el servicio de FedEx Home Delivery como el transportista para entregas residenciales de menos de 68 kg.
- La dirección del remitente y la dirección del destinatario para envíos de FedEx Ground deben contener una ciudad y estado de EE. UU.
- No ingrese un apartado postal de USPS como una dirección de entrega.

*Nota: el número de cuenta del remitente debe activarse para la funcionalidad Ground Residential. Una vez que se habilita el número de cuenta, el cliente puede especificar un tipo de servicio de Ground, en lugar de Ground Home Delivery, para un envío que pese menos de 68 kg y el destino sea una dirección residencial.*

**Envío internacional**

- La liberación aduanal se incluye en los servicios de envío.
- Tamaño y peso del paquete de hasta 68 kg cada uno; 2,7 m de longitud, 3,3 m de longitud más circunferencia (L + [2 veces] ancho + [2 veces] alto) para FedEx International Priority, FedEx International Economy y FedEx International First®.
- El servicio International First de FedEx proporciona entregas entrantes a códigos postales de EE. UU. seleccionados desde 60 países en 1 o 2 días hábiles.
- Las siguientes opciones de servicio están disponibles para envíos de FedEx Express International: dirección alternativa de devolución, control de destino comercial, mercancías peligrosas, FedEx Express International Saturday, envíos de hielo seco, opciones con entrega certificada, FedEx InSight, FedEx International Broker Select®, número de cuenta oculto (FedEx International Ground), datos ocultos, notificación de envíos en la solicitud y cargos por manejo variables.
- Las opciones de embalaje FedEx 10kg Box o FedEx 25kg Box están disponibles. El límite de peso es de 9,97 kg para una FedEx 10kg Box y 24,94 kg para una FedEx 25kg Box. Estas opciones de embalaje se permiten para FedEx International Priority® a más de 220 países y territorios.
- En el caso de envíos de múltiples piezas (MPS) por FedEx Express International, si uno de los paquetes es un documento, todos los paquetes del envío deben ser documentos. Esto también sucede con los envíos de mercancías. Todos los paquetes deben contener mercancías. Los paquetes de mercancías y documentos no pueden estar en el mismo envío de MPS.

**Envío nacional**

- Se requiere un contrato para utilizar el servicio FedEx SameDay City
- Las guías aéreas manuales no se encuentran disponibles con el servicio SameDay City. Este servicio sólo está disponible para ciudades seleccionadas de México. Este no es el servicio de FedEx SameDay nacional de los EE. UU.
- Antes de enviar materiales peligrosos, debes estar validado para hacerlo.
- El servicio de FedEx Ground no incluye paquetes de más de 68 kg, paquetes de materiales peligrosos de más de 31,75 kg, paquetes de ORM-D/de cantidad limitada de 29,93 kg, paquetes que excedan los 2,7 m de longitud o los 4,1 m de longitud más circunferencia (L + [2 veces] ancho + [2 veces] alto) y envío especial adicional de «Retener en oficina» con materiales peligrosos o envío de ORM-D/de cantidad limitada.
- Estas no son opciones de pago de COD válidas: cheques de viajero, tarjetas de crédito, cheques de mostrador y cheques endosados a terceros o cheques pagaderos a FedEx.

**Creación de etiquetas**

- La API FedEx le permite imprimir etiquetas de envío para todos los tipos de envío, como FedEx Express®, FedEx Ground® y FedEx International Ground® utilizando una variedad de impresoras de etiquetas térmicas.
- Todas las etiquetas térmicas necesarias para un envío se generan y devuelven en un búfer simple.
- Las etiquetas pueden reimprimirse enviando el búfer de la etiqueta térmica original a la impresora. Sin embargo, las etiquetas deben reimprimirse solo si la etiqueta original se daña o pierde antes de que el paquete se recoja o como una copia para su archivo. Las etiquetas duplicadas aplicadas a paquetes causarán un reetiquetado y, en algunos casos, la suspensión de su capacidad de envío.
- Las etiquetas impresas con una impresora láser se generan en formato PDF y no es necesario cambiar su tamaño o su escala.
- Se requiere Adobe Reader 6.0 o superior para procesar la etiqueta. Los controladores de la impresora deben tener configurado el escalado de página en «ninguno».
- No es necesario usar un envoltorio HTML para mostrar una etiqueta PDF en papel normal en un navegador.
- No se aceptarán las etiquetas láser si se imprimen en una impresora de inyección de tinta. Si usa una impresora láser a color, la definición del color debe establecerse en negro, aun si la impresora solo tiene un cartucho negro instalado.
- FedEx devuelve una etiqueta láser por solicitud de envío, con la excepción de las etiquetas COD.
- Si necesita imprimir múltiples etiquetas (por ejemplo, envíos internacionales que necesitan copias adicionales de etiquetas de envío para acompañar la documentación de liberación de aduana), debe solicitar copias adicionales.
- Nota: para todos los envíos de México a México, si no se especifica ningún idioma, los términos y las condiciones legales se proporcionarán en español.
- Las etiquetas pueden reimprimirse enviando el PDF original a la impresora. Todas las etiquetas necesarias se generan con una llamada al Servidor de etiqueta común (CLS) de FedEx y el CLS devuelve un búfer simple con la excepción de las etiquetas de devolución del COD.
- El contenido legible para el ser humano de la etiqueta y el código de barras en la parte común de la etiqueta no pueden alterarse.
- La API ofrece imágenes en formato de gráfico de red portátil (PNG) para las etiquetas FedEx Express y FedEx Ground.
- Las etiquetas personalizadas PNG de 10 cm x 15 cm solo deben usarse con etiquetas adhesivas.
- Las impresoras de inyección de tinta no deben utilizarse por la inconsistencia en la creación de códigos de barras escaneables.
- Para la creación de envíos, se deben cumplir las siguientes condiciones:

![Tariff_Changes_Updated](https://developer.fedex.com/api/content/dam/fedex-com/irc/businessdocimages/Tariff_Scenario_Updated.PNG)

## Colección de JSON de la API

Cree una ID de usuario para acceder a las API de FedEx.
