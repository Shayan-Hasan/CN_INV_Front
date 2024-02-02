import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import { ValidText } from "../../contexts/Utils";
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
import {
  editJournalApi,
  getAccNamesCash,
  getAccNameCusVen,
  getAcc1BalFrom,
  getJournalById,
} from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";
import Select from "react-select";

const EditJournal = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [acc_notes, setAccNotes] = useState("");
  const [AllAccounts, setAllAccounts] = useState("");
  const [r_id, setr_id] = useState("");
  const [to_acc, setto_acc] = useState("");
  const [amount_paid, setamount_paid] = useState(0);
  const [to_acc_Options, setto_acc_Options] = useState([]);
  const [GetAccount_To, setGetAccount_To] = useState([]);
  const [from_acc, setfrom_acc] = useState("");
  const [from_acc_Options, setfrom_acc_Options] = useState([]);
  const [ValError, setValError] = useState([]);
  const [to_acc_bal, setto_acc_bal] = useState("");
  const [from_acc_bal, setfrom_acc_bal] = useState("");
  let param = useParams();
  const [acc_from_id, setacc_from_id] = useState(null);
  const [acc_to_id, setacc_to_id] = useState(null);

  const [Journal, setJournal] = useState({
    journal_id: param.r_id,
    journal: [],
  });

  const handleChangeAccNote = (e) => {
    setAccNotes(e.target.value);
  };
  const handleChangeAmount = (e) => {
    setamount_paid(e.target.value);
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

  const handleChangeAcc_To = async (selectedOption) => {
    // selectedOption.preventDefault();
    setfrom_acc_bal("");
    if (selectedOption === null) {
      setto_acc("");
      setacc_to_id("");
    } else {
      if (selectedOption.label !== "") {
        const updatedErrors = [...ValError];
        updatedErrors[0] = "";
        setValError(updatedErrors);
      }
      setto_acc_bal("");
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

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    // setr_id(selectedRowData.journal_id);
    // console.log(selectedRowData.journal_id);
    const updatedAccounts = [...AllAccounts];
    updatedAccounts.splice(args.rowIndex, 1);
    setAllAccounts([...updatedAccounts]);

    const toAccOption = to_acc_Options.find(
      (option) => option.label === selectedRowData.account
    );

    const fromAccOption = from_acc_Options.find(
      (option) => parseInt(option.value) === selectedRowData.type_id
    );
    console.log(from_acc_Options);

    if (!fromAccOption) {
      return;
    }

    const toAccOption1 = {
      label: toAccOption.label,
      value: toAccOption.value,
      bal: toAccOption.bal,
    };

    const fromAccOption1 = {
      label: fromAccOption.label,
      value: fromAccOption.value,
      bal: "0",
    };

    setto_acc(toAccOption1);
    setfrom_acc(fromAccOption1);
    setto_acc_bal(toAccOption1.bal);
    if (selectedRowData.credit > 0) {
      setamount_paid(selectedRowData.credit);
    }
    if (selectedRowData.debit > 0) {
      setamount_paid(selectedRowData.debit);
    }
    // setamount_paid(selectedRowData.amount);
    setAccNotes(selectedRowData.notes);

    console.log(updatedAccounts);
  };

  const customersGrid = [
    {
      field: "account",
      headerText: "Account",
      width: "110",
      textAlign: "Center",
    },

    {
      field: "credit",
      headerText: "Credit",
      width: "100",
      format: "C2",
      textAlign: "Center",
    },
    {
      field: "debit",
      headerText: "Debit",
      width: "100",
      format: "C2",
      textAlign: "Center",
    },

    {
      field: "notes",
      headerText: "Note",
      width: "200",
      textAlign: "Center",
    },
  ];

  const handleChangeAcc_From = async (selectedOption) => {
    // selectedOption.preventDefault();
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
      navigate("/journal");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddItem1 = async (e) => {
    e.preventDefault();
    setValError([]);
    const updatedErrors = [...ValError];

    if (!to_acc) {
      updatedErrors[0] = "Please select account.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";

    if (!from_acc) {
      updatedErrors[1] = "Please select type.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[1] = "";

    if (amount_paid === "" || amount_paid === "0" || amount_paid === 0) {
      updatedErrors[2] = "Amount must be greater than 0.";
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

    const updatedItem = [...AllAccounts];
    var a = 0,
      b = 0;
    if (from_acc.value === 902) {
      a = parseFloat(amount_paid);
    } else {
      b = parseFloat(amount_paid);
    }
    const newitem = {
      account: to_acc.label,
      credit: a,
      debit: b,
      notes: acc_notes,
      type_id: from_acc.value,
      account_id: to_acc.value,
    };
    setAllAccounts([...updatedItem, newitem]);
    setfrom_acc("");
    setAccNotes("");
    setto_acc("");
    setamount_paid(0);
    setto_acc_bal("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const journallist = { ...Journal };
    journallist.journal = [];

    if (AllAccounts.length < 1) {
      alert("Journal vouchar is empty.");
      return;
    }
    var a = 0,
      b = 0;
    AllAccounts.forEach((element, index) => {
      a = a + parseFloat(element.credit);
      b = b + parseFloat(element.debit);
    });

    if (a !== b) {
      alert("Credit and debit are not equal");
      return;
    }

    AllAccounts.forEach((element, index) => {
      var d = 0;
      if (parseFloat(element.credit) > 0) {
        d = parseFloat(element.credit);
      }
      if (parseFloat(element.debit) > 0) {
        d = parseFloat(element.debit);
      }
      const newitem1 = {
        account_id: element.account_id,
        amount_paid: d,
        type_id: element.type_id,
        note: element.notes,
      };
      journallist.journal.push(newitem1);
    });
    console.log(journallist);
    const response = await editJournalApi(journallist);
    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/journal");
      alert("Journal ledger updated successfully.");
    } else {
      alert("Journal ledger failed to update.");
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
    async function fetchData() {
      await getJournalById(param.r_id)
        .then((resp) => {
          setAllAccounts(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      await getAccNamesCash()
        .then((resp) => {
          setGetAccount_To(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      const ba = [
        { label: "Credit", value: 902, bal: "0" },
        {
          label: "Debit",
          value: 901,
          bal: "0",
        },
      ];
      setfrom_acc_Options(ba);
    }
    fetchData();
  }, []);
  const settings = { checkboxMode: "ResetOnRowClick" };
  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="EDIT JOURNAL" />
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
            <Col md={3} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label" htmlFor="ProductSelect">
                    Account:
                  </label>
                  <Select
                    className="myreact-select container-select"
                    value={to_acc}
                    onChange={handleChangeAcc_To}
                    options={to_acc_Options}
                    isSearchable
                    placeholder="Select Account"
                    isClearable
                  />
                  {ValError[0] && <p style={{ color: "red" }}>{ValError[0]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12 mt-3 mb-3">
                <div className="form-group">
                  <label className="label" htmlFor="ProductSelect">
                    Type:
                  </label>
                  <Select
                    className="myreact-select container-select"
                    value={from_acc}
                    onChange={handleChangeAcc_From}
                    options={from_acc_Options}
                    isSearchable
                    placeholder="Select Type"
                    isClearable
                  />
                  {ValError[1] && <p style={{ color: "red" }}>{ValError[1]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Amount:</label>
                  <input
                    type="number"
                    step="1.00"
                    min="0"
                    value={amount_paid}
                    onChange={handleChangeAmount}
                    defaultValue={0.0}
                    name="amount_paid"
                    placeholder="Enter Amount"
                    className="input"
                  />
                  <div>
                    {ValError[2] && (
                      <p style={{ color: "red" }}>{ValError[2]}</p>
                    )}
                  </div>
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Note:</label>
                  <textarea
                    placeholder="Enter Note"
                    id="noteTextarea"
                    value={acc_notes}
                    onChange={handleChangeAccNote}
                    rows="4"
                    className="textarea"
                    onBlur={(e) => ValidText1(e.target.value, 3)}
                  />
                  {ValError[3] && <p style={{ color: "red" }}>{ValError[3]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12 ">
                <div className="form-group" style={{ textAlign: "center" }}>
                  <Button
                    margin="10px"
                    padding="20px"
                    color="white"
                    className="custom-button ml-2"
                    bgColor={currentColor}
                    text="Insert"
                    borderRadius="10px"
                    onClick={handleAddItem1}
                  />
                </div>
              </div>
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
            </Col>
            <Col md={7} className="container-col">
              <GridComponent
                className="custom-grid"
                dataSource={AllAccounts}
                allowPaging={true}
                pageSettings={{ pageSize: 16 }}
                allowSorting
                allowResizing
                //toolbar={["Search"]}
                rowSelected={handleRowSelected}
                selectionSettings={settings}
                rowHeight={36}
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
          text="Edit"
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

export default EditJournal;
