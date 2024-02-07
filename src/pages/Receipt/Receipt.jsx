import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
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
import { GetAllPaymentDetail, deletePayment } from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";

const Receipt = () => {
  const [AllAccounts, setAllAccounts] = useState("");
  const [r_id, setr_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };
  const customerGridImage2 = (props) => <div>{"R" + props.payment_id}</div>;

  const customerGridImage1 = (props) => (
    <div>{formatCurrency(props.opening_balance)}</div>
  );
  const customerGridImage = (props) => (
    <div>{formatCurrency(props.balance)}</div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50",  },

    {
      headerText: "ID",
      field: "payment_id",
      template: customerGridImage2,
      minWidth: "90",
      width: "90",
      maxWidth: "100",
      textAlign: "right",
    },

    {
      field: "datetime",
      headerText: "DateTime",
      minWidth: "140",
      width: "140",
      maxWidth: "160",
      textAlign: "Center",
    },

    {
      field: "From",
      headerText: "From",
      minWidth: "180",
      width: "200",
      maxWidth: "320",
      textAlign: "left",
    },
    {
      field: "To",
      headerText: "To",
      minWidth: "180",
      width: "200",
      maxWidth: "320",
      textAlign: "left",
    },

    {
      field: "amount_paid",
      headerText: "Amt Rcvd",
      minWidth: "140",
      width: "140",
      maxWidth: "160",
      format: "C2",
      textAlign: "right",
    },
    {
      field: "note",
      headerText: "Note",
      minWidth: "140",
      width: "160",
      maxWidth: "360",
      textAlign: "left",
    },
  ];

  const handleAddEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/Receipt/AddReceipt");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (r_id != "") {
        navigate(`/Receipt/EditReceipt/${r_id}`);
      } else {
        alert("Please select receipt to ddit.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditEmployeesClick1 = async (event) => {
    event.preventDefault();
    try {
      console.log("delete");
      if (r_id != "") {
        if (
          window.confirm(`Are you sure you want to delete R${r_id} receipt?`)
        ) {
          const resp = await deletePayment(r_id);
          if (resp.status === 200) {
            navigate("/Receipt");
            alert("Receipt deleted successfully.");
          } else {
            alert("Receipt failed to delete.");
          }
        } else {
        }
      } else {
        alert("Please select receipt to delete.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setr_id(selectedRowData.payment_id);
    console.log(selectedRowData.payment_id);
  };

  useEffect(() => {
    const resp = GetAllPaymentDetail();
    resp
      .then(function (result) {
        console.log(result.data);
        setAllAccounts(result.data || []);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const settings = { checkboxMode: "ResetOnRowClick" };

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header category="Financials" title="RECEIPT" />
      <Container fluid className="g-0 p-0 justify-end">
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Add"
              borderRadius="10px"
              onClick={handleAddEmployeesClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Update"
              borderRadius="10px"
              onClick={handleEditEmployeesClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Delete"
              borderRadius="10px"
              onClick={handleEditEmployeesClick1}
            />
          </Col>
        </Row>
      </Container>
      <GridComponent
        className="custom-grid"
        dataSource={AllAccounts}
        allowPaging={true}
        pageSettings={{ pageSize: 16 }}
        allowSorting
        allowResizing
        toolbar={["Search"]}
        rowSelected={handleRowSelected}
        selectionSettings={settings}
        rowHeight={36}
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

export default Receipt;
