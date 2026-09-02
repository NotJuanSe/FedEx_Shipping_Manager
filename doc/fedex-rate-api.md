# Rate and Transit Times API — Documentación (FedEx)

> **Portal:** <https://developer.fedex.com/wirc/browser/#/en-us/catalog/rate/docs>  
> **Contenido servido por:** `https://developer.fedex.com/api/en-us/catalog/rate/v1/docs.html`  
> **Capturado:** 2026-09-02 · Locale: `en-us` · Versión de la API: **v1**

---

## Contenido

- [Introduction](#introduction)
- [FedEx Rates and Transit Times API Details](#fedex-rates-and-transit-times-api-details)
- [**Benefits of the FedEx Rates and Transit Times API:**](#benefits-of-the-fedex-rates-and-transit-times-api)
- [How FedEx Rates and Transit Times API Works](#how-fedex-rates-and-transit-times-api-works)
- [FedEx Special Rates](#fedex-special-rates)
- [Variable Handling Fees and Charges](#variable-handling-fees-and-charges)
- [Business Rules](#business-rules)
- [JSON API Collection](#json-api-collection)

---

## Introduction

This detailed guide will help you to learn all that you need to know about rates and transit times. FedEx provides you the estimated delivery date/time and rate quotes for each service offered.

When requesting rate quotes, it is important to specify the details of the shipment. This will include the date, detailed origin address, destination address, dimensions, and the package weight. By providing these accurate details, you can ensure that you receive the correct quote for your shipment. If you have any special requirements, such as shipping hazardous goods, you must specify these requirements in the shipment details.

*Note: The Rate API does not provide the rate quotes for FedEx freight services.*

## FedEx Rates and Transit Times API Details

When planning your budget, it helps you to know the estimated cost of shipping. FedEx offers a variety of rates to cater to your needs. You can request rates for your FedEx shipments. Apart from that there are list rates, discounts, surcharges, fees and other factors that can affect your shipping rates.

Following are the features associated with this API:

- **Get Quick Rate Quote**Get quick rate quotes and transit times without entering detailed package descriptions.
- **Transit time**Get transit times for services between source and destination.
- **Detailed Rate Quote**Get rate quotes, transit times, including duty and tax estimates for domestic as well as international shipment. Customers must input detailed shipment information, including package dimensions, declared value (DV) amounts, and additional service options. Duty and tax estimates are only available to FedEx customers who are shipping products/commodities, and not documents.

## **Benefits of the FedEx Rates and Transit Times API:**

- Simplifies shipment planning by determining costs and transit times from any origin to any destination worldwide.
- Provides both standard list and account-specific rate quotes for various FedEx services.
- Saves time with quick access to account-specific rates.
- Saves money by comparing rates by service and allowing you to make decisions based on your shipping needs.
- Saves time with quick answers to shipment cost and delivery date questions.

This API provides a shipping rate quote for a specific service combination depending on the origin and destination information supplied in the request. The following details apply:

- Discount rates are available for all services and origin/destination pairs.
- This API returns rate for the origin and destination for the requested service and will not validate whether that service is available for your ship date as well as origin and destination.
- Rates can also be retrieved for intra-Mexico FedEx Express shipping.
- Rates are also available for FedEx Ground® Economy (Formerly known as FedEx SmartPost®) Shipping.
- Service-specific commitment and rate information may also be specified.

For more detailed information about the services offered by FedEx, see the electronic [FedEx Service Guide](https://www.fedex.com/en-us/service-guide.html).

## How FedEx Rates and Transit Times API Works

**Rate and Transit Times**

Request a list of all possible rates quotes and optional transit information based on input details. The required input information associated with this request are:

- Account Number
- Shipment details.

When requesting rates and transit times:

- Include as much detail as possible about your shipment. This information is important for calculating the correct shipping costs with surcharges.
- Use the *RateRequestTypes* element to request specific rates whether LIST or account specific. If you choose LIST as the element value, you receive both account specific and list rates.
- For requesting rate quotes for a single service, specify the service to ensure rate data for the service is returned. Multiple services rates are returned, if you do not include the ServiceType value.
- For carrier specific detailed rates, specify the carrier by using CarrierCode in your request and rate data for all services for the input carrier will be returned, or do not specify a CarrierCode to receive all available services from all carriers in the return.
- Use the *returnTransitTimes* element to include transit time information in the reply. FedEx Express, FedEx Ground and FedEx Home Delivery do include the estimated days and date the package will be delivered, based on the ship date you specified.
- Use the processingOptions element to receive on call pickup rates in the response. The INCLUDE_PICKUPRATES enumeration value must be selected for this request.
- Use the requestType field to receive pick up rate quotes for a future date and same date. If you plan to schedule a pickup for a future date, set the requestType field to FUTURE_DAY, and provide details for the following two fields to get accurate pickup rate quotes back.

  - requestedShipment.pickupDetail.readyDate
  - requestedShipment.pickupDetail.latestPickupDate

- The response for the transit times request for FedEx Ground® Economy (Formerly known as FedEx SmartPost®) will include specific delivery date and day of the week, based on the values specified in the request.
- Information such as carrier code, service type or service option can be used to filter the results.
- Results can be sorted (Element: *rateSortOrder*) in order to get the rate quote data in a desired way/format.

**Rates and Transit Times Response**

Result of this request will provide a list of all possible rate quotes and optional transit information with service code, service types, packaging types and commitment details such as days/time in transit and any specific day delivery (Saturday delivery).

The following are the rates and charges returned in response:

- **LIST Rates** – returns published list rates in addition to account-based (if applicable).
- **PREFERRED Rates** – returns rates in Preferred Currency provided in the request.
- **INCENTIVE Rates** – promotional pricing.
- **ACCOUNT Rates** – account assigned rates
- **Surcharges**
- **Discounts**
- **Fees and Taxes**

*Note: A rate request does not return route. All rate quotes are estimates only and may differ from the actual invoiced amount.*

For more information on discount programs refer to [Discounts.](https://developer.fedex.com/api/en-us/guides/api-reference.html#discounts)

## FedEx Special Rates

**Multiple-Piece Shipment Rates**

This option is available with FedEx Domestic, FedEx International multiple-piece shipments (MPS), FedEx domestic as well as International Ground® MPS, FedEx Express international C.O.D. multiple-piece shipments, and FedEx Ground international C.O.D. multiple-piece shipments.

**U.S. Package Rates: FedEx Express Multiweight®**

FedEx Express multiple-piece shipments may receive a rate on a total-shipment-weight basis if the total shipment weighs 100 lbs. or more (200 lbs. or more for FedEx Express Saver® shipments). A 15-lbs. average minimum package weight for the shipment applies. Multiply the per-pound rate by total shipment weight. The lowest rate out of the FedEx Express Multiweight shipment rate or the sum of the individual price per package will be selected and automatically applied in the billing.

**FedEx One Rate**

FedEx One Rate is flat-rate shipping that does not require you to weigh or measure shipments under 50 lbs. You can choose the box or tube that best fits the size of what they need to ship and fill the package to capacity, as long as the shipment doesn’t exceed 50 pounds. It gives you a simple, predictable, flat rate shipping option for your FedEx Express packages. FedEx One Rate a shipping portfolio based on six FedEx Express Service options, combined with seven FedEx proprietary (white) packaging types.

**FedEx One Rate Packaging**

The FedEx packaging types that are valid/available with the One Rate pricing option are:

- FEDEX_ENVELOPE
- FEDEX_EXTRA_SMALL_BOX
- FEDEX_SMALL_BOX
- FEDEX_MEDIUM_BOX
- FEDEX_LARGE_BOX
- FEDEX_EXTRA_LARGE_BOX
- FEDEX_PAK
- FEDEX_TUBE

Your own packaging is not available for the One Rate pricing option.

For more information about packaging services refer to [Packaging Types](https://developer.fedex.com/api/en-us/guides/api-reference.html#packagetypes)

**How to Specify One Rate Pricing**

To specify FedEx One Rate Pricing Option, perform the following steps:

- Specify the \"FEDEX_ONE_RATE\" Shipment Special Service.
- Specify one of the Packaging Types.
- Specify a U.S. origin and a U.S. destination.
- Specify one of the following FedEx Express service types:

  - FIRST_OVERNIGHT
  - PRIORITY_OVERNIGHT
  - STANDARD_OVERNIGHT
  - FEDEX_2_DAY
  - FEDEX_2_DAY_AM
  - EXPRESS_SAVER

*Note: FedEx customers can request both One Rate and weight based (non-One Rate) rates in a single Rate Request by specifying \"FEDEX_ONE_RATE\" as a Service Option Type in the request.*

## Variable Handling Fees and Charges

**Variable handling fee**

Any additional handling fees charged in addition to shipping charges for your shipping operation are added to your total shipment charge. These charges are returned in the Rate reply and can be configured to print on the Doc-Tab. For more information refer to [Variable Handling Fees](https://developer.fedex.com/api/en-us/guides/api-reference.html#variablehandlingfees)

**Rate Surcharge Return**

For any additional special handling or services the surcharges are charged in addition to shipping charges for your shipment. These charges are returned in the Rate reply.

The rate quote returns the available surcharges along with the rate details.

Surcharges returned in the Rate reply are as follows:

- Total surcharge
- Total taxes (for Canadian origin shipments)
- Itemized surcharge

For more information refer to [Surcharges](https://developer.fedex.com/api/en-us/guides/api-reference.html#surcharges)

**Fees and Other Shipping Information**

Your shipment may incur fees in addition to its base rate.

- For FedEx Express U.S. import shipments, fees vary depending on origin country; however, each fee works the same as for U.S. export.
- U.S. Express Package Services includes FedEx First Overnight®, FedEx Priority Overnight®, FedEx Standard Overnight®, FedEx 2Day® A.M., FedEx 2Day® and FedEx Express Saver®.
- U.S. Ground Services includes FedEx Ground® and FedEx Home Delivery®.
- International Express Package Services includes FedEx International First®, FedEx International Priority®, FedEx International Economy®, and Fedex Deferred Freight.
- International Ground Service includes FedEx International Ground®.[Service ENUM : FEDEX_GROUND]

*Please note that when entering decimal values for length, width, or height in Web Services, only the whole number portion is used for rate calculations. For example, if you enter 9.4, the system will use 9 in the calculation.*

## Business Rules

- Do not assume a particular service will be available for all scenarios. For example, STANDARD_OVERNIGHT (among others) is not available between all postal codes.
- If a specific service is being requested for rating, include the Service Type in the request. This will decrease the size of the reply and reduce transaction response time.
- Multiple piece shipments (MPS) are not eligible for FedEx One Rate.
- For a special service to be included on a shipment, both the special service type and its detail must be included. If the special service details are not included, then there may be no indication that the special services are not included.
- The timestamp for a rate or shipment should be the time the package is expected to be tendered to FedEx or a FedEx agent. This is not necessarily the time at which the ship or rate transaction is performed. For example, a shipment generated late Friday night for a package that will not be picked up by FedEx until Monday should have a Monday timestamp. Use the correct timestamp if it is known, or the delivery estimation and rates may not be correct.
- The rate and transit time application only uses city name or zip/postal code to define transit time. FedEx only displays the city or zip/postal code served by FedEx in the destination and origin countries you selected.
- FedEx does not deliver to Post Office Box addresses in the U.S. Please enter a Zip Code to find the transit time for your shipment or click on Find Zip/Postal code.
- Packages picked up from a residence may have one additional transit day. For faster returns please drop off at a staffed FedEx location.
- Pharmacy delivery is not valid with Hold at location.

## JSON API Collection

Get access to FedEx APIs by creating a user ID.
