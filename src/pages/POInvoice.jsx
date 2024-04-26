import "../styles/InvoiceStyle.css";
import hello from "./InvoiceReport/nexusan-logo.png";
import { GetInvoiceProdBySoId } from "../api/Api";
import React, { useEffect, useState, useRef } from "react";

{
  /* <td>
            
            <label class="invoice-company-heading">
                    NEXUSAN
             </label>
             </td> */
}

const POInvoice = ({ invoiceData }) => {
  const generateInvoiceHtml = (invoiceData) => {
    const invprod = invoiceData.products;
    const invbill = invoiceData.bill_address;
    const invship = invoiceData.shipping_address;
    const invfrom = invoiceData.from_address;

    console.log(invoiceData.bill_address);
    let InvoiceHtml = ``;
    InvoiceHtml =
      InvoiceHtml +
      `
<html>

<head>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,400&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="InvoiceStyle.css">
</head>

<body>
    <div class="border-invoice" >
    
        <div class="parent-border-invoice">
            <table>
            <tr>
            <div>
            <td>
            <h3 style="font-weight: bold;">
            PURCHASE ORDER
            </h3>
                </td>
             <td>
             <img class="invoice-logo" src="${hello}" alt="" width="100%" height="100%"> 
             </td>
             </div>
                </tr>
                </table>

             
                <table style="margin-left:18.3cm;">
                <tr>
                  <td style="text-align: right;">
                    <label class="invoice-company-heading">PO: </label>
                  </td>
                  <td style="text-align: left;">
                    <label class="invoice-company-heading1">${invoiceData.invoice_no}</label>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: right;">
                    <label class="invoice-company-heading1">Date:</label>
                  </td>
                  <td style="text-align: left;">
                    <label class="invoice-company-heading1">${invoiceData.date}</label>
                  </td>
                </tr>
              </table>
              
              
            <div class="parent-invoice-table-address">
                <table class="invoice-table-address">
                    <tr class="table-addresses">  
                        <th class="th1">Supplier:</th>
                        <th></th>
                        <th></th>
                        <th class="th2">Ship To:</th>
                    </tr>
                    <tr>
                       <td class="td1">${invbill[0].customer}</td>
                       <td></td>
                       <td></td>
                       <td class="td2">${invfrom[0].manager}</td>
                    </tr>
                    <tr>
                       <td class="td1">${invbill[0].phone1}</td>
                       <td></td>
                       <td></td>
                       <td class="td2">${invfrom[0].contact}</td>
                    </tr>

                    <tr class="temp">
                       <td class="td1">${invbill[0].street}</td>
                       <td></td>
                       <td></td>
                        <td class="td2">${invfrom[0].street}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</body>

</html>
`;
    return InvoiceHtml;
  };
  const invoiceHtml = generateInvoiceHtml(invoiceData);
  return <div dangerouslySetInnerHTML={{ __html: invoiceHtml }} />;
};

export default POInvoice;
