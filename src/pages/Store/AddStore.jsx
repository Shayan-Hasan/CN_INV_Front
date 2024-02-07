import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import {
  validateEmail,
  validateName,
  ValidPhone,
  ValidWebsite,
  ValidAmount,
  ValidText,
} from "../../contexts/Utils";
import {
  AddStoreApi,
  GetAllManagers,
  CheckStoreNameExist,
} from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const AddStore = () => {
  const { currentColor } = useStateContext();
  const [street_address, setStreet_address] = useState("");
  const [nexist, setnexist] = useState("");
  const [ValError, setValError] = useState([]);
  const [Manager, setManager] = useState("select");
  const [Name, setName] = useState("");
  const navigate = useNavigate();
  const [getmanager, setGetManager] = useState([]);

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Stores");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validName1 = (name, ii) => {
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
  };

  const ValidText1 = (txt, ii) => {
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
  };

  const validPhone1 = (phone, ii) => {
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
  };

  const validateEmail1 = (mail, ii) => {
    const updatedErrors = [...ValError];

    if (mail.trim().length === 0) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
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
  };

  const handleChangeAddress = (e) => {
    setStreet_address(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, contact, manager_name, city, state, postal_code } =
      document.forms[0];

    setValError([]);
    const updatedErrors = [...ValError];

    if (Name === "") {
      updatedErrors[0] = "Please enter store name.";
      setValError(updatedErrors);
      return;
    }
    if (Name !== "") {
      if (validName1(Name, 0) === false) {
        return;
      }
    }
    if (nexist === 1) {
      updatedErrors[0] = "Store name must be unique.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";

    if (email.value === "") {
      updatedErrors[1] = "Please enter email.";
      setValError(updatedErrors);
      return;
    }
    if (email.value !== "") {
      if (validateEmail1(email.value, 1) === false) {
        return;
      }
    }
    updatedErrors[1] = "";

    if (contact.value === "") {
      updatedErrors[2] = "Please enter contact no.";
      setValError(updatedErrors);
      return;
    }
    if (contact.value !== "") {
      if (validPhone1(contact.value, 2) === false) {
        return;
      }
    }
    updatedErrors[2] = "";

    // if (Manager === "select") {
    //   updatedErrors[3] = "Please! Select Manager";
    //   setValError(updatedErrors);
    //   return;
    // }
    // updatedErrors[3] = "";

    if (street_address !== "") {
      if (ValidText1(street_address, 4) === false) {
        return;
      }
    }
    updatedErrors[4] = "";

    if (city.value !== "") {
      if (ValidText1(city.value, 5) === false) {
        return;
      }
    }
    updatedErrors[5] = "";

    if (state.value !== "") {
      if (ValidText1(state.value, 6) === false) {
        return;
      }
    }
    updatedErrors[6] = "";

    if (postal_code.value !== "") {
      if (ValidText1(postal_code.value, 7) === false) {
        return;
      }
    }
    updatedErrors[7] = "";

    const manager_id = getmanager.find((item) => item.manager === Manager);
    var mag = null;
    if (manager_id != undefined) {
      mag = manager_id.employee_id;
    }
    const response = await AddStoreApi(
      Name,
      email.value,
      contact.value,
      mag,
      street_address,
      city.value,
      state.value,
      postal_code.value
    );
    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/Stores");
      alert("Store added successfully.");
    } else {
      alert("Store failed to add.");
    }
  };
  const handleChangeManager = (e) => {
    setManager(e.target.value);
    if (e.target.value !== "select") {
      // const updatedErrors = [...ValError];
      // updatedErrors[3] = "";
      // setValError(updatedErrors);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await CheckStoreNameExist(Name)
        .then((resp) => {
          console.log(resp.data);
          setnexist(resp.data[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, [Name]);

  useEffect(() => {
    async function fetchData() {
      GetAllManagers()
        .then((resp) => {
          setGetManager(resp.data || []);
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="ADD STORE" />
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
                  <b
                    style={{
                      fontSize: "19px",
                      fontStyle: "bold",
                      color: currentColor,
                    }}
                  >
                    GENERAL INFORMATION
                  </b>
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Name:</label>
                  <input
                    required
                    type="text"
                    value={Name}
                    onChange={handleChangeName}
                    name="name"
                    placeholder="Name"
                    className="input"
                    autoFocus
                    onBlur={(e) => validName1(e.target.value, 0)}
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>
                    {`  `}*
                  </span>
                  {ValError[0] && <p style={{ color: "red" }}>{ValError[0]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Email:</label>
                  <input
                    required
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="input"
                    onBlur={(e) => validateEmail1(e.target.value, 1)}
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
                  <label className="label">Contact:</label>
                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    className="input"
                    onBlur={(e) => validPhone1(e.target.value, 2)}
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
                  <label className="label">Manager:</label>
                  <select
                    className="select container-select"
                    id="ManagerSelect"
                    value={Manager}
                    onChange={handleChangeManager}
                  >
                    <option value="select">Select Manager</option>
                    {getmanager.map((item) => (
                      <option key={item.employee_id}>{item.manager}</option>
                    ))}
                  </select>
                  {/* <span style={{ color: "red", fontSize: "16px" }}>
                          {` `}*
                        </span> */}
                  {/* {ValError[3] && (
                          <p style={{ color: "red" }}>{ValError[3]}</p>
                        )} */}
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={6} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <b
                    style={{
                      fontSize: "19px",
                      fontStyle: "bold",
                      color: currentColor,
                    }}
                  >
                    LOCATION DETAIL
                  </b>
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Street Address:</label>
                  <textarea
                    placeholder="Street Address"
                    id="noteTextarea"
                    value={street_address}
                    onChange={handleChangeAddress}
                    className="textarea"
                    onBlur={(e) => ValidText1(e.target.value, 4)}
                  />
                  {ValError[4] && <p style={{ color: "red" }}>{ValError[4]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">City:</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 5)}
                  />
                  {ValError[5] && <p style={{ color: "red" }}>{ValError[5]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">State: </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 6)}
                  />
                  {ValError[6] && <p style={{ color: "red" }}>{ValError[6]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Postal Code: </label>
                  <input
                    type="text"
                    name="postal_code"
                    placeholder="Postal Code"
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 7)}
                  />
                  {ValError[7] && <p style={{ color: "red" }}>{ValError[7]}</p>}
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
          text="Add"
          borderRadius="10px"
          onClick={handleSubmit}
        />
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

export default AddStore;
