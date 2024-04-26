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
import { ProductInAllStores } from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { Container, Row } from "react-bootstrap";
import "../../styles/viewCustomer.css";

const ViewInventory = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [AllProductInStore, setAllProductInStore] = useState("");
  let param = useParams();

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
      navigate("/Inventory");
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
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="PRODUCT INVENTORY" />
      <form>
        <Container
          className="g-0 justify-center"
          fluid="true"
          style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "18px" }}
        >
          <Row md={"auto"} className="justify-content-end">
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Back"
              borderRadius="10px"
              onClick={handleBackClick}
            />
          </Row>

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
        </Container>
      </form>
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
};

export default ViewInventory;
