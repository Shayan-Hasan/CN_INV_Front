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
  Toolbar,
  Sort,
  Filter,
  Resize,
} from "@syncfusion/ej2-react-grids";
import Dropdown from "react-bootstrap/Dropdown";
import { GetAllProductsInv } from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";

const Inventory = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [AllInventory, setAllInventory] = useState("");
  const [p_id, setp_id] = useState("");

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const customerGridImage1 = (props) => <div>{"PORD" + props.product_id}</div>;

  const handleEdit = (productId) => {
    navigate("/Inventory/Edit");
    console.log(`Edit action for Product ID ${productId}`);
  };

  const handleView = (productId) => {
    console.log(`View action for Product ID ${productId}`);
  };

  const handleDelete = (productId) => {
    console.log(`Delete action for Product ID ${productId}`);
  };

  const InventoryGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },
    {
      field: "product_id",
      headerText: "ID",
      minWidth: "90",
      width: "90",
      maxWidth: "100",
      textAlign: "right",
    },
    {
      field: "code",
      headerText: "Code",
      minWidth: "120",
      width: "140",
      maxWidth: "180",
      textAlign: "left",
    },
    {
      field: "name",
      headerText: "Product Name",
      minWidth: "180",
      width: "320",
      maxWidth: "780",
      textAlign: "left",
    },
    {
      field: "unit_instock",
      headerText: "Stk Qty",
      minWidth: "125",
      width: "130",
      maxWidth: "140",
      textAlign: "right",
    },
    {
      field: "unit",
      headerText: "Unit",
      minWidth: "100",
      width: "100",
      maxWidth: "180",
      textAlign: "right",
    },
    {
      field: "opening_balance",
      // template: customerGridImage1,
      headerText: "Open Bal",
      minWidth: "140",
      width: "140",
      maxWidth: "160",
      textAlign: "right",
    },
    // {
    //   field: 'Actions',
    //   headerText: 'Actions',
    //   width: '120',
    //   textAlign: 'Center',
    //   template: gridActionsTemplate,
    // },
  ];

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setp_id(selectedRowData.product_id);
    console.log(selectedRowData.product_id);
    // console.log('Selected Product Code:', productcode);
  };

  const handleAddInvClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/Inventory/Add");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleInStockInvClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/Inventory/InStock");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleOutStockInvClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/Inventory/OutStock");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleProdDetailClick = async (event) => {
    event.preventDefault();
    try {
      console.log("View Inventory");
      if (p_id != "") {
        navigate(`/Inventory/ViewInventory/${p_id}`);
      } else {
        alert("Please select product to view.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleProdsClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Products");
      navigate(`/Inventory/Product`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const resp = GetAllProductsInv();
    resp
      .then(function (result) {
        setAllInventory(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header category="Stock" title="INVENTORY" />
      <Container fluid className="g-0 p-0 justify-end">
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Opening Balance"
              borderRadius="10px"
              onClick={handleAddInvClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="In-Stock"
              borderRadius="10px"
              onClick={handleInStockInvClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Out-Stock"
              borderRadius="10px"
              onClick={handleOutStockInvClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              onClick={handleProdDetailClick}
            />
          </Col>
          {/* <Button
          margin="6px"
          color="white"
          bgColor={currentColor}
          text="Products"
          borderRadius="10px"
          onClick={handleProdsClick}
        /> */}
        </Row>
      </Container>
      <GridComponent
        className="custom-grid"
        dataSource={AllInventory}
        allowPaging={true}
        pageSettings={{ pageSize: 16 }}
        allowSorting
        allowResizing
        //allowTextWrap={true}
        toolbar={["Search"]}
        //width="auto"
        //height={680}
        rowSelected={handleRowSelected}
        rowHeight={36}
      >
        <ColumnsDirective>
          {InventoryGrid &&
            InventoryGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, Filter, Page, Toolbar, Selection]} />
      </GridComponent>
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
};

export default Inventory;
