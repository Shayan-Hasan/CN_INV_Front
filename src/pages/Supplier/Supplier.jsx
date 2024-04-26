import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
//import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import hello from "../../data/default_img.jpg";
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
import { Col, Container, Row } from "react-bootstrap";
import "jspdf-autotable";
import {
  GetAllSuppliers,
  CheckVenDeleteStatus,
  DeleteVendor,
} from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import { useStateContext } from "../../contexts/ContextProvider";

const Supplier = () => {
  const [AllSuppliers, setAllSuppliers] = useState("");
  const [Supplier_id, setSupplier_id] = useState("");
  const [acc_Status, setacc_Status] = useState(1);
  const { currentColor } = useStateContext();
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
      //console.log("Add new");
      navigate("/Supplier/AddSupplier");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditSupplierClick = async (event) => {
    event.preventDefault();
    try {
      // console.log("edit new");
      if (Supplier_id !== "") {
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
      //console.log("delete customer");
      if (Supplier_id !== "") {
        // if (defaultacc === 0) {
        if (acc_Status === 0) {
          if (
            window.confirm(
              `Are you sure you want to Delete ID: ${Supplier_id}?`
            )
          ) {
            const response = await DeleteVendor(Supplier_id);
            //console.log(response, "Response");
            if (response.status === 200) {
              window.location.reload();
              alert("Supplier deleted successfully.");
            } else {
              alert("Supplier failed to delete.");
            }
          }
          //console.log(acc_Status);
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
      //console.log("assign product");
      if (Supplier_id !== "") {
        navigate(`/Supplier/ProductAssign/${Supplier_id}`);
      } else {
        alert("Please select supplier.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleViewEmployeesClick4 = async (event) => {
    event.preventDefault();
    try {
      //  console.log("View Purchase");
      if (Supplier_id !== "") {
        navigate(`/supplier/ViewPurchase/${Supplier_id}`);
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
      // if (Supplier_id !== "") {
      navigate(`/Supplier/SpecialOrder`);
      // } else {
      //   alert("Please select supplier.");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewSupplierClick = async (event) => {
    // event.preventDefault();
    try {
      //console.log("view supplier");
      if (Supplier_id !== "") {
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
        //console.log(result.data[0].status);
        setacc_Status(result.data[0].status);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setSupplier_id(selectedRowData.vendor_id);
    //console.log(selectedRowData.vendor_id);
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
          {/* <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              onClick={handleViewSupplierClick}
            />
          </Col> */}
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
              text="Assign Product"
              borderRadius="10px"
              onClick={handleViewEmployeesClick2}
            />
          </Col>
          {/* <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Low Stock Order"
              borderRadius="10px"
              onClick={handleViewEmployeesClick3}
            />
          </Col> */}
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="View Purchase"
              borderRadius="10px"
              onClick={handleViewEmployeesClick4}
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
        recordDoubleClick={handleViewSupplierClick}
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
