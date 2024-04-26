import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import { GetCustomerById } from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const ViewCustomer = () => {
  const { currentColor } = useStateContext();
  let param = useParams();

  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Website, setWebsite] = useState("");
  const [Contact_name, setContact_Name] = useState("");
  const [Contact_phone, setContact_Phone] = useState("");
  const [Contact_Email, setContact_Email] = useState("");
  const [ProdImage, setProdImage] = useState("");
  const [Notes, setNotes] = useState("");
  const [b_street, setB_street] = useState("");
  const [b_state, setB_state] = useState("");
  const [b_city, setB_city] = useState("");
  const [b_country, setB_country] = useState("");
  const [phone1, setB_phone1] = useState("");
  const [phone2, setB_phone2] = useState("");
  const [b_zip, setB_zip] = useState("");
  const [s_street, setS_street] = useState("");
  const [s_city, setS_city] = useState("");
  const [s_state, setS_state] = useState("");
  const [s_zip, setS_zip] = useState("");
  const [s_country, setS_country] = useState("");
  const [attention_name, setS_attention_name] = useState("");
  const [s_phone, setS_phone] = useState("");
  // const [acc_notes, setAccNotes] = useState("");
  // const [acc_name, setAccName] = useState("");
  // const [acc_desc, setAccDesc] = useState("");
  // const [acc_id, setacc_id] = useState("");
  // const [acc_type_id, setacc_type_id] = useState("");
  // const [type_id, settype_id] = useState("");
  // const [ledger_notes, setLedgerNotes] = useState("");
  const [OpeningBal, setOpeningBal] = useState("");
  // const [ledger_date, setledger_date] = useState("");

  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Customers");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      console.log(param.Customer_id);
      const resp1 = GetCustomerById(param.Customer_id);
      resp1
        .then(function (result) {
          console.log(result.data[0][0].profile);
          setName(result.data[0][0].name);
          setPhone(result.data[0][0].phone);
          setEmail(result.data[0][0].email);
          setWebsite(result.data[0][0].website);
          setContact_Name(result.data[0][0].contact_name);
          setContact_Phone(result.data[0][0].contact_phone);
          setContact_Email(result.data[0][0].contact_email);
          setProdImage(result.data[0][0].profile);
          setNotes(result.data[0][0].notes);
          setB_street(result.data[0][0].b_street);
          setB_city(result.data[0][0].b_city);
          setB_state(result.data[0][0].b_state);
          setB_zip(result.data[0][0].b_zip);
          setB_country(result.data[0][0].b_country);
          setB_phone1(result.data[0][0].phone1);
          setB_phone2(result.data[0][0].phone2);
          setS_street(result.data[0][0].s_street);
          setS_city(result.data[0][0].s_city);
          setS_state(result.data[0][0].s_state);
          setS_zip(result.data[0][0].s_zip);
          setS_country(result.data[0][0].s_country);
          setS_attention_name(result.data[0][0].attention_name);
          setS_phone(result.data[0][0].s_phone);
          //setAccName(result.data[0][0].acc_name);
          //setAccDesc(result.data[0][0].acc_desc);
          //setAccNotes(result.data[0][0].acc_notes);
          //setacc_id(result.data[0][0].account_id);
          //settype_id(result.data[0][0].type_id);
          //setacc_type_id(result.data[0][0].acc_type_id);
          const dbDate1 = new Date(result.data[0][0].ledger_date);
          dbDate1.setUTCHours(24);
          //setledger_date(dbDate1.toISOString().split("T")[0]);
          //setLedgerNotes(result.data[0][0].ledger_note);
          setOpeningBal(result.data[0][0].opening_balance);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="VIEW CUSTOMER" />
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
                    className="input"
                    required
                    type="text"
                    name="name"
                    value={Name}
                    placeholder="Name"
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
                    placeholder="Phone"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Email: </label>
                  <input
                    type="text"
                    name="email"
                    value={Email}
                    placeholder="Email"
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
                    // defaultValue={0}
                    min="0"
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
                        className="container-image"
                        alt="Customer"
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
                    placeholder="Contact Name"
                    value={Contact_name}
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
                    placeholder="Contact Phone"
                    value={Contact_phone}
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
                    placeholder="Customer Note "
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
                    BILLING ADDRESS
                  </b>
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Street: </label>
                  <input
                    type="text"
                    name="b_street"
                    placeholder="Street"
                    value={b_street}
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
                    name="b_city"
                    value={b_city}
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
                    name="b_zip"
                    value={b_zip}
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
                    name="b_state"
                    value={b_state}
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
                    name="b_country"
                    value={b_country}
                    placeholder="Country"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Phone 1: </label>
                  <input
                    type="text"
                    name="b_phone1"
                    value={phone1}
                    placeholder="Phone1"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Phone 2: </label>
                  <input
                    type="text"
                    name="b_phone2"
                    value={phone2}
                    placeholder="Phone2"
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
                  {/* <label >Billing Address </label> */}
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
                    name="s_city"
                    placeholder="City"
                    value={s_city}
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
                    placeholder="Postal Code"
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
                    placeholder="State"
                    value={s_state}
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
                    placeholder="Phone"
                    value={s_phone}
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

export default ViewCustomer;
