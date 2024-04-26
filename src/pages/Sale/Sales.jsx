import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  EditSaleOrderStatusBYSo_id,
  GetSaleOrderDetailsByID,
} from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import LoadingIndicator from "../LoadingIndicator";

const Sales = () => {
  const [AllAccounts, setAllAccounts] = useState("");
  const [so_id, setso_id] = useState("");
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [store, setstore] = useState("");
  const [store_id, setstore_id] = useState("");
  const [getstores, setstores] = useState([]);
  const [est_sale, setest_sale] = useState("S");
  const [OrderStatus, setOrderStatus] = useState("");
  const { promiseInProgress } = usePromiseTracker();
  const [loading, setloading] = useState(false);

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
      headerText: "SO#",
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

    {
      field: "Customer",
      headerText: "Customer",
      minWidth: "160",
      width: "180",
      maxWidth: "360",
      textAlign: "left",
    },

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

  const handleAddEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      const path = `/Sales/AddSaleOrder/${store_id}`;
      window.open(path, "_blank");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const UpdateStatus = async (stat, id) => {
    const response = await EditSaleOrderStatusBYSo_id(stat, id);
    if (response.status === 200) {
      // alert("Sale order status updated successfully.");
    } else {
      alert("Failed to update sale order status.");
      return;
    }
  };

  const handlestatusClick = async (event) => {
    event.preventDefault();
    try {
      console.log("status order");
      if (so_id !== "") {
        if (OrderStatus === "Open") {
          var v = 2;
          await GetSaleOrderDetailsByID(so_id).then(function (result) {
            console.log(result.data);
            var k = result.data;
            if (result.data) {
              v = 0;
              k.forEach((element) => {
                if (
                  parseFloat(element.quantity) >
                  parseFloat(element.product_shipped)
                ) {
                  v = 1;
                }
              });
            }
          });
          if (v === 0) {
            UpdateStatus(81, so_id);
          } else {
            if (
              window.confirm(
                `Order is not completely Shipped.\nStill you want to continue?`
              )
            ) {
              UpdateStatus(81, so_id);
            } else {
              return;
            }
          }
        } else {
          // if (
          //   window.confirm(
          //     `Order is already Closed.\nStill you want to continue?`
          //   )
          // ) {
          //   UpdateStatus(80, so_id);
          // }
          alert("Order is already Closed.");
          return;
        }
        window.location.reload();
      } else {
        alert("Please select sale order.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("edit new");
      if (so_id !== "") {
        // const so_ids = so_id + "_" + store_id;
        const so_ids = so_id;
        const path = `/Sales/EditSaleOrder/${so_ids}`;
        window.open(path, "_blank");
      } else {
        alert("Please Select Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log("view saleorder");
      if (so_id !== "") {
        const so_ids = so_id + "_" + store_id;
        navigate(`/Sales/Shipment/${so_ids}`);
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
      if (so_id !== "") {
        const so_ids = so_id + "_" + store_id;
        navigate(`/Sales/ViewShipment/${so_id}`);
      } else {
        alert("Please Select Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewSaleClick = async (event) => {
    // event.preventDefault();
    try {
      console.log("view saleorder");
      if (so_id !== "") {
        navigate(`/Sales/ViewSaleOrder/${so_id}`);
      } else {
        alert("Please Select Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleest_saleChange = (event) => {
  //   setest_sale(event.target.value);
  //   console.log(event.target.value);
  //   const Sale_Est = {
  //     saleEst: event.target.value,
  //   };
  //   localStorage.setItem("Sale_Est", JSON.stringify(Sale_Est));
  // };

  const handleChangeStore = (e) => {
    setstore(e.target.value);

    const s_id = getstores.find((item) => item.name === e.target.value);
    setstore_id(s_id.store_id);
    const Sale_Store = {
      SaleStore: e.target.value,
      SaleId: s_id.store_id,
    };
    localStorage.setItem("Sale_Store", JSON.stringify(Sale_Store));
    const Sale_Est = {
      saleEst: "S",
    };
    localStorage.setItem("Sale_Est", JSON.stringify(Sale_Est));
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setso_id(selectedRowData.so_id);
    console.log(selectedRowData.so_id);
    setOrderStatus(selectedRowData.Status);
  };

  useEffect(() => {
    async function fetchData() {
      var a = null,
        b = null;

      trackPromise(
        Promise.all([GetAllStores()])
          .then(([resp]) => {
            setstores(resp.data || []);
            //setstore(resp.data.name);
            a = resp.data[0].name;
            // setstore_id(resp.data[0].store_id);
            b = resp.data[0].store_id;
          })
          .catch((err) => {
            console.log(err.message);
          })
          .finally(() => {
            console.log(getstores.length);

            if (
              !JSON.parse(localStorage.getItem("Sale_Store")) ||
              getstores.length === 1
            ) {
              const Sale_Store1 = {
                SaleStore: a,
                SaleId: b,
              };
              //console.log(Sale_Store1);
              localStorage.setItem("Sale_Store", JSON.stringify(Sale_Store1));
            }
            if (!JSON.parse(localStorage.getItem("Sale_Est"))) {
              const Sale_Est = {
                saleEst: "S",
              };
              localStorage.setItem("Sale_Est", JSON.stringify(Sale_Est));
            }

            const Sale_Est = JSON.parse(localStorage.getItem("Sale_Est"));
            const Sale_Store = JSON.parse(localStorage.getItem("Sale_Store"));
            setest_sale(Sale_Est["saleEst"]);
            //console.log(Sale_Store["SaleStore"]);
            setstore_id(Sale_Store["SaleId"]);
            setstore(Sale_Store["SaleStore"]);
            setloading(false);
          })
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      //console.log(store_id);

      if (
        store_id === "" ||
        store_id === null ||
        store_id === "null" ||
        store_id === undefined ||
        store_id === 0
      ) {
      } else {
        trackPromise(
          Promise.all([GetAllSalesByID(store_id, est_sale)])
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
  }, [store_id]);

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
              text="Close SO"
              borderRadius="10px"
              onClick={handlestatusClick}
            />
          </Col>
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

export default Sales;
