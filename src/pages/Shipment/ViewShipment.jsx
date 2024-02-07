import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
} from "@syncfusion/ej2-react-grids";
import { GetShipmentDetailByid } from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/viewCustomer.css";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const ViewShipment = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [AllProductInStore, setAllProductInStore] = useState("");
  let param = useParams();

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const InventoryGrid = [
    //{ type: 'checkbox', width: '50' },

    {
      field: "shipment_id",
      headerText: "Ship ID",
      width: "80",
      textAlign: "Center",
    },

    {
      field: "code",
      headerText: "Code",
      width: "80",
      textAlign: "Center",
    },
    {
      field: "details",
      headerText: "Product Description",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "qty_ship",
      headerText: "Qty Ship'd",
      width: "90",
      textAlign: "Center",
    },

    {
      field: "running_qty_ship",
      headerText: "Running Qty Ship'd",
      width: "110",
      textAlign: "Center",
    },
    {
      field: "date_shipped",
      headerText: "Ship Date",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "note",
      headerText: "Note",
      width: "100",
      textAlign: "Center",
    },
  ];
  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Sales");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //   const handleRowSelected = (args) => {
  //     const selectedRowData = args.data;
  //     setCode(selectedRowData.code);
  //     console.log(selectedRowData.code);
  //     // console.log('Selected Product Code:', productcode);
  //   };

  useEffect(() => {
    //console.log("id "+param.p_id);
    const resp = GetShipmentDetailByid(param.so_id);
    resp
      .then(function (result) {
        setAllProductInStore(result.data);
        //console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="SHIPMENT DETAILS" />
      <Container
        className="g-0 p-8 justify-center"
        fluid="true"
        style={{ paddingTop: "10px" }}
      >
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Back"
              borderRadius="10px"
              onClick={handleBackClick}
            />
          </Col>
        </Row>
        <Row
          xs={1}
          sm={1}
          className="justify-content-center"
          style={{
            padding: "0",
          }}
        >
          <Col md={12} className="container-col">
            <GridComponent
              className="custom-grid"
              dataSource={AllProductInStore}
              allowPaging={true}
              pageSettings={{ pageSize: 16 }}
              allowSorting
              allowResizing
              //toolbar={["Search"]}
              rowHeight={36}
            >
              {/* rowSelected={handleRowSelected} */}
              <ColumnsDirective>
                {InventoryGrid.map((item, index) => (
                  <ColumnDirective key={index} {...item} />
                ))}
              </ColumnsDirective>
              <Inject
                services={[Page, Toolbar, Selection, Edit, Sort, Filter]}
              />
            </GridComponent>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewShipment;
