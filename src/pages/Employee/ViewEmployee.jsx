import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import { GetEmployeeById } from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const ViewEmployee = () => {
  const { currentColor } = useStateContext();
  const [street_address, setStreet_Address] = useState("");
  const [hire_date, sethire_date] = useState("");
  const [Store, setStore] = useState("");
  const [Manager, setManager] = useState("");
  let param = useParams();

  const [first_name, setfirst_name] = useState("");
  const [Email, setEmail] = useState("");
  const [contact, setcontact] = useState("");
  const [salary, setsalary] = useState("");
  const [postalcode, setpostalcode] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [acc_notes, setAccNotes] = useState("");
  const [acc_name, setAccName] = useState("");
  //const [acc_desc, setAccDesc] = useState("");
  const [acc_id, setacc_id] = useState("");
  const [acc_type_id, setacc_type_id] = useState("");
  //const [ledger_notes, setLedgerNotes] = useState("");
  const [OpeningBal, setOpeningBal] = useState("");
  //const [ledger_date, setledger_date] = useState("");

  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Employee");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      GetEmployeeById(param.Employee_id)
        .then((resp) => {
          console.log(resp.data);
          setfirst_name(resp.data[0][0].name);
          setStreet_Address(resp.data[0][0].street_address);
          setcity(resp.data[0][0].city);
          setstate(resp.data[0][0].state);
          setpostalcode(resp.data[0][0].postal_code);
          setEmail(resp.data[0][0].email);
          setcontact(resp.data[0][0].contact);
          if (resp.data[0][0].hire_date !== null) {
            const dbDate = new Date(resp.data[0][0].hire_date);
            dbDate.setUTCHours(24);
            sethire_date(dbDate.toISOString().split("T")[0]);
          }
          setManager(resp.data[0][0].Manager);
          setStore(resp.data[0][0].store);
          setsalary(resp.data[0][0].salary);
          setAccName(resp.data[0][0].acc_name);
          setAccNotes(resp.data[0][0].acc_notes);
          setacc_id(resp.data[0][0].account_id);
          setacc_type_id(resp.data[0][0].acc_type_id);
          setOpeningBal(resp.data[0][0].opening_balance);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="VIEW EMPLOYEE" />
      <form>
        <Container
          className="g-0 justify-center"
          fluid="true"
          style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "18px" }}
        >
          <Row xs={1} sm={1} style={{ padding: "0" }}>
            <Col md={4} className="container-col">
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
                    placeholder="Name"
                    className="input"
                    value={first_name}
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
                    name="contact"
                    placeholder="Phone"
                    className="input"
                    value={contact}
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
                    placeholder="Email"
                    className="input"
                    value={Email}
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Salary: </label>
                  <input
                    type="number"
                    step="1.00"
                    name="salary"
                    placeholder="Salary"
                    className="input"
                    value={salary}
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Hire Date: </label>
                  <input
                    type="date"
                    name="hire_date"
                    value={hire_date}
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={4} className="container-col">
              <div className="col-lg-12">
                <div className="pt-8 form-group">
                  <b
                    style={{
                      fontSize: "19px",
                      fontStyle: "bold",
                      color: currentColor,
                    }}
                  >
                    {"   "}
                  </b>
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Store: </label>
                  <input
                    type="text"
                    name="store"
                    placeholder="Store"
                    className="input"
                    value={Store}
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Manager: </label>
                  <input
                    type="text"
                    name="manager"
                    placeholder="Manager"
                    className="input"
                    value={Manager}
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
                    step="0.01"
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
                  <label className="label">Note: </label>
                  <textarea
                    placeholder="Note "
                    id="noteTextarea"
                    value={acc_notes}
                    rows="4"
                    className="textarea"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={4} className="container-col">
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
                    id="noteTextarea"
                    value={street_address}
                    readOnly
                    rows="4"
                    className="textarea"
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">City: </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="input"
                    value={city}
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
                    name="state"
                    placeholder="State"
                    className="input"
                    value={state}
                    readOnly
                  />
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
                    value={postalcode}
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

export default ViewEmployee;
