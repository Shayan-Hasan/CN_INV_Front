import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import { ValidText } from "../../contexts/Utils";
import {
  GetAllPaymentDetail,
  editPayment,
  getAccNamesCash,
  getAccNameCusVen,
  GetPaymentDetailByID,
  getAcc1BalFrom,
} from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";
import Select from "react-select";

const EditReceipt = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [acc_notes, setAccNotes] = useState("");
  const [amount_paid, setamount_paid] = useState("");
  const [gettoacc, setgettoacc] = useState("");
  const [getfromacc, setgetfromacc] = useState("");

  const [to_acc, setto_acc] = useState("");
  const [to_acc_Options, setto_acc_Options] = useState([]);
  const [GetAccount_To, setGetAccount_To] = useState([]);
  const [from_acc, setfrom_acc] = useState("");
  const [from_acc_Options, setfrom_acc_Options] = useState([]);
  const [GetAccount_From, setGetAccount_From] = useState([]);

  const [to_acc_bal, setto_acc_bal] = useState("");
  const [from_acc_bal, setfrom_acc_bal] = useState("");

  const [acc_from_id, setacc_from_id] = useState(null);
  const [acc_to_id, setacc_to_id] = useState(null);
  const [acc_from_id1, setacc_from_id1] = useState(null);
  const [acc_to_id1, setacc_to_id1] = useState(null);
  const [ValError, setValError] = useState([]);
  let param = useParams();

  const handleChangeAccNote = (e) => {
    setAccNotes(e.target.value);
  };
  const handleChangeAmountPaid = (e) => {
    setamount_paid(e.target.value);
  };

  const handleChangeAcc_To = async (selectedOption) => {
    setto_acc_bal("");
    if (selectedOption === null) {
      setto_acc("");
      setacc_to_id("");
    } else {
      if (selectedOption.label !== "") {
        const updatedErrors = [...ValError];
        updatedErrors[0] = "";
        setValError(updatedErrors);
      }
      if (selectedOption && selectedOption.value) {
        if (selectedOption.value) {
          // try {
          //   const resp = await getAcc1BalFrom(selectedOption.value);
          setto_acc_bal(selectedOption.bal);
          // } catch (err) {
          //   console.log(err.message);
          // }
          setto_acc(selectedOption);
          setacc_to_id(selectedOption.value);
        }
      }
    }
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

  const handleChangeAcc_From = async (selectedOption) => {
    setfrom_acc_bal("");
    if (selectedOption === null) {
      setfrom_acc("");
      setacc_from_id("");
    } else {
      if (selectedOption.label !== "") {
        const updatedErrors = [...ValError];
        updatedErrors[1] = "";
        setValError(updatedErrors);
      }
      if (selectedOption && selectedOption.value) {
        if (selectedOption.value) {
          // try {
          //   const resp = await getAcc1BalFrom(selectedOption.value);
          setfrom_acc_bal(selectedOption.bal);
          // } catch (err) {
          //   console.log(err.message);
          // }

          setfrom_acc(selectedOption);
          setacc_from_id(selectedOption.value);
        }
      }
    }
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/receipt");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValError([]);
    const updatedErrors = [...ValError];

    if (to_acc === "") {
      updatedErrors[0] = "Please select receive in a/c.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";

    if (from_acc === "") {
      updatedErrors[1] = "Please select receive from a/c.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[1] = "";

    if (amount_paid === "") {
      updatedErrors[2] = "Please enter opening balance.";
      setValError(updatedErrors);
      return;
    }
    if (amount_paid < 1) {
      updatedErrors[2] = "Amount paid must be greater than 0.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[2] = "";

    if (acc_notes) {
      if (ValidText1(acc_notes, 3) === false) {
        return;
      }
    }
    updatedErrors[3] = "";

    var aa = null;
    var b = null;
    if (acc_from_id === null) {
      aa = acc_from_id1;
    } else {
      aa = acc_from_id;
    }
    if (acc_to_id === null) {
      b = acc_to_id1;
    } else {
      b = acc_to_id;
    }
    console.log(aa);
    const response = await editPayment(
      param.r_id,
      aa,
      b,
      acc_from_id1,
      acc_to_id1,
      amount_paid,
      acc_notes,
      from_acc_bal,
      to_acc_bal
    );
    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/receipt");
      alert("Receipt update successfully.");
    } else {
      alert("Receipt failed to update.");
    }
  };

  useEffect(() => {
    const fetchAcc_ToOptions = async () => {
      const fetchedProductOptions = GetAccount_To.map((item) => ({
        label: item.name,
        value: item.account_id,
        bal: item.end_balance,
      }));
      setto_acc_Options(fetchedProductOptions);
    };
    fetchAcc_ToOptions();
  }, [GetAccount_To, to_acc]);
  useEffect(() => {
    const fetchAcc_ToOptions = async () => {
      const fetchedProductOptions = GetAccount_From.map((item) => ({
        label: item.name,
        value: item.account_id,
        bal: item.end_balance,
      }));
      setfrom_acc_Options(fetchedProductOptions);
    };
    fetchAcc_ToOptions();
  }, [GetAccount_From, from_acc]);

  useEffect(() => {
    async function fetchData() {
      var to_det = null;
      var from_det = null;
      await getAccNamesCash()
        .then((resp) => {
          setGetAccount_To(resp.data || []);
          to_det = resp.data;
        })
        .catch((err) => {
          console.log(err.message);
        });

      await getAccNameCusVen()
        .then((resp1) => {
          setGetAccount_From(resp1.data || []);
          from_det = resp1.data;
        })
        .catch((err) => {
          console.log(err.message);
        });

      try {
        const resp1 = await getAcc1BalFrom(param.r_id);

        setgetfromacc(resp1.data[0].from);
        setAccNotes(resp1.data[0].note);
        setamount_paid(resp1.data[0].amount_paid);

        const toAccOption = to_det.find(
          (option) => option.name === resp1.data[0].to
        );
        console.log(toAccOption);

        const toAccOption1 = {
          label: toAccOption.name,
          value: toAccOption.account_id,
          bal: toAccOption.end_balance,
        };
        setto_acc(toAccOption1);
        setto_acc_bal(toAccOption1.bal);

        const fromAccOption = from_det.find(
          (option) => option.name === resp1.data[0].from
        );
        console.log(toAccOption);

        const fromAccOption1 = {
          label: fromAccOption.name,
          value: fromAccOption.account_id,
          bal: fromAccOption.end_balance,
        };

        setfrom_acc(fromAccOption1);
        setfrom_acc_bal(fromAccOption1.bal);
        setacc_to_id1(toAccOption.account_id);
        setacc_from_id1(fromAccOption.account_id);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="EDIT RECEIPT" />
      <form>
        <Container
          className="g-0 justify-center"
          fluid="true"
          style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "18px" }}
        >
          <Row
            xs={1}
            sm={1}
            className="justify-content-center"
            style={{
              padding: "0",
            }}
          >
            <Col md={6} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label" htmlFor="ProductSelect">
                    Received In:{" "}
                  </label>
                  <div className="flex mb-2">
                    <Select
                      className="myreact-select container-select"
                      value={to_acc}
                      onChange={handleChangeAcc_To}
                      options={to_acc_Options}
                      isSearchable
                      placeholder="Select Receive In Account"
                      isClearable
                    />
                    <span
                      className="myreact-span"
                      style={{
                        color: "red",
                        fontSize: "16px",
                      }}
                    >
                      {` `}*
                    </span>
                  </div>
                  {ValError[0] && <p style={{ color: "red" }}>{ValError[0]}</p>}
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label" htmlFor="ProductSelect">
                    Received From:
                  </label>
                  <div className="flex mb-2">
                    <Select
                      className="myreact-select container-select"
                      value={from_acc}
                      onChange={handleChangeAcc_From}
                      options={from_acc_Options}
                      isSearchable
                      placeholder="Select Receive From Account"
                      isClearable
                    />
                    <span
                      className="myreact-span"
                      style={{
                        color: "red",
                        fontSize: "16px",
                      }}
                    >
                      {` `}*
                    </span>
                  </div>
                  {ValError[1] && <p style={{ color: "red" }}>{ValError[1]}</p>}
                  {/* <div>Bal: {formatCurrency(from_acc_bal)}</div> */}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Amount Received:</label>
                  <input
                    type="number"
                    step="1.00"
                    min="0"
                    defaultValue={0.0}
                    value={amount_paid}
                    onChange={handleChangeAmountPaid}
                    name="amount_paid"
                    placeholder="Enter Account Received"
                    className="input"
                  />
                  <span
                    style={{
                      color: "red",
                      fontSize: "16px",
                    }}
                  >
                    {` `}*
                  </span>
                  {ValError[2] && <p style={{ color: "red" }}>{ValError[2]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Note: </label>
                  <textarea
                    placeholder="Note"
                    id="noteTextarea"
                    value={acc_notes}
                    onChange={handleChangeAccNote}
                    className="textarea"
                    onBlur={(e) => ValidText1(e.target.value, 3)}
                  />
                  {ValError[3] && <p style={{ color: "red" }}>{ValError[3]}</p>}
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={2} className="container-col">
              <div className="col-lg-12">
                <div className="form-group mt-8">
                  <label className="label">
                    Bal: {formatCurrency(to_acc_bal)}
                  </label>
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group mt-8">
                  <label className="label">
                    Bal: {formatCurrency(from_acc_bal)}
                  </label>
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
          className="custom-button ml-2"
          bgColor={currentColor}
          text="Update"
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

export default EditReceipt;
