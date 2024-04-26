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
import { GetReceiveLogDetailByid } from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const ViewReceiveLog = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [AllProductInStore, setAllProductInStore] = useState("");
  let param = useParams();

  const InventoryGrid = [
    {
      field: "log_id",
      headerText: "Log#",
      minWidth: "105",
      width: "105",
      maxWidth: "110",
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
      minWidth: "120",
      width: "150",
      maxWidth: "240",
      textAlign: "left",
    },
    {
      field: "quantity",
      headerText: "Qty",
      minWidth: "95",
      width: "95",
      maxWidth: "110",
      textAlign: "right",
    },
    {
      field: "qty_recv",
      headerText: "Qty Rcv",
      minWidth: "125",
      width: "130",
      maxWidth: "150",
      textAlign: "right",
    },
    {
      field: "running_qty_rcv",
      headerText: "Rng Qty Rcv",
      minWidth: "150",
      width: "155",
      maxWidth: "165",
      textAlign: "right",
    },

    {
      field: "qty_rej",
      headerText: "Qty Rej",
      minWidth: "125",
      width: "130",
      maxWidth: "150",
      textAlign: "right",
    },
    {
      field: "running_qty_rej",
      headerText: "Rng Qty Rej",
      minWidth: "150",
      width: "155",
      maxWidth: "165",
      textAlign: "right",
    },
    {
      field: "rcv_by",
      headerText: "Rcv By",
      minWidth: "125",
      width: "130",
      maxWidth: "150",
      textAlign: "left",
    },
    {
      field: "rcv_date",
      headerText: "Rcv Date",
      minWidth: "130",
      width: "135",
      maxWidth: "150",
      textAlign: "Center",
    },
    // {
    //   field: "mfg_date",
    //   headerText: "Mfg Date",
    //   minWidth: "130",
    //   width: "135",
    //   maxWidth: "150",
    //   textAlign: "Center",
    // },
    {
      field: "notes",
      headerText: "Note",
      minWidth: "125",
      width: "130",
      maxWidth: "200",
      textAlign: "left",
    },
  ];
  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      //console.log("Back");
      navigate("/Purchase");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    //console.log("id "+param.p_id);
    const resp = GetReceiveLogDetailByid(param.po_id);
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
      <Header title="RECEIVE LOG DETAILS" />
      <Container
        className="g-0 p-8 justify-center"
        fluid="true"
        style={{ paddingTop: "10px" }}
      >
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="7px"
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
              dataSource={AllProductInStore}
              allowPaging={true}
              pageSettings={{ pageSize: 16 }}
              allowSorting
              allowResizing
              className="custom-grid"
              rowHeight={36}
            >
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

export default ViewReceiveLog;
