# Estimate Duties and Taxes API — Documentación (FedEx)

> **Portal:** <https://developer.fedex.com/wirc/browser/#/en-us/catalog/dutiestaxes/docs>  
> **Contenido servido por:** `https://developer.fedex.com/api/en-us/catalog/dutiestaxes/v1/docs.html`  
> **Capturado:** 2026-09-02 · Locale: `en-us` · Versión de la API: **v1**

---

## Contenido

- [Estimate duties and taxes](#estimate-duties-and-taxes)

---

The Estimated Duty and Tax API provides real-time duty, tax, and fee estimates for international shipments at the commodity or shipment level. This enables you to make informed decisions before shipping internationally. This endpoint’s responses are not guarantees or promises and should only be considered estimates.

*Note*: This API uses artificial intelligence to match your commodity description with a harmonized code to get the most accurate estimates possible. Its results are only estimates. When creating shipments, validate these results and include them at your own risk. Accurate classifications are ultimately determined by the licensed customs brokers that you use and the customs authorities involved in the shipment.

## Estimate duties and taxes

To estimate duties and taxes, at minimum, you must provide country-related information about the shipper and recipient along with a quantity, price, and description of the commodity.

The following fields are required in a `DutiesTaxesEstimates` request. The `commodities` field is an array, so you can provide multiple items in a single request.

- `shipper.countryCode`: The country from which the commodity will be shipped. Provide the ISO code for the country. For example, “US” or “CA.”

  - `countryCode.stateOrProvinceCode` is required for Canada and Brazil.

- `recipient.countryCode`: The destination country to which the commodity will be shipped. Provide the ISO code for the country. For example, “JP” or “CA.”

  - `countryCode.stateOrProvinceCode` is required for Canada and Brazil.

- `commodities.description`: A description of the commodity.
- `commodities.quantity`: The number of units of the commodity. Quantity and price are used to calculate duties and taxes.
- `commodities.unitPrice.amount`: The price value of one unit of the commodity. Price and quantity are used to calculate duties and taxes.
- `commodities.unitPrice.currencyCode`: The three-letter code for the currency. For example, “USD.”

Provide additional information so that shipping costs are included in your estimate. The following fields are optional, but can be included in a `DutiesTaxesEstimates` request for a more complete and estimate and improved accuracy:

- `shipmentPurpose`: The intended purpose of the shipment. Provide one of the available enumeration values. For example, “GIFT” or “FOR_RESALE.”
- `serviceType`: The FedEx shipping service associated with the shipment cost.
- `shippingCost.amount`: The cost of the shipment. Providing this cost helps improve accuracy for countries that levy duties or taxes on shipping.
- `commodities.commodityName`: A name for the commodity.
- `commodities.countryOfManufacture`: The country in which the commodity was manufactured. Provide the ISO code for the country. For example, “VN.”
- `commodities.harmonizedCode`: The ten-digit harmonized code for the commodity, if known. For example, “6404.11.2030.”

A response to a successful request returns duties, fees, taxes, and a summary that includes totals by type and a grand total for the commodity or shipment. Details for each duty, tax, and fee include descriptions, notes, and the formula used to calculate the amount.

Get access to FedEx APIs by creating a user ID.
