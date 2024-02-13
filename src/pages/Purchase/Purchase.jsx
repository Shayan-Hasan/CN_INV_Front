import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { GetAllPurchaseByID, GetAllStores } from "../../api/Api";
import Select from "react-select";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
// import NumberFormat from 'react-number-format/NumberFormat';
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";

const Purchase = () => {
  const [AllAccounts, setAllAccounts] = useState("");
  const [po_id, setpo_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [store, setstore] = useState("");
  const [store_id, setstore_id] = useState("");
  const [getstores, setstores] = useState([]);

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const ProductGridactiveStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      {/* <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.active_product}</p> */}
      {/* {props.Status} */}
      {props.status === "Approved" ? (
        <button
          type="button"
          style={{ background: "green" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          <p1>Close</p1>
          {/* {props.active_product} */}
        </button>
      ) : (
        <button
          type="button"
          style={{ background: "red" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          <p1>Open</p1>

          {/* {props.active_product} */}
        </button>
      )}
    </div>
  );

  const customerGridImage1 = (props) => (
    <div>{formatCurrency(props.total)}</div>
  );
  const customerGridImage = (props) => (
    <div>{formatCurrency(props.amount_pending)}</div>
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

    {
      field: "vendor",
      headerText: "Supplier",
      minWidth: "160",
      width: "220",
      maxWidth: "360",
      textAlign: "left",
    },

    {
      field: "vendor_invoice_no",
      headerText: "Vendor Inv#",
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

  const handleAddEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      const path = `/Purchase/AddPurchaseOrder/${store_id}`;
      window.open(path, "_blank");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (po_id != "") {
        const po_ids = po_id + "_" + store_id;
        const path = `/Purchase/EditPurchaseOrder/${po_ids}`;
        window.open(path, "_blank");
      } else {
        alert("Please select purchase order.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view saleorder");
      if (po_id != "") {
        const po_ids = po_id + "_" + store_id;
        navigate(`/Purchase/Receive_Log/${po_ids}`);
      } else {
        alert("Please select purchase order.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick1 = async (event) => {
    event.preventDefault();
    try {
      console.log("view ReceiveLog");
      if (po_id != "") {
        navigate(`/Purchase/ViewReceiveLog/${po_id}`);
      } else {
        alert("Please select purchase order.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewSaleClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view purchaseorder");
      if (po_id != "") {
        navigate(`/Purchase/ViewPurchaseOrder/${po_id}`);
      } else {
        alert("Please! Select Purchase Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeStore = (e) => {
    setstore(e.target.value);
    console.log(e.target.value);
    const Purchase_Store = {
      PurchaseStore: e.target.value,
    };
    localStorage.setItem("Purchase_Store", JSON.stringify(Purchase_Store));
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
      var a = null,
        b = null;
      await GetAllStores()
        .then((resp) => {
          setstores(resp.data || []);
          setstore(resp.data[0].name);
          setstore_id(resp.data[0].store_id);
          a = resp.data[0].name;
          b = resp.data[0].store_id;
        })
        .catch((err) => {
          console.log(err.message);
        });

      if (!JSON.parse(localStorage.getItem("Sale_Store1"))) {
        const Sale_Store1 = {
          SaleStore1: a,
          SaleId: b,
        };
        localStorage.setItem("Sale_Store1", JSON.stringify(Sale_Store1));
      }
      const Sale_Store1 = JSON.parse(localStorage.getItem("Sale_Store1"));
      console.log(Sale_Store1["SaleStore1"]);

      setstore(Sale_Store1["SaleStore1"]);
      setstore_id(Sale_Store1["SaleId"]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(store_id);
    GetAllPurchaseByID(store_id)
      .then((result) => {
        setAllAccounts(result.data || []);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [store, store_id]);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header category="Orders" title="PURCHASE ORDERS" />
      <Container fluid className="g-0 p-0 justify-end">
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Add"
              borderRadius="10px"
              onClick={handleAddEmployeesClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Update"
              borderRadius="10px"
              onClick={handleEditEmployeesClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              onClick={handleViewSaleClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Receive"
              borderRadius="10px"
              onClick={handleViewEmployeesClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="View Receive"
              borderRadius="10px"
              onClick={handleViewEmployeesClick1}
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

export default Purchase;
