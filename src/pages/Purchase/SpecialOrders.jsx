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
  GetSpecialOrderDetail,
  GetAllStores,
  GetVendorList,
} from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/viewCustomer.css";
import { enableRipple } from "@syncfusion/ej2-base";
import { Col, Container, Row } from "react-bootstrap";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import LoadingIndicator from "../LoadingIndicator";
enableRipple(true);

const SpecialOrders = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [AllProductInStore, setAllProductInStore] = useState("");
  const [store, setstore] = useState("");
  const [store_id, setstore_id] = useState("");
  const [sstore_id, setsstore_id] = useState("");
  const [getstores, setstores] = useState([]);
  const [getvendors, setvendors] = useState([]);
  const [vendor, setvendor] = useState("0");
  const [vendor_id, setvendor_id] = useState("");
  const { promiseInProgress } = usePromiseTracker();

  let param = useParams();
  const sportsData = ["Create Order"];

  const handleAddEmployeesClick = async (vendor_id, po_id) => {
    try {
      if (vendor_id === "-") {
        alert(
          "There is no Supplier for this Product!\n\n Assign this product first."
        );
      } else {
        const Spec_Store = JSON.parse(localStorage.getItem("Spec_Store"));
        var store_id = Spec_Store["SpecId"];
        console.log(vendor_id, po_id, store_id);
        //setsstore_id(store_id);
        const Spec_Order_Page = {
          SpecVendor_id: vendor_id,
          SpecOrder: "Y",
          Store_id: store_id,
        };
        const Spec_Po = {
          po_id: po_id,
        };
        localStorage.setItem("Spec_Po", JSON.stringify(Spec_Po));
        localStorage.setItem(
          "Spec_Order_Page",
          JSON.stringify(Spec_Order_Page)
        );
        setstore_id(Spec_Store["SpecId"]);
        localStorage.setItem("SpecOrder_Tag", "Y");
        const path = `/Purchase/AddPurchaseOrder/${store_id}`;
        window.open(path, "_blank");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      var Spec_Po = JSON.parse(localStorage.getItem("Spec_Po"));
      localStorage.setItem("SpecOrder_Tag", "Y");
      var po_ids = Spec_Po["po_id"];
      console.log(po_ids);
      if (po_ids !== "-") {
        const path = `/Purchase/EditPurchaseOrder/${po_ids}`;
        const url = `${path}`;
        window.open(url, "_blank");
      }
      const Spec_Po1 = {
        po_id: "",
      };
      localStorage.setItem("Spec_Po", JSON.stringify(Spec_Po1));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const ProductGridactiveStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      {/* <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.active_product}</p> */}
      {/* {props.Status} */}
      {props.status === "PENDING" && (
        <button
          type="button"
          style={{ background: "red" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          <label>Pending</label>
          {/* {props.active_product} */}
        </button>
      )}
      {props.status === "ORDERED" && (
        <button
          type="button"
          style={{ background: "ORANGE" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          <label>Ordered</label>

          {/* {props.active_product} */}
        </button>
      )}
      {props.status === "RECEIVED" && (
        <button
          type="button"
          style={{ background: "darkslategrey" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          <label>Received</label>

          {/* {props.active_product} */}
        </button>
      )}
      {props.status === "SHIPPED" && (
        <button
          type="button"
          style={{ background: "green" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          <label>Shipped</label>

          {/* {props.active_product} */}
        </button>
      )}
    </div>
  );

  const customerGridImage1 = (props) => (
    <div>
      {props.status === "PENDING" ? (
        <>
          {props.vendor_id !== "-" ? (
            <button
              type="button"
              className="text-white py-3 px-2 capitalize rounded-2xl text-md"
              style={{ background: "#4169e1", cursor: "pointer" }}
              onClick={() =>
                handleAddEmployeesClick(props.vendor_id, props.po_id)
              }
            >
              Create Order
            </button>
          ) : (
            <button
              type="button"
              className="text-white py-3 px-2 capitalize rounded-2xl text-md"
              style={{ background: "black", cursor: "pointer" }}
              onClick={() =>
                handleAddEmployeesClick(props.vendor_id, props.po_id)
              }
            >
              Create Order
            </button>
          )}
        </>
      ) : (
        <>
          {(props.status === "ORDERED" ||
            props.status === "RECEIVED" ||
            props.status === "SHIPPED") && (
            <>
              <button
                type="button"
                className="text-white py-3 px-2 capitalize rounded-2xl text-md"
                style={{ background: "grey", cursor: "pointer" }}
                disabled
              >
                Create Order
              </button>
            </>
          )}
        </>
      )}
    </div>
  );

  const InventoryGrid = [
    //{ type: 'checkbox', width: '50' },
    {
      field: "so_id",
      headerText: "SO#",
      minWidth: "100",
      width: "100",
      maxWidth: "110",
      textAlign: "right",
    },
    {
      field: "po_id",
      headerText: "PO#",
      minWidth: "100",
      width: "100",
      maxWidth: "110",
      textAlign: "right",
    },
    {
      field: "Cust",
      headerText: "Customer",
      minWidth: "120",
      width: "140",
      maxWidth: "180",
      textAlign: "left",
    },
    {
      field: "Vend",
      headerText: "Supplier",
      minWidth: "120",
      width: "140",
      maxWidth: "180",
      textAlign: "left",
    },
    // {
    //   field: "product_id",
    //   headerText: "Product ID",
    //   minWidth: "120",
    //   width: "120",
    //   maxWidth: "150",
    //   textAlign: "right",
    // },
    {
      field: "code",
      headerText: "Code",
      minWidth: "105",
      width: "105",
      maxWidth: "125",
      textAlign: "left",
    },
    {
      field: "Prod",
      headerText: "Product",
      minWidth: "160",
      width: "190",
      maxWidth: "320",
      textAlign: "left",
    },
    {
      field: "Spec_Qty",
      headerText: "Qty Reqrd",
      minWidth: "140",
      width: "140",
      maxWidth: "150",
      textAlign: "right",
    },
    {
      field: "PO_Qty",
      headerText: "Qty Ordrd",
      minWidth: "140",
      width: "140",
      maxWidth: "150",
      textAlign: "right",
    },
    {
      field: "Rec_Qty",
      headerText: "Qty Recvd",
      minWidth: "140",
      width: "140",
      maxWidth: "150",
      textAlign: "right",
    },
    {
      field: "Ship_Qty",
      headerText: "Qty Shipd",
      minWidth: "140",
      width: "140",
      maxWidth: "150",
      textAlign: "right",
    },
    // {
    //   field: "quantity_remain",
    //   headerText: "Qty to-Order",
    //   minWidth: "120",
    //   width: "120",
    //   maxWidth: "150",
    //   textAlign: "right",
    // },
    {
      headerTemplate: "Status",
      minWidth: "120",
      width: "120",
      maxWidth: "140",
      template: ProductGridactiveStatus,
      textAlign: "center",
    },
    {
      headerTemplate: "Action",
      minWidth: "120",
      width: "120",
      maxWidth: "140",
      template: customerGridImage1,
      textAlign: "center",
    },
  ];

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    //console.log(store_id);
    // setsstore_id(store_id);
    // const Spec_Order_Page = {
    //   SpecVendor_id: selectedRowData.vendor_id,
    //   SpecOrder: "Y",
    //   Store_id: store_id,
    // };
    // const Spec_Po = {
    //   po_id: selectedRowData.po_ids,
    // };
    // localStorage.setItem("Spec_Po", JSON.stringify(Spec_Po));
    // localStorage.setItem("Spec_Order_Page", JSON.stringify(Spec_Order_Page));
  };

  const handleChangeStore = (e) => {
    setstore(e.target.value);
    const s_id = getstores.find((item) => item.name === e.target.value);
    setstore_id(s_id.store_id);
    const Spec_Store = {
      SpecStore: e.target.value,
      SpecId: s_id.store_id,
    };
    localStorage.setItem("Spec_Store", JSON.stringify(Spec_Store));
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
  const handleChangeVendor = (e) => {
    setvendor(e.target.value);
    console.log(e.target.value);
    setvendor_id(e.target.value);
    // const s_id = getstores.find((item) => item.name === e.target.value);
    // setvendor_id(s_id.store_id);
    // const Spec_Store = {
    //   SpecStore: e.target.value,
    //   SpecId: s_id.store_id,
    // };
    // localStorage.setItem("Spec_Store", JSON.stringify(Spec_Store));
  };

  useEffect(() => {
    async function fetchData() {
      let a = null,
        b = null;
      trackPromise(
        Promise.all([GetAllStores()])
          .then((resp) => {
            setstores(resp[0].data || []);
            //console.log(resp[0].data);
            a = resp[0].data[0].name;
            b = resp[0].data[0].store_id;
            setstore(resp[0].data[0].name);
            //   setstore_id(resp.data[0].store_id);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            //console.log(getstores);
            if (
              !JSON.parse(localStorage.getItem("Spec_Store")) ||
              getstores.length === 1
            ) {
              const Spec_Store = {
                SpecStore: a,
                SpecId: b,
              };
              localStorage.setItem("Spec_Store", JSON.stringify(Spec_Store));
            }
            const Spec_Store = JSON.parse(localStorage.getItem("Spec_Store"));
            //console.log(Spec_Store["SpecId"]);

            setstore(Spec_Store["SpecStore"]);
            setstore_id(Spec_Store["SpecId"]);
          })
      );

      await GetVendorList()
        .then((resp) => {
          setvendors(resp.data || []);
          //   setvendor(resp.data[0].vendor);
          setvendor_id(null);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      //console.log(store_id);
      if (store_id) {
        var vv = vendor;
        if (vendor === "0" || vendor === null || vendor === 0) {
          vv = null;
        }
        trackPromise(
          Promise.all([GetSpecialOrderDetail(store_id, vv)])
            .then((result) => {
              setAllProductInStore(result[0].data);
            })
            .catch((err) => {
              console.log(err.message);
            })
        );
      }
    }
    fetchData();
    // console.log(store_id);
    setsstore_id(store_id);
  }, [store_id, vendor_id]);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header category="Orders" title="SPECIAL ORDERS" />
      <Container fluid className="g-0 p-0 justify-end">
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <select
              className="select-custom"
              value={vendor}
              onChange={handleChangeVendor}
            >
              <option value={0}>{"Select Supplier"}</option>
              {getvendors.map((item) => (
                <option key={item.vendor_id} value={item.vendor_id}>
                  {item.vendor}
                </option>
              ))}
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
      {promiseInProgress ? (
        <LoadingIndicator />
      ) : (
        <GridComponent
          className="custom-grid"
          dataSource={AllProductInStore}
          allowPaging={true}
          pageSettings={{ pageSize: 16 }}
          allowSorting
          allowResizing
          toolbar={["Search"]}
          rowSelected={handleRowSelected}
          rowHeight={36}
        >
          <ColumnsDirective>
            {InventoryGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[Resize, Page, Toolbar, Selection, Edit, Sort, Filter]}
          />
        </GridComponent>
      )}
      <div className="flex justify-center">
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Back"
          borderRadius="10px"
          onClick={handleBackClick}
        />
      </div>
    </div>
  );
};

export default SpecialOrders;
