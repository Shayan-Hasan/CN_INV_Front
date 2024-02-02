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
import { GetAllStoreDetails } from "../../api/Api";
import "../../styles/viewCustomer.css";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";

const Stores = () => {
  const [AllStores, setAllStores] = useState("");
  const [Store_id, setStore_id] = useState("");
  const navigate = useNavigate();

  //   const Removefunction = () => {
  //     if (window.confirm("Do you want to remove store?")) {
  //       DeleteStoreById(Code)
  //       .then((res) => {
  //         alert("Removed successfully.");
  //         window.location.reload();
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //         }
  //   };

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "40" },
    {
      headerText: "Store",
      field: "name",
      minWidth: "120",
      width: "160",
      maxWidth: "320",
      textAlign: "left",
    },
    {
      field: "email",
      headerText: "E-mail",
      minWidth: "120",
      width: "140",
      maxWidth: "240",
      textAlign: "left",
    },

    {
      field: "contact",
      headerText: "Contact",
      minWidth: "130",
      width: "140",
      maxWidth: "240",
      textAlign: "Center",
    },

    {
      field: "total_stock",
      headerText: "Total Stock",
      minWidth: "150",
      width: "160",
      maxWidth: "160",
      textAlign: "right",
    },

    {
      field: "manager",
      headerText: "Manager",
      minWidth: "130",
      width: "140",
      maxWidth: "240",
      textAlign: "left",
    },

    {
      field: "city",
      headerText: "City",
      minWidth: "120",
      width: "140",
      maxWidth: "240",
      textAlign: "left",
    },
  ];

  const { currentColor } = useStateContext();

  const handleAddStoreClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/stores/add");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditStoreClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (Store_id != "") {
        navigate(`/stores/edit/${Store_id}`);
      } else {
        alert("Please! Select Store to Edit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewStoreClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view store");
      if (Store_id != "") {
        navigate(`/stores/viewStore/${Store_id}`);
      } else {
        alert("Please! Select Store to View");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setStore_id(selectedRowData.store_id);
    console.log(selectedRowData.store_id);
    // console.log('Selected Product Code:', productcode);
  };

  useEffect(() => {
    const resp = GetAllStoreDetails();
    resp
      .then(function (result) {
        setAllStores(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header category="Stock" title="STORES" />
      <Container fluid className="g-0 p-0 justify-end">
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Add"
              borderRadius="10px"
              onClick={handleAddStoreClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Update"
              borderRadius="10px"
              onClick={handleEditStoreClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              onClick={handleViewStoreClick}
            />
          </Col>
        </Row>
      </Container>
      <GridComponent
        className="custom-grid"
        dataSource={AllStores}
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

export default Stores;
