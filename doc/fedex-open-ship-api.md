# Open Ship API — Documentación (FedEx)

> **Portal:** <https://developer.fedex.com/wirc/browser/#/en-us/catalog/open-ship/docs>  
> **Contenido servido por:** `https://developer.fedex.com/api/en-us/catalog/open-ship/v1/docs.html`  
> **Capturado:** 2026-09-02 · Locale: `en-us` · Versión de la API: **v1**

---

## Contenido

- [Manage open shipments](#manage-open-shipments)
- [Manage open shipment packages](#manage-open-shipment-packages)
- [Get open shipment results (asynchronous)](#get-open-shipment-results-asynchronous)
- [Open Ship API workflows](#open-ship-api-workflows)
  - [Workflow for 40 or fewer packages](#workflow-for-40-or-fewer-packages)
  - [Workflow for more than 40 packages](#workflow-for-more-than-40-packages)
- [Create an open shipment](#create-an-open-shipment)
- [Add packages to an open shipment](#add-packages-to-an-open-shipment)
- [Modify packages in an open shipment](#modify-packages-in-an-open-shipment)
- [Delete packages from an open shipment](#delete-packages-from-an-open-shipment)
- [Retrieve packages in an open shipment](#retrieve-packages-in-an-open-shipment)
- [Modify an open shipment](#modify-an-open-shipment)
- [Get details about an open shipment](#get-details-about-an-open-shipment)
- [Delete an open shipment](#delete-an-open-shipment)
- [Confirm an open shipment](#confirm-an-open-shipment)
- [Get open shipment results](#get-open-shipment-results)
- [Multiple-piece open shipping](#multiple-piece-open-shipping)
- [Print As You Go (PASGO)](#print-as-you-go-pasgo)
- [FedEx Shipping Labels](#fedex-shipping-labels)
- [Business Rules](#business-rules)
- [JSON API Collection](#json-api-collection)

---

> [!WARNING]
> **NOTE**: - FedEx Account number is required for FedEx International Connect Plus (FICP) service shipments from APAC to US or PR with duty & tax Bill-to recipient:
> 1. If any of the shipment commodities’ Country of Manufacture is CN/HK

This API enables you to create a shipment and allows you to add packages to the shipment over a period of time, rather than entering all the shipment and package information all at once. Use the Open Ship API when you want to add multiple packages to a shipment but you're unsure of how many packages you plan to add or when the shipment will be completed. This gives you a flexible way to prepare your shipment throughout the day until you are ready to ship.

Open shipments remain open for a five-day period after the shipment date and allow package additions and modifications during that time. After the shipment is confirmed, the shipping paperwork such as labels, AWB, or reports can be generated. At the end of the fifth day, the shipment must be confirmed or it will be purged.

*Note: Open shipments will be purged if they are not confirmed by the end of fifth day from the shipment date.*

Open ship shipments are often multiple-piece shipments but can also be single package shipments, referred to as single-piece shipments. To ship a multiple-piece shipment (MPS) to a single consignee, add individual packages to the shipment, or add multiple packages if they are going to the same recipient.

The following services are associated with open shipments:

- FedEx Express® intra-U.S. and intra-Canada
- FedEx Ground® intra-U.S. and intra-Canada
- FedEx Home Delivery®
- FedEx International Priority®
- FedEx International Priority® Express (IPE)
- FedEx International Economy®
- FedEx Priority OvernightTM
- FedEx® Regional Economy
- FedEx® Regional Economy Freight
- FedEx International Connect Plus®
- FedEx® First
- FedEx Priority Express
- FedEx Priority
- FedEx Priority Express Freight
- FedEx Priority Freight
- FedEx Economy (Only U.K.)

## Manage open shipments

This feature allows shippers to create, modify, and delete open shipments, or retrieve an existing open shipment for review or verification purposes. It allows confirmation of the completed shipment to transfer shipment data to FedEx and generation of appropriate shipment paperwork. It also identifies and reports any errors in the transaction and provides appropriate status.

The key information for this feature includes `accountNumber`, Shipment Data, `groupPackageCount`, and `index` to denote the master package in the shipment. The result of this feature ensures shipment data is uploaded to the FedEx systems and appropriate tracking numbers, labels and shipment reports are generated.

## Manage open shipment packages

This feature allows you to add, modify, and delete packages in an existing open shipment. You can also retrieve the existing package for an open shipment.

## Get open shipment results (asynchronous)

Use this feature to retrieve confirmed shipment results asynchronously. When an open shipment with 40 or more packages is confirmed, the API processes the shipment asynchronously.

When the shipment is asynchronously processed, the response to this request only confirms that the request is queued successfully. The shipment might or might not be successfully processed. As a response, it returns `jobId` to retrieve the result later. This feature uses `jobId` to retrieve the OpenShipment Results (CREATE, MODIFY & CONFIRM) which could be labels or shipment reports. It also identifies and reports any errors in the shipment and provides appropriate status.

*Note: If there are errors in the asynchronous shipment response, fix the errors and submit a new shipment request.*

## Open Ship API workflows

This section describes in detail workflow of Open Ship API. Workflows are managed in two ways, using two processing options.

### Workflow for 40 or fewer packages

1. Use the *Create Open Shipment* endpoint to create an Open Shipment with all the required shipping, packaging information, `accountNumber` and `index`.
2. Use the *Add Open Shipment Packages* endpoint to add one or more (not more than 40) packages to an existing open shipment. The key inputs are `index` and `accountNumber` of the open shipment for which the packages are added.
3. Use the *Confirm Open Shipment* endpoint to confirm that all the packages are added, and the shipment is complete. The key inputs are `index`, and `accountNumber` of the shipment to be confirmed.

The *Confirm Open Shipment* endpoint is the final endpoint in this flow which validates the shipment and package information and successfully generates labels and all other reports for the shipment. It also provides the error details returned during validation. These errors can be fixed using the endpoints *Modify Open Shipment* or *Modify Open Shipment Packages* and confirming the shipment again for successful request.

### Workflow for more than 40 packages

1. Use the *Create Open Shipment* endpoint to create an open shipment with all the required shipping, packaging information, `accountNumber` and `index`.
2. Use the *Add Open Shipment Packages* endpoint to add one or more (not more than 40) packages to the existing open shipment. The key inputs are `index` and `accountNumber` of the open shipment for which the packages are to be added.
3. Use the *Confirm Open Shipment* endpoint to confirm that all the packages are added and the shipment is complete. The key inputs are `index`, and `accountNumber` of the shipment to be confirmed. In this case since the packages are more than 40, the API processes the shipment asynchronously and returns `jobId` to be used later to retrieve the shipment results. If the response includes errors, then these errors should be fixed using the *Modify Open Shipment* or *Modify Open Shipment Packages* endpoints. After errors are resolved, confirm the shipment using the *Confirm Open Shipment* endpoint.
4. Use the *Get Open Shipment Results* endpoint to retrieve the results of create, modify, or confirmation requests, including such as labels and shipping paperwork. The key inputs are `jobId` and `accountNumber` for confirmed shipment.

The *Get Open Shipment Results* endpoint is the final endpoint in this flow. Use it to retrieve the confirmed open shipment results such as labels and all other reports for the confirmed open shipment. If error details are returned in the response, fix the errors using the *Modify Open Shipment* or *Modify Open Shipment Packages* endpoint, then confirm the shipment using endpoint *Confirm Open Shipment.*Finally, use the *Get Open Shipment Results* endpoint to retrieve the confirmed open shipment results for the successful request.

## Create an open shipment

Use the *Create Open Shipment* endpoint to create an open shipment with required shipment information and at least one package in the shipment.

The following information is required when creating an open shipment:

- `openShipmentAction` – This is the Open Shipment action and, in this case, use value as `CREATE_PACKAGE`.
- `accountNumber` – This is FedEx account number.
- `requestedShipment` – The shipment details of the Open Shipment.
- `index` –unique value for the Open Shipment, this value is useful in modifying the shipment or the package. This is optional, if not provided, the master tracking number can be used to uniquely identify the shipment.

A successful response to this request processes the shipment and generates a master tracking number for the first package. No labels will be generated in the response.

*Tip:* If your company requires a Purchase Order number or another internal reference to appear on each shipment in the invoice, your implementation can specify that the customerReferences field is mandatory during AWB (air waybill) creation. This field can help to ensure that all shipments correctly include the internal reference used by your company, enabling a smooth payment process.

## Add packages to an open shipment

Use the *Add Open Shipment Packages* endpoint to add one or more packages to an existing open shipment before the shipment is confirmed. You can send a separate Add Package request for each of your packages as you prepare your shipment throughout the day. You can also send in multiple pieces within one Add Package request.

*Note: The total number of packages for the shipment must not exceed the open shipping package limit.*

The following information is required when adding packages to an open shipment:

- `index` – This is a unique value assigned to the already created Open Shipment. If this isn’t available then provide the master tracking number.
- `requestedPackageLineItem` – Detailed package (s) information to be added.
- `accountNumber` – This is FedEx account number.

A successful response to this request generates a tracking number for the newly added package.

## Modify packages in an open shipment

Use the *Modify Open Shipment Packages* endpoint to modify one or more package details from an existing open ship shipment before the shipment is confirmed. This includes the master package as well, which is the first package added to the open shipment.

The following information is required when modifying packages:

- `index` – This is a unique value assigned to the already created Open Shipment. If this is not available, then provide the master tracking number.
- `accountNumber` – This is FedEx account number.
- `trackingId` – One or more Open Ship Package(s) Tracking Id of the packages to be modified.
- `requestedPackageLineItem` – Detailed package(s) information to be modified.

*Please note that when entering decimal values for length, width, or height, only the whole number portion is used for rate calculations. For example, if you enter 9.4, the system will use 9 in the calculation.*

A successful request updates the intended packages and returns the updated shipment details.

## Delete packages from an open shipment

Use the *Delete Open Shipment Packages* endpoint to delete one or more packages from an existing open shipment before the shipment is confirmed.

The following information is required when deleting packages:

- `index` – This is a unique value assigned to the already created Open Shipment. If this isn’t available then provide the master tracking number.
- `accountNumber` – This is FedEx account number.
- `trackingId` – One or more Open Ship Package(s) Tracking Id for which the delete request is received.

A successful request deletes the intended packages and returns the status for the element *deletedPackagesFromOpenshipment* as *true* in the output.

*Note: If the master package is deleted in the shipment, the next package in sequence becomes the master package and master tracking number is reassigned to it and the sequence of numbers are decreased by the number of deleted packages.*

## Retrieve packages in an open shipment

Use the *Retrieve Open Shipment Package* endpoint to retrieve one or more packages from an existing open shipment so that you can review and verify.

The following information is required for this request:

- `index` – This is a unique value assigned to the already created Open Shipment. If this isn’t available then provide the master tracking number.
- `accountNumber` – This is FedEx account number.
- `trackingId` – One or more Open Ship Package(s) Tracking Id for which details are to be retrieved.

A successful request retrieves the specified packages.

## Modify an open shipment

Use the *Modify Open Shipment* endpoint to modify an Open Shipment request with the required shipping information before the shipment is confirmed.

The following information is required to modify an open shipment:

- `index` – This is a unique value assigned to the already created Open Shipment. If this isn’t available then provide the master tracking number.
- `accountNumber` – This is FedEx account number.
- `requestedShipment` – The shipment details for which an Open Shipment is modified.

A successful request updates the shipment details of an existing open shipment and returns the tracking number for the modified package(s) and updated transaction shipment details as an output.

## Get details about an open shipment

Use the *Retrieve Open Shipment* endpoint to retrieve an existing open shipment so that you can review and verify its details.

The following information is required for this request:

- `index` – This is a unique value assigned to the already created Open Shipment. If this is not available, then provide the master tracking number.
- `accountNumber` – This is FedEx account number.

A successful request retrieves the open shipment details.

## Delete an open shipment

Use the *Delete Open Shipment* endpoint to delete an open shipment before the shipment is confirmed.

The following information is required when deleting an open shipment:

- `index` – This is a unique value assigned to the already created Open Shipment. If this is not available, then provide the master tracking number.
- `accountNumber` – This is FedEx account number.

A successful request deletes an open shipment and all its associated packages. It returns the status in the element *deletedOpenshipment* as *true* in the output.

## Confirm an open shipment

Use the *Confirm Open Shipment* endpoint to validate and upload the open ship shipment data to FedEx after all packages are added in the shipment request.

The following information is required for this request:

- `index` – This is a unique value assigned to the already created Open Shipment. If this isn’t available then provide the master tracking number.
- `accountNumber` – This is FedEx account number.
- `labelResponseOptions` – Specify whether the encoded bytecode or the label URL to be returned in the response. *Note: The element `labelResponseOptions` is available only in the Confirm Open Shipment Request and post confirmation of shipment, labels are generated.*

A successful confirmation response for *40 or fewer packages* uploads shipment data to FedEx and generates package labels and all other shipment reports.

A successful confirmation response for *more than 40 packages* confirms that the request is queued successfully and returns the `jobId` that you can use to retrieve results later.

*Note:**A minimum of one package must be included in open shipment before you can confirm the shipment.*

## Get open shipment results

Use the *Get Open Shipment Results* endpoint to get confirmed open ship shipment data. This endpoint should only be used when the shipment has more than 40 packages and `jobId` is returned in the after confirming an open shipment.

The following information is required for this request:

- `resultMethodType` – Specify value as `CREATE`.
- `accountNumber` – This is FedEx account number.
- `jobId` – This is the `jobId` received during Open Shipment confirmation.

A successful response for this request returns the confirmed open shipment results such as package labels and all other shipment reports for the confirmed open shipment. If error details are returned in the response, then these errors can be fixed using the *Modify Open Shipment* or *Modify Open Shipment Packages* endpoint. After resolving the errors, confirm the shipment using the *Confirm Open Shipment* endpoint and then use *Get Open Shipment Results* to retrieve the confirmed open shipment results for the successful request.

## Multiple-piece open shipping

A multiple-piece open shipment (MPS) consists of two or more packages shipped to the same recipient addresses. The first package in the shipment request is considered the master package.

To create a multiple-piece shipment:

- Include the shipment level information such as *serviceType, packagingType, totalWeight, totalPackageCount,*and *requestedPackageLineItems*details for the master package. *Note: The sequenceNumber for master package must be equal to 1*.
- Add all the packages to the shipment.
- Confirm the shipment.

After the shipment confirmation, one of the below processing options is used:

**Synchronous Shipment Processing**

Synchronous processing is one of the optimal processing methods, which is used internally when a shipment has either 40 or less packages (total package count/grouppackagecount<=40) with limited commodities in the shipment.

Shipment request with 40 or less packages when confirmed will be processed synchronously and the labels, shipment documents/reports will be generated instantaneously. This process is optimal for shippers, if there is a time constraint and if the labels must be printed immediately upon shipment confirmation.

*Note: The maximum 40 package limit is indicative and is not a fixed limit. The limit is also dependent on the combination of packages and commodities in the shipment. For more information, contact your FedEx support team.*

Example: Your Open Shipment request consists of 10 packages. When you confirm the shipment after adding all 10 packages, the shipment will be processed synchronously. In the response, 10 labels will be created, and either label URLs or encoded labels as requested is provided in the response.

The following high-level workflow demonstrates synchronous Open Shipment processing:

1. Use endpoint ***Create Open Shipment***.
2. Add 1- 40 packages using endpoint ***Add Open Shipment Packages***
3. Use endpoint ***Confirm Open Shipment*** to confirm the Open Shipment.
4. Successful request should generate labels and the output response will have either label URLs or encoded labels as requested.
5. If the shipment has errors, the error details will be provided in the response.
6. After correcting all the errors, use endpoint ***Confirm Open Shipment*** for successful response.

*Note:*

- *In this method, if you need to add more packages to an existing shipment, you can add only up to total 40 packages..*

**Asynchronous Shipment Processing**

The API internally processes shipment asynchronously, when the total number of packages exceeds 40 (i.e., totalPackageCount>40). This is a very convenient method, when your package volume is large, and you want to submit the bulk shipments periodically. This bulk shipment submission uses various expensive FedEx resources & operations, when submitted at once. With this processing option, FedEx internally ensures that these bulk shipments are processed easily, and you can also get the label data periodically.

When the shipment is asynchronously processed, the reply to this request only confirms that the request is queued successfully though the shipment might or might not be successfully processed and returns *jobId*to retrieve the result later.

*Note: This process requires some time for the shipment to be processed successfully before you retrieve the result*.

For retrieving the asynchronous shipment results, use endpoint ***Get Open Shipment Results*** and provide *jobId* and *accountNumber* details in the request. The response to this request will either return shipment result data with label details or the shipment error details.

Example: Your shipment consisting of 45 packages, when confirmed will be processed asynchronously. In the response, a*jobId* will be returned. You should then use endpoint ***Get Open Shipment Results*** to retrieve the shipment results and label data.

The following high-level workflow demonstrates asynchronous shipping processing:

1. Use endpoint ***Create Open Shipment***.
2. Add 40 or more packages using endpoint ***Add Open Shipment Packages.***
3. Use endpoint ***Confirm Open Shipment*** to confIrm the shipment.
4. The successful submission will provide *jobId*.
5. Use the *jobId*and*accountNumber* to retrieve the output results using ***Get Open Shipment Results*** endpoint.
6. The successful output will provide the shipment result data with label details.
7. If the result has errors, the error details will be provided in the response.

*Note:*

- *In this method, in a single request the maximum total allowed packages are 300.or up to 999 commodities.*
- *In this method, once the request is submitted, you can not add new, modify or delete the packages in the original request.If there are errors in the response, fix the errors using endpoint **Modify Open Shipment Packages**, then confirm the shipment using **Confirm Open Shipment** and get the successful output results using **Get Open Shipment Results**endpoint.*.

## Print As You Go (PASGO)

The **Print As You Go (PASGO)** feature enables you to create and add packages to PASGO MPS open shipments, allowing you to print labels instantly as you add each package. This means you can print your labels as you go without waiting for the shipment to be closed.

**Important Notes:**

- *To use the PASGO feature, your FedEx account must be enabled for this functionality.*
- *When making API requests, you must set the enumeration value of openShipmentAction to **PROVIDE_DOCUMENTS_INCREMENTALLY***.
- *This feature supports **only Base64 format**for labels. Regardless of what is provided in labelSpecification, the output will be in Base64 format.*
- *You can add up to**40 packages per shipment**. Attempting to add more than 40 packages will result in an error. In that case, you will need to create a new PASGO Open Shipment or use a standard API call via Ship API or Open Ship API*.
- *Shipments can be managed through the following operations:*

  - *Retrieve Open Shipment package*
  - *Modify Open Shipment package*
  - *Delete Open Shipment package*
  - *OpenShipmentDelete V1*

- *Dangerous Goods and Lithium battery shipment options are**not currently available** through this feature.*
- *Print As You Go is **only supported for shipments originating from the Europe region.***

## FedEx Shipping Labels

FedEx API supports a wide variety of labels. FedEx API supports three types of label options, including thermal, plain paper, and customizable labels. You can use the Open Ship API endpoints to produce a wide variety of labels.

FedEx offers 2 label formats to support shipping services:

- Thermal Labels
- Laser Labels

**Thermal Labels**

FedEx API allows you to print shipping labels for all shipping types, such as FedEx Express®, FedEx Ground®, and FedEx International Ground® using a variety of thermal label printers.

The following thermal label sizes are supported by FedEx API:

- 4'' x 6'' – without a configurable document tab (Doc-Tab)
- 4'' x 6.75'' – with or without a Doc-Tab
- 4'' x 8'' – provides space to include a graphic or text file of your choice
- 4'' x 8.5'' – with a configurable document tab (specifically included for tire identification label)
- 4'' x 9'' – provides space for graphics or text as well as a Doc-Tab
- 4'' x 10.5'' – with a configurable document tab (specifically included for tire identification label)

The label stock types 4"X8.5” and 4"X10.5” includes an added doc tab with identical barcodes. One barcode is displayed on the main label and the other one on the doc tab. This label stock type value is helpful for tire packages as one label can be positioned on the tire’s tread and the additional doc tab label with a duplicate copy of the barcode and operational instructions for the sidewall of the tire. Using these label stock types reduces tire relabels and increased dimensional scans optimizes recovery. For more information on label stock refer to [Label Stock Types](https://developer.fedex.com/api/en-us/guides/api-reference.html#labelstocktypes).

*Note: Doc-Tab is a removable sticky tab with additional shipping information which can be selected for a label stock, while printing shipping labels using a thermal printer.*

**Thermal Label Elements**

Thermal shipping labels contain three basic elements:

- Human-readable content: this part of the label contains the shipping information.
- Ground Human Readable Barcode will be encrypted by default.
- Two dimensional (2D) barcode: the dimensional alphanumeric barcode stores data for both FedEx Express and FedEx Ground shipments using the American National Standards Institute (ANSI) MH10.8.3 standard. The 2D barcode is created using the Portable Data File (PDF) 417 symbology.
- FedEx specific barcode:

  - ASTRA (Advanced Sorting Tracking Routing Assistance) for FedEx Express shipments until the FDX 1D barcode has been fully phased in; barcode '96' for FedEx Ground and FedEx Home Delivery. FedEx Ground also allows for the use of the SSCC-18 "00" barcode.
  - FedEx 1D (FDX1D) barcode for FedEx Express shipments is created using ANSI/AIM BC4-1995 (Uniform Symbology Specification CODE-128C).

**Key Information to generate a Thermal Label**

The following are the key information required to generate a thermal label:

- LabelFormatType: Required to receive the correct label image in the Open Ship Reply API:

  - COMMON2D: The label format type to receive a label.
  - LABEL_DATA_ONLY: The value used to receive the barcode data if you create a custom label.

- ImageType: Required to format the thermal label for the printer you use; provides the type of data stream or bitmap to be returned.

  - EPL2 - Eltron (Label Stock Types)
  - ZPLII - Zebra (Label Stock Types)

**Supported Thermal Printers**

The following thermal printers are recommended with FedEx API:

- Unimark
- Eltron

  - Orion (EPL2)
  - Eclipse (EPL2)

- Zebra

  - LP2443 (EPL2)
  - LP2844 (EPL2)
  - Gk420 (ZPL)
  - LP2348 Plus (EPL2/ZPL)
  - Z4M Plus (ZPL or EPL)
  - ZP500/ZP505 (EPL2/ZPL)
  - Z4M/Z4M+ (EPL2/ZPL)
  - ZM400 (EPL2/ZPL)
  - ZT410 (EPL2/ZPL)
  - Other ZT4xx series printers (EPL2/ZPL)

*Note: These printers are all compatible with the ASCII Eltron Programming Language (EPL2) page mode. Thermal printers are supported both as a direct write to the printer connected to a system serial port, and as a native Windows installed printer for LPT, Serial, or USB connections. The firmware versions of FedEx provided printers may vary by region.*

**Number of Thermal Labels Printed Per Service**

The following table indicates the number of each type of label needed for a specific special service. All the necessary labels are generated by a call to the FedEx Common Label Server (CLS), and CLS returns a single buffer with the exception of the C.O.D. Return labels.

**Number of Thermal Labels Printed Per U.S. Service**

| **Service Type** | **Thermal Labels (FedEx CLS will return the appropriate number of labels in the response)** |
|---|---|
| FedEx Express U.S. | 1 Shipping label |
| FedEx Ground U.S. / FedEx Home Delivery | 1 Shipping label |

**Number of Thermal Labels Printed Per U.S. Export International Service**

| **Service Type** | **Thermal Labels (FedEx CLS will return the appropriate number of labels in the response)** |
|---|---|
| FedEx Express U.S. Export International | 1 Shipping label 2 Recipient labels |
| FedEx Express U.S. Export International Broker Select Option | 1 Shipping label 2 Recipient labels |
| FedEx Ground U.S. Export International | 1 Shipping label |
| FedEx Ground U.S. Export International C.O.D. | 1 Shipping label 2 C.O.D. Return labels |

**Number of Thermal Labels Printed Per Intra-Canada Service**

| **Service Type** | **Thermal Labels (FedEx CLS will return the appropriate number of labels in the response)** |
|---|---|
| FedEx Express intra-Canada | Non-DG (Dangerous Goods)/Dry ice shipment: 1 Shipping label |
| FedEx Ground intra-Canada | 1 Shipping label |
| FedEx Ground intra-Canada C.O.D. | 1 Shipping label 2 C.O.D. Return labels |

**Number of Thermal Labels Printed Per Canada Export International Service**

| **Service Type** | **Thermal Labels (FedEx CLS will return the appropriate number of labels in the response)** |
|---|---|
| FedEx Express Canada Export International | Non-DG/Dry ice shipment: 1 Shipping label 2 Recipient labels |
| FedEx Express Canada Export International Broker Select | Non-DG/Dry ice shipment: 1 Shipping label 2 Recipient labels |
| FedEx Ground Canada (CA) Export International | 1 Shipping label |

**Number of Thermal Labels Printed Per Philippines and Thailand inbound shipments**

| **Service Type** | **Thermal Labels (FedEx CLS will return the appropriate number of labels in the response)** |
|---|---|
| Philippines inbound shipments | 2 Shipping labels with account number printed 1 Recipient label without account number printed 3 Commercial Invoice copies |
| Thailand inbound commodity shipments | 3 Shipping labels with account number printed 1 Recipient label without account number printed |
| Thailand inbound document shipments | 2 Shipping labels with account number printed 1 Recipient label without account number printed |

**Doc-Tab**

If you print shipping labels using a thermal printer, you may choose label stock that includes a Doc-Tab, a removable sticky tab with additional shipping information. You can configure this shipping information from your shipping data or choose to print configurable data that is specific to your shipping needs.

**Laser Labels**

FedEx API supports label printing with a laser printer. These labels are usually printed on U.S. Letter or A4 paper and folded in half to fit in to the standard FedEx label pouch. Labels that are printed with a laser printer are generated in PDF format and do not need to be scaled or resized. For more information on label stock refer to [Label Stock Types](https://developer.fedex.com/api/en-us/guides/api-reference.html#labelstocktypes).

**Prerequisites**

The following requirements apply to PDF labels:

- Adobe Reader 6.0 or higher is required to process the label.
- Printer driver configuration must have printer scaling set to none.
- Using an HTML wrapper is not necessary for displaying a plain paper PDF label in a browser.
- Acrobat recommends the following browsers for viewing PDF documents:

  - Microsoft Internet Explorer 10 or higher
  - Firefox 1.0 or higher
  - Mozilla 1.7 or higher

The PDF label option eliminates the need to specify the image orientation parameter (width and height) or the screen resolution to display the label properly in the browser.

**Laser Label Elements**

Laser shipping labels contain three basic elements:

- Human-readable content – This part of the label contains the shipping information.
- Ground Human Readable Barcode will be encrypted by default.
- Two-dimensional (2D) barcode – The dimensional alphanumeric barcode stores data for both FedEx Express and FedEx Ground shipments using American National Standards Institute (ANSI) MH10.8.3 standard. The 2D barcode is created using the Portable Data File (PDF) 417 format.
- FedEx specific barcode:

  - ASTRA (Advanced Sorting Tracking Routing Assistance) for FedEx Express shipments until the FDX 1D barcode has been fully phased in; barcode '96' for FedEx Ground and FedEx Home Delivery shipments. FedEx Ground also allows for the use of the SSCC-18 "00" barcode when applicable.
  - FedEx 1D (FDX1D) barcode for FedEx Express shipments is created using ANSI/AIM BC4-1995 (Uniform Symbology Specification CODE-128C).

**Key Information to generate a Laser Label**

The following FedEx API elements are required to generate a laser label:

- LabelSpecification/LabelFormatType: Required to receive the correct label image in the Open Ship Reply API: Valid values are:

  - COMMON2D – label format type to receive a label.
  - LABEL_DATA_ONLY – this value is used to receive the barcode data if you create a custom label.

- LabelSpecification/ImageType: Required to indicate label formatting. Type of data stream or bitmap to be returned:Valid values are:

  - PDF – plain paper
  - PNG – plain paper

- LabelSpecification/LabelStockType: Required for all label types. Specify whether label stock has Doc-Tab on leading or trailing end of labels or has no Doc-Tab. When using an ImageType of PDF or PNG, these values display a laser format label:

  - PAPER_4X6
  - PAPER_4X8
  - PAPER_4X9
  - PAPER_4X675 These values display a plain paper format shipping label:
  - PAPER_7X47
  - PAPER_85X11_BOTTOM_HALF_LABEL
  - PAPER_85X11_TOP_HALF_LABEL
  - PAPER_LETTER

*Note: If you request a plain paper label, the data returned is a Base64 encoded label image, which must be Base64 decoded prior to displaying the label file.*

**Supported Laser Printers**

Most laser printers are supported for this label type; however, labels will not be accepted if they are printed on an ink jet printer. *Note: If you are using a color laser printer, the color definition should be set to black, even if the printer only has a black cartridge installed.*

**Number of Laser Labels Required Per Service**

The following table indicates the number of each type of label needed for a specific special service. All the necessary labels are generated by a call to the FedEx Common Label Server (CLS), and CLS returns a single buffer with the exception of the C.O.D. Return labels.

**Number of Laser Labels Printed Per U.S. Service**

| **Service Type** | **Laser Label - PDF Format** |
|---|---|
| FedEx Ground / FedEx Home Delivery U.S. | 1 Shipping label |

**Number of Laser Labels Printed Per U.S. Export International Service**

| **Service Type** | **Laser Label - PDF Format** |
|---|---|
| FedEx Express U.S. Export International | 1 Shipping label in the reply; a minimum of 3 labels must be printed – 1 label on the package and 2 in the document pouch. |
| FedEx Express U.S. Export International Broker Select | 1 Shipping label in the reply; a minimum of 3 labels must be printed – 1 label on the package and 2 in the document pouch. |
| FedEx Ground U.S. Export International | 1 Shipping label |
| FedEx Ground U.S. Export International C.O.D. | 1 Shipping label 2 C.O.D. Return labels |

**Number of Laser Labels Printed Per Intra-Mexico Service**

| **Service Type** | **Laser Label - PDF Format** |
|---|---|
| FedEx Express Intra-Mexico | FedEx Express Intra-Mexico Non-DG (Dangerous Goods)/Dry ice shipment: 1 Shipping label |

**Number of Laser Labels Printed Per Intra-Canada Service**

| **Service Type** | **Laser Label - PDF Format** |
|---|---|
| FedEx Express Intra-Canada | FedEx Express Intra-Canada Non-DG (Dangerous Goods)/Dry ice shipment: 1 Shipping label |
| FedEx Ground Intra-Canada | 1 Shipping label |
| FedEx Ground Intra-Canada C.O.D. | 1 Shipping label 2 C.O.D. Return labels |

**Number of Laser Labels Printed Per Canada Export Int'l Service**

| **Service Type** | **Laser Label - PDF Format** |
|---|---|
| FedEx Express Canada Export International | FedEx Express Canada Export International Non-DG/Dry ice shipment: 1 Shipping label 2 Recipient labels |
| FedEx Express Canada Export International Broker Select | FedEx Express Canada Export International Broker Select Non-DG/Dry ice shipment: 1 Shipping label 2 Recipient labels |
| FedEx Ground Canada (CA) Export International | 1 Shipping Label |

**Number of Laser Labels Printed Per Canada Export Int'l Service**

| **Service Type** | **Laser Label - PDF Format** |
|---|---|
| FedEx Express Canada Export International | FedEx Express Canada Export International Non-DG/Dry ice shipment: 1 Shipping label 2 Recipient labels |
| FedEx Express Canada Export International Broker Select | FedEx Express Canada Export International Broker Select Non-DG/Dry ice shipment: 1 Shipping label 2 Recipient labels |
| FedEx Ground Canada (CA) Export International | 1 Shipping Label |

**Number of Laser Labels Printed Per Philippines and Thailand inbound shipments**

| **Service Type** | **Thermal Labels (FedEx CLS will return the appropriate number of labels in the response)** |
|---|---|
| Philippines inbound shipments | 2 Shipping labels with account number printed 1 Recipient label without account number printed 3 Commercial Invoice copies |
| Thailand inbound commodity shipments | 3 Shipping labels with account number printed 1 Recipient label without account number printed |
| Thailand inbound document shipments | 2 Shipping labels with account number printed 1 Recipient label without account number printed |

**Custom Label**

FedEx allows customizing of the FedEx generated label. You may add text pertaining to your business and choose the type of barcode (symbology) used on FedEx documents and labels in the custom portion of thermal labels.

To support your shipping application, FedEx Open Ship API provide two options for customizing your shipping label:

- Place the PNG PAPER 7'' x4.75'' graphic on your label stock. For example, you may create a packing list on an 8-1/2'' x 11'' form. As part of this form, you may also place the 7'' x 4.75'' PNG PAPER graphic instead of creating a custom label on your own.
- Add a graphic or text file to the 4'' x 8'' or 4'' x 9'' thermal label. This label size provides 2 inches of space for your graphic or text.

*Note: The label's human readable content and barcode in the common portion of the label cannot be altered.*

**Custom Validator Label**

You can create non-shipping custom labels at both package-level and shipment-level by specifying what custom information is desired, how to format that information, and where to place it on the custom label. Custom labels are limited to the thermal label format.

**Customize a Thermal Label**

FedEx API provides two thermal label formats that you can customize with either a graphic or text file to prevent the need for creating a custom label. These labels support all FedEx shipping services. These formats are:

- 4'' x 8'' thermal label without Doc-Tab
- 4'' x 9'' thermal label with Doc-Tab

These label types provide a two-inch customizable section. This feature is applicable to the thermal label printed on a thermal printer set to 203 DPI or 300 DPI.

**Rules for Custom Label**

Rules for using the label formats are:

- Only the shipping label can be customized. For example, if you print a 4'' x 8'' Express shipping label with your logo, the secondary recipient labels will not display it.
- The customizable graphic or text must not exceed 2 inches high and 4-1/2 inches wide.
- No correction is provided by FedEx. The graphic and/or text prints as it is submitted in the shipping service.
- If all the necessary data for printing the graphic and/or text is not provided (for example: X and Y coordinates), a valid shipping label is returned without the customized data. You must cancel the shipment represented by this label if you attempt to recreate another label with the graphic and/or text.
- For 203 DPI (8 dots/mm) printer resolution, regarding the placement on X and Y coordinates, insertion point coordinate datum is the intersection of the top and left edges of the 4.00” x 6.75” thermal label with bottom doc tab. For 4.00” x 6.75” thermal label with top doc tab, increment insertion point coordinate Y values by 164 dots. For 4.00” x 6.00” label without doc tab, increment insertion point coordinate Y values by 8 dots. Thermal label element attributes are based on 203 DPI (8 dots/mm) printer resolution.
- For 300 DPI (12 dots/mm) printer resolution, regarding the placement on X and Y coordinates, insertion point coordinate datum is the intersection of the top and left edges of the 4.00” x 6.75” thermal label with bottom doc tab. For 4.00” x 6.75” thermal label with top doc tab, increment insertion point coordinate Y values by 246 dots. For 4.00” x 6.00” label without doc tab, increment insertion point coordinate Y values by 12 dots. Thermal label element attributes are based on 300 DPI (12 dots/mm) printer resolution. *Note:*

  - *For the FXD1D barcode, the X-dimension (width of the narrowest bar in the symbol) is 15 mil (3 dots) for 203 DPI printer, and 13.3 mil (4 dots) for 300 DPI printer.*
  - *For the 2D PDF-417 barcode, the X-dimension is 10 mil (2 dots) for 203 DPI printer. To get the closest equivalent X-dimension for 300 DPI printer, 9.99 mil (3 dots) must be used.*
  - *For the Shipper/Misc block at the top of the label and Shipper Reference block under the recipient information where very small fonts are used, label developers need to check the ZPL programming guide to cross-reference the font-set characteristics to select an equivalent performing font-set for various other print head resolutions.*

- Character insertion point is the top left corner of the first character in the string, at the cap line.
- Printer restrictions require the position origin at the top left quadrant of the front. Therefore, it is possible for data to start in the customizable section of the label and write down into the FedEx portion of the label (actual thermal label data). If this occurs, your logo or text will be written over with the FedEx label information. You must correct this positioning to use the shipping label.
- The addition of Doc-Tab information to the 4'' x 9'' label must be configured using the same process as you would use for a standard 4'' x 6'' Doc-Tab thermal label.

*Note: Only single bit color images should be added since labels will print in black and white.*

**Custom Label Graphic Entries Elements**

API provides PNG (Portable Network Graphic) images for FedEx Express, and FedEx Ground labels. The PNG label graphic is a replica of the thermal or plain paper labels supported by API. This label option allows you to place the PNG label graphic on your label stock to prevent the need for creating a custom label.

The following requirements apply when using the 4'' x 6'' PNG graphic embedded in your shipping document:

- Label Stock
- Printer
- Scaling

**Label Stock**

4'' x 6'' PNG labels should only be used with peel-and-stick label stock. The FedEx Ground and FedEx Express label validation teams will reject 4'' x 6'' PNG labels that are not on peel-and-stick label stock, including any labels printed on plain paper.

**Printer**

Laser printers are recommended for printing labels. Ink jet printers should not be used because of their inconsistency in creating scannable barcodes. The 4'' x 6'' PNG label cannot be printed using a color printer unless the color definition is set to black, even if the printer only has a black cartridge installed. This setting is necessary to achieve the correct barcode definition for scanning at the FedEx hubs.

**Scaling**

The image returned in your shipping transaction is 200 dots per inch (DPI) and measures 4'' (W) x 6'' (H) or 800 x 1200 pixels. This label has a vertical orientation and is designed to print in a 4'' x 6'' label area. When printed, the label should measure 4'' x 6''.

To produce the label and barcodes in the required DPI, you must scale (or resize) the image before printing. How you scale the image depends on the application you are using to view and print the label. To scale the PNG image for a 4'' x 6'' label in inches: use 4'' width and 6'' length exactly.

**Label Review Checklist**

All Barcodes

Required for validation:

- Quiet Zone: Must always have at least 0.1'' white space both above and below barcode.
- Quiet Zone: Must always have at least 0.2'' white space both left and right of barcode.
- Validate that all barcodes meet minimum height requirements.

Print Quality

Common problems that cause labels to be rejected:

- Split Bars
- Faded Print/White Voids
- Repeating White Voids (roller problem)
- Smudging (thermal transfer)
- Flaking (laser) indicates Toner Fusion Problem
- Wrinkled in the Print (thermal transfer)
- Print Contrast for direct thermal labels must be at least 90%

Human Readable details for Ground Labels

For the Human Readable for FedEx Ground Labels, the following are required for validation:

- Data matches barcode
- FedEx Ground logo: Logos are available for download from the FedEx Identity website fedex.com.
- FedEx Home Delivery logo: labels must have a large “H” in a box within 1' of the ship to address. The “H” must be at least .25'' x .70''.
- Service Description
- Sender Information
- Recipient Information
- Postal code and routing
- Ship date
- Actual Weight
- Customer Automation Device information (meter, application/system, version)
- Dimensions
- Miscellaneous reference information
- Tracking number and Form ID (Tracking number must be 14 digits)
- Airport Ramp ID
- Postal code

Human Readable details for Express Labels

The following elements must be printed on the label to pass validation:

- FedEx Express logo: Logos are available for download from the FedEx Identity Website fedex.com.
- Service Description
- Package type, if International
- Delivery day of the week (example: MON for Monday)
- Deliver by date
- Meter number
- Ship date
- Format of piece count, master label verbiage, CRN label verbiage on all MPS
- Airport Ramp ID
- Postal code and routing
- URSA routing prefix and suffix
- Handling codes
- Service area commitment
- Recipient and shipper's phone numbers
- Weight
- Dims, if applicable
- Reference field if an alcohol shipment
- Tracking number and Form ID (Tracking number must be 14 digits)
- In the ASTRA label, the 12-digit tracking number is located in positions 17 through 28 of the 32-character barcode. In the new FDX 1D barcode, the tracking number occupies positions 21 through 34. The FedEx Express tracking number will continue to be 12 digits. Zeros will occupy the leading two positions.

## Business Rules

The following rules apply to the Open Ship API:

- Open Shipment can also be created and confirmed with one package.
- Open Shipments are purged if they are not confirmed by the end of fifth day from the shipment date.
- Once the shipment is confirmed, no more packages can be added to the Open Shipment.
- When creating shipments with origin as GB Mainland and destination as GB Channel Islands or vice versa then, you must provide description and value for the shipment in the request. A copy of Airway Bill and two copies of Commercial Invoice or Proforma Invoice are generated for this shipment.

## JSON API Collection

Get access to FedEx APIs by creating a user ID.
