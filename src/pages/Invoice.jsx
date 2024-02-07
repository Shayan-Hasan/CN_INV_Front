import "./InvoiceReport/InvoiceStyle.css";
import hello from "./InvoiceReport/logo-CN.jpg";
import { GetInvoiceProdBySoId } from "../api/Api";
import React, { useEffect, useState, useRef } from "react";

const Invoice = ({ invoiceData }) => {
  const generateInvoiceHtml = (invoiceData) => {
    const invprod = invoiceData.products;
    const invbill = invoiceData.bill_address;
    const invship = invoiceData.shipping_address;
    const invfrom = invoiceData.from_address;

    console.log(invoiceData);
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
    <div class="parent-border-invoice">
        <div class="border-invoice">
            <div class="parent">
            <table>
            <tr>
            <td>
            <label class="invoice-company-heading">
                    NEXUSAN
             </label>
             </td>
             <td>
             <img class="invoice-logo"  src="${hello}" alt="" width="100%" height="100%"> 
             </td>
             <tr>
             </tr>
             <td>
                <label class="invoice-heading">
                    INVOICE
                </label>
                </td>
                </tr>
                <tr>
                
                </tr>
                </table>
                
            </div>



            <div class="parent parent-invoice-table-address">
                <table class="child invoice-table-address">
                    <tr class="table-addresses">  
                        <th class="th1">Bill To:</th>
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



            <div class="parent parent-invoice-table">
                <table class="invoice-table">
                    <tr class="table-row-border">
                        <th>CODE</th>
                        <th>DESC</th>
                        <th style="text-align: right;">QTY</th>
                        <th style="text-align: right;">PRICE</th>
                        <th style="text-align: right;">DISCOUNT</th>
                        <th style="text-align: right;">TOTAL</th>
                    </tr>
                    `;
    console.log(invprod);
    invprod.forEach((element) => {
      InvoiceHtml =
        InvoiceHtml +
        `<tr class="invoice-tr-table"> 
                    <td class="tb-bottom-border" style="max-width : 2cm; min-width: 1cm;">${element.code}</td>
                    <td class="tb-bottom-border" style="max-width : 5cm; min-width: 3cm;">${element.details}</td>
                    <td class="tb-bottom-border" style="max-width : 2cm; min-width: 1cm; text-align: right;">${element.quantity_shipped}</td>
                    <td class="tb-bottom-border" style="max-width : 2cm; min-width: 1cm; text-align: right;">${element.price}</td>
                    <td class="tb-bottom-border" style="max-width : 2cm; min-width: 1cm; text-align: right;">${element.discount}</td>
                    <td class="tb-bottom-border" style="max-width : 2cm; min-width: 1cm; text-align: right;">${element.total}</td></tr>`;
    });
    InvoiceHtml =
      InvoiceHtml +
      `           
      <div class="invoice-tr-table" style="margin-top:0.3cm;">
                    <tr style="font-weight : 700;">
                    <td style="text-align: left;">SUB -TOTAL :</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style="text-align: right;">RS : 12000/-</td></tr>
                    <tr  style="font-weight : 700;"><td class="tb-bottom-border1" style="text-align: left; ">DISCOUNT :</td>
                    <td class="tb-bottom-border1"></td>
                    <td class="tb-bottom-border1"></td>
                    <td class="tb-bottom-border1"></td>
                    <td class="tb-bottom-border1"></td>
                    <td class="tb-bottom-border1" style="text-align: right;">RS : 376/-</td>
                    </tr>
                    </div>
                </table>
            </div>

            <div class="parent-invoice-total">
            <table class="invoice-total-text">
            <div class="invoice-tr-table" style="margin-top:0.3cm;">
                    <tr style="font-weight : 700;">
                    <td style="text-align: left;">TOTAL :</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style="text-align: right;">RS : 12000/-</td></tr>
                    
                    </div>
                </table>
            </div>

            <div class="parent parent-invoice-terms">
                <div class="child  invoice-terms">
                    <h4>TERMS AND CONDITIONS</h4>
                    <p>Payment is due within 15 days</p>
                    <p>State bank of india</p>
                    <p>Account number: XXXXXX123565</p>
                    <p>IFSC: 000345432</p>
                </div>
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

export default Invoice;
