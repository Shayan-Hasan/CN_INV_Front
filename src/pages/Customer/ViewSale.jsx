import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  getAllSalesByCusID,
  GetAllStores,
  GetCustomerById,
} from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import LoadingIndicator from "../LoadingIndicator";

const ViewSale = () => {
  let param = useParams();
  const [AllAccounts, setAllAccounts] = useState("");
  const [so_id, setso_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [store, setstore] = useState("");
  const [store_id, setstore_id] = useState("");
  const [getstores, setstores] = useState([]);
  const [est_sale, setest_sale] = useState("S");
  const { promiseInProgress } = usePromiseTracker();
  const [loading, setloading] = useState(false);
  const [cusName, setcusName] = useState("");

  const ProductGridactiveStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      {props.status}
      {props.Status === "Close" ? (
        <button
          type="button"
          style={{ background: "green" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          <label>Close</label>
        </button>
      ) : (
        <button
          type="button"
          style={{ background: "red" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          <label>Open</label>
        </button>
      )}
    </div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },
    {
      headerText: "E-S#",
      field: "Q-S #",
      minWidth: "110",
      width: "110",
      maxWidth: "120",
      textAlign: "right",
    },

    {
      field: "Quote Date",
      headerText: "Estimate Date",
      minWidth: "170",
      width: "170",
      maxWidth: "180",
      textAlign: "center",
    },

    // {
    //   field: "Customer",
    //   headerText: "Customer",
    //   minWidth: "160",
    //   width: "180",
    //   maxWidth: "360",
    //   textAlign: "left",
    // },

    {
      field: "Customer PO",
      headerText: "Cust PO",
      minWidth: "130",
      width: "140",
      maxWidth: "180",
      textAlign: "right",
    },

    {
      field: "Proj",
      headerText: "Project Name",
      minWidth: "170",
      width: "170",
      maxWidth: "200",
      textAlign: "left",
    },

    {
      field: "Status",
      headerText: "Status",
      template: ProductGridactiveStatus,
      minWidth: "120",
      width: "120",
      maxWidth: "130",
      textAlign: "left",
    },

    {
      field: "Sale Date",
      headerText: "Sale Date",
      minWidth: "160",
      width: "170",
      maxWidth: "180",
      textAlign: "Center",
    },

    {
      field: `total`,
      headerText: "Total",
      format: "C2",
      minWidth: "120",
      width: "130",
      maxWidth: "150",
      textAlign: "right",
    },
    {
      field: `amt`,
      headerText: "Amt Paid",
      format: "C2",
      minWidth: "135",
      width: "135",
      maxWidth: "150",
      textAlign: "right",
    },
    {
      field: "amount_pending",
      format: "C2",
      headerText: "Amt Pend",
      minWidth: "140",
      width: "140",
      maxWidth: "150",
      textAlign: "right",
    },
  ];

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Customers");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewSaleClick = async (event) => {
    // event.preventDefault();
    try {
      console.log("view saleorder");
      if (so_id !== "") {
        navigate(`/Customer/ViewSale/ViewSO/${so_id}`);
      } else {
        alert("Please Select Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleest_saleChange = (event) => {
    setest_sale(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeStore = (e) => {
    setstore(e.target.value);
    const s_id = getstores.find((item) => item.name === e.target.value);
    setstore_id(s_id.store_id);
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setso_id(selectedRowData.so_id);
    console.log(selectedRowData.so_id);
  };

  useEffect(() => {
    async function fetchData() {
      trackPromise(
        Promise.all([GetAllStores(), GetCustomerById(param.Customer_id)])
          .then(([resp, resp1]) => {
            setstores(resp.data || []);
            setstore(resp.data.name);
            setstore_id(resp.data[0].store_id);
            setcusName(resp1.data[0][0].name);
          })
          .catch((err) => {
            console.log(err.message);
          })
          .finally(() => {
            setloading(false);
          })
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log(store_id);

      if (
        store_id === "" ||
        store_id === null ||
        store_id === "null" ||
        store_id === undefined ||
        store_id === 0 ||
        est_sale === "" ||
        param.Customer_id === "" ||
        param.Customer_id === undefined
      ) {
      } else {
        trackPromise(
          Promise.all([
            getAllSalesByCusID(store_id, est_sale, param.Customer_id),
          ])
            .then(([result]) => {
              setAllAccounts(result.data || []);
            })
            .catch((err) => {
              console.log(err.message);
            })
            .finally(() => {
              setloading(false);
            })
        );
      }
    }
    fetchData();
  }, [store_id, est_sale]);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="VIEW SALE" />
      <Container fluid className="g-0 p-0 justify-end">
        <Row
          xs={1}
          sm={1}
          className="justify-content-left"
          style={{
            padding: "0",
          }}
        >
          <Col md={2} className="container-col">
            <div className="col-lg-12">
              <div className="form-group">
                <label className="label">ID: </label>
                <input
                  required
                  type="text"
                  name="customer"
                  value={param.Customer_id}
                  placeholder="Customer ID"
                  className="input"
                  readOnly
                />
              </div>
            </div>
          </Col>
          <Col md={2} className="container-col">
            <div className="col-lg-12 mt-2">
              <div className="form-group">
                <label className="label">Customer:</label>
                <input
                  required
                  value={cusName}
                  type="text"
                  name="customer"
                  placeholder="Customer name"
                  className="input"
                  readOnly
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Back"
              borderRadius="10px"
              onClick={handleBackClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <select
              className="select-custom"
              value={est_sale}
              onChange={handleest_saleChange}
            >
              <option value="S">Sale Orders</option>
              <option value="E">Estimations</option>
            </select>
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <select
              className="select-custom"
              value={store}
              onChange={handleChangeStore}
            >
              {getstores.map((item) => (
                <option key={item.store_id}>{item.name}</option>
              ))}
            </select>
          </Col>
        </Row>
      </Container>
      {loading || promiseInProgress ? (
        <LoadingIndicator />
      ) : (
        <>
          <GridComponent
            className="custom-grid"
            dataSource={AllAccounts}
            recordDoubleClick={handleViewSaleClick}
            allowPaging={true}
            pageSettings={{ pageSize: 16 }}
            allowSorting
            allowResizing
            toolbar={["Search"]}
            rowSelected={handleRowSelected}
            rowHeight={36}
          >
            {/* {loading && promiseInProgress ? (
          <LoadingIndicator />
        ) : (
          <> */}
            <ColumnsDirective>
              {customersGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            {/* </>
        )} */}
            <Inject
              services={[Resize, Page, Toolbar, Selection, Edit, Sort, Filter]}
            />
          </GridComponent>
        </>
      )}
    </div>
  );
};

export default ViewSale;
