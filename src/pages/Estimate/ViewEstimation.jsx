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
  GetSaleOrderDetailShipmentByID,
  GetSaleOrderDetail,
} from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddCus.css";

const ViewEstimation = () => {
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
      width: "150",
      textAlign: "Center",
    },

    {
      headerText: "Product",
      field: "product",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "quantity",
      headerText: "Qty",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "unit_price",
      headerText: "Unit Price",
      format: "C2",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "discount",
      headerText: "Discount",
      width: "150",
      format: "C2",
      textAlign: "Center",
    },

    {
      field: "e_total",
      headerText: "Total",
      format: "C2",
      width: "150",
      textAlign: "Center",
    },
  ];

  const { currentColor } = useStateContext();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/sales");
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
    <div className="user-body">
      <div style={{ paddingLeft: "14px" }}>
        <Header title="VIEW ESTIMATION" />
      </div>
      <div className="m-2 md:m-4 p-1 md:p-2 bg-white rounded-2xl">
        <div className="mt-4">
          <form>
            <div
              style={{
                textAlign: "left",
                backgroundColor: "Transparent",
                color: "black",
              }}
            >
              <div class="article-container-cus">
                <div className="flex justify-left">
                  <div class="article-cus">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Customer: </label>
                        <br />
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
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Project Name:{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          name="contact"
                          value={project_name}
                          placeholder="Project Name"
                          className="input"
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Shipment: </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          placeholder="Shipment"
                          value={shipment}
                          className="input"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div class="article-cus">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Order Status:{" "}
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          placeholder="Order Status"
                          value={status}
                          className="input"
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>User: </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          placeholder="User"
                          value={user}
                          className="input"
                          readOnly
                        />
                      </div>
                    </div>
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>Tax: </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          placeholder="Tax"
                          value={tax}
                          className="input"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div class="article-cus">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Total Price:{" "}
                        </label>
                        <br />
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
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Amount Paid:{" "}
                        </label>
                        <br />
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
                    <br />
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label style={{ fontWeight: "bold" }}>
                          Amount Pending:{" "}
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          placeholder="Amount Pending"
                          value={amount_pending}
                          className="input"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div class="article-cus">
                    <label style={{ fontWeight: "bold" }}>Note: </label>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          placeholder="Note"
                          value={so_note}
                          id="noteTextarea"
                          //   value={street_address}
                          //   onChange={handleChangeAddress}
                          rows="2"
                          className="textarea"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <br />
              <br />
            </div>

            <GridComponent
              dataSource={AllProducts}
              allowPaging
              allowSorting
              allowTextWrap={true}
              toolbar={["Search"]}
              width="auto"
              height={380}
              className="custom-grid"
            >
              <ColumnsDirective>
                {customersGrid.map((item, index) => (
                  <ColumnDirective key={index} {...item} />
                ))}
              </ColumnsDirective>
              <Inject
                services={[Page, Toolbar, Selection, Edit, Sort, Filter]}
              />
            </GridComponent>
            <div class="article-cus2">
              <div className="flex justify-center">
                <div class="article-container-cus">
                  <div>
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
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewEstimation;
