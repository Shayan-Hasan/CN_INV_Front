import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import hello from "../../data/default_prod2.png";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
  Resize,
} from "@syncfusion/ej2-react-grids";
import ReactDOM from "react-dom";
import {
  GetAllSuppliers,
  CheckVenDeleteStatus,
  DeleteVendor,
  GetInvoiceProdBySoId,
  GetInvoiceDetailBySoId,
} from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import Invoice from "../Invoice";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";
import jsPDF from "jspdf";

const Supplier = () => {
  const [AllSuppliers, setAllSuppliers] = useState("");
  const [Supplier_id, setSupplier_id] = useState("");
  const [acc_Status, setacc_Status] = useState(1);
  const { currentColor } = useStateContext();
  const [formData, setFormData] = useState({
    products: [],
    bill_address: [],
    from_address: [],
    invoice_no: "",
    date: "",
  });
  const navigate = useNavigate();

  const customerGridImage = (props) => (
    <div className="image flex gap-4">
      {props.profile === null ? (
        <div>
          <img
            className="rounded-xl w-16 h-16"
            src={hello}
            alt="customer"
            width={72}
          />
        </div>
      ) : (
        <img
          className="rounded-xl h-16 md:ml-3"
          src={`data:image/jpeg;base64,${props.profile}`}
          alt="customer"
          width={72}
        />
      )}
    </div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },
    {
      headerText: "",
      minWidth: "130",
      width: "130",
      maxWidth: "130",
      template: customerGridImage,
      textAlign: "Center",
    },
    {
      headerText: "Name",
      minWidth: "180",
      width: "200",
      maxWidth: "320",
      textAlign: "left",
      field: "name",
    },

    {
      field: "phone",
      headerText: "Phone",
      minWidth: "140",
      width: "150",
      maxWidth: "200",
      textAlign: "Center",
    },

    {
      field: "website",
      headerText: "Website",
      minWidth: "140",
      width: "150",
      maxWidth: "210",
      textAlign: "left",
    },

    // {
    //   field: "contact_phone",
    //   headerText: "Contact Phone",
    //   width: "70",
    //   textAlign: "Center",
    // },
    {
      field: "balance",
      headerText: "Balance",
      minWidth: "125",
      width: "130",
      maxWidth: "140",
      format: "C2",
      textAlign: "right",
    },
    {
      field: "contact_name",
      headerText: "Contact Name",
      minWidth: "180",
      width: "200",
      maxWidth: "240",
      textAlign: "left",
    },
    {
      field: "city",
      headerText: "City",
      minWidth: "120",
      width: "130",
      maxWidth: "180",
      textAlign: "left",
    },

    {
      field: "attention_name",
      headerText: "Attention Name",
      minWidth: "180",
      width: "200",
      maxWidth: "240",
      textAlign: "left",
    },
    {
      field: "opening_balance",
      headerText: "Open Bal",
      minWidth: "140",
      width: "140",
      maxWidth: "160",
      format: "C2",
      textAlign: "right",
    },
  ];

  const handleAddSupplierClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/Supplier/AddSupplier");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditSupplierClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (Supplier_id != "") {
        navigate(`/Supplier/EditSupplier/${Supplier_id}`);
      } else {
        alert("Please select supplier to edit.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick1 = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("delete customer");
      if (Supplier_id != "") {
        // if (defaultacc == 0) {
        if (acc_Status == 0) {
          if (
            window.confirm(
              `Are you sure you want to Delete ID: ${Supplier_id}?`
            )
          ) {
            const response = await DeleteVendor(Supplier_id);
            console.log(response, "Response");
            if (response.status === 200) {
              window.location.reload();
              alert("Supplier deleted successfully.");
            } else {
              alert("Supplier failed to delete.");
            }
          }
          console.log(acc_Status);
        } else {
          alert(
            `ID: ${Supplier_id} ledger transactions exist.\nIt could not be deleted.`
          );
        }
        // } else {
        //   alert(`A${Account_id} is Defualt account.\nIt could not be deleted.`);
        // }
      } else {
        alert("Please select supplier to delete.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick2 = async (event) => {
    event.preventDefault();
    try {
      console.log("assign product");
      if (Supplier_id != "") {
        navigate(`/Supplier/ProductAssign/${Supplier_id}`);
      } else {
        alert("Please select supplier.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleViewEmployeesClick3 = async (event) => {
    event.preventDefault();
    try {
      // console.log("Special Order");
      // if (Supplier_id != "") {
      navigate(`/Supplier/SpecialOrder`);
      // } else {
      //   alert("Please select supplier.");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openNewTab = async () => {
    try {
      const fd = { ...formData };
      fd.products = [];
      fd.bill_address = [];
      fd.from_address = [];
      fd.shipping_address = [];
      fd.invoice_no = "";
      const result = await GetInvoiceProdBySoId(5000169);
      const result1 = await GetInvoiceDetailBySoId(5000169);

      const invoiceData = result.data;
      const invoiceData1 = result1.data;
      console.log(invoiceData1);
      invoiceData.forEach((element) => {
        const product = {
          code: element.code,
          details: element.details,
          quantity_shipped: element.quantity_shipped,
          price: element.price,
          discount: element.discount,
          total: element.price,
        };
        fd.products.push(product);
      });
      fd.invoice_no = result1.data[0].invoice_id;
      invoiceData1.forEach((element) => {
        const billing = {
          customer: element.customer,
          phone1: element.phone1,
          phone2: element.phone2,
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

      const contentDiv = document.createElement("div");
      const invoiceComponent = <Invoice invoiceData={fd} />;
      ReactDOM.render(invoiceComponent, contentDiv);

      // html2pdf()
      //   .from(contentDiv)
      //   .set({
      //     html2canvas: { scale: 10 },
      //   })
      //   .toPdf()
      //   .get("pdf")
      //   .then(function (pdf) {
      //     window.open(pdf.output("bloburl"), "_blank");
      //   });

      const pdf = new jsPDF("p", "pt", "a4", true);
      // pdf.addImage(hello, "JPEG", 40, 40, 100, 100);
      await pdf.html(contentDiv, {
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
          // Add page numbers to each page
          const totalPages = pdf.internal.pages.length;
          for (let i = 1; i < totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(12);
            pdf.text(
              `Page ${i} of ${totalPages - 1}`,
              pdf.internal.pageSize.width - 70,
              pdf.internal.pageSize.height - 10
            );
          }
          window.open(pdf.output("bloburl"), "_blank");
        },
      });

      // pdf.html(contentDiv, {
      //   // autoPaging: true,
      // });

      // const options = {
      //   margin: 10,
      //   filename: "invoice.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { scale: 2 },
      //   jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      // };

      // html2pdf()
      //   .from(contentDiv)
      //   .set(options)
      //   .outputPdf()
      //   .then((pdf) => {
      //     window.open(pdf.output("bloburl"), "_blank");
      //   });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewSupplierClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view supplier");
      if (Supplier_id != "") {
        navigate(`/Supplier/ViewSupplier/${Supplier_id}`);
      } else {
        alert("Please select supplier to view.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    const resp1 = CheckVenDeleteStatus(selectedRowData.vendor_id);
    resp1
      .then(function (result) {
        console.log(result.data[0].status);
        setacc_Status(result.data[0].status);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setSupplier_id(selectedRowData.vendor_id);
    console.log(selectedRowData.vendor_id);
  };

  useEffect(() => {
    const resp = GetAllSuppliers();
    resp
      .then(function (result) {
        setAllSuppliers(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header category="Accounts" title="SUPPLIERS" />
      <Container fluid className="g-0 p-0 justify-end">
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Add"
              borderRadius="10px"
              onClick={handleAddSupplierClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Update"
              borderRadius="10px"
              onClick={handleEditSupplierClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              onClick={handleViewSupplierClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Delete"
              borderRadius="10px"
              onClick={handleViewEmployeesClick1}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Special Order"
              borderRadius="10px"
              onClick={handleViewEmployeesClick3}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Assign Product"
              borderRadius="10px"
              onClick={handleViewEmployeesClick2}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Invoice"
              borderRadius="10px"
              onClick={openNewTab}
            />
          </Col>
        </Row>
      </Container>

      <GridComponent
        className="custom-grid"
        dataSource={AllSuppliers}
        allowPaging={true}
        pageSettings={{ pageSize: 8 }}
        allowSorting
        allowResizing
        toolbar={["Search"]}
        rowSelected={handleRowSelected}
        rowHeight={72}
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Resize, Page, Toolbar, Selection, Edit, Sort, Filter]}
        />
      </GridComponent>
    </div>
  );
};

export default Supplier;
