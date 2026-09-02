# Service Availability API — Documentación (FedEx)

> **Portal:** <https://developer.fedex.com/wirc/browser/#/en-us/catalog/service-availability/docs>  
> **Contenido servido por:** `https://developer.fedex.com/api/en-us/catalog/service-availability/v1/docs.html`  
> **Capturado:** 2026-09-02 · Locale: `en-us` · Versión de la API: **v1**

---

## Contenido

- [Introduction](#introduction)
- [Service Availability API Details](#service-availability-api-details)
- [How Service Availability API Works](#how-service-availability-api-works)
- [FedEx Services](#fedex-services)
- [FedEx Service Options](#fedex-service-options)
- [FedEx Packaging](#fedex-packaging)
- [Business Rules](#business-rules)
- [JSON API Collection](#json-api-collection)

---

## Introduction

Service Availability API enables you to determine different available FedEx® services, special services, and packaging types for FedEx Express® and FedEx Ground® for the input origin and destination location details.

## Service Availability API Details

The following are the features associated with service availability API:

- Retrieve all FedEx Express® and FedEx Ground® services and respective packaging type combinations available between input origin and destination.
- Retrieve all available special service options, along with delivery signature options, and return shipment types that are available for FedEx Express and FedEx Ground services between the origin and destination.
- Get Transit time for the services available in the given origin and destination location.

## How Service Availability API Works

Use this service to retrieve available FedEx services, special services (service options) and the packaging types.

**Retrieve Services And Packaging Options**

This request is used to return a list of all available services and package type for outbound, return and import shipment types based on input details.

The key input information associated with this request are:

- Shipment details with address
- Recipient details with address
- Account number and the ship dates
- Commodities to be shipped

The result of this request is a list of all FedEx services, service options and the package options available with the input provided. The request would fail if address details are not valid for example City, State/Province and ZIP/Postal code combination is not valid.

**Retrieve Special Service Options**

This request is used to return a list of all available special services based on input details. The key input information associated with this request are:

- Shipment details with address
- Recipient details with address
- Account number and the ship dates
- Commodities to be shipped

The result of this request is a list of all FedEx service options available along with delivery signature options and return shipment types that are available between an origin and destination. The client can filter the results with carrier code(s) and/or service type(s) to view the more specific service availability. This service is valid for carrier codes FedEx Express (FDXE), FedEx Ground (FDXG) and FedEx Ground® Economy (Formerly known as FedEx SmartPost®) (FXSP).

**Retrieve Services And Transit Times**

This request is used to return a list of all available services with transit time for outbound, return and import shipment types based on input details.

The key input information associated with this request are:

- Shipment details with address
- Recipient details with address
- Account number and the ship dates
- Commodities to be shipped

The result of this request is a list of all FedEx services available along with the transit time details. The request would fail if address details are not valid for example City, State/Province and ZIP/Postal code combination is not valid.

## FedEx Services

FedEx offers a range of shipping services to accommodate different timelines and budgets with full–service choices and a robust support system for effective package delivery.

Following are the FedEx services:

**FedEx Express®**

FedEx Express is fast, comes with a time–specific delivery commitment with a money–back guarantee, and the white shipping packages and boxes are included.

- In the U.S., specify 1, 2 or 3 business day delivery by a certain time for documents and packages weighing up to 150 lbs.

**FedEx Ground®**

This is a cost–effective ground delivery to businesses and residences, which provides day–definite ground delivery in 1 to 7 business days to every U.S. business address in the contiguous U.S. (3 to 7 business days to Alaska and Hawaii), based on the distance to the destination. Internationally, FedEx Ground provides day–definite ground delivery in 2 to 7 business days to every business and residential address in Canada, based on the distance to the destination.

**FedEx Home Delivery®**

This service allows residential deliveries 7 days a week, with delivery to most locations on Saturday and many on Sunday.

FedEx Home Delivery shipments allows you to ship packages up to 150 lbs.

**FedEx Ground® Economy (Formerly known as FedEx SmartPost®)**

This service provides cost–effective consolidation and delivery of low–weight business–to–consumer packages via an alliance with the U.S. Postal Service®.

**FedEx Office®**

For business and document solutions, including access to FedEx Express and FedEx Ground shipping services. The FedEx Office network of digitally connected locations can help you effectively manage a full range of business–service needs for your workforce and locations, while also helping you control and reduce costs.

**FedEx Logistics**

For reliable, efficient, end–to–end solutions that help with the complexities of global shipping, regardless of your shipping mode or carrier preference.

- Comprehensive customs brokerage, tariff and duty minimization, and export documentation.
- Global Ocean and air cargo distribution, cargo insurance, and multimode distribution.
- Direct–drop shipment, distribution–center bypass and vendor/ supplier management programs available.

**U.S. Package Services**

| **Your Shipping Need** | **FedEx Service** |
|---|---|
| First thing the next–business–day morning | FedEx First Overnight® |
| Next–business–day morning | FedEx Priority Overnight® |
| Next–business–day afternoon | FedEx Standard Overnight® |
| 2 business days in the morning | FedEx 2Day®A.M. |
| 2 business days | FedEx 2Day® |
| 3 business days | FedEx Express Saver® |
| Economical ground delivery to businesses | FedEx Ground® |
| Economical ground delivery to residences | FedEx Home Delivery® |
| Low–weight packages to residences | FedEx Ground® Economy (Formerly known as FedEx SmartPost®) |
| Overnight 1–day transit Monday through Friday | FedEx Extra Hours® |

**International Package Services**

| **Your Shipping Need** | **FedEx Service** |
|---|---|
| Early–day delivery to key global markets | FedEx International First® |
| In 1, 2 or 3 business days worldwide | FedEx International Priority® FedEx International Priority Express (2A) FedEx International Priority (2P) |
| Within 5 business days worldwide | FedEx International Economy® |
| 5 - 10 business day delivery shipments | FedEx® International Deferred Freight |
| Direct–distribution shipments | FedEx International Priority DirectDistribution® FedEx International Economy DirectDistributionSM |
| Economical ground delivery to Canada | FedEx International Ground® |

**Service Types Enumeration values**

The list of available FedEx transportation services. For more information on Service Types refer to [Service Types](https://developer.fedex.com/api/en-us/guides/api-reference.html#servicetypes)

## FedEx Service Options

**FedEx Express® Domestic (U.S., CA) Service Options**

- **Alcohol (U.S. only) –**FedEx alcohol shipping requirements apply to wine, liquor, and beer. Each type is listed separately when regulations differ by beverage type. Wine is the only alcohol type that can be shipped directly to consumers, depending on selected shipping service. Alcohol may be FedEx Express Dangerous Goods (DG), depending on the percentage of alcohol per volume. This feature is only available for those FedEx account holders enrolled in the FedEx alcoholic beverage shipping program.
- **Dangerous Goods –**Shipments with dangerous goods must be tendered to FedEx Express in accordance with current International Air Transport Association (IATA) regulations for air transport and the FedEx Express Terms and Conditions. This is required regardless of the routing and whether the shipment ends up physically moving by air transportation, ground transportation or a combination of these. For added confidence, use a FedEx DG Ready solution to generate your dangerous goods declaration. Your solution will transmit your information to FedEx to pre–validate your shipment before you offer it to FedEx Express.
- **Dry ice** **–**You can ship packages containing dry ice, as long as the specifics for the dry ice shipment are included in the shipping transaction. Dry ice is considered a Dangerous Goods material.
- **Hold at Location –**FedEx Express Hold at FedEx Location (HAL) service is available to customers who want to pick up a package at a designated FedEx location. For example, approved wine shippers may want to use the FedEx Express Hold at FedEx Location service for consumers who prefer to pick up their wine shipments from a FedEx Office or FedEx Express counter location.
- **Inside Pickup (U.S. Only) –**Request pickup inside your building.
- **Inside Delivery (U.S. Only) –**Request delivery inside the recipient’s building.
- **Return Label (U.S. only) –**Service option to print a return shipping label.
- **Saturday Pickup/Delivery –**FedEx picks up and delivers packages on Saturday, depending on service, pickup/delivery location, and other options.
- **Signature Options –**Based on the special service selected, the appropriate signature options display in the list. Signature options are available for U.S. destinations and from a Canadian origin. The available signature options are as follows:

  - None – Signature not required.
  - Deliver without signature. For deliveries to a commercial location, a shipper must have a signature release number on file with FedEx. For deliveries to a residential location, a shipper is not required to have a signature release number on file with FedEx.
  - Indirect Signature Required.
  - Direct Signature Required.
  - Adult Signature Required (U.S. Only).

The shipment will be delivered as per the standard operating procedure for the selected shipment type. See the FedEx Service Guide for more details.

**FedEx Ground® Domestic (U.S., CA) Service Options**

**Hazardous Materials (U.S. only)** – For detailed hazardous materials shipping information, go to the Transportation of Hazardous Materials screen on fedex.com.

**FedEx Home Delivery® Special Services**

- **U.S. Shipments up to 150 lbs.**
- **Appointment Delivery (U.S. Only)**Available to every U.S. residential address Monday – Saturday from 9 a.m. to 8 p.m.
- **Date Certain Delivery (U.S. Only)**Deliver packages to residents’ homes Monday–Saturday, excluding holidays. The selected date cannot be before the standard delivery date and must be within 14 days from the pickup date.
- **Evening Delivery (U.S. Only)**If delivery must be made in person and your recipient is not available during the day. Use it to specify delivery between 5 and 8 p.m. on the scheduled day of delivery.
- **7–day Delivery** FedEx Home Delivery® allows residential deliveries 7 days a week, with delivery to most locations on Saturday and many on Sunday.

**Non–standard Packaging** If you ship a package that FedEx Ground has regulated as “non–standard,” then additional handling surcharge is automatically applied to that shipment. A non–standard FedEx Ground package is any package that:

- Measures greater than 60 inches in length but is equal to or less than 108 inches in length
- Is not fully encased in an outer shipping container
- Is encased in an outer shipping container made of metal or wood
- Any drum or pail (less than 5 gallons) that is not fully encased in an outer shipping container made of corrugated cardboard

**Return Label** Create return shipping labels on your computer or shipping system. Then simply print and provide the label to your customer or send it via email. **Signature Options** FedEx provides a range of delivery options to meet FedEx customer’s needs. Whether signature required to prove the safe arrival of FedEx customers valuable goods, the signature of an adult, or perhaps no signature at all. The availability of these FedEx Delivery Signature Options varies based on the special service(s) and shipment type used for your shipment. The available signature options are as follows:

- No Signature Required: FedEx will attempt to obtain a signature at the delivery address. If no one is available to sign, FedEx will deliver the package in a safe place without obtaining signature.
- Indirect Signature Required: FedEx will obtain a signature from someone at the delivery address, from a neighbor or from a building manager. If no one is available to sign, FedEx will attempt to redeliver the package on another date. This option is available for Residential deliveries only.
- Direct Signature Required: FedEx will obtain a signature from someone at the delivery address only. If no one is available to sign, FedEx will attempt redelivery of the package on another date.
- Adult Signature Required: FedEx obtains a signature from someone at the delivery address who is at least the age of majority (no longer a minor) in the destination country. Government–issued photo identification or other identification customarily accepted by local authorities is required. If there is no eligible recipient at the address, FedEx may reattempt the delivery. For U.S. deliveries, the recipient must be 21 years of age and present government–issued photo identification.

**Monitoring and Intervention (MI) and Healthcare Identifiers (HCID)**

Monitoring and intervention (MI) and HealthCare Identifier (HCID) special service options help proactively monitor critical healthcare shipments, mitigate risk, and provide intervention support to protect healthcare shipments. The HCID special services identifies time sensitive healthcare shipments and facilitates their prioritization in the FedEx network.

Healthcare Options are only valid for Express Premium Services. You must choose M&I special service option first to ship these health care options. Refer to the [MI and HCID special service](https://developer.fedex.com/api/en-us/guides/api-reference.html#monitoringandinterventionoptions) options to view the list of available services.

When this service type is specified in the retrieve special services request, the API will return a list of all healthcare services available for your origin and destination pair. The API will also return the ***sequenceNumber*** and ***sequenceDisplay*** for the services in response, that determines the sequence and the display order of the healthcare services in the labels.

**Dangerous Goods by Road**

The Dangerous Goods (DG) by road is a package level special service option that allows shippers to ship their dangerous goods packages via road as per ADR regulations within Europe. The option to ship Dry Ice, Lithium Batteries, Limited Quantity Dangerous Goods, etc., for intra-country shipping through FedEx Regional Economy, FedEx Regional Economy Freight, and FedEx Express Domestics, etc. will be available for the DG by road service within key European markets.

Below special services are included to enable additional shipment capabilities for DG by road:

- Standalone Lithium battery shipments
- Fully Regulated DG by Road
- Limited Quantity Shipments by Road
- Genetically Modified (Micro) Organisms
- Biological Substances Category B
- Excepted Quantities
- Radioactive Materials

*Note:*

- *The enum STANDALONE_BATTERY must be specified under **specialServiceTypes** to get the option to select the battery details under the element **standaloneBatteryDetails**. This special service type is applicable only for Intra-European regions.*
- *For Fully Regulated Dangerous Goods (FDG) and Limited Quantities Dangerous Goods (LDG) shipments, you need to specify the **regulation** as ADR under **dangerousGoodsDetail** object in the request for the shipment to be processed successfully.*

**Service Options Enumeration values**

There are types of special services which can be requested for a shipment. For more information on Shipment Special Services refer to [Shipment Level Special Service types](https://developer.fedex.com/api/en-us/guides/api-reference.html#shipmentlevelspecialservicetypes).

## FedEx Packaging

FedEx offers specially designed packaging solutions to meet customers' document, diagnostic, heavy–duty, security, and temperature–control needs. Packaging is vital to the swift delivery of shipment. FedEx have therefore developed their own range of ready–to–use, self–sealing packaging in a choice of shapes and sizes.

**FedEx One Rate**

FedEx One Rate is flat–rate shipping that does not require you to weigh or measure shipments under 50 lbs. You can choose the box or tube that best fits the size of what they need to ship and fill the package to capacity, as long as the shipment doesn’t exceed 50 pounds. It gives you a simple, predictable, flat rate shipping option for their express packages. FedEx One Rate a shipping portfolio based on Six Express Service options, combined with seven FedEx proprietary (white) packaging types.

**FedEx One Rate Packaging**

The FedEx Packaging Types that are valid/available with the One Rate pricing option are the following:

- FEDEX_ENVELOPE
- FEDEX_EXTRA_SMALL_BOX
- FEDEX_SMALL_BOX
- FEDEX_MEDIUM_BOX
- FEDEX_LARGE_BOX
- FEDEX_EXTRA_LARGE_BOX
- FEDEX_PAK
- FEDEX_TUBE

Your own packaging is not available for the One Rate pricing option.

For more information on Packaging Services refer to [Packaging Types](https://developer.fedex.com/api/en-us/guides/api-reference.html#packagetypes)

## Business Rules

- You cannot specify multiple carrier codes. If you want to see results for multiple carriers, then you must either omit this element or send separate service availability requests.
- Individual skids of 151 lbs. or more. Skids exceeding 2,200 lbs. require prior approval.
- To locate FedEx services that allow dangerous goods shipping for your origin/destination pair, use the Service Availability Service.
- The maximum number of packages in an MPS request is 300.
- The shipper's account number must be enabled for Ground Residential functionality. Once the account number is enabled, the customer may specify a service type of Ground instead of Ground Home Delivery for a shipment weighing less than 150 pounds and destined to a residential address.
- If you specify SATURDAY_DELIVERY for Variable Options, you will get both Saturday Delivery options and regular options for all services where Saturday delivery is an option. Do not specify SATURDAY_DELIVERY for Special Services or it will only return any applicable Saturday Delivery options.

## JSON API Collection

Get access to FedEx APIs by creating a user ID.
