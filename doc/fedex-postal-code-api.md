# Postal Code Validation API — Documentación (FedEx)

> **Portal:** <https://developer.fedex.com/wirc/browser/#/en-us/catalog/postal-code/docs>  
> **Contenido servido por:** `https://developer.fedex.com/api/en-us/catalog/postal-code/v1/docs.html`  
> **Capturado:** 2026-09-02 · Locale: `en-us` · Versión de la API: **v1**

---

## Contenido

- [Introduction](#introduction)
- [Postal Code Validation API Details](#postal-code-validation-api-details)
- [How Postal Code Validation API works](#how-postal-code-validation-api-works)
- [Business Rules](#business-rules)
- [JSON API Collection](#json-api-collection)

---

## Introduction

FedEx Postal Code Validation API enables FedEx customers to validate postal codes and get the service commitments. It supports city, postal, country and Origin-Destination related lookups and the validations. It returns verified postal and location details in the reply.

## Postal Code Validation API Details

The Postal Code Validation validates the postal codes for countries and cities and provides the cleaned postal code as a response. The correctly formatted postal codes are mandatory to process a shipment or create shipping labels.

This API uses the provided input information such as ship date, postal code, country code and other various information and checks for mismatch between state and city values. The City and State is set if a mismatch is found and if country is U.S. or CA. For examples: FDXE - FedEx Express®, FDXG - FedEx Ground® and FXSP - FedEx Ground® Economy (Formerly known as FedEx SmartPost®). The API validates the given input and provides location details and cleaned postal code.

FedEx supports services to both postal aware countries and non-postal aware countries.

**Postal aware countries**

Shipments to these countries should include the postal codes on the airway bills and other documentation to help reduce delays and maximize efficiency. FedEx Express customers should be encouraged to include valid postal codes in their addresses for recipients located in the below countries.

For more information on the Postal aware countries refer to [Postal Aware Countries](https://developer.fedex.com/api/en-us/guides/api-reference.html#postalawarecountries).

**Non–Postal aware countries**

As the name suggests, there are non-postal aware countries supported by FedEx that do not mandate postal codes in their shipments. State code or city name is enough when customer is shipping to a country which does not have a postal code. If validation error occurs for a country that does not use ZIP codes, try to force the address through by entering \"00000\" as a replacement postal code. Using this false postal code should not cause issues, as it does not exist.

The following are the benefits of using FedEx Postal Code Validation API:

- Reduces Shipping delays and increases efficiency.
- Increases number of on-time and complete deliveries.
- Improves FedEx service to urban areas, offering flexibility in cutoff times and pickup schedules.

## How Postal Code Validation API works

The FedEx Postal Code Validation uses the below endpoint to validate the postal codes for cities, countries and origin-destination. The following section describes the key inputs and responses for the endpoint:

**Validate Postal**

This request is used to return postal details, cleaned postal code and location description based on input details. The key input information associated with this request are as follows:

- carrierCode
- countryCode
- stateOrProvinceCode
- postalCode
- shipDate

The successful result of this request are *locationdetails* and *cleanedpostalcode* for the provided input. The request would fail if the postalcode is not valid for example CountryCode, State/Province and ZIP/Postal code combination is not valid.

**Clarification of Common Misconceptions**

- It is not possible to cross-reference territory alignment to ZIP/postal alignment because these are distinctly separate alignment process outputs.
- Not all geographic locations in the world have postal or ZIP codes.

For more information on the Region Specific list, refer to [Region Specific Service List.](https://developer.fedex.com/api/en-us/guides/api-reference.html#regionspecificserviceslist)

## Business Rules

- Combination of number, street name, etc. At least one line is required for a valid physical address; empty lines within the address are not allowed.
- 2-letter State or province code is required if recipient country is U.S. or Canada, or if EEI applies and country is Mexico {MX}.
- Descriptive data for a physical location, may be used as an actual physical address (place to which one could go), or as a container of \"address parts\" which should be handled as a unit (such as a city state-ZIP combination within the U.S.).
- Format and presence of postal code field will vary depending on country.

## JSON API Collection

Get access to FedEx APIs by creating a user ID.
