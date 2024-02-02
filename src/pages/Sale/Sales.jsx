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
import { GetAllSalesByID, GetAllStores } from "../../api/Api";
import Select from "react-select";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
// import NumberFormat from 'react-number-format/NumberFormat';
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";

const Sales = () => {
  const [AllAccounts, setAllAccounts] = useState("");
  const [so_id, setso_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [store, setstore] = useState("");
  const [store_id, setstore_id] = useState("");
  const [getstores, setstores] = useState([]);
  const [est_sale, setest_sale] = useState("S");

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
      {props.status}
      {props.Status === "Shipped" ? (
        <button
          type="button"
          style={{ background: "green" }}
          className="text-white py-1 px-2 capitalize rounded-2xl text-md"
        >
          <p1>Close</p1>
          {/* {props.active_product} */}
        </button>
      ) : (
        <button
          type="button"
          style={{ background: "red" }}
          className="text-white py-1 px-2 capitalize rounded-2xl text-md"
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
      headerText: "E/S#",
      field: "Q-S #",
      minWidth: "120",
      width: "120",
      maxWidth: "150",
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

    {
      field: "Customer",
      headerText: "Customer",
      minWidth: "160",
      width: "220",
      maxWidth: "360",
      textAlign: "left",
    },

    {
      field: "Customer PO",
      headerText: "Customer PO",
      minWidth: "170",
      width: "170",
      maxWidth: "200",
      textAlign: "right",
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
      width: "160",
      maxWidth: "180",
      textAlign: "Center",
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
      field: `amt`,
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
      const baseUrl = "http://localhost:3000";
      if (est_sale === "E") {
        const path = `/sales/addEstimation/${store_id}`;
        const url = `${baseUrl}${path}`;
        window.open(url, "_blank");
      } else {
        const path = `/sales/addSaleOrder/${store_id}`;
        const url = `${baseUrl}${path}`;
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (so_id != "") {
        const so_ids = so_id + "_" + store_id;
        const baseUrl = "http://localhost:3000";
        if (est_sale === "E") {
          const path = `/sales/editEstimation/${so_ids}`;
          const url = `${baseUrl}${path}`;
          window.open(url, "_blank");
        } else {
          const path = `/sales/editSaleOrder/${so_ids}`;
          const url = `${baseUrl}${path}`;
          window.open(url, "_blank");
        }
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

    const Sale_Est = {
      saleEst: event.target.value,
    };
    localStorage.setItem("Sale_Est", JSON.stringify(Sale_Est));
  };

  const handleViewEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view saleorder");
      if (so_id != "") {
        const so_ids = so_id + "_" + store_id;
        navigate(`/sales/Shipment/${so_ids}`);
      } else {
        alert("Please Select Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick2 = async (event) => {
    event.preventDefault();
    try {
      console.log("view shipment");
      if (so_id != "") {
        const so_ids = so_id + "_" + store_id;
        navigate(`/sales/viewShipment/${so_id}`);
      } else {
        alert("Please Select Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick1 = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (so_id != "") {
        const so_ids = so_id + "_" + store_id;
        const baseUrl = "http://localhost:3000";
        if (est_sale === "E") {
          const path = `/sales/ConvertEstimate/${so_ids}`;
          const url = `${baseUrl}${path}`;
          window.open(url, "_blank");
        }
      } else {
        alert("Please Select Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewSaleClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view saleorder");
      if (so_id != "") {
        const so_ids = so_id + "_" + store_id;
        if (est_sale === "E") {
          navigate(`/sales/viewEstimation/${so_id}`);
        } else {
          navigate(`/sales/viewSaleOrder/${so_id}`);
        }
      } else {
        alert("Please Select Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeStore = (e) => {
    setstore(e.target.value);
    const Sale_Store = {
      SaleStore: e.target.value,
    };
    localStorage.setItem("Sale_Store", JSON.stringify(Sale_Store));
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
      await GetAllStores()
        .then((resp) => {
          setstores(resp.data || []);
          setstore(resp.data[0].name);
          setstore_id(resp.data[0].store_id);
        })
        .catch((err) => {
          console.log(err.message);
        });
      if (!JSON.parse(localStorage.getItem("Sale_Est"))) {
        const Sale_Est = {
          saleEst: "S",
        };
        localStorage.setItem("Sale_Est", JSON.stringify(Sale_Est));
      }
      if (!JSON.parse(localStorage.getItem("Sale_Store"))) {
        const Sale_Store = {
          SaleStore: "",
        };
        localStorage.setItem("Sale_Store", JSON.stringify(Sale_Store));
      }
      const Sale_Est = JSON.parse(localStorage.getItem("Sale_Est"));
      const Sale_Store = JSON.parse(localStorage.getItem("Sale_Store"));
      setest_sale(Sale_Est["saleEst"]);
      console.log(Sale_Store["SaleStore"]);

      setstore(Sale_Store["SaleStore"]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log(store_id);
      await GetAllSalesByID(store_id, est_sale)
        .then((result) => {
          setAllAccounts([...result.data]);
          // setAllAccounts(result.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, [store_id, est_sale]);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header category="Orders" title="SALE ORDERS" />
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
          {est_sale === "S" && (
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
          )}

          {est_sale === "E" && (
            <Col md="auto" style={{ padding: "0" }}>
              <Button
                margin="6px"
                color="white"
                bgColor={currentColor}
                text="Edit"
                borderRadius="10px"
                onClick={handleEditEmployeesClick}
              />
            </Col>
          )}
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
          {est_sale === "S" && (
            <Col md="auto" style={{ padding: "0" }}>
              <Button
                margin="6px"
                color="white"
                bgColor={currentColor}
                text="Shipment"
                borderRadius="10px"
                onClick={handleViewEmployeesClick}
              />
            </Col>
          )}

          {est_sale === "S" && (
            <Col md="auto" style={{ padding: "0" }}>
              <Button
                margin="6px"
                color="white"
                bgColor={currentColor}
                text="View Shipment"
                borderRadius="10px"
                onClick={handleViewEmployeesClick2}
              />
            </Col>
          )}

          {est_sale === "E" && (
            <Col md="auto" style={{ padding: "0" }}>
              <Button
                margin="6px"
                color="white"
                bgColor={currentColor}
                text="Convert to Sale"
                borderRadius="10px"
                onClick={handleViewEmployeesClick1}
              />
            </Col>
          )}
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

export default Sales;
