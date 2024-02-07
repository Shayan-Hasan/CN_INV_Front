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
  Resize,
} from "@syncfusion/ej2-react-grids";
import {
  GetAllSalesByID,
  GetAllStores,
  GetShipmentSaleOrderByID,
  GetShipmentProductsBySO_ID,
  EditShipment,
} from "../../api/Api";
import Select from "react-select";
import { Header, Button } from "../../components";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";
// import NumberFormat from 'react-number-format/NumberFormat';
import { useStateContext } from "../../contexts/ContextProvider";

const Shipment = () => {
  let param = useParams();
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
  const [acc_notes, setAccNotes] = useState("");
  const [qty_shipped, setqty_shipped] = useState(0);

  const [so_date, setso_date] = useState("");
  const [row_id, setrow_id] = useState("");
  const [invoice, setinvoice] = useState("");
  const [customer, setcustomer] = useState("");
  const [last_qty_edit, setlast_qty_edit] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);
  const [sstore_id, setsstore_id] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(false);
  const [prod_code, setprod_code] = useState("");

  const [formData, setFormData] = useState({
    ship_date: new Date().toISOString().split("T")[0],
  });

  const paramString = String(param.so_ids);
  const [so_id_param, store_id_param] = paramString.split("_");
  // console.log(store_id_param)

  const [formData1, setFormData1] = useState({
    so_id: 0,
    store_id: store_id_param,
    invoice_id: 0,
    shipments: [],
  });

  const handleChangeAccNote = (e) => {
    setAccNotes(e.target.value);
  };

  const handleChangeqty_shipped = (e) => {
    setqty_shipped(e.target.value);
  };
  const customersGrid = [
    {
      field: "code",
      headerText: "Code",
      width: "90",
      textAlign: "Center",
    },

    {
      headerText: "Product",
      field: "product",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "details",
      headerText: "Description",
      width: "320",
      textAlign: "Center",
    },

    {
      field: "total_qty",
      headerText: "Qty",
      width: "80",
      textAlign: "Center",
    },

    {
      field: "quantity_shipped",
      headerText: "Qty Ship to Date",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "last_qty",
      headerText: "Last Qty Ship'd",
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
      setprod_code(row_id);
      setrow_id(null);
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
      navigate("/Sales");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateItemClick = async (event) => {
    event.preventDefault();
    try {
      const updatedItem = [...AllAccounts];
      console.log(last_qty_edit);
      var number = parseInt(updatedItem[prod_code].quantity_shipped);
      var qty = number + parseInt(qty_shipped);
      const last_qty_edits = [...last_qty_edit];
      var s = qty - parseInt(last_qty_edits[prod_code].quantity_shipped);

      const newitem = {
        code: updatedItem[prod_code].code,
        details: updatedItem[prod_code].details,
        product: updatedItem[prod_code].product,
        total_qty: updatedItem[prod_code].total_qty,
        quantity_shipped: qty,
        date_shipped: ship_date,
        note: acc_notes,
        last_qty: s,
        product_id: updatedItem[prod_code].product_id,
      };
      const updatedRecords = updatedItem.filter(
        (record) => record.product_id !== updatedItem[prod_code].product_id
      );
      setAllAccounts([...updatedRecords, newitem]);
      setForceUpdate(true);
      setIsEditMode(false);
      setIsUpdateButtonDisabled(false);
      setrow_id("");
      setqty_shipped(0);
      setrow_id("");
      setso_id(null);
      setAccNotes("");
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

  const handleViewEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      const updatedFormData = { ...formData1 };
      updatedFormData.so_id = so_id_param;
      updatedFormData.store_id = store_id_param;
      updatedFormData.invoice_id = invoice.toString();
      updatedFormData.shipments = [];

      AllAccounts.forEach((product, index) => {
        const shipment = {
          product_id: product.product_id,
          quantity: product.total_qty,
          quantity_shipped: product.last_qty,
          note: product.note,
          shipped_date: product.date_shipped,
        };
        updatedFormData.shipments.push(shipment);
      });

      setFormData1(updatedFormData);
      console.log(updatedFormData);
      const response = await EditShipment(updatedFormData);
      if (response.status === 200) {
        alert("Shipment Updated Successfully");
        navigate("/Sales");
      } else {
        alert("Shipment Failed to Update");
      }
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
      setso_id(null);
      setqty_shipped(0);
      setAccNotes("");
    } catch (error) {
      console.error("Error:", error);
    }
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
    // console.log(selectedRowData.code);
    // console.log(args.rowIndex);
    setrow_id(args.rowIndex);
  };

  useEffect(() => {
    setsstore_id(store_id_param);
    GetShipmentSaleOrderByID(so_id_param)
      .then((resp) => {
        setcustomer(resp.data[0].customer);
        setso_date(resp.data[0].sale_date);
        setinvoice(resp.data[0].invoice_id);
      })
      .catch((err) => {
        console.log(err.message);
      });

    GetShipmentProductsBySO_ID(so_id_param, store_id_param)
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
    GetShipmentProductsBySO_ID(so_id_param, store_id_param)
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
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="SHIPMENT" />

      <form>
        <Container
          className="g-0 justify-center"
          fluid="true"
          style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "18px" }}
        >
          <Row
            xs={1}
            sm={1}
            //className="justify-content-center"
            style={{
              padding: "0",
            }}
          >
            <Col md={2} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">SO #: </label>
                  <input
                    className="input"
                    required
                    type="text"
                    name="name"
                    value={so_id_param}
                    placeholder="Sale Order"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Customer: </label>
                  <br />
                  <input
                    type="text"
                    name="email"
                    value={customer}
                    placeholder="Customer Name"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
            </Col>
            <Col md={2} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">SO Date: </label>
                  <br />
                  <input
                    required
                    type="text"
                    name="phone"
                    value={so_date}
                    placeholder="SO Date"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              {/* </div>
                    <div class="article"> */}
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Customer Invoice: </label>
                  <br />
                  <input
                    type="text"
                    name="invoice"
                    value={invoice}
                    placeholder="Invoice No."
                    className="input"
                    readOnly
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row
            xs={1}
            sm={1}
            style={{
              padding: "0",
            }}
          >
            <Col md={12} className="container-col">
              <div className="flex justify-end">
                <button
                  style={{
                    padding: "10px",
                    backgroundColor:
                      (isUpdateButtonDisabled && !isEditMode) ||
                      !so_id ||
                      isEditMode
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
                    (isUpdateButtonDisabled && !isEditMode) ||
                    !so_id ||
                    isEditMode
                  }
                >
                  Edit / Ship
                </button>
              </div>
            </Col>
          </Row>
          <Row
            xs={1}
            sm={1}
            style={{
              padding: "0",
            }}
          >
            <Col md={12} className="container-col">
              <GridComponent
                className="custom-grid"
                dataSource={AllAccounts}
                allowPaging={true}
                pageSettings={{ pageSize: 16 }}
                allowSorting
                allowResizing
                rowSelected={handleRowSelected}
                rowHeight={36}
                onChange={onChangeGrid}
              >
                <ColumnsDirective>
                  {customersGrid.map((item, index) => (
                    <ColumnDirective key={index} {...item} />
                  ))}
                </ColumnsDirective>
                <Inject
                  services={[Resize, Page, Toolbar, Selection, Sort, Filter]}
                />
              </GridComponent>
            </Col>
          </Row>
          <Row
            xs={1}
            sm={1}
            style={{
              padding: "0",
            }}
          >
            <Col md={12} className="container-col">
              <div className="flex justify-end">
                <button
                  style={{
                    padding: "10px",
                    backgroundColor: !isUpdateButtonDisabled
                      ? "grey"
                      : currentColor,
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
                    backgroundColor: !isUpdateButtonDisabled
                      ? "grey"
                      : currentColor,
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
            </Col>
          </Row>
          <Row
            xs={1}
            sm={1}
            //className="justify-content-center"
            style={{
              padding: "0",
            }}
          >
            <Col md={2} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Ship Date: </label>
                  <br />
                  <input
                    type="date"
                    name="ship_date"
                    value={formData.ship_date}
                    className="input"
                    onChange={handleChangeHireDate}
                    disabled={!isUpdateButtonDisabled}
                  />
                </div>
              </div>
            </Col>
            <Col md={2} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">New Qty Ship'd: </label>
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
                  />
                </div>
              </div>
              <div
                class="article-cus"
                style={{
                  marginRight: "auto",
                }}
              >
                <div>{/* disabled={!so_id} */}</div>
              </div>
            </Col>
          </Row>

          <Row
            xs={1}
            sm={1}
            //className="justify-content-center"
            style={{
              padding: "0",
            }}
          >
            <Col md={4} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Note: </label>
                  <textarea
                    placeholder="Note "
                    id="noteTextarea"
                    value={acc_notes}
                    onChange={handleChangeAccNote}
                    className="textarea"
                    disabled={!isUpdateButtonDisabled}
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
      <Row md={"auto"} className="justify-content-center">
        <button
          style={{
            backgroundColor: !forceUpdate ? "grey" : currentColor,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            margin: "10px",
            padding: "20px",
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
            backgroundColor: currentColor,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            margin: "10px",
            padding: "20px",
          }}
          color="white"
          borderRadius="10px"
          onClick={handleBackClick}
          text="heh"
        >
          Back
        </button>
      </Row>
    </div>
  );
};

export default Shipment;
