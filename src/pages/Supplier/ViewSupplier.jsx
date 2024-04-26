import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import { GetSupplierById, GetVendorIDProductsDetail } from "../../api/Api";
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
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";
import hello from "../../data/default_prod2.png";

const ViewSupplier = () => {
  const { currentColor } = useStateContext();
  var param = useParams();

  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Website, setWebsite] = useState("");
  const [Contact_name, setContact_Name] = useState("");
  const [Contact_phone, setContact_Phone] = useState("");
  const [Contact_Email, setContact_Email] = useState("");
  const [ProdImage, setProdImage] = useState("");
  const [Notes, setNotes] = useState("");
  const [r_street, setR_street] = useState("");
  const [r_state, setR_state] = useState("");
  const [r_city, setR_city] = useState("");
  const [r_country, setR_country] = useState("");
  const [r_phone, setR_phone] = useState("");
  const [r_zip, setR_zip] = useState("");
  const [s_street, setS_street] = useState("");
  const [s_city, setS_city] = useState("");
  const [s_state, setS_state] = useState("");
  const [s_zip, setS_zip] = useState("");
  const [s_country, setS_country] = useState("");
  const [attention_name, setS_attention_name] = useState("");
  const [s_phone, setS_phone] = useState("");
  //const [acc_notes, setAccNotes] = useState("");
  //const [acc_name, setAccName] = useState("");
  //const [acc_desc, setAccDesc] = useState("");
  //const [acc_id, setacc_id] = useState("");
  //const [acc_type_id, setacc_type_id] = useState("");
  //const [type_id, settype_id] = useState("");
  //const [ledger_notes, setLedgerNotes] = useState("");
  const [OpeningBal, setOpeningBal] = useState("");
  const [AllProducts, setAllProducts] = useState("");

  const navigate = useNavigate();

  const customerGridImage = (props) => (
    <div className="image flex gap-4">
      {props.image === null ? (
        <div>
          <img
            className="rounded-xl w-16 h-16"
            src={hello}
            alt="product"
            width={72}
          />
        </div>
      ) : (
        <img
          className="rounded-xl h-16 md:ml-3"
          src={`data:image/jpeg;base64,${props.image}`}
          alt="product"
          width={72}
        />
      )}
    </div>
  );

  const ProductGridactiveStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      {/* <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.active_product}</p> */}
      {props.active_product === 1 ? (
        <label
          style={{ background: "green" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          Active
          {/* {props.active_product} */}
        </label>
      ) : (
        <label
          style={{ background: "red" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          InActive
        </label>
      )}
    </div>
  );
  const ProductGriddisplayStatus = (props) => (
    <div>
      {/* <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.display_product}</p> */}
      {props.display_product === 0 ? (
        <div className="flex gap-2 mt-3 justify-center items-center text-gray-700 capitalize">
          <p style={{ background: "red" }} className="rounded-full h-3 w-3" />
          <p>Disable</p>
        </div>
      ) : (
        <div className="flex gap-2 mt-3 justify-center items-center text-gray-700 capitalize">
          <p style={{ background: "green" }} className="rounded-full h-3 w-3" />
          <p>Enable</p>
        </div>
      )}
    </div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },
    {
      headerText: "Preview",
      minWidth: "130",
      width: "130",
      maxWidth: "130",
      template: customerGridImage,
      textAlign: "Center",
    },
    {
      headerText: "Product Name",
      minWidth: "180",
      width: "190",
      maxWidth: "360",
      field: "name",
      // template: customerGridImage,
      textAlign: "left",
    },
    {
      field: "code",
      headerText: "Code",
      minWidth: "100",
      width: "100",
      maxWidth: "180",
      textAlign: "left",
    },
    // {
    //   field: "details",
    //   headerText: "Description",
    //   minWidth: "180",
    //   width: "180",
    //   maxWidth: "640",
    //   textAlign: "left",
    // },
    // {
    //   field: "unit_id",
    //   headerText: "Unit",
    //   minWidth: "100",
    //   width: "100",
    //   maxWidth: "180",
    //   textAlign: "left",
    // },
    // {
    //   field: "brand_id",
    //   headerText: "Brand",
    //   minWidth: "110",
    //   width: "110",
    //   maxWidth: "180",
    //   textAlign: "left",
    // },
    // {
    //   field: "category_id",
    //   headerText: "Category",
    //   minWidth: "120",
    //   width: "120",
    //   maxWidth: "180",
    //   textAlign: "left",
    // },
    {
      field: "unit_price",
      headerText: "Unit Price",
      minWidth: "120",
      width: "120",
      maxWidth: "180",
      format: "C2",
      textAlign: "right",
    },
    {
      field: "delivery_days",
      headerText: "Delivery Days",
      minWidth: "120",
      width: "130",
      maxWidth: "180",
      textAlign: "right",
    },

    {
      template: ProductGridactiveStatus,
      field: "active_product",
      headerText: "Active Status",
      minWidth: "170",
      width: "160",
      maxWidth: "170",
      textAlign: "Center",
    },
    {
      template: ProductGriddisplayStatus,
      field: "display_product",
      headerText: "Display Status",
      minWidth: "180",
      width: "180",
      maxWidth: "180",
      textAlign: "Center",
    },

    {
      field: "notes",
      headerText: "Note",
      minWidth: "120",
      width: "120",
      maxWidth: "180",
      textAlign: "left",
    },
  ];

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      //console.log("Back");
      navigate("/Supplier");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (param.Supplier_id) {
        //console.log(param.Supplier_id);
        const resp1 = GetSupplierById(param.Supplier_id);
        resp1
          .then(function (result) {
            // console.log(result.data[0].profile);
            setName(result.data[0].name);
            setPhone(result.data[0].phone);
            setWebsite(result.data[0].website);
            setContact_Name(result.data[0].contact_name);
            setContact_Phone(result.data[0].contact_phone);
            setContact_Email(result.data[0].contact_email);
            setProdImage(result.data[0].profile);
            setNotes(result.data[0].notes);
            setR_street(result.data[0].r_street);
            setR_city(result.data[0].r_city);
            setR_state(result.data[0].r_state);
            setR_zip(result.data[0].r_zip);
            setR_country(result.data[0].r_country);
            setR_phone(result.data[0].r_phone);
            setS_street(result.data[0].s_street);
            setS_city(result.data[0].s_city);
            setS_state(result.data[0].s_state);
            setS_zip(result.data[0].s_zip);
            setS_country(result.data[0].s_country);
            setS_attention_name(result.data[0].attention_name);
            setS_phone(result.data[0].s_phone);
            //setacc_id(result.data[0].account_id);
            //settype_id(result.data[0].type_id);
            //setacc_type_id(result.data[0].acc_type_id);
            setOpeningBal(result.data[0].opening_balance);
          })
          .catch((err) => {
            console.log(err.message);
          });
        const resp = GetVendorIDProductsDetail(param.Supplier_id);
        resp
          .then(function (result) {
            //console.log(result.data);
            setAllProducts(result.data || []);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="VIEW SUPPLIER" />
      <form>
        <Container
          className="g-0 justify-center"
          fluid="true"
          style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "18px" }}
        >
          <Row xs={1} sm={1} style={{ padding: "0" }}>
            <Col md={3} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <b
                    style={{
                      fontSize: "19px",
                      fontStyle: "bold",
                      color: currentColor,
                    }}
                  >
                    GENERAL INFOMARTION
                  </b>
                </div>
              </div>
              <br />
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
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Phone: </label>
                  <input
                    required
                    type="text"
                    name="phone"
                    value={Phone}
                    placeholder="Enter Phone"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Website: </label>
                  <input
                    type="text"
                    name="website"
                    value={Website}
                    placeholder="Website"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Opening Balance: </label>
                  <input
                    type="number"
                    step="1.00"
                    name="opening_balance"
                    placeholder="Opening Balance"
                    className="input"
                    value={OpeningBal}
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Profile:</label>
                  <div className="container-video-div" style={{ width: "80%" }}>
                    {ProdImage ? (
                      <img
                        src={`data:image/jpeg;base64,${ProdImage}`}
                        alt="Product"
                        className="container-image"
                      />
                    ) : (
                      <p>No Image Available </p>
                    )}
                  </div>
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={3} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <b
                    style={{
                      fontSize: "19px",
                      fontStyle: "bold",
                      color: currentColor,
                    }}
                  >
                    CONTACT INFORMATION
                  </b>
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Contact Name: </label>
                  <input
                    type="text"
                    name="contact_name"
                    value={Contact_name}
                    placeholder="Contact Name"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Contact Phone: </label>
                  <input
                    type="text"
                    name="contact_phone"
                    value={Contact_phone}
                    placeholder="Contact Phone"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Contact Email: </label>
                  <input
                    type="text"
                    name="contact_email"
                    value={Contact_Email}
                    placeholder="Contact Email"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Note: </label>
                  <textarea
                    placeholder="Note"
                    id="noteTextarea"
                    value={Notes}
                    className="textarea"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={3} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <b
                    style={{
                      fontSize: "19px",
                      fontStyle: "bold",
                      color: currentColor,
                    }}
                  >
                    REMITTING ADDRESS
                  </b>
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Street: </label>
                  <input
                    type="text"
                    name="r_street"
                    value={r_street}
                    placeholder="Street"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">City: </label>
                  <input
                    type="text"
                    name="r_city"
                    value={r_city}
                    placeholder="City"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Zip: </label>
                  <input
                    type="text"
                    name="r_zip"
                    value={r_zip}
                    placeholder="Zip"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">State: </label>
                  <input
                    type="text"
                    name="r_state"
                    value={r_state}
                    placeholder="State"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Country: </label>
                  <input
                    type="text"
                    name="r_country"
                    value={r_country}
                    placeholder="Country"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Phone: </label>
                  <input
                    type="text"
                    name="r_phone"
                    value={r_phone}
                    placeholder="Phone"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={3} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <b
                    style={{
                      fontSize: "19px",
                      fontStyle: "bold",
                      color: currentColor,
                    }}
                  >
                    SHIPPING ADDRESS
                  </b>
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Street: </label>
                  <input
                    type="text"
                    name="s_street"
                    value={s_street}
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">City: </label>
                  <input
                    type="text"
                    name="s_city"
                    value={s_city}
                    placeholder="City"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Zip: </label>
                  <input
                    type="text"
                    name="s_zip"
                    value={s_zip}
                    placeholder="Zip"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">State: </label>
                  <input
                    type="text"
                    name="s_state"
                    value={s_state}
                    placeholder="State"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Country: </label>
                  <input
                    type="text"
                    name="s_country"
                    value={s_country}
                    placeholder="Country"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Phone: </label>
                  <input
                    type="text"
                    name="s_phone"
                    value={s_phone}
                    placeholder="Phone"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Attention Name: </label>
                  <input
                    type="text"
                    name="attention_name"
                    value={attention_name}
                    placeholder="Attention Name"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row md={12} xs={1} sm={1} style={{ padding: "0" }}>
            <Col md={3} className="justify-content-left">
              <Header title="SUPPLIER PRODUCTS" />
            </Col>
            <Col
              md={9}
              style={{ paddingLeft: "70%" }}
              className="justify-content-right"
            >
              <Button
                margin="10px"
                padding="20px"
                color="white"
                className="custom-button ml-2"
                bgColor={currentColor}
                text="Back"
                borderRadius="10px"
                onClick={handleBackClick}
              />
            </Col>
          </Row>
          <Row>
            <GridComponent
              className="custom-grid"
              dataSource={AllProducts}
              allowPaging={true}
              // recordDoubleClick={handleViewProductClick}
              pageSettings={{ pageSize: 8 }}
              allowSorting
              allowResizing
              //allowTextWrap={true}
              toolbar={[
                {
                  text: "Search",
                  //            align: "Center",
                },
              ]}
              //width="auto"
              //height={680}
              // rowSelected={handleRowSelected}
              rowHeight={72}
            >
              <ColumnsDirective>
                {customersGrid.map((item, index) => (
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
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default ViewSupplier;
