import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  GetSaleOrderDetailShipmentByID,
  GetSaleOrderDetail,
} from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const ViewSaleOrder = () => {
  const [AllProducts, setAllProducts] = useState("");
  const [customer, setcustomer] = useState(" ");
  const [customer_po_no, setcustomer_po_no] = useState(" ");
  const [project_name, setproject_name] = useState(" ");
  const [ship_method, setship_method] = useState(" ");
  const [tracking_no, settracking_no] = useState(" ");
  const [total_price, settotal_price] = useState(" ");
  const [amount_paid, setamount_paid] = useState(" ");
  const [amount_pending, setamount_pending] = useState(" ");
  const [status, setstatus] = useState(" ");
  const [user, setuser] = useState(" ");
  const [so_note, setso_note] = useState(" ");
  const [tax, settax] = useState(" ");
  const [shipment, setshipment] = useState(" ");

  let param = useParams();
  const navigate = useNavigate();

  const customersGrid = [
    {
      headerText: "Code",
      field: "code",
      width: "90",
      textAlign: "Center",
    },

    {
      headerText: "Product",
      field: "product",
      width: "250",
      textAlign: "Center",
    },

    {
      field: "quantity",
      headerText: "Qty",
      width: "80",
      textAlign: "Center",
    },
    {
      field: "unit_price",
      headerText: "Unit Price",
      format: "C2",
      width: "120",
      textAlign: "Center",
    },

    {
      field: "quantity_shipped",
      headerText: "Qty Ship'd",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "discount",
      headerText: "Discount",
      width: "120",
      format: "C2",
      textAlign: "Center",
    },

    {
      field: "total",
      headerText: "Total",
      format: "C2",
      width: "120",
      textAlign: "Center",
    },
  ];

  const { currentColor } = useStateContext();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Sales");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const resp = GetSaleOrderDetailShipmentByID(param.so_id);
    resp
      .then(function (result) {
        setAllProducts(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    const resp1 = GetSaleOrderDetail(param.so_id);
    resp1
      .then(function (result) {
        setcustomer(result.data[0].customer);
        setcustomer_po_no(result.data[0].customer_po_no);
        setproject_name(result.data[0].project_name);
        setship_method(result.data[0].ship_method);
        settracking_no(result.data[0].tracking_no);
        settotal_price(result.data[0].total_price);
        setamount_paid(result.data[0].amount_paid);
        setamount_pending(result.data[0].amount_pending);
        setstatus(result.data[0].status);
        setuser(result.data[0].user);
        setso_note(result.data[0].so_note);
        settax(result.data[0].tax);
        setshipment(result.data[0].shipment);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="VIEW SALE ORDER" />
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
                  <label className="label">Customer: </label>
                  <input
                    required
                    type="text"
                    name="customer"
                    value={customer}
                    placeholder="Customer"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">Customer PO:</label>
                  <input
                    required
                    value={customer_po_no}
                    type="text"
                    name="customer_po_no"
                    placeholder="Customer PO NO"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">Project Name:</label>
                  <input
                    type="text"
                    name="phone"
                    value={project_name}
                    placeholder="Project Name"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
            </Col>
            <Col md={3} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Ship Method:</label>
                  <input
                    type="text"
                    name="ship_ment"
                    placeholder="Ship Method"
                    className="input"
                    value={ship_method}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">Tracking No:</label>
                  <input
                    type="text"
                    name="city"
                    value={tracking_no}
                    placeholder="Tracking no."
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">Order Status: </label>
                  <input
                    placeholder="Order Status"
                    value={status}
                    className="input"
                    readOnly
                  />
                </div>
              </div>
            </Col>
            <Col md={3} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Total Price:</label>
                  <input
                    type="text"
                    name="state"
                    value={total_price}
                    placeholder="Total"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">Amount Paid:</label>
                  <input
                    type="text"
                    name="postal_code"
                    value={amount_paid}
                    placeholder="Amount Paid"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">Amount Pending: </label>
                  <input
                    placeholder="Amount Pending"
                    value={amount_pending}
                    className="input"
                    readOnly
                  />
                </div>
              </div>
            </Col>
            <Col md={3} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">User: </label>
                  <input
                    placeholder="User"
                    value={user}
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">Tax: </label>
                  <input
                    placeholder="Tax"
                    value={tax}
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">Shipment: </label>
                  <input
                    placeholder="Shipment"
                    value={shipment}
                    className="input"
                    readOnly
                  />
                </div>
              </div>
            </Col>
            <Col md={12} className="container-col">
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label className="label">Note: </label>
                  <textarea
                    placeholder="Note"
                    value={so_note}
                    id="noteTextarea"
                    className="textarea"
                    style={{ height: "40px", width: "95%" }}
                    readOnly
                  />
                </div>
              </div>
              <br />
            </Col>
          </Row>
          <GridComponent
            dataSource={AllProducts}
            allowPaging={true}
            pageSettings={{ pageSize: 10 }}
            allowSorting
            //toolbar={["Search"]}
            allowResizing
            className="custom-grid"
            rowHeight={36}
          >
            <ColumnsDirective>
              {customersGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[Page, Resize, Toolbar, Selection, Edit, Sort, Filter]}
            />
          </GridComponent>
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

export default ViewSaleOrder;
