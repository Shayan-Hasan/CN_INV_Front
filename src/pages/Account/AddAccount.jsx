import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateName, ValidText } from "../../contexts/Utils";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import {
  GetAllAccountTypes,
  AddAccountOpeningBal,
  CheckAccNameExist,
} from "../../api/Api";
import { Header, Button } from "../../components";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const AddAccount = () => {
  const { currentColor } = useStateContext();
  const [acc_notes, setAccNotes] = useState("");
  const [AccountType, setAccountType] = useState("select");
  const [getacc_types, setacc_types] = useState([]);
  const [aexist, setaexist] = useState("");
  const [name, setname] = useState("");
  const [ValError, setValError] = useState([]);

  const handleChangeAccNote = (e) => {
    setAccNotes(e.target.value);
  };

  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Account");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeAccountType = (e) => {
    setAccountType(e.target.value);
    if (e.target.value !== "select") {
      const updatedErrors = [...ValError];
      updatedErrors[1] = "";
      setValError(updatedErrors);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    TimeoutUtility.resetTimeout();
    const { acc_description, opening_balance } = document.forms[0];

    setValError([]);
    const updatedErrors = [...ValError];

    if (name === "") {
      updatedErrors[0] = "Please enter account name.";
      setValError(updatedErrors);
      return;
    }
    if (name !== "") {
      if (validName1(name, 0) === false) {
        return;
      }
    }

    if (aexist === 1) {
      updatedErrors[0] = "Account name must be unique.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";

    if (AccountType === "select") {
      updatedErrors[1] = "Please select account type.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[1] = "";

    if (acc_description.value !== "") {
      if (ValidText1(acc_description.value, 2) === false) {
        return;
      }
    }
    updatedErrors[2] = "";

    if (opening_balance.value === "") {
      updatedErrors[3] = "Please enter opening balance.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[3] = "";

    if (acc_notes !== "") {
      if (ValidText1(acc_notes, 4) === false) {
        return;
      }
    }
    updatedErrors[4] = "";

    const accounttype_id = getacc_types.find(
      (item) => item.name === AccountType
    );

    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() - offsetMs);
    const str = dateLocal
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, "/")
      .replace("T", " ");
    const lnotes = "Opening Balance Set";
    const response = await AddAccountOpeningBal(
      name,
      acc_description.value,
      accounttype_id.a_type_id,
      acc_notes,
      lnotes,
      opening_balance.value,
      str,
      900
    );
    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/Account");
      alert("Account added successfully.");
    } else {
      alert("Account failed to add.");
    }
  };
  const handleChangeName = (e) => {
    setname(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      await CheckAccNameExist(name)
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
    async function fetchData() {
      GetAllAccountTypes()
        .then((resp) => {
          setacc_types(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="ADD ACCOUNT" />
      <form>
        {/* <div
              style={{
                textAlign: "left",
                backgroundColor: "Transparent",
                color: "black",
              }}
            >
              <div class="article-container-cus">
                <div className="flex justify-left"> */}
        {/* <div class="article-container"> */}
        {/* <div class="article-employee2"> */}
        <Container
          className="g-0 justify-center"
          fluid="true"
          style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "18px" }}
        >
          <Row xs={1} sm={1} style={{ padding: "0" }}>
            <Col md={6} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Account Title:</label>
                  <input
                    required
                    type="text"
                    name="acc_name"
                    placeholder="Title"
                    value={name}
                    onChange={handleChangeName}
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
                  <label className="label" htmlFor="AccountSelect">
                    Type:
                  </label>
                  <select
                    className="select container-select"
                    id="AccountSelect"
                    value={AccountType}
                    onChange={handleChangeAccountType}
                  >
                    <option defaultValue="select">Select Type</option>
                    {getacc_types.map((item) => (
                      <option key={item.a_type_id}>{item.name}</option>
                    ))}
                  </select>
                  <span style={{ color: "red", fontSize: "16px" }}>{` `}*</span>
                  {ValError[1] && <p style={{ color: "red" }}>{ValError[1]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Opening Balance:</label>
                  <input
                    type="number"
                    step="1.00"
                    min="0"
                    defaultValue={0}
                    name="opening_balance"
                    placeholder="Opening Balance"
                    className="input"
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>{` `}*</span>
                  {ValError[3] && <p style={{ color: "red" }}>{ValError[3]}</p>}
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={6} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Description:</label>
                  <input
                    type="text"
                    name="acc_description"
                    placeholder="Description"
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 2)}
                  />
                  {ValError[2] && <p style={{ color: "red" }}>{ValError[2]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Note: </label>
                  <textarea
                    placeholder="Account Note"
                    id="noteTextarea"
                    className="textarea"
                    value={acc_notes}
                    onChange={handleChangeAccNote}
                    onBlur={(e) => ValidText1(e.target.value, 4)}
                  />
                  {ValError[4] && <p style={{ color: "red" }}>{ValError[4]}</p>}
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

export default AddAccount;
