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
  getAllPurchaseByVenID,
  GetAllStores,
  GetSupplierById,
} from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";

const ViewPurchase = () => {
  let param = useParams();
  const [AllAccounts, setAllAccounts] = useState("");
  const [po_id, setpo_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [store, setstore] = useState("");
  const [store_id, setstore_id] = useState("");
  const [getstores, setstores] = useState([]);
  const [VenName, setVenName] = useState("");

  const ProductGridactiveStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      {/* <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.active_product}</p> */}
      {/* {props.Status} */}
      {props.status === "Close" ? (
        <button
          type="button"
          style={{ background: "green" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          <label>Close</label>
          {/* {props.active_product} */}
        </button>
      ) : (
        <button
          type="button"
          style={{ background: "red" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          <label>Open</label>

          {/* {props.active_product} */}
        </button>
      )}
    </div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },
    {
      headerText: "PO#",
      field: "po",
      minWidth: "120",
      width: "120",
      maxWidth: "150",
      textAlign: "right",
    },

    {
      field: "order_date",
      headerText: "Order Date",
      minWidth: "160",
      width: "160",
      maxWidth: "180",
      textAlign: "center",
    },

    // {
    //   field: "vendor",
    //   headerText: "Supplier",
    //   minWidth: "160",
    //   width: "220",
    //   maxWidth: "360",
    //   textAlign: "left",
    // },

    {
      field: "vendor_invoice_no",
      headerText: "Supplier Inv#",
      minWidth: "170",
      width: "180",
      maxWidth: "200",
      textAlign: "right",
    },

    {
      field: "status",
      headerText: "Status",
      template: ProductGridactiveStatus,
      minWidth: "120",
      width: "120",
      maxWidth: "130",
      textAlign: "left",
    },

    {
      field: `total`,
      headerText: "Total",
      format: "C2",
      minWidth: "130",
      width: "140",
      maxWidth: "150",
      textAlign: "right",
    },
    {
      field: "amt",
      headerText: "Amt Paid",
      format: "C2",
      minWidth: "140",
      width: "140",
      maxWidth: "150",
      textAlign: "right",
    },
    {
      field: "amount_pending",
      format: "C2",
      headerText: "Amt Pending",
      minWidth: "160",
      width: "160",
      maxWidth: "160",
      textAlign: "right",
    },
  ];

  const handleViewSaleClick = async (event) => {
    // event.preventDefault();
    try {
      console.log("view purchaseorder");
      if (po_id !== "") {
        navigate(`/Supplier/ViewPurchase/ViewPO/${po_id}`);
      } else {
        alert("Please! Select Purchase Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Supplier");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeStore = (e) => {
    setstore(e.target.value);
    const s_id = getstores.find((item) => item.name === e.target.value);
    setstore_id(s_id.store_id);
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setpo_id(selectedRowData.po_id);
    console.log(selectedRowData.po_id);
  };

  useEffect(() => {
    async function fetchData() {
      await GetAllStores()
        .then((resp) => {
          setstores(resp.data || []);
          setstore(resp.data[0].name);
          setstore_id(resp.data[0].store_id);
        })
        .catch((err) => {
          console.log(err.message);
        });
      await GetSupplierById(param.Supplier_id)
        .then((resp) => {
          setVenName(resp.data[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });
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
        param.Supplier_id === "" ||
        param.Supplier_id === undefined
      ) {
      } else {
        Promise.all([getAllPurchaseByVenID(store_id, param.Supplier_id)])
          .then(([result]) => {
            setAllAccounts(result.data || []);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
    fetchData();
  }, [store, store_id]);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="VIEW PURCHASE" />
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
                  name="supplier"
                  value={param.Supplier_id}
                  placeholder="Supplier ID"
                  className="input"
                  readOnly
                />
              </div>
            </div>
          </Col>
          <Col md={2} className="container-col">
            <div className="col-lg-12 mt-2">
              <div className="form-group">
                <label className="label">Supplier:</label>
                <input
                  required
                  value={VenName}
                  type="text"
                  name="supplier"
                  placeholder="Supplier name"
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

      <GridComponent
        className="custom-grid"
        recordDoubleClick={handleViewSaleClick}
        dataSource={AllAccounts}
        allowPaging={true}
        pageSettings={{ pageSize: 16 }}
        allowSorting
        allowResizing
        toolbar={["Search"]}
        rowSelected={handleRowSelected}
        rowHeight={36}
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Resize, Page, Toolbar, Selection, Edit, Sort, Filter]}
        />
      </GridComponent>
    </div>
  );
};

export default ViewPurchase;
