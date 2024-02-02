import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import { EditSupplierApi, GetSupplierById } from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const ViewSupplier = () => {
  const { currentColor } = useStateContext();
  let param = useParams();

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
  const [acc_notes, setAccNotes] = useState("");
  const [acc_name, setAccName] = useState("");
  const [acc_desc, setAccDesc] = useState("");
  const [acc_id, setacc_id] = useState("");
  const [acc_type_id, setacc_type_id] = useState("");
  const [type_id, settype_id] = useState("");
  const [ledger_notes, setLedgerNotes] = useState("");
  const [OpeningBal, setOpeningBal] = useState("");

  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/supplier");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      // console.log(param.Supplier_id)
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
          setacc_id(result.data[0].account_id);
          settype_id(result.data[0].type_id);
          setacc_type_id(result.data[0].acc_type_id);
          setOpeningBal(result.data[0].opening_balance);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);
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
                      color: "#03C9D7",
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
                      color: "#03C9D7",
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
                      color: "#03C9D7",
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
                      color: "#03C9D7",
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
              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </form>
      <Row md={"auto"} className="justify-content-center">
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
      </Row>
    </div>
  );
};

export default ViewSupplier;
