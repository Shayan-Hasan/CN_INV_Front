import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
} from "@syncfusion/ej2-react-grids";
import {
  GetAllAccountTypes,
  EditAccountOpeningBal,
  GetAccountByID,
} from "../../api/Api";
import { customersData } from "../../data/dummy";
import { Header, Button } from "../../components";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const ViewAccount = () => {
  const { currentColor } = useStateContext();
  const [AccountType, setAccountType] = useState("");
  const [acc_notes, setAccNotes] = useState("");
  const [acc_name, setAccName] = useState("");
  const [acc_desc, setAccDesc] = useState("");
  const [acc_id, setacc_id] = useState("");
  const [ledger_notes, setLedgerNotes] = useState("");
  const [OpeningBal, setOpeningBal] = useState("");
  const [ledger_date, setledger_date] = useState("");
  let param = useParams();

  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/account");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      GetAccountByID(param.Account_id)
        .then((resp) => {
          setAccName(resp.data[0].name);
          setAccDesc(resp.data[0].description);
          setAccNotes(resp.data[0].notes);
          setAccountType(resp.data[0].acc_type);
          const dbDate1 = new Date(resp.data[0].datetime);
          dbDate1.setUTCHours(24);
          setledger_date(dbDate1.toISOString().split("T")[0]);
          setacc_id(resp.data[0].account_id);
          setOpeningBal(resp.data[0].end_balance);
          setLedgerNotes(resp.data[0].note);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="VIEW ACCOUNT" />
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
                  <label className="label">Account Title: </label>
                  <input
                    type="text"
                    name="acc_name"
                    placeholder="Title"
                    className="input"
                    value={acc_name}
                    readOnly
                  />
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Type: </label>
                  <input
                    type="text"
                    name="acc_type"
                    placeholder="Account Type"
                    className="input"
                    value={AccountType}
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
                    step="1"
                    name="opening_balance"
                    placeholder="Opening Balance"
                    className="input"
                    value={OpeningBal}
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
                  <label className="label">Description: </label>
                  <input
                    type="text"
                    name="acc_description"
                    placeholder="Description"
                    className="input"
                    value={acc_desc}
                    readOnly
                  />
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Note: </label>
                  <textarea
                    placeholder="Note "
                    id="noteTextarea"
                    value={acc_notes}
                    readOnly
                    rows="4"
                    className="textarea"
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

export default ViewAccount;
