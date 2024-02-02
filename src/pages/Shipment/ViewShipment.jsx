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
import { GetShipmentDetailByid } from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/viewCustomer.css";

const ViewShipment = () => {
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

    {
      field: "shipment_id",
      headerText: "Shipment ID",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "code",
      headerText: "Code",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "details",
      headerText: "Product Description",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "qty_ship",
      headerText: "Qty Ship'd",
      width: "150",
      textAlign: "Center",
    },

    {
      field: "running_qty_ship",
      headerText: "Running Qty Ship'd",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "date_shipped",
      headerText: "Ship Date",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "note",
      headerText: "Note",
      width: "150",
      textAlign: "Center",
    },
  ];
  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/sales");
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
    const resp = GetShipmentDetailByid(param.so_id);
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
      <Header title="SHIPMENT DETAILS" />

      <div className="flex justify-end">
        <Button
          margin="7px"
          color="white"
          bgColor={currentColor}
          text="Back"
          borderRadius="10px"
          onClick={handleBackClick}
        />
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
    </div>
  );
};

export default ViewShipment;
