import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const InventoryGrid = [
    {
      field: "shipment_id",
      headerText: "Ship#",
      minWidth: "120",
      width: "125",
      maxWidth: "130",
      textAlign: "right",
    },

    {
      field: "code",
      headerText: "Code",
      minWidth: "105",
      width: "105",
      maxWidth: "125",
      textAlign: "Center",
    },
    {
      field: "prod",
      headerText: "Product",
      minWidth: "140",
      width: "190",
      maxWidth: "250",
      textAlign: "left",
    },
    {
      field: "quantity",
      headerText: "Qty",
      minWidth: "100",
      width: "100",
      maxWidth: "110",
      textAlign: "right",
    },
    {
      field: "qty_ship",
      headerText: "Qty Shpd",
      minWidth: "135",
      width: "140",
      maxWidth: "150",
      textAlign: "right",
    },

    {
      field: "running_qty_ship",
      headerText: "Rng Qty Shpd",
      minWidth: "160",
      width: "165",
      maxWidth: "170",
      textAlign: "right",
    },
    {
      field: "ship_address",
      headerText: "Ship Address",
      minWidth: "180",
      width: "200",
      maxWidth: "280",
      textAlign: "left",
    },
    {
      field: "date_shipped",
      headerText: "Ship Date",
      minWidth: "140",
      width: "145",
      maxWidth: "155",
      textAlign: "Center",
    },
    {
      field: "note",
      headerText: "Note",
      minWidth: "125",
      width: "130",
      maxWidth: "290",
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
                services={[
                  Resize,
                  Page,
                  Toolbar,
                  Selection,
                  Edit,
                  Sort,
                  Filter,
                ]}
              />
            </GridComponent>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewShipment;
