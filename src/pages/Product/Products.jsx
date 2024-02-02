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
import hello from "../../data/default_prod2.png";
import { GetAllProducts, DeleteProductById } from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";

const Products = () => {
  const [AllProducts, setAllProducts] = useState("");
  const [p_id, setCode] = useState("");
  const navigate = useNavigate();
  const customerGridImage = (props) => (
    <div className="image flex gap-4">
      {props.image === null ? (
        <div>
          <img
            className="rounded-xl w-16 h-16"
            src={hello}
            alt="product"
            width={72}
          />
        </div>
      ) : (
        <img
          className="rounded-xl h-16 md:ml-3"
          src={`data:image/jpeg;base64,${props.image}`}
          alt="product"
          width={72}
        />
      )}
    </div>
  );

  const Removefunction = () => {
    if (window.confirm("Do you want to remove product?")) {
      DeleteProductById(p_id)
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const ProductGridactiveStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      {/* <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.active_product}</p> */}
      {props.active_product === 1 ? (
        <label
          style={{ background: "green" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          Active
          {/* {props.active_product} */}
        </label>
      ) : (
        <label
          style={{ background: "red" }}
          className="text-white py-3 px-2 capitalize rounded-2xl text-md"
        >
          InActive
        </label>
      )}
    </div>
  );
  const ProductGriddisplayStatus = (props) => (
    <div>
      {/* <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.display_product}</p> */}
      {props.display_product === 0 ? (
        <div className="flex gap-2 mt-3 justify-center items-center text-gray-700 capitalize">
          <p style={{ background: "red" }} className="rounded-full h-3 w-3" />
          <p>Disable</p>
        </div>
      ) : (
        <div className="flex gap-2 mt-3 justify-center items-center text-gray-700 capitalize">
          <p style={{ background: "green" }} className="rounded-full h-3 w-3" />
          <p>Enable</p>
        </div>
      )}
    </div>
  );

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "50" },
    {
      headerText: "Preview",
      minWidth: "130",
      width: "130",
      maxWidth: "130",
      template: customerGridImage,
      textAlign: "Center",
    },
    {
      headerText: "Product Name",
      minWidth: "180",
      width: "190",
      maxWidth: "360",
      field: "name",
      // template: customerGridImage,
      textAlign: "left",
    },
    {
      field: "code",
      headerText: "Code",
      minWidth: "120",
      width: "140",
      maxWidth: "180",
      textAlign: "left",
    },
    {
      field: "details",
      headerText: "Description",
      minWidth: "240",
      width: "240",
      maxWidth: "640",
      textAlign: "left",
    },
    {
      field: "unit_id",
      headerText: "Unit",
      minWidth: "100",
      width: "100",
      maxWidth: "180",
      textAlign: "left",
    },
    {
      field: "unit_price",
      headerText: "Unit Price",
      minWidth: "140",
      width: "150",
      maxWidth: "180",
      format: "C2",
      textAlign: "right",
    },
    {
      field: "discount",
      headerText: "Discount",
      minWidth: "140",
      width: "150",
      maxWidth: "180",
      format: "C2",
      textAlign: "right",
    },
    {
      template: ProductGridactiveStatus,
      field: "active_product",
      headerText: "Active Status",
      minWidth: "170",
      width: "160",
      maxWidth: "170",
      textAlign: "Center",
    },
    {
      template: ProductGriddisplayStatus,
      field: "display_product",
      headerText: "Display Status",
      minWidth: "180",
      width: "180",
      maxWidth: "180",
      textAlign: "Center",
    },
  ];

  const { currentColor } = useStateContext();

  const handleAddNewProdClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      navigate("/product/addproduct");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditProductClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Edit Product");
      if (p_id !== "") {
        navigate(`/product/editproduct/${p_id}`);
      } else {
        alert("Please select product to edit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleBackClick = async (event) => {
  //   event.preventDefault();
  //   try {
  //     console.log("Back");
  //     navigate("/i");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const handleViewProductClick = async (event) => {
    event.preventDefault();
    try {
      console.log("View Product Details");
      if (p_id !== "") {
        navigate(`/product/viewproduct/${p_id}`);
      } else {
        alert("Please select product to view.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    // const selectedRowData = args.data;
    setCode(args.data.product_id);
    //console.log(selectedRowData.product_id);
  };

  useEffect(() => {
    const resp = GetAllProducts();
    resp
      .then(function (result) {
        setAllProducts(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header category="Stock" title="PRODUCT" />
      <Container fluid className="g-0 p-0 justify-end">
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Add"
              borderRadius="10px"
              onClick={handleAddNewProdClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Update"
              borderRadius="10px"
              onClick={handleEditProductClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              onClick={handleViewProductClick}
            />
          </Col>
        </Row>
      </Container>
      <GridComponent
        className="custom-grid"
        dataSource={AllProducts}
        allowPaging={true}
        pageSettings={{ pageSize: 8 }}
        allowSorting
        allowResizing
        //allowTextWrap={true}
        toolbar={[
          {
            text: "Search",
            //            align: "Center",
          },
        ]}
        //width="auto"
        //height={680}
        rowSelected={handleRowSelected}
        rowHeight={72}
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

export default Products;
