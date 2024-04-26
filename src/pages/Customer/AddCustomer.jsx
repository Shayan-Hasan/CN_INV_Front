import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddCustomerApi, CheckCusNameExist } from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import default_img from "../../data/default_img.jpg";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";
import {
  validateEmail,
  validateName,
  ValidPhone,
  ValidWebsite,
  ValidAmount,
  ValidText,
} from "../../contexts/Utils";

const AddCustomer = () => {
  const { currentColor } = useStateContext();
  const [note, setNote] = useState("");
  const [acc_notes, setAccNotes] = useState("");
  const [aexist, setaexist] = useState("");
  const [name, setname] = useState("");
  const navigate = useNavigate();
  const [ledger_notes, setLedgerNotes] = useState("");
  const [ledger_date, setledger_date] = useState(
    new Date().toISOString().split("T")[0] + " 00:00:00"
  );

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const [profile, setprofile] = useState(
    dataURLtoFile(default_img, "default_img.jpg")
  );
  const [ValError, setValError] = useState([]);
  const [EmailValid, setEmailValid] = useState("");
  const [uploadedImage, setUploadedImage] = useState(default_img);
  // const [validation, valchange] = useState(false);
  const [nameError, setNameError] = useState("");
  // const [name, setname]= useState('');

  const handleBackClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("Back");
      navigate("/Customers");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [formData, setFormData] = useState({
    ledger_date: new Date().toISOString().split("T")[0],
  });

  const validName1 = (name, ii) => {
    try {
      const updatedErrors = [...ValError];
      if (name.trim().length === 0) {
        updatedErrors[ii] = "";
        setValError(updatedErrors);
        return false;
      }
      if (validateName(name)) {
        updatedErrors[ii] = "";
        setValError(updatedErrors);
        return true;
      }
      updatedErrors[ii] = "Invalid field.";
      setValError(updatedErrors);
      return false;
    } catch (err) {
      return false;
    }
  };

  const validPhone1 = (phone, ii) => {
    try {
      const updatedErrors = [...ValError];
      if (phone.trim().length === 0) {
        updatedErrors[ii] = "";
        setValError(updatedErrors);
        return false;
      }
      if (ValidPhone(phone)) {
        updatedErrors[ii] = "";
        setValError(updatedErrors);
        return true;
      }
      updatedErrors[ii] = "Invalid field.";
      setValError(updatedErrors);
      return false;
    } catch (err) {
      return false;
    }
  };

  const ValidWebsite1 = (web, ii) => {
    try {
      const updatedErrors = [...ValError];
      if (web.trim().length === 0) {
        updatedErrors[ii] = "";
        setValError(updatedErrors);
        return false;
      }
      if (ValidWebsite(web)) {
        updatedErrors[ii] = "";
        setValError(updatedErrors);
        return true;
      }
      updatedErrors[ii] = "Invalid field.";
      setValError(updatedErrors);
      return false;
    } catch (err) {
      return false;
    }
  };

  const ValidAmount1 = (amt, ii) => {
    const updatedErrors = [...ValError];
    if (amt.trim().length === 0) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return false;
    }
    if (ValidAmount(amt)) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return true;
    }
    updatedErrors[ii] = "Invalid field.";
    setValError(updatedErrors);
    return false;
  };

  const ValidText1 = (txt, ii) => {
    try {
      const updatedErrors = [...ValError];
      if (txt.trim().length === 0) {
        updatedErrors[ii] = "";
        setValError(updatedErrors);
        return false;
      }
      if (ValidText(txt)) {
        updatedErrors[ii] = "";
        setValError(updatedErrors);
        return true;
      }
      updatedErrors[ii] = "Invalid field.";
      setValError(updatedErrors);
      return false;
    } catch (err) {
      return false;
    }
  };

  const validateEmail1 = (mail, ii) => {
    try {
      const updatedErrors = [...ValError];

      if (mail.trim().length === 0) {
        return false;
      }
      if (validateEmail(mail)) {
        updatedErrors[ii] = "";
        setValError(updatedErrors);
        return true;
      }
      updatedErrors[ii] = "Invalid field.";
      setValError(updatedErrors);
      return false;
    } catch (err) {
      return false;
    }
  };

  const handleChangeLedgerDate = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setledger_date(e.target.value + " 00:00:00");
    console.log(ledger_date);
  };

  const handleImageChange = (e) => {
    try {
      const file = e.target.files[0];
      setprofile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      // return false;
    }
  };
  const handleChangeName = (e) => {
    setname(e.target.value);
  };

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };
  const handleCopyClick = (e) => {
    e.preventDefault();
    TimeoutUtility.resetTimeout();
    document.forms[0]["s_street"].value = document.forms[0]["b_street"].value;
    document.forms[0]["s_city"].value = document.forms[0]["b_city"].value;
    document.forms[0]["s_state"].value = document.forms[0]["b_state"].value;
    document.forms[0]["s_zip"].value = document.forms[0]["b_zip"].value;
    document.forms[0]["s_phone"].value = document.forms[0]["b_phone1"].value;
    document.forms[0]["s_country"].value = document.forms[0]["b_country"].value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    TimeoutUtility.resetTimeout();
    const {
      phone,
      email,
      website,
      contact_name,
      contact_phone,
      contact_email,
      b_street,
      b_city,
      b_state,
      b_zip,
      b_country,
      b_phone1,
      b_phone2,
      s_street,
      s_city,
      s_state,
      s_zip,
      s_country,
      attention_name,
      s_phone,
      opening_balance,
    } = document.forms[0];

    setValError([]);
    const updatedErrors = [...ValError];

    if (name === "") {
      updatedErrors[0] = "Please enter name.";
      setValError(updatedErrors);
      return;
    }
    if (name !== "") {
      if (validName1(name, 0) === false) {
        return;
      }
    }
    if (aexist === 1) {
      updatedErrors[0] = "Customer name must be unique.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";

    if (phone.value === "") {
      updatedErrors[1] = "Please enter phone no.";
      setValError(updatedErrors);
      return;
    }
    if (phone.value !== "") {
      if (validPhone1(phone.value, 1) === false) {
        return;
      }
    }
    updatedErrors[1] = "";

    if (email.value === "") {
      updatedErrors[2] = "Please enter email address.";
      setValError(updatedErrors);
      return;
    }
    if (email.value !== "") {
      if (validateEmail1(email.value, 2) === false) {
        return;
      }
    }
    updatedErrors[2] = "";

    if (website.value !== "") {
      if (ValidWebsite1(website.value, 3) === false) {
        return;
      }
    }
    updatedErrors[3] = "";

    if (opening_balance.value === "") {
      updatedErrors[4] = "Please enter opening balance.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[4] = "";

    if (contact_name.value === "") {
      updatedErrors[5] = "Please enter contact name.";
      setValError(updatedErrors);
      return;
    }
    if (contact_name.value !== "") {
      if (validName1(contact_name.value, 5) === false) {
        return;
      }
    }
    updatedErrors[5] = "";

    if (contact_phone.value !== "") {
      if (validPhone1(contact_phone.value, 6) === false) {
        return;
      }
    }
    updatedErrors[6] = "";

    if (contact_email.value !== "") {
      if (validateEmail1(contact_email.value, 7) === false) {
        return;
      }
    }
    updatedErrors[7] = "";

    if (note !== "") {
      if (ValidText1(note, 8) === false) {
        return;
      }
    }
    updatedErrors[8] = "";

    if (b_street.value !== "") {
      if (ValidText1(b_street.value, 9) === false) {
        return;
      }
    }
    updatedErrors[9] = "";

    if (b_city.value !== "") {
      if (ValidText1(b_city.value, 10) === false) {
        return;
      }
    }
    updatedErrors[10] = "";

    if (b_zip.value !== "") {
      if (ValidText1(b_zip.value, 11) === false) {
        return;
      }
    }
    updatedErrors[11] = "";

    if (b_state.value !== "") {
      if (ValidText1(b_state.value, 12) === false) {
        return;
      }
    }
    updatedErrors[12] = "";

    if (b_country.value !== "") {
      if (ValidText1(b_country.value, 13) === false) {
        return;
      }
    }
    updatedErrors[13] = "";

    if (b_phone1.value !== "") {
      if (validPhone1(b_phone1.value, 14) === false) {
        return;
      }
    }
    updatedErrors[14] = "";

    if (b_phone2.value !== "") {
      if (validPhone1(b_phone2.value, 15) === false) {
        return;
      }
    }
    updatedErrors[15] = "";

    if (s_street.value !== "") {
      if (ValidText1(s_street.value, 16) === false) {
        return;
      }
    }
    updatedErrors[16] = "";

    if (s_city.value !== "") {
      if (ValidText1(s_city.value, 17) === false) {
        return;
      }
    }
    updatedErrors[17] = "";

    if (s_zip.value !== "") {
      if (ValidText1(s_zip.value, 18) === false) {
        return;
      }
    }
    updatedErrors[18] = "";

    if (s_state.value !== "") {
      if (ValidText1(s_state.value, 19) === false) {
        return;
      }
    }
    updatedErrors[19] = "";

    if (s_country.value !== "") {
      if (ValidText1(s_country.value, 20) === false) {
        return;
      }
    }
    updatedErrors[20] = "";

    if (s_phone.value !== "") {
      if (validPhone1(s_phone.value, 21) === false) {
        return;
      }
    }
    updatedErrors[21] = "";

    if (attention_name.value !== "") {
      if (validName1(attention_name.value, 22) === false) {
        return;
      }
    }
    updatedErrors[22] = "";

    console.log(profile);
    const response = await AddCustomerApi(
      name,
      phone.value,
      email.value,
      website.value,
      contact_name.value,
      contact_phone.value,
      contact_email.value,
      profile,
      note,
      b_street.value,
      b_city.value,
      b_state.value,
      b_zip.value,
      b_country.value,
      b_phone1.value,
      b_phone2.value,
      s_street.value,
      s_city.value,
      s_state.value,
      s_zip.value,
      s_country.value,
      attention_name.value,
      s_phone.value,
      name,
      1100,
      1,
      opening_balance.value
    );
    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/Customers");
      alert("Customer added successfully.");
    } else {
      alert("Customer failed to add.");
    }
  };
  useEffect(() => {
    async function fetchData() {
      await CheckCusNameExist(name)
        .then((resp) => {
          console.log(resp.data);
          setaexist(resp.data[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, [name]);
  useEffect(() => {
    TimeoutUtility.resetTimeout();
    async function fetchData() {}
    fetchData();
  }, []);
  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="ADD CUSTOMER" />
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
                  <div>
                    <input
                      className="input"
                      required
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChangeName}
                      placeholder="Name"
                      autoFocus
                      onBlur={(e) => validName1(e.target.value, 0)}
                    />
                    <span style={{ color: "red", fontSize: "16px" }}>
                      {`  `}*
                    </span>
                    {ValError[0] && (
                      <p style={{ color: "red" }}>{ValError[0]}</p>
                    )}
                  </div>
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
                    placeholder="Phone"
                    className="input"
                    onBlur={(e) => validPhone1(e.target.value, 1)}
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>
                    {`  `}*
                  </span>
                  {ValError[1] && <p style={{ color: "red" }}>{ValError[1]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Email: </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="input"
                    // onChange={(e) => validateEmail(e.target.value)}
                    onBlur={(e) => validateEmail1(e.target.value, 2)}
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>
                    {`  `}*
                  </span>
                  {ValError[2] && <p style={{ color: "red" }}>{ValError[2]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Website: </label>
                  <input
                    type="text"
                    name="website"
                    placeholder="Website"
                    className="input"
                    onBlur={(e) => ValidWebsite1(e.target.value, 3)}
                  />
                  {ValError[3] && <p style={{ color: "red" }}>{ValError[3]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Opening Balance: </label>
                  <input
                    type="number"
                    step="1.00"
                    min="0"
                    defaultValue={0}
                    name="opening_balance"
                    placeholder="Opening Balance"
                    className="input"
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>
                    {`  `}*
                  </span>
                  {ValError[4] && <p style={{ color: "red" }}>{ValError[4]}</p>}
                </div>
              </div>
              <br />
              <div className="mt-0 col-lg-12">
                <div className="form-group">
                  <label className="label">Profile:</label>
                  <div className="container-video-div" style={{ width: "80%" }}>
                    {profile ? (
                      <img
                        src={uploadedImage}
                        className="container-image"
                        alt="Customer"
                      />
                    ) : (
                      <img
                        src={default_img}
                        className="container-image"
                        alt="Customer"
                      />
                    )}
                  </div>
                  <div className="mt-1 product-image-input">
                    <input
                      className="flex justify-left"
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
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
                    CONTACT INFORMATION{" "}
                  </b>
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Contact Name: </label>
                  <br />
                  <input
                    type="text"
                    name="contact_name"
                    placeholder="Contact Name"
                    className="input"
                    onBlur={(e) => validName1(e.target.value, 5)}
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>
                    {`  `}*
                  </span>
                  {ValError[5] && <p style={{ color: "red" }}>{ValError[5]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Contact Phone: </label>
                  <br />
                  <input
                    type="text"
                    name="contact_phone"
                    placeholder="Contact Phone"
                    className="input"
                    onBlur={(e) => validPhone1(e.target.value, 6)}
                  />
                  {ValError[6] && <p style={{ color: "red" }}>{ValError[6]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Contact Email: </label>
                  <br />
                  <input
                    type="text"
                    name="contact_email"
                    placeholder="Contact Email"
                    className="input"
                    onBlur={(e) => validateEmail1(e.target.value, 7)}
                  />
                  {ValError[7] && <p style={{ color: "red" }}>{ValError[7]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Note: </label>
                  <textarea
                    placeholder="Customer Note "
                    id="noteTextarea"
                    value={note}
                    onChange={handleChangeNote}
                    className="textarea"
                    onBlur={(e) => ValidText1(e.target.value, 8)}
                  />
                  {ValError[8] && <p style={{ color: "red" }}>{ValError[8]}</p>}
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={3} className="container-col">
              <div className="article-container-cus1">
                <div className="article-cu3">
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
                </div>
                <div className="article-cu2">
                  <button
                    style={{
                      padding: "4px",
                      backgroundColor: currentColor,
                      color: "#fff",
                      border: "none",
                      fontWeight: "bold",
                      width: "30px",
                    }}
                    color="white"
                    onClick={handleCopyClick}
                  >
                    C
                  </button>
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
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 9)}
                  />
                  {ValError[9] && <p style={{ color: "red" }}>{ValError[9]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">City: </label>
                  <input
                    type="text"
                    name="b_city"
                    placeholder="City"
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 10)}
                  />
                  {ValError[10] && (
                    <p style={{ color: "red" }}>{ValError[10]}</p>
                  )}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Zip: </label>
                  <input
                    type="text"
                    name="b_zip"
                    placeholder="Zip"
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 11)}
                  />
                  {ValError[11] && (
                    <p style={{ color: "red" }}>{ValError[11]}</p>
                  )}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">State: </label>
                  <input
                    type="text"
                    name="b_state"
                    placeholder="State"
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 12)}
                  />
                  {ValError[12] && (
                    <p style={{ color: "red" }}>{ValError[12]}</p>
                  )}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Country: </label>
                  <br />
                  <input
                    type="text"
                    name="b_country"
                    placeholder="Country"
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 13)}
                  />
                  {ValError[13] && (
                    <p style={{ color: "red" }}>{ValError[13]}</p>
                  )}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Phone 1: </label>
                  <input
                    type="text"
                    name="b_phone1"
                    placeholder="Phone1"
                    className="input"
                    onBlur={(e) => validPhone1(e.target.value, 14)}
                  />
                  {ValError[14] && (
                    <p style={{ color: "red" }}>{ValError[14]}</p>
                  )}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Phone 2: </label>
                  <input
                    type="text"
                    name="b_phone2"
                    placeholder="Phone2"
                    className="input"
                    onBlur={(e) => validPhone1(e.target.value, 15)}
                  />
                  {ValError[15] && (
                    <p style={{ color: "red" }}>{ValError[15]}</p>
                  )}
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
                      color: "currentColor",
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
                    placeholder="Street"
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 16)}
                  />
                  {ValError[16] && (
                    <p style={{ color: "red" }}>{ValError[16]}</p>
                  )}
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
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 17)}
                  />
                  {ValError[17] && (
                    <p style={{ color: "red" }}>{ValError[17]}</p>
                  )}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Zip: </label>
                  <input
                    type="text"
                    name="s_zip"
                    placeholder="Zip"
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 18)}
                  />
                  {ValError[18] && (
                    <p style={{ color: "red" }}>{ValError[18]}</p>
                  )}
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
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 19)}
                  />
                  {ValError[19] && (
                    <p style={{ color: "red" }}>{ValError[19]}</p>
                  )}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Country: </label>
                  <input
                    type="text"
                    name="s_country"
                    placeholder="Country"
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 20)}
                  />
                  {ValError[20] && (
                    <p style={{ color: "red" }}>{ValError[20]}</p>
                  )}
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
                    className="input"
                    onBlur={(e) => validPhone1(e.target.value, 21)}
                  />
                  {ValError[21] && (
                    <p style={{ color: "red" }}>{ValError[21]}</p>
                  )}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Attention Name: </label>
                  <input
                    type="text"
                    name="attention_name"
                    placeholder="Attention Name"
                    className="input"
                    onBlur={(e) => validName1(e.target.value, 22)}
                  />
                  {ValError[22] && (
                    <p style={{ color: "red" }}>{ValError[22]}</p>
                  )}
                </div>
              </div>
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
          className="custom-button"
          bgColor={currentColor}
          text="Add"
          borderRadius="10px"
          onClick={handleSubmit}
        />
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

export default AddCustomer;
