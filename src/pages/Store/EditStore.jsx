import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import {
  validateEmail,
  validateName,
  ValidPhone,
  ValidText,
} from "../../contexts/Utils";
import {
  GetStoreByID,
  EditStoreApi,
  GetAllManagers,
  CheckStoreNameExist,
} from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const EditStore = () => {
  const [Name, setName] = useState(" ");
  const [Name1, setName1] = useState(" ");
  const [Email, setEmail] = useState(" ");
  const [phone, setphone] = useState(" ");
  const [nexist, setnexist] = useState("");
  const [Address, setAddress] = useState(" ");
  const [City, setCity] = useState(" ");
  const [State, setState] = useState(" ");
  const [Postal, setPostal] = useState(" ");
  const [Manager, setManager] = useState("select");
  const [getmanager, setGetManager] = useState([]);
  const [Location_id, setLocation_id] = useState(" ");
  const [tax, settax] = useState(" ");
  const [ValError, setValError] = useState([]);

  let param = useParams();
  const navigate = useNavigate();

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
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeTax = (e) => {
    settax(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
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

  const handleChangephone = (e) => {
    setphone(e.target.value);
  };
  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };
  const handleChangeState = (e) => {
    setState(e.target.value);
  };
  const handleChangeManager = (e) => {
    setManager(e.target.value);
    if (e.target.value !== "select") {
      // const updatedErrors = [...ValError];
      // updatedErrors[3] = "";
      // setValError(updatedErrors);
    }
  };
  const handleChangePostal = (e) => {
    setPostal(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    // const { name, email, phone, manager_name, city,state, postal_code } = document.forms[0];
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
    if (Name1 !== Name) {
      if (nexist === 1) {
        updatedErrors[0] = "Store name must be unique.";
        setValError(updatedErrors);
        return;
      }
    }
    updatedErrors[0] = "";

    if (Email === "") {
      updatedErrors[1] = "Please enter email.";
      setValError(updatedErrors);
      return;
    }
    if (Email !== "") {
      if (validateEmail1(Email, 1) === false) {
        return;
      }
    }
    updatedErrors[1] = "";

    if (phone === "") {
      updatedErrors[2] = "Please enter phone no.";
      setValError(updatedErrors);
      return;
    }
    if (phone !== "") {
      if (validPhone1(phone, 2) === false) {
        return;
      }
    }
    updatedErrors[2] = "";

    if (tax === "") {
      updatedErrors[8] = "Please enter tax.";
      setValError(updatedErrors);
      return;
    }

    updatedErrors[8] = "";

    // if (Manager === "select") {
    //   updatedErrors[3] = "Please select manager.";
    //   setValError(updatedErrors);
    //   return;
    // }
    // updatedErrors[3] = "";

    if (Address !== "") {
      if (ValidText1(Address, 4) === false) {
        return;
      }
    }
    updatedErrors[4] = "";

    if (City !== "") {
      if (ValidText1(City, 5) === false) {
        return;
      }
    }
    updatedErrors[5] = "";

    if (State !== "") {
      if (ValidText1(State, 6) === false) {
        return;
      }
    }
    updatedErrors[6] = "";

    if (Postal !== "") {
      if (ValidText1(Postal, 7) === false) {
        return;
      }
    }
    updatedErrors[7] = "";
    const manager_id = getmanager.find((item) => item.manager === Manager);
    var mag = null;
    if (manager_id !== undefined) {
      mag = manager_id.employee_id;
    }
    var tx = 0;
    if (tax === "" || tax === null) {
      tx = 0;
    } else {
      tx = tax;
    }
    const response = await EditStoreApi(
      param.Store_id,
      Name,
      Email,
      phone,
      mag,
      Location_id,
      Address,
      City,
      State,
      Postal,
      tx
    );
    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/Stores");
      alert("Store updated successfully.");
    } else {
      alert("Store failed to update.");
    }
  };
  useEffect(() => {
    async function fetchData() {
      await CheckStoreNameExist(Name)
        .then((resp) => {
          // console.log(resp.data);
          setnexist(resp.data[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, [Name]);
  useEffect(() => {
    fetchData();
    const resp1 = GetStoreByID(param.Store_id);
    resp1
      .then(function (result) {
        setName(result.data[0].name || "");
        setName1(result.data[0].name || "");
        setEmail(result.data[0].email || "");
        setphone(result.data[0].contact || "");
        setAddress(result.data[0].street_address || "");
        setCity(result.data[0].city || "");
        setState(result.data[0].state || "");
        setPostal(result.data[0].postal_code || "");
        setManager(result.data[0].manager_id || "");
        setLocation_id(result.data[0].location_id || "");
        setManager(result.data[0].manager || "");
        settax(result.data[0].tax || "");
        //     setStoreDetail(result.data);
        //   console.log("hehhe" + result.data[0].name);
      })
      .catch((err) => {
        console.log(err.message);
      });

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
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="EDIT STORE" />
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
                  <label className="label">Name: </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={Name}
                    onChange={handleChangeName}
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
                  <label className="label">Email: </label>
                  <input
                    required
                    value={Email}
                    onChange={handleChangeEmail}
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
                  <label className="label">phone: </label>
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handleChangephone}
                    placeholder="phone"
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
                  <label className="label">Tax %:</label>
                  <input
                    type="number"
                    name="tax"
                    // defaultValue={0}
                    value={tax}
                    min="0"
                    placeholder="Tax"
                    className="input"
                    onChange={handleChangeTax}
                    onBlur={(e) => ValidText1(e.target.value, 8)}
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>
                    {`  `}*
                  </span>
                  {ValError[8] && <p style={{ color: "red" }}>{ValError[8]}</p>}
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Manager: </label>
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
                  <label className="label">Street Address: </label>
                  <textarea
                    placeholder="Street Address"
                    value={Address}
                    id="noteTextarea"
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
                  <label className="label">City: </label>
                  <input
                    type="text"
                    name="city"
                    value={City}
                    onChange={handleChangeCity}
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
                    value={State}
                    onChange={handleChangeState}
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
                    value={Postal}
                    onChange={handleChangePostal}
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
          text="Update"
          borderRadius="10px"
          onClick={handleUpdateClick}
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

export default EditStore;
