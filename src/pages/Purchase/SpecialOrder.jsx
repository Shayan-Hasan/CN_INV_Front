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
import { SpecialOrderApi, GetAllStores } from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/viewCustomer.css";
import { enableRipple } from "@syncfusion/ej2-base";
enableRipple(true);

const SpecialOrder = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [AllProductInStore, setAllProductInStore] = useState("");
  const [store, setstore] = useState("");
  const [store_id, setstore_id] = useState("");
  const [sstore_id, setsstore_id] = useState("");
  const [getstores, setstores] = useState([]);

  let param = useParams();
  const sportsData = ["Create Order"];

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const handleAddEmployeesClick = async (event) => {
    event.preventDefault();
    try {
      console.log(sstore_id);
      const Spec_Store = JSON.parse(localStorage.getItem("Spec_Store"));
      setstore_id(Spec_Store["SpecId"]);
      localStorage.setItem("SpecOrder_Tag", "Y");
      var store_id = Spec_Store["SpecId"];
      const baseUrl = "http://localhost:3000";
      const path = `/Purchase/addPurchaseOrder/${store_id}`;
      const url = `${baseUrl}${path}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const customerGridImage1 = (props) => (
    <div>
      {props.vendor_id !== "-" ? (
        <button
          style={{
            padding: "4px",
            backgroundColor: currentColor,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            //   margin: "3px",
          }}
          color="white"
          borderRadius="10px"
          onClick={handleAddEmployeesClick}
          text="heh"
        >
          Create Order
        </button>
      ) : (
        <button
          style={{
            padding: "4px",
            backgroundColor: "grey",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            //   margin: "3px",
          }}
          color="white"
          borderRadius="10px"
          onClick={handleAddEmployeesClick}
          disabled={true}
          text="heh"
        >
          Create Order
        </button>
      )}
    </div>
  );

  const InventoryGrid = [
    //{ type: 'checkbox', width: '50' },

    {
      field: "product_id",
      headerText: "Product ID",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "total_qty",
      headerText: "Total Qty",
      format: "N2",
      width: "100",
      textAlign: "Center",
    },

    {
      field: "vendor_id",
      headerText: "Vendor ID",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "vendor",
      headerText: "Supplier",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "qty_shipped",
      headerText: "Qty Shipped",
      width: "150",
      format: "N2",
      textAlign: "Center",
    },
    {
      field: "qty_instock",
      headerText: "Qty in-Stk",
      width: "150",
      format: "N2",
      textAlign: "Center",
    },

    {
      field: "qty_toship_yet",
      headerText: "Qty to-Ship",
      width: "150",
      format: "N2",
      textAlign: "Center",
    },

    {
      field: "req_qty",
      headerText: "Qty Req",
      width: "150",
      format: "N2",
      textAlign: "Center",
    },
    {
      headerTemplate: "Action",
      width: "150",
      template: customerGridImage1,
      textAlign: "Center",
    },
  ];

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    // setso_id(selectedRowData.so_id);
    console.log(selectedRowData.vendor_id);
    console.log(store_id);
    setsstore_id(store_id);
    const Spec_Order_Page = {
      SpecVendor_id: selectedRowData.vendor_id,
      SpecOrder: "Y",
      Store_id: store_id,
    };
    localStorage.setItem("Spec_Order_Page", JSON.stringify(Spec_Order_Page));
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
      navigate("/supplier");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      let a = null,
        b = null;
      await GetAllStores()
        .then((resp) => {
          setstores(resp.data || []);
          a = resp.data[0].name;
          b = resp.data[0].store_id;
          setstore(resp.data[0].name);
          setstore_id(resp.data[0].store_id);
        })
        .catch((err) => {
          console.log(err.message);
        });

      if (!JSON.parse(localStorage.getItem("Spec_Store"))) {
        const Spec_Store = {
          SpecStore: a,
          SpecId: b,
        };
        localStorage.setItem("Spec_Store", JSON.stringify(Spec_Store));
      }
      const Spec_Store = JSON.parse(localStorage.getItem("Spec_Store"));
      console.log(Spec_Store["SpecStore"]);

      setstore(Spec_Store["SpecStore"]);
      setstore_id(Spec_Store["SpecId"]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      console.log(store_id);
      await SpecialOrderApi(store_id)
        .then((result) => {
          setAllProductInStore([...result.data]);
          // setAllAccounts(result.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
    console.log(store_id);
    setsstore_id(store_id);
  }, [store_id]);

  return (
    <div className="user-body">
      <Header title="SPECIAL ORDER DETAIL" />

      <div className="flex justify-end">
        <select
          style={{
            width: "11%",
            borderWidth: "2px",
            borderStyle: "solid",
            fontSize: "18px",
            padding: "8px",
            margin: "7px",
          }}
          value={store}
          onChange={handleChangeStore}
        >
          {getstores.map((item) => (
            <option key={item.store_id}>{item.name}</option>
          ))}
        </select>
      </div>

      <GridComponent
        dataSource={AllProductInStore}
        allowPaging={true}
        pageSettings={{ pageSize: 25 }}
        allowSorting
        allowTextWrap={true}
        toolbar={["Search"]}
        width="auto"
        height={670}
        className="custom-grid"
        rowSelected={handleRowSelected}
      >
        {/* rowSelected={handleRowSelected} */}
        <ColumnsDirective>
          {InventoryGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
      {/* <button onClick={handleSubmit}>Submit</button> */}

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

export default SpecialOrder;
