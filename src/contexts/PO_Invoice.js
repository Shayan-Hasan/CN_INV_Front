import { GetPOProdByPoId, GetPODetailByPoId } from "../api/Api";
import html2pdf from "html2pdf.js";
import "jspdf-autotable";
// import helloImage from "./InvoiceReport/hello.jpg";
import Invoice from "../pages/POInvoice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactDOM from "react-dom";

const formatCurrency = (number) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

const openNewTab = async (po_id) => {
  try {
    const fd = {
      products: [],
      bill_address: [],
      from_address: [],
      invoice_no: "",
      date: "",
    };
    fd.products = [];
    fd.bill_address = [];
    fd.from_address = [];
    fd.shipping_address = [];
    fd.invoice_no = "";
    const result = await GetPOProdByPoId(po_id);
    const result1 = await GetPODetailByPoId(po_id);

    const invoiceData = result.data;
    const invoiceData1 = result1.data;
    console.log(invoiceData1);
    invoiceData.forEach((element) => {
      const product = {
        code: element.code,
        details: element.details,
        quantity_shipped: element.quantity_shipped,
        price: formatCurrency(element.price),
        discount: formatCurrency(element.discount),
        total: formatCurrency(element.price * element.quantity_shipped),
      };
      fd.products.push(product);
    });
    var subtotal = 0,
      distotal = 0;
    var taxx = 0,
      taxx1 = 0;
    // taxx = result.data[0].tax;
    invoiceData.forEach((element) => {
      subtotal = subtotal + element.price * element.quantity_shipped;
      distotal = distotal + element.discount;
    });
    fd.invoice_no = "P" + result1.data[0].invoice_id;
    taxx1 = (taxx / 100) * (subtotal - distotal);
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const formattedDate = `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
    fd.date = formattedDate;
    invoiceData1.forEach((element) => {
      const billing = {
        customer: element.customer,
        phone1: element.phone,
        // phone2: element.phone2,
        street: element.b_street,
        city: element.b_city,
        state: element.state,
        zip: element.b_zip,
        country: element.b_country,
      };
      fd.bill_address.push(billing);
      const shipping = {
        customer: element.customer,
        phone: element.s_phone,
        street: element.s_street,
        city: element.s_city,
        state: element.s_state,
        zip: element.s_zip,
        country: element.s_country,
      };
      fd.shipping_address.push(shipping);
      const from = {
        store: element.store,
        email: element.store_email,
        contact: element.store_contact,
        manager: element.manager,
        street: element.store_address,
        city: element.store_city,
        state: element.store_state,
        zip: element.store_zip,
      };
      fd.from_address.push(from);
    });
    const pdf = new jsPDF("p", "pt", "a4", true);
    const maxTableHeight = 20;
    let startY = pdf.internal.pageSize.height - 620;
    let currentY = startY;

    const contentDiv = document.createElement("div");
    const invoiceComponent = <Invoice invoiceData={fd} />;
    ReactDOM.render(invoiceComponent, contentDiv);

    const tableWidth = 2;
    const pageWidth = pdf.internal.pageSize.width;
    const startX = (pageWidth - tableWidth) / 2;

    const remainingHeight = pdf.internal.pageSize.height - currentY;
    if (remainingHeight < maxTableHeight) {
      // Move to the next page
      pdf.addPage();
      // currentY = 40; // Set the starting Y position for the new page
      startY = currentY; // Update the startY variable for the table
    }

    // const invoiceAddressWidth = 200; // Adjust as needed

    // Calculate the starting position to align the invoice address to the right
    // const pageWidth1 = 40;
    // const startX1 = 260; // A

    // pdf.text("Invoice Address:", startX1, 300); // Adjust Y position as needed
    // pdf.text("Customer Name", startX1, 210); // Adjust Y position as needed
    // pdf.text("Street Address", startX1, 220);

    // pdf.addImage(hello, "JPEG", 100, 60, 100, 100);
    const columnStyles = {
      0: { halign: "left" },
      1: { halign: "left" },
      2: { halign: "right" },
      3: { halign: "right" },
      4: { halign: "right" },
      5: { halign: "right" },
    };

    const tableData = fd.products.map((product) => [
      product.code,
      product.details,
      product.quantity_shipped,
      product.price,
      product.discount,
      product.total,
    ]);
    const tableHeaders = [
      "CODE",
      "DESCRIPTION",
      "QTY",
      "PRICE",
      "DISCOUNT",
      "TOTAL",
    ];
    tableData.push(["", "", "", "", ""]);
    var ab = subtotal - distotal;
    tableData.push([
      "",
      "",
      "",
      {
        content: "Sub Total:",
        colSpan: 2,
        styles: {
          fontStyle: "bold",
          fontSize: "9",
          halign: "right",
          font: "times",
        },
      },
      {
        content: formatCurrency(subtotal),
        styles: {
          fontStyle: "bold",
          fontSize: "9",
          halign: "right",
          font: "times",
        },
      },
    ]);
    tableData.push([
      "",
      "",
      "",
      {
        content: "Discount:",
        colSpan: 2,
        styles: {
          fontStyle: "bold",
          fontSize: "9",
          halign: "right",
          font: "times",
        },
      },
      {
        content: formatCurrency(distotal),
        styles: {
          fontStyle: "bold",
          fontSize: "9",
          halign: "right",
          font: "times",
        },
      },
    ]);
    tableData.push([
      "",
      "",
      "",
      {
        content: "Grand Total:",
        colSpan: 2,
        styles: {
          fontStyle: "bold",
          fontSize: "9",
          halign: "right",
          font: "times",
        },
      },
      {
        content: formatCurrency(ab),
        styles: {
          fontStyle: "bold",
          fontSize: "9",
          halign: "right",
          font: "times",
        },
      },
    ]);

    pdf.autoTable({
      head: [tableHeaders],
      body: tableData,
      columnStyles: columnStyles,
      styles: { halign: "center" },
      startY: pdf.internal.pageSize.height - 620,
      cellPadding: 5,
      bodyStyles: {
        fontSize: 9,
        font: "times",
        textColor: [0, 0, 0],

        // lineWidth: 1,
        // lineColor: [255, 0, 0],
      },
    });

    pdf.setFontSize(10);
    pdf.setFont("times", "bold");
    pdf.text("Terms & Conditions:", 40, pdf.internal.pageSize.height - 90);
    pdf.setFont("normal");

    pdf.setFont("times", "normal");
    const maxWidth = 520;
    const textt =
      "Payment is required within 14 business " +
      "days of invoice date. Please send " +
      "remittance to hello@gmail.com. " +
      "Thank you for your business.";

    const textLines = pdf.splitTextToSize(textt, maxWidth);
    var y = pdf.internal.pageSize.height - 70;
    textLines.forEach((line, index) => {
      pdf.text(line, 40, y);
      y += 10;
    });
    return new Promise((resolve, reject) => {
      pdf.html(contentDiv, {
        autoPaging: true,
        margin: 8,
        autoPaging: "text",
        precision: 5,
        html2canvas: {
          scale: 0.64,
          allowTaint: true,
          letterRendering: true,
          svgRendering: true,
        },
        callback: function (pdf) {
          const totalPages = pdf.internal.pages.length;
          for (let i = 1; i < totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.setTextColor(150, 150, 151);
            pdf.text(
              `Page ${i} of ${totalPages - 1}`,
              pdf.internal.pageSize.width - 90,
              pdf.internal.pageSize.height - 16
            );
          }
          window.open(pdf.output("bloburl"), "_blank");
          resolve();
        },
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export { openNewTab };
