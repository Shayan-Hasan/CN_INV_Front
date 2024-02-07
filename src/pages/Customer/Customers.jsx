import React, { useEffect, useState } from "react";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import { Link, useNavigate } from "react-router-dom";
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
import {
  GetAllCustomers,
  CheckCusDeleteStatus,
  DeleteCustomer,
} from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";

const Customers = () => {
  const [AllCustomers, setAllCustomers] = useState("");
  const [Customer_id, setCustomer_id] = useState("");
  const { currentColor } = useStateContext();
  const [acc_Status, setacc_Status] = useState(1);
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
      field: "name",
      headerText: "Name",
      minWidth: "180",
      width: "200",
      maxWidth: "320",
      textAlign: "left",
    },
    {
      field: "phones",
      headerText: "Phone",
      minWidth: "140",
      width: "150",
      maxWidth: "200",
      textAlign: "Center",
    },
    {
      field: "email",
      headerText: "Email",
      minWidth: "140",
      width: "150",
      maxWidth: "210",
      textAlign: "left",
    },
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

  const handleAddCustomerClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/Customer/AddCustomer");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditCustomerClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (Customer_id != "") {
        navigate(`/Customer/EditCustomer/${Customer_id}`);
      } else {
        alert("Please select customer to edit.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewCustomerClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view store");
      if (Customer_id != "") {
        navigate(`/Customer/ViewCustomer/${Customer_id}`);
      } else {
        alert("Please select customer to view.");
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
      if (Customer_id != "") {
        // if (defaultacc == 0) {
        if (acc_Status == 0) {
          if (
            window.confirm(
              `Are you sure you want to Delete ID: ${Customer_id}?`
            )
          ) {
            const response = await DeleteCustomer(Customer_id);
            console.log(response, "Response");
            if (response.status === 200) {
              window.location.reload();
              alert("Customer deleted successfully.");
            } else {
              alert("Customer failed to delete.");
            }
          }
          console.log(acc_Status);
        } else {
          alert(
            `ID: ${Customer_id} ledger transactions exist.\nIt could not be deleted.`
          );
        }
        // } else {
        //   alert(`A${Account_id} is Defualt account.\nIt could not be deleted.`);
        // }
      } else {
        alert("Please select customer to delete.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    const resp1 = CheckCusDeleteStatus(selectedRowData.customer_id);
    resp1
      .then(function (result) {
        console.log(result.data[0].status);
        setacc_Status(result.data[0].status);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setCustomer_id(selectedRowData.customer_id);
    console.log(selectedRowData.customer_id);
  };

  useEffect(() => {
    const resp = GetAllCustomers();
    resp
      .then(function (result) {
        setAllCustomers(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header category="Accounts" title="CUSTOMERS" />
      <Container fluid className="g-0 p-0 justify-end">
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Add"
              borderRadius="10px"
              onClick={handleAddCustomerClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Update"
              borderRadius="10px"
              onClick={handleEditCustomerClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              onClick={handleViewCustomerClick}
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
        </Row>
      </Container>
      <GridComponent
        className="custom-grid"
        dataSource={AllCustomers}
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

export default Customers;
