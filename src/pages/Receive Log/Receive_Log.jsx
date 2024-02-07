import React, { useEffect, useState, useRef } from "react";
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
  rowCell,
  isEditable,
} from "@syncfusion/ej2-react-grids";
import {
  GetAllSalesByID,
  GetAllStores,
  GetReceiveLogPurchaseOrderByID,
  GetReceiveProductsByPO_ID,
  EditReceive_Log,
} from "../../api/Api";
import Select from "react-select";
import { Header, Button } from "../../components";
import "../../styles/AddCus.css";
// import NumberFormat from 'react-number-format/NumberFormat';
import { useStateContext } from "../../contexts/ContextProvider";

const Receive_Log = () => {
  let param = useParams();
  const gridRef = useRef(null);
  const [AllAccounts, setAllAccounts] = useState("");
  const [so_id, setso_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [store, setstore] = useState("");
  const [store_id, setstore_id] = useState("");
  const [getstores, setstores] = useState([]);
  const [ship_date, setship_date] = useState(
    new Date().toISOString().split("T")[0] + " 00:00:00"
  );
  const [mfg_date, setmfg_date] = useState();
  const [acc_notes, setAccNotes] = useState("");
  const [qty_shipped, setqty_shipped] = useState(0);
  const [qty_reject, setqty_reject] = useState(0);
  const [recv_by, setrecv_by] = useState("");

  const [so_date, setso_date] = useState("");
  const [row_id, setrow_id] = useState("");
  const [invoice, setinvoice] = useState("");
  const [customer, setcustomer] = useState("");
  const [last_qty_edit, setlast_qty_edit] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);
  const [prod_code, setprod_code] = useState("");

  // useEffect(() => {
  //   if (gridRef.current && row_id === null) {
  //     // Clear the selection when row_id is null
  //     gridRef.current.clearSelection();
  //   }
  // }, [row_id]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(false);

  const [formData, setFormData] = useState({
    ship_date: new Date().toISOString().split("T")[0],
    // mfg_date: new Date().toISOString().split("T")[0],
  });

  const paramString = String(param.po_ids);
  const [so_id_param, store_id_param] = paramString.split("_");

  const [formData1, setFormData1] = useState({
    po_id: so_id_param,
    store_id: store_id_param,
    receive_logs: [],
  });

  const handleChangeAccNote = (e) => {
    setAccNotes(e.target.value);
  };

  const handleChangeRecv_by = (e) => {
    setrecv_by(e.target.value);
  };
  const handleChangeqty_shipped = (e) => {
    setqty_shipped(e.target.value);
  };
  const handleChangeqty_reject = (e) => {
    setqty_reject(e.target.value);
  };

  const customersGrid = [
    {
      headerText: "Product",
      field: "product",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "total_qty",
      headerText: "Qty",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "code",
      headerText: "Code",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "details",
      headerText: "Description",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "qty_recv",
      headerText: "Qty Rev to Date",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "qty_reject",
      headerText: "Qty Rej to Date",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "last_qty_recv",
      headerText: "Last Qty Rev",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "last_qty_reject",
      headerText: "Last Qty Rej",
      width: "150",
      textAlign: "Center",
    },
  ];

  const handleAddEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      setIsEditMode(false);
      setso_id("");
      setIsUpdateButtonDisabled(true);
      setForceUpdate(false);
      // const code = [...AllAccounts];
      setprod_code(row_id);
      setrow_id(null);
      // console.log(row_id);
      // console.log("Back");
      // navigate("/sales");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Purchase");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelClick = async (event) => {
    event.preventDefault();
    try {
      setIsUpdateButtonDisabled(false);
      // setIsEditMode(false);
      // setForceUpdate(true);
      setIsEditMode(false);
      // setIsUpdateButtonDisabled(false);
      setrow_id(null);
      setso_id(null);
      setqty_shipped(0);
      setAccNotes("");
      setmfg_date(null);
      setrecv_by("");
      setqty_reject(0);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateItemClick = async (event) => {
    event.preventDefault();
    try {
      console.log(AllAccounts);
      console.log(prod_code);
      const updatedItem = [...AllAccounts];
      console.log(last_qty_edit);
      var number = parseInt(updatedItem[prod_code].qty_recv);
      var number1 = parseInt(updatedItem[prod_code].qty_reject);
      var qty = number + parseInt(qty_shipped);
      var qty1 = number1 + parseInt(qty_reject);
      var k =
        parseInt(qty_reject) + parseInt(updatedItem[prod_code].qty_reject);
      const last_qty_edits = [...last_qty_edit];
      var s = qty - parseInt(last_qty_edits[prod_code].qty_recv);
      var rj = qty1 - parseInt(last_qty_edits[prod_code].qty_reject);

      const newitem = {
        code: updatedItem[prod_code].code,
        details: updatedItem[prod_code].details,
        product: updatedItem[prod_code].product,
        total_qty: updatedItem[prod_code].total_qty,
        qty_recv: qty,
        recv_date: ship_date,
        qty_reject: k,
        mfg_date: mfg_date,
        recv_by: recv_by,
        note: acc_notes,
        last_qty_recv: s,
        last_qty_reject: rj,
        product_id: updatedItem[prod_code].product_id,
      };
      const updatedRecords = updatedItem.filter(
        (record) => record.product_id !== updatedItem[prod_code].product_id
      );

      console.log(newitem);
      setAllAccounts([...updatedRecords, newitem]);
      // if(!row_id){
      setForceUpdate(true);
      setIsEditMode(false);
      setIsUpdateButtonDisabled(false);
      setrow_id("");
      setso_id(null);
      // }
      setqty_shipped(0);
      setAccNotes("");
      setmfg_date(null);
      setrecv_by("");
      setqty_reject(0);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeHireDate = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setship_date(e.target.value + " 00:00:00");
    console.log(ship_date);
  };

  const handleChangeMfgDate = (e) => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });

    if (mfg_date === "undefined") {
      setmfg_date(null);
    } else {
      setmfg_date(e.target.value + " 00:00:00");
      console.log(mfg_date);
    }
  };

  const handleViewEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      const updatedFormData = { ...formData1 };
      updatedFormData.po_id = so_id_param;
      updatedFormData.store_id = store_id_param;
      updatedFormData.receive_logs = [];

      AllAccounts.forEach((product, index) => {
        const shipment = {
          recv_status_id: 73,
          quantity: product.total_qty,
          product_id: product.product_id,
          recv_by: product.recv_by,
          recv_date: product.recv_date,
          quantity_recv: product.last_qty_recv,
          quantity_reject: product.last_qty_reject,
          mfg_date: product.mfg_date,
          recv_note: product.note,
        };
        updatedFormData.receive_logs.push(shipment);
      });

      setFormData1(updatedFormData);
      console.log(updatedFormData);
      const response = await EditReceive_Log(updatedFormData);
      if (response.status === 200) {
        alert("Receive Log Updated Successfully");
      } else {
        alert("Receive Log Failed to Update");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeStore = (e) => {
    setstore(e.target.value);
    const s_id = getstores.find((item) => item.name === e.target.value);
    setstore_id(s_id.store_id);
  };

  const onChangeGrid = (args) => {
    // const updatedItem = [...AllAccounts];
    // console.log("hehheh")
    // setAllAccounts(updatedItem);
    // setForceUpdate(false);
  };

  const handleRowSelected = (args) => {
    setso_id("");
    const selectedRowData = args.data;
    setso_id(selectedRowData ? selectedRowData.code : "");
    // if(isUpdateButtonDisabled){
    //   setIsEditMode(true)
    // }
    // setprod_code(args.rowIndex);
    // console.log(selectedRowData.code);
    // console.log(args.rowIndex);
    setrow_id(args.rowIndex);
  };

  useEffect(() => {
    GetReceiveLogPurchaseOrderByID(so_id_param, store_id_param)
      .then((resp) => {
        setcustomer(resp.data[0].vendor);
        setso_date(resp.data[0].order_date);
        setinvoice(resp.data[0].vendor_invoice_no);
      })
      .catch((err) => {
        console.log(err.message);
      });

    GetReceiveProductsByPO_ID(so_id_param, store_id_param)
      .then((resp1) => {
        setstores(resp1.data || []);
        setstore(resp1.data[0].name);
        setstore_id(resp1.data[0].store_id);
        setlast_qty_edit(resp1.data || []);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    // console.log(store_id);
    GetReceiveProductsByPO_ID(so_id_param, store_id_param)
      .then((result) => {
        setAllAccounts(result.data || []);
        // setlast_qty_edit(result.data.last_qty || []);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [store, store_id]);

  return (
    <div className="user-body">
      <div style={{ paddingLeft: "1px" }}>
        <Header title="RECEIVE LOG" />
      </div>

      <div className="flex justify-left">
        <div class="article-container-cus">
          <div class="article-cus4">
            <div className="col-lg-12">
              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>PO #: </label>
                <br />
                <input
                  className="input"
                  required
                  type="text"
                  name="name"
                  value={so_id_param}
                  placeholder="Sale Order"
                  readOnly
                  style={{ width: "110%", marginBottom: "20px" }}
                />
              </div>
            </div>
            {/* </div>
                    <div class="article"> */}

            <div className="col-lg-12">
              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Supplier: </label>
                <br />
                <input
                  type="text"
                  name="email"
                  value={customer}
                  placeholder="Vendor Name"
                  className="input"
                  readOnly
                  style={{ width: "110%" }}
                />
              </div>
            </div>
          </div>
          <div class="article-cus4">
            <div className="col-lg-12">
              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>PO Date: </label>
                <br />
                <input
                  required
                  type="text"
                  name="phone"
                  value={so_date}
                  placeholder="PO Date"
                  className="input"
                  readOnly
                  style={{ width: "110%", marginBottom: "20px" }}
                />
              </div>
            </div>
            {/* </div>
                    <div class="article"> */}
            <div className="col-lg-12">
              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Supplier Invoice: </label>
                <br />
                <input
                  type="text"
                  name="invoice"
                  value={invoice}
                  placeholder="Invoice No."
                  className="input"
                  readOnly
                  style={{ width: "110%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          style={{
            padding: "10px",
            backgroundColor:
              (isUpdateButtonDisabled && !isEditMode) || !so_id || isEditMode
                ? "grey"
                : currentColor,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            margin: "3px",
          }}
          color="white"
          borderRadius="10px"
          onClick={handleAddEmployeesClick}
          text="heh"
          disabled={
            (isUpdateButtonDisabled && !isEditMode) || !so_id || isEditMode
          }
        >
          Edit / Rcv
        </button>
      </div>
      <GridComponent
        dataSource={AllAccounts}
        allowPaging={true}
        pageSettings={{ pageSize: 25 }}
        allowSorting
        allowTextWrap={true}
        toolbar={["Search"]}
        width="auto"
        rowSelected={handleRowSelected}
        height={260}
        className="custom-grid"
        onChange={onChangeGrid}
        disabled={!row_id}
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
      <div className="flex justify-end">
        <button
          style={{
            padding: "10px",
            backgroundColor: !isUpdateButtonDisabled ? "grey" : currentColor,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            margin: "3px",
          }}
          color="white"
          borderRadius="10px"
          disabled={!isUpdateButtonDisabled}
          onClick={handleUpdateItemClick}
          text="heh"
        >
          Update Item
        </button>

        <button
          style={{
            padding: "10px",
            backgroundColor: !isUpdateButtonDisabled ? "grey" : currentColor,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            margin: "3px",
          }}
          color="white"
          borderRadius="10px"
          disabled={!isUpdateButtonDisabled}
          onClick={handleCancelClick}
          text="heh"
        >
          Cancel
        </button>
      </div>

      <div class="article-cus2">
        <div class="article-container-cus">
          {/* <br /> */}
          <div className="col-lg-12" style={{ paddingRight: "190px" }}>
            <div className="form-group">
              <label>Recv'd By: </label>
              <br />
              <input
                required
                type="text"
                name="recv_by"
                value={recv_by}
                placeholder="Receive By"
                className="input"
                onChange={handleChangeRecv_by}
                disabled={!isUpdateButtonDisabled}
                style={{ width: "170%", paddingRight: "30px" }}
              />
            </div>
          </div>
          <br />
          <br />
          {/* <br /> */}
          <div className="col-lg-12" style={{ paddingRight: "190px" }}>
            <div className="form-group">
              <label>Rcv'd Date: </label>
              <br />
              <input
                type="date"
                name="ship_date"
                value={formData.ship_date}
                className="input"
                onChange={handleChangeHireDate}
                disabled={!isUpdateButtonDisabled}
                style={{ width: "190%", paddingRight: "30px" }}
              />
            </div>
          </div>
          <br />
          <div className="col-lg-12" style={{ paddingRight: "190px" }}>
            <div className="form-group">
              <label>New Qty Recv'd: </label>
              <br />
              <input
                required
                type="number"
                name="qty_shipped"
                step="1.00"
                value={qty_shipped}
                placeholder="Quantity Shipped"
                className="input"
                onChange={handleChangeqty_shipped}
                disabled={!isUpdateButtonDisabled}
                style={{ width: "170%", paddingRight: "30px" }}
              />
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>

      <div class="article-cus2">
        <div class="article-container-cus">
          <div className="col-lg-12" style={{ paddingRight: "230px" }}>
            <div className="form-group">
              <label>Mfg Date: </label>
              <br />
              <input
                type="date"
                name="ship_date"
                value={formData.mfg_date}
                className="input"
                onChange={handleChangeMfgDate}
                disabled={!isUpdateButtonDisabled}
                style={{ width: "200%", paddingRight: "30px" }}
              />
            </div>
          </div>
          <br />

          <div className="col-lg-12" style={{ paddingRight: "190px" }}>
            <div className="form-group">
              <label>New Qty Reject: </label>
              <br />
              <input
                required
                type="number"
                name="qty_shipped"
                step="1.00"
                value={qty_reject}
                placeholder="Quantity Shipped"
                className="input"
                onChange={handleChangeqty_reject}
                disabled={!isUpdateButtonDisabled}
                style={{ width: "155%", paddingRight: "30px" }}
              />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>

      <div class="article-cus2">
        <div class="article-container-cus">
          <div className="col-lg-12" style={{ paddingRight: "190px" }}>
            <div className="form-group">
              <label>Note: </label>

              <br />
              <textarea
                style={{
                  width: "1600px",
                  height: "50px",
                }}
                placeholder="Note "
                id="noteTextarea"
                value={acc_notes}
                onChange={handleChangeAccNote}
                rows="2"
                className="textarea"
                disabled={!isUpdateButtonDisabled}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {/* 
        <Button
          margin="7px"
          color="white"
          bgColor={ !forceUpdate ? "grey" : currentColor}
          text="Save Order"
          borderRadius="10px"
          onClick={handleViewEmployeesClick}
          disabled={!forceUpdate}
        /> */}

        <button
          style={{
            padding: "10px",
            backgroundColor: !forceUpdate ? "grey" : currentColor,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            margin: "3px",
          }}
          color="white"
          borderRadius="10px"
          onClick={handleViewEmployeesClick}
          text="heh"
          disabled={!forceUpdate}
        >
          Save Order
        </button>
        <button
          style={{
            padding: "10px",
            backgroundColor: currentColor,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            margin: "3px",
          }}
          color="white"
          borderRadius="10px"
          onClick={handleBackClick}
          text="heh"
        >
          Back
        </button>

        {/* <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Back"
          borderRadius="10px"
          onClick={handleBackClick}
        /> */}
      </div>
    </div>
  );
};

export default Receive_Log;
