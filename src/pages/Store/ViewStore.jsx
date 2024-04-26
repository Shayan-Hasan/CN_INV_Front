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
  //Edit,
  Toolbar,
  Sort,
  Filter,
  Resize,
} from "@syncfusion/ej2-react-grids";
import { getAllProductByStoreID, GetStoreByID } from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const ViewStore = () => {
  const [AllStock, setAllStock] = useState("");
  const [Name, setName] = useState(" ");
  const [Email, setEmail] = useState(" ");
  const [phone, setphone] = useState(" ");
  const [Address, setAddress] = useState(" ");
  const [City, setCity] = useState(" ");
  const [State, setState] = useState(" ");
  const [Postal, setPostal] = useState(" ");
  const [Manager, setManager] = useState(" ");

  let param = useParams();
  const navigate = useNavigate();
  const customerGridImage1 = (props) => <div>{"PORD" + props.product_id}</div>;

  const customersGrid = [
    // { type: 'checkbox', width: '20' },

    {
      headerText: "Product ID",
      field: "product_id",
      // template: customerGridImage1,
      width: "150",
      textAlign: "Center",
    },

    {
      headerText: "Product Name",
      field: "productname",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "code",
      headerText: "Product Code",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "unit_instock",
      headerText: "Stock",
      width: "150",
      textAlign: "Center",
    },

    { field: "unit", headerText: "Unit", width: "150", textAlign: "Center" },

    {
      field: "opening_balance",
      headerText: "Opening Balance",
      width: "150",
      textAlign: "Center",
    },
  ];

  const { currentColor } = useStateContext();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Stores");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const resp = getAllProductByStoreID(param.Store_id);
    resp
      .then(function (result) {
        if (result.data) {
          setAllStock(result.data || []);
        } else {
          setAllStock([]);
        }

        //console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    const resp1 = GetStoreByID(param.Store_id);
    resp1
      .then(function (result) {
        setName(result.data[0].name || "");
        setEmail(result.data[0].email || "");
        setphone(result.data[0].contact || "");
        setAddress(result.data[0].street_address || "");
        setCity(result.data[0].city || "");
        setState(result.data[0].state || "");
        setPostal(result.data[0].postal_code || "");
        setManager(result.data[0].manager || "");
        //     setStoreDetail(result.data);
        //   console.log("hehhe" + result.data[0].name);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="VIEW STORE INVENTORY" />
      <form>
        <Container
          className="g-0 justify-center"
          fluid="true"
          style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "18px" }}
        >
          <Row xs={1} sm={1} style={{ padding: "0" }}>
            <Col md={6} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Name: </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={Name}
                    placeholder="Name"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">Email: </label>
                  <input
                    required
                    value={Email}
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">phone: </label>
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    placeholder="phone"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">Manager: </label>
                  <input
                    type="text"
                    name="manager_name"
                    placeholder="Manager"
                    className="input"
                    value={Manager}
                    readOnly
                  />
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={6} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Street Address: </label>
                  <input
                    placeholder="Street Address"
                    value={Address}
                    id="noteTextarea"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">City: </label>
                  <input
                    type="text"
                    name="city"
                    value={City}
                    placeholder="City"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">State: </label>
                  <input
                    type="text"
                    name="state"
                    value={State}
                    placeholder="State"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">Postal Code: </label>
                  <br />
                  <input
                    type="text"
                    name="postal_code"
                    value={Postal}
                    placeholder="Postal Code"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
            </Col>
          </Row>
          <Row xs={1} sm={1} style={{ padding: "0" }}>
            {AllStock.length > 0 && (
              <GridComponent
                className="custom-grid"
                dataSource={AllStock}
                allowPaging={true}
                pageSettings={{ pageSize: 16 }}
                allowSorting
                allowResizing
                rowHeight={36}
              >
                <ColumnsDirective>
                  {customersGrid.map((item, index) => (
                    <ColumnDirective key={index} {...item} />
                  ))}
                </ColumnsDirective>
                <Inject
                  services={[Resize, Page, Toolbar, Selection, Sort, Filter]}
                />
              </GridComponent>
            )}
          </Row>
        </Container>
      </form>
      <Row md={"auto"} className="justify-content-center">
        <Button
          margin="10px"
          padding="20px"
          color="white"
          className="custom-button"
          bgColor={currentColor}
          text="Back"
          borderRadius="10px"
          onClick={handleBackClick}
        />
      </Row>
    </div>
  );
};

export default ViewStore;
