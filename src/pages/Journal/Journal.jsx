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
import {
  GetAllPaymentDetail,
  deleteJournalById,
  getAllJournals,
} from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";

const Journal = () => {
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

  const customerGridImage2 = (props) => <div>{"J" + props.journal_id}</div>;

  const customerGridImage1 = (props) => (
    <div>{formatCurrency(props.opening_balance)}</div>
  );
  const customerGridImage = (props) => (
    <div>{formatCurrency(props.balance)}</div>
  );

  const customersGrid = [
    {
      headerText: "ID",
      field: "journal_id",
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
      field: "account",
      headerText: "Account",
      minWidth: "180",
      width: "200",
      maxWidth: "320",
      textAlign: "left",
    },

    {
      field: "amount",
      headerText: "Amount",
      minWidth: "140",
      width: "140",
      maxWidth: "160",
      format: "C2",
      textAlign: "right",
    },
    {
      field: "notes",
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
      navigate("/Journal/AddJournal");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (r_id != "") {
        navigate(`/Journal/EditJournal/${r_id}`);
      } else {
        alert("Please select journal to edit.");
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
          window.confirm(`Are you sure you want to delete J${r_id} journal?`)
        ) {
          const resp = await deleteJournalById(r_id);
          if (resp.status === 200) {
            navigate("/Journal");
            alert("Journal deleted successfully.");
          } else {
            alert("Journal failed to delete.");
          }
        } else {
        }
      } else {
        alert("Please select journal to delete.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setr_id(selectedRowData.journal_id);
    console.log(selectedRowData.journal_id);
  };

  useEffect(() => {
    const resp = getAllJournals();
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
      <Header category="Financials" title="JOURNAL" />
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

export default Journal;
