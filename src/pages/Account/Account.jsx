import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  GetAllAccounts,
  //CheckDefaultAcc,
  CheckAccDeleteStatus,
  DeleteAccount,
} from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";

const Account = () => {
  const [AllAccounts, setAllAccounts] = useState("");
  const [Account_id, setAccount_id] = useState("");
  const [defaultacc, setdefaultacc] = useState(0);
  const [acc_Status, setacc_Status] = useState(1);
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const customerGridImage2 = (props) => <div>{"A" + props.account_id}</div>;

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
      field: "account_id",
      minWidth: "90",
      width: "90",
      maxWidth: "100",
      template: customerGridImage2,
      textAlign: "right",
    },
    {
      headerText: "Account Name",
      field: "name",
      minWidth: "180",
      width: "200",
      maxWidth: "360",
      textAlign: "left",
    },

    {
      field: "description",
      headerText: "Description",
      minWidth: "160",
      width: "280",
      maxWidth: "560",
      textAlign: "left",
    },

    {
      field: "balance",
      headerText: "Balance",
      template: customerGridImage,
      minWidth: "125",
      width: "130",
      maxWidth: "140",
      textAlign: "right",
    },

    {
      field: "type",
      headerText: "Type",
      minWidth: "120",
      width: "130",
      maxWidth: "140",
      textAlign: "left",
    },

    {
      field: "opening_balance",
      template: customerGridImage1,
      headerText: "Open Bal",
      minWidth: "140",
      width: "140",
      maxWidth: "160",
      textAlign: "right",
    },
  ];

  const handleAddEmployeesClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      //console.log("Add new");
      navigate("/Account/AddAccount");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      //console.log("edit new");
      if (defaultacc === 0) {
        if (Account_id !== "") {
          navigate(`/Account/EditAccount/${Account_id}`);
        } else {
          alert("Please select account to edit.");
        }
      } else {
        alert(`A${Account_id} is Defualt account.\nIt is not editable.`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick = async (event) => {
    // event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      // console.log("view account");
      if (Account_id !== "") {
        navigate(`/Account/ViewAccount/${Account_id}`);
      } else {
        alert("Please select account to view.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick1 = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      // console.log("delete account");
      if (Account_id !== "") {
        if (defaultacc === 0) {
          if (acc_Status === 0) {
            if (
              window.confirm(`Are you sure you want to Delete A${Account_id}?`)
            ) {
              const response = await DeleteAccount(Account_id);
              //console.log(response, "Response");
              if (response.status === 200) {
                window.location.reload();
                alert("Account deleted successfully.");
              } else {
                alert("Account failed to delete.");
              }
            }
            //console.log(acc_Status);
          } else {
            alert(
              `A${Account_id} ledger transactions exist.\nIt could not be deleted.`
            );
          }
        } else {
          alert(`A${Account_id} is Defualt account.\nIt could not be deleted.`);
        }
      } else {
        alert("Please select account to delete.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    TimeoutUtility.resetTimeout();
    const selectedRowData = args.data;
    const resp1 = CheckAccDeleteStatus(selectedRowData.account_id);
    resp1
      .then(function (result) {
        //console.log(result.data[0].status);
        setacc_Status(result.data[0].status);
      })
      .catch((err) => {
        //console.log(err.message);
      });
    setAccount_id(selectedRowData.account_id);
    //console.log(selectedRowData.account_id);
    setdefaultacc(selectedRowData.default);
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    const resp = GetAllAccounts();
    resp
      .then(function (result) {
        //console.log(result.data);
        setAllAccounts(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const settings = { checkboxMode: "ResetOnRowClick" };

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header category="Accounts" title="GENERAL ACCOUNTS" />
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

          {/* <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              onClick={handleViewEmployeesClick}
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
        rowHeight={36}
        selectionSettings={settings}
        recordDoubleClick={handleViewEmployeesClick}
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

export default Account;
