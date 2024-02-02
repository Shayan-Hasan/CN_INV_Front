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
import { ProductInAllStores } from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/viewCustomer.css";

const ViewInventory = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [AllProductInStore, setAllProductInStore] = useState("");
  let param = useParams();

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const customerGridImage1 = (props) => (
    <div>{formatCurrency(props.opening_balance)}</div>
  );

  const InventoryGrid = [
    //{ type: 'checkbox', width: '50' },

    { field: "store", headerText: "Store", width: "150", textAlign: "Center" },

    {
      field: "unit_instock",
      headerText: "Stock Quantity",
      width: "150",
      textAlign: "Center",
    },

    { field: "unit", headerText: "Unit", width: "150", textAlign: "Center" },

    {
      field: "min_stock",
      headerText: "Min Stock",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "max_stock",
      headerText: "Max Stock",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "opening_balance",
      headerText: "Opening Balance",
      // template: customerGridImage1,
      width: "150",
      textAlign: "Center",
    },
    // {
    //   field: "note",
    //   headerText: "Note",
    //   // template: customerGridImage1,
    //   width: "150",
    //   textAlign: "Center",
    // },
  ];
  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/inventory");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //   const handleRowSelected = (args) => {
  //     const selectedRowData = args.data;
  //     setCode(selectedRowData.code);
  //     console.log(selectedRowData.code);
  //     // console.log('Selected Product Code:', productcode);
  //   };

  useEffect(() => {
    //console.log("id "+param.p_id);
    const resp = ProductInAllStores(param.p_id);
    resp
      .then(function (result) {
        setAllProductInStore(result.data);
        //console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="user-body">
      <Header title="PRODUCT INVENTORY" />

      <div className="flex justify-end">
        <Button
          margin="6px"
          color="white"
          bgColor={currentColor}
          text="Back"
          borderRadius="10px"
          onClick={handleBackClick}
        />
      </div>

      <GridComponent
        className="custom-grid"
        dataSource={AllProductInStore}
        allowPaging={true}
        pageSettings={{ pageSize: 25 }}
        allowSorting
        allowResizing
        allowTextWrap={true}
        toolbar={["Search"]}
        rowHeight={36}
      >
        {/* rowSelected={handleRowSelected} */}
        <ColumnsDirective>
          {InventoryGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Resize, Page, Toolbar, Selection, Edit, Sort, Filter]}
        />
      </GridComponent>
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
};

export default ViewInventory;
