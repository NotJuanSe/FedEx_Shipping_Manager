# Address Validation API — Documentación (FedEx)

> **Portal:** <https://developer.fedex.com/wirc/browser/#/en-us/catalog/address-validation/docs>  
> **Contenido servido por:** `https://developer.fedex.com/api/en-us/catalog/address-validation/v1/docs.html`  
> **Capturado:** 2026-09-02 · Locale: `en-us` · Versión de la API: **v1**

---

## Contenido

- [Introduction](#introduction)
- [Address Validation API Details](#address-validation-api-details)
- [How Address Validation API Works](#how-address-validation-api-works)
- [Address Validation API Return Values](#address-validation-api-return-values)
- [Address Classification](#address-classification)
- [Tips for Using the Address Validation API](#tips-for-using-the-address-validation-api)
- [Business Rules](#business-rules)
- [JSON API Collection](#json-api-collection)

---

## Introduction

The Address Validation API is a smart solution to resolve inaccurate contact details and enable faster delivery of packages with precision. This API appropriately formats the input recipient address information that closely resembles a valid address and returns a real-world address that is likely to be the one intended.

The API also provides annotations about deficiencies in the input address or changes that were made to the input to arrive at that real-world address. You can use this API to validate and resolve the recipient address information before you ship a package.

*Note: Do not use this API to determine the deliverability of an address. FedEx does not offer delivery service to every valid address. FedEx does not deliver to P.O. Boxes except via FedEx Ground® Economy (Formerly known as FedEx SmartPost®).*

## Address Validation API Details

This API allows to validate and correct recipient address information before shipping a package. Accurate addresses on the shipping label will help eliminate delivery delays and additional address correction fees (due to malformed addresses).

*Note:*

**Address Validation API Functionalities**

- Provides street level address matches.
- Receives monthly updates to its address database.
- Distinguishes between business and residential addresses if an exact match is found.

**Address Validation API Capabilities**

- Completes the incomplete recipient addresses. In some cases, Address Validation API will be able to add missing information, depending on the verification of the provided information against reference data. Address Validation API cannot add missing secondary information (i.e., apartment or suite) at this time.
- Receives monthly updates to its address database.
- Corrects invalid recipient addresses. For example, correction of an incorrect postal code to agree with the remainder of the input.
- Determine whether an address is business or residential to increase the accuracy of courtesy rate quotes. Applies to U.S. and Canada addresses only.
- Confirm the validity and completeness of addresses in many countries in these regions: U.S., Canada, Latin America, Europe, the Middle East and Asia Pacific. You are now able to validate domestic and international address information before shipping a package, eliminating unnecessary delivery delays and additional service fees.
- Provides street level matches.
- Up to 100 addresses can be checked in one API request.

**Countries/Territories Supporting Address Validation API**

You can use the FedEx Address Validation API in the following countries to validate and correct the recipient addresses for efficient deliveries.

| Antilles | Denmark | Panama |
|---|---|---|
| Argentina | Dominican Republic | Peru |
| Aruba | Estonia | Portugal |
| Australia | Finland | Singapore |
| Austria | France | South Africa |
| Bahamas | Germany | Spain |
| Barbados | Greece | Sweden |
| Belgium | Guatemala | Switzerland |
| Bermuda | Hong Kong SAR, China | Trinidad and Tobago |
| Brazil | Italy | United Kingdom |
| Canada | Jamaica | United States |
| Cayman Islands | Malaysia | Uruguay |
| Chile | Mexico | Venezuela |
| Columbia | Netherlands | Virgin Islands |
| Costa Rica | New Zealand |   |
| Czech Republic | Norway |   |

***Note:****The information returned by Validate Address Request is for suggested use only.*

***Legal Disclaimer:****The data provided herein is FedEx proprietary and confidential information, provided as a courtesy at your request. No part of this data may be distributed or disclosed in any form to any third party without the written permission of FedEx. It reflects the current FedEx address-level business/residential classification in the FedEx delivery address database, and is subject to change. In furnishing this information, FedEx does not guarantee its present or future accuracy, and does not guarantee that packages shipped to these addresses will be invoiced according to the business/residential classification provided herein. Providing this information shall not be deemed to alter the terms of the relationship between the parties. See the FedEx [Service Guide](https://www.fedex.com/en-us/service-guide.html) and any applicable account pricing agreement for terms and conditions governing FedEx shipping and charges.*

## How Address Validation API Works

**Validate Address**

Use this endpoint to validate and resolve input addresses and returns real-world addresses. The address details are provided and validated in order to resolve an address. An address is stated as resolved when the input address matches the known reference data.

The required input information associated with this request is:

- Street Lines
- City (Optional)
- State or Province Code (Optional)
- Postal Code (Optional)
- Country Code

*Note: State code or city name is enough when customer shipping to a country which does not have a postal code.*

The Address Validation API returns a real-world address by performing the following operations on the input address:

- As the first step, the API attempts to normalize the input address. This can include replacing common roadway identifiers such as street and parkway with their standard abbreviations such as ST and PKWY, as well as reordering components of the address. If an input address cannot be normalized, the resolved addresses returned will be the input address. Non-address values are discarded.
- In the second step, the API attempts to standardize the normalized address by finding a possible or actual address that is likely the one intended by the user. If that standardization fails, the resolved addresses returned will be the normalized form of the input address. Refer to the elements returned to help determine the problems with the address submitted.
- Certain elements of that normalized address will also be returned. If standardization does succeed, the resolved addresses returned will be that real-world address. In this case, various additional elements of the standardized address and information on how it was derived from the normalized address is also returned.

## Address Validation API Return Values

If the address returned includes the following values for the below attributes, then the address is valid:

- Address State is Standardized
- Attributes of Resolved address are True
- Delivery Point Valid (DPV) is True
- Interpolated Address is False

If these are not listed, then use the additional attributes to determine the possible problems with the address values.

For more information on Address Attributes, see [Address Attributes.](https://developer.fedex.com/api/en-us/guides/api-reference.html#addressattributes)

If the output returned customer message is INTERPOLATED.STREET.ADDRESS, then there is a chance that the address is not valid. For more information on customer message code, refer to the element description of customer message.

**Annotations**

Address Validation API returns annotations with every address validated and returned. The annotations give you information on the deficiencies if any and the changes made to the input address to arrive at that real-world address.

## Address Classification

The Address Validation API uses reference data to determine the classification of a given address. The classification for a functional address is calculated independently of the validation address process and is based on feedback by operational personnel, with commercial data sources used for confirmation only. The Address Validation API has only four possible classifications for addresses: unknown, business, residential and mixed. All addresses begin with an 'unknown' classification and stay that way until address validation business rules determine that their classifications should change. A location only gets a 'mixed' classification if it is a multi-tenant-based address and contains both business and residential units.

*Note: FedEx Express service provides an additional address line (address line 3) for recipient addresses. This additional address information provides more complete and accurate location details improving your chances of getting accurate address.*

The real-world addresses are classified as follows:

**Business Address**

A business address is an address that is used to designate your principal place of business. It is where your business is supposedly operating from, but that may not always be the case.

A business address is the official location of a company's premises. It could be anything from someone's home address right up to a multi-million-dollar campus, such as those big tech companies favor and everything in between.

**Residential Address**

A residential delivery charge will apply to shipments within the U.S. made to a home or private residence, including locations where a business is operated from a home. Use FedEx Home Delivery for residential delivery via FedEx Ground in 1 -7 business days, based on distance to the destination.

Example:

- Rectory
- Convent
- Parsonage
- Residents of multiple-unit dwellings, such as:

  - Apartment buildings
  - Condominiums
  - College dormitories

- A residence where products are sold and/or distributed

## Tips for Using the Address Validation API

Following are some useful tips for using the Address Validation API:

- **Use correct spacing:** Make sure spaces are placed correctly and avoid unnecessary spaces.
- **Use correct spelling:** Avoid any spelling and typographical errors. Also, make sure you have the correct usage of the number zero (0) and letter O.
- **Avoid special characters:** Please refrain from using special characters not required for the address, such as periods after abbreviations (Ave vs. Ave.).
- **Provide additional address and Street Information:** By providing additional address information, you can increase the accuracy of address results.

  - Building or House number - 1, 1A, 1½, One
  - Street Name - Main, George Washington, 42nd
  - Street Suffix - Road, Avenue, Rd, Ave

- **Enter city, state/province and ZIP or postal code:** Providing all three will increase the accuracy of your address results.
- **Enter street and address in order:** Street address elements usually follow a format starting with the building or house number followed by a pre-directional element, a street name, street type or suffix, a post-directional element, apartment designation, apartment number and/or private mailbox designation and number.
- **Use correct abbreviations:** The U.S. Postal Service and Canada Post has standard abbreviations for state/province, street suffix and apartment or unit designations.

  - A non-standard abbreviation may cause poor search results.
  - If you are unsure about an abbreviation, do not use it.

For example:

- Building or house number such as 1, 1A, One.
- Street name such as Main, George Washington, 42nd.
- Street suffix such as Road, Avenue, Rd, Ave.
- Enter city, state/province and postal code: Providing all address information will increase the accuracy of your results. The ZIP+4 portion of the postal code is not necessary to check an address.
- Use correct abbreviations: The United States Postal Service and postal authorities in other countries define standard abbreviations for state/province, street suffix, and apartment/unit designations. A nonstandard abbreviation may cause poor search results. If you are unsure about an abbreviation, do not use it.
- Consider returning the address validation response feedback to the user in order to give them the option to choose the most correct address for them.

## Business Rules

- Do not use this API to determine the package deliverability of an address. FedEx does not offer delivery service to every valid address. FedEx does not deliver to P.O. Boxes (except via FedEx Ground® Economy (Formerly known as FedEx SmartPost®).
- The information returned by resolved address is for suggested use only.
- Up to 100 addresses can be checked in one request.
- The minimum required fields vary among countries.For example, for U.S. addresses, at least one address line and either a postal code or a city and a state code are required, but for AUS (Australia address format) addresses, the state code may be omitted even without a postal code.
- Address resolution result may vary by country/territory.

*Note: Address Validation API might not be applicable for all the countries. Refer the section **Countries/Territories Supporting Address Validation API**.*

## JSON API Collection

Get access to FedEx APIs by creating a user ID.
