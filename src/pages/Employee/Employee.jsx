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
import { GetAllEmployees, DeleteEmp } from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";

const Employee = () => {
  const [AllEmployees, setAllEmployees] = useState("");
  const [Employee_id, setEmployee_id] = useState("");
  const { currentColor } = useStateContext();
  const [acc_Status, setacc_Status] = useState(1);
  const navigate = useNavigate();

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const customerGridImage1 = (props) => (
    <div>{formatCurrency(props.salary)}</div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },
    {
      headerText: "Name",
      field: "name",
      minWidth: "180",
      width: "200",
      maxWidth: "320",
      textAlign: "left",
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
      field: "contact",
      headerText: "Phone",
      minWidth: "140",
      width: "150",
      maxWidth: "200",
      textAlign: "Center",
    },
    {
      field: "salary",
      headerText: "Salary",
      template: customerGridImage1,
      minWidth: "120",
      width: "120",
      maxWidth: "130",
      textAlign: "right",
    },
    {
      field: "Manager",
      headerText: "Manager",
      minWidth: "180",
      width: "200",
      maxWidth: "320",
      textAlign: "left",
    },
    {
      field: "store",
      headerText: "Store",
      minWidth: "140",
      width: "150",
      maxWidth: "210",
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
      field: "balance",
      headerText: "Open Bal",
      minWidth: "140",
      width: "140",
      maxWidth: "160",
      format: "C2",
      textAlign: "right",
    },
  ];

  const handleAddEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/Employee/AddEmployee");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (Employee_id != "") {
        navigate(`/Employee/EditEmployee/${Employee_id}`);
      } else {
        alert("Please select employee to edit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick1 = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("delete employee");
      if (Employee_id != "") {
        // if (defaultacc == 0) {
        // if (acc_Status == 0) {
        if (
          window.confirm(`Are you sure you want to Delete ID: ${Employee_id}?`)
        ) {
          const response = await DeleteEmp(Employee_id);
          console.log(response, "Response");
          if (response.status === 200) {
            window.location.reload();
            alert("Employee deleted successfully.");
          } else {
            alert("Employee failed to delete.");
          }
        }
        console.log(acc_Status);
        // } else {
        //   alert(
        //     `ID: ${Employee_id} ledger transactions exist.\nIt could not be deleted.`
        //   );
        // }
        // } else {
        //   alert(`A${Account_id} is Defualt account.\nIt could not be deleted.`);
        // }
      } else {
        alert("Please select employee to delete.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view employee");
      if (Employee_id != "") {
        navigate(`/Employee/ViewEmployee/${Employee_id}`);
      } else {
        alert("Please select employee to view");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setEmployee_id(selectedRowData.employee_id);
    console.log(selectedRowData.employee_id);
  };

  useEffect(() => {
    const resp = GetAllEmployees();
    resp
      .then(function (result) {
        console.log(result.data[0]);
        setAllEmployees(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header category="Accounts" title="EMPLOYEES" />
      <Container fluid className="g-0 p-0 justify-end">
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              color="white"
              margin="6px"
              bgColor={currentColor}
              text="Add"
              borderRadius="10px"
              onClick={handleAddEmployeesClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              color="white"
              margin="6px"
              bgColor={currentColor}
              text="Update"
              borderRadius="10px"
              onClick={handleEditEmployeesClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              color="white"
              margin="6px"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              onClick={handleViewEmployeesClick}
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
        dataSource={AllEmployees}
        allowPaging={true}
        pageSettings={{ pageSize: 16 }}
        allowSorting
        allowResizing
        toolbar={["Search"]}
        rowSelected={handleRowSelected}
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

export default Employee;
