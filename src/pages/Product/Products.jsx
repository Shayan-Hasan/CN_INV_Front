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
import {
  GetAllProducts,
  DeleteProductById,
  GetAllBrands,
  GetAllCategories,
  GetAllUnits,
  getProductsByFilter,
  CheckProductBeforeDel,
  DelProduct,
} from "../../api/Api";
import { Header, Button } from "../../components";
import "../../styles/viewCustomer.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import LoadingIndicator from "../LoadingIndicator";

const Products = () => {
  const [getunits, setUnits] = useState([]);
  const [getbrands, setbrands] = useState([]);
  const [getcategories, setCategories] = useState([]);
  const [AllProducts, setAllProducts] = useState("");
  const [unit, setunit] = useState("");
  const [brand, setbrand] = useState("");
  const [category, setcategory] = useState("");

  const [p_id, setCode] = useState("");
  const { promiseInProgress } = usePromiseTracker();
  const [loading, setloading] = useState(true);

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
      minWidth: "100",
      width: "100",
      maxWidth: "180",
      textAlign: "left",
    },
    // {
    //   field: "details",
    //   headerText: "Description",
    //   minWidth: "180",
    //   width: "180",
    //   maxWidth: "640",
    //   textAlign: "left",
    // },
    {
      field: "unit_id",
      headerText: "Unit",
      minWidth: "100",
      width: "100",
      maxWidth: "180",
      textAlign: "left",
    },
    {
      field: "brand_id",
      headerText: "Brand",
      minWidth: "110",
      width: "110",
      maxWidth: "180",
      textAlign: "left",
    },
    {
      field: "category_id",
      headerText: "Category",
      minWidth: "120",
      width: "120",
      maxWidth: "180",
      textAlign: "left",
    },
    {
      field: "unit_price",
      headerText: "Unit Price",
      minWidth: "120",
      width: "120",
      maxWidth: "180",
      format: "C2",
      textAlign: "right",
    },
    {
      field: "discount",
      headerText: "Discount",
      minWidth: "120",
      width: "120",
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
      navigate("/Product/AddProduct");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeUnit = (e) => {
    if (e.target.value === 0) {
      setunit(null);
    } else {
      setunit(e.target.value);
    }
    console.log(e.target);
  };
  const handleChangeBrand = (e) => {
    if (e.target.value === 0) {
      setunit(null);
    } else {
      setbrand(e.target.value);
    }
  };
  const handleChangeCategory = (e) => {
    if (e.target.value === 0) {
      setcategory(null);
    } else {
      setcategory(e.target.value);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        var a, b, c;
        if (unit === null || unit === "" || unit === "0") {
          a = null;
        } else {
          a = unit;
        }
        if (brand === null || brand === "" || brand === "0") {
          b = null;
        } else {
          b = brand;
        }
        if (category === null || category === "" || category === "0") {
          c = null;
        } else {
          c = category;
        }
        trackPromise(
          getProductsByFilter(a, b, c)
            .then((resp) => {
              setAllProducts(resp.data || []);
            })
            .catch((err) => {
              console.log(err.message);
            })
        );
      } catch (ex) {}
    }
    fetchData();
  }, [unit, brand, category]);

  const handleEditProductClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Edit Product");
      if (p_id !== "") {
        navigate(`/Product/EditProduct/${p_id}`);
      } else {
        alert("Please select product to edit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditProductClick1 = async (event) => {
    event.preventDefault();
    var str = "";
    try {
      console.log("delete store");
      if (p_id !== "") {
        CheckProductBeforeDel(p_id)
          .then((resp) => {
            if (
              resp.data.inventory === 1 ||
              resp.data.sale === 1 ||
              resp.data.purchase === 1 ||
              resp.data.vendor === 1
            ) {
              if (resp.data.inventory === 1) {
                str = str + "Store contain inventory of this product.";
              }
              if (resp.data.sale === 1 || resp.data.purchase === 1) {
                str = str + "\n";
              }
              if (resp.data.sale === 1) {
                str = str + "Sale order created using this product.";
              }
              if (resp.data.sale === 1 && resp.data.purchase === 1) {
                str = str + "\n";
              }
              if (resp.data.purchase === 1) {
                str = str + "Purchase order created using this product.";
              }
              if (resp.data.vendor === 1 && resp.data.purchase === 1) {
                str = str + "\n";
              }
              if (
                resp.data.vendor === 1 &&
                resp.data.sale === 1 &&
                resp.data.purchase === 0
              ) {
                str = str + "\n";
              }
              if (resp.data.vendor === 1) {
                str = str + "This product is assigned to supplier.";
              }
              str = str + "\n\nProduct is not deletable.";
              alert(str);
              return;
            } else {
              if (
                window.confirm(
                  `Are you sure you want to Delete product ID: ${p_id}?`
                )
              ) {
                DelProduct(p_id)
                  .then((resp) => {
                    if (resp.status === 200) {
                      window.location.reload();
                      alert(`Product ID: ${p_id} deleted successfully.`);
                    } else {
                      alert(`Product ID: ${p_id} fail to delete.`);
                    }
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              }
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
        navigate(`/Product`);
      } else {
        alert("Please select product to delete.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewProductClick = async (event) => {
    // event.preventDefault();
    try {
      console.log("View Product Details");
      if (p_id !== "") {
        navigate(`/Product/ViewProduct/${p_id}`);
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
    const fetchData = async () => {
      try {
        // trackPromise(
        //   Promise.all([
        //     GetAllProducts(),
        //     GetAllBrands(),
        //     GetAllCategories(),
        //     GetAllUnits(),
        //   ])
        //     .then(
        //       ([
        //         productsResponse,
        //         brandsResponse,
        //         categoriesResponse,
        //         unitsResponse,
        //       ]) => {
        //         setAllProducts(productsResponse.data);
        //         setbrands(brandsResponse.data);
        //         setCategories(categoriesResponse.data);
        //         setUnits(unitsResponse.data);
        //       }
        //     )
        //     .catch((error) => {
        //       console.error("Error fetching data:", error);
        //     })
        //     .finally(() => {
        //       setloading(false);
        //     })
        // );

        trackPromise(
          Promise.all([GetAllProducts()])
            .then(([productsResponse]) => {
              setAllProducts(productsResponse.data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            })
            .finally(() => {
              setloading(false);
            })
        );

        await GetAllBrands()
          .then((resp) => {
            setbrands(resp.data || []);
          })
          .catch((err) => {
            console.log(err.message);
          });
        await GetAllCategories()
          .then((resp) => {
            setCategories(resp.data || []);
          })
          .catch((err) => {
            console.log(err.message);
          });
        await GetAllUnits()
          .then((resp) => {
            setUnits(resp.data || []);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
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
                text="Delete"
                borderRadius="10px"
                onClick={handleEditProductClick1}
              />
            </Col>

            <Col md="auto" style={{ padding: "0" }}>
              <select
                className="select-custom"
                value={brand}
                onChange={handleChangeBrand}
              >
                <option value={0}>{"Select Brand"}</option>
                {getbrands.map((item, index) => (
                  <option key={index} value={item.brand_id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col md="auto" style={{ padding: "0" }}>
              <select
                className="select-custom"
                value={category}
                onChange={handleChangeCategory}
              >
                <option value={0}>{"Select Category"}</option>
                {getcategories.map((item, index) => (
                  <option key={index} value={item.category_id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col md="auto" style={{ padding: "0" }}>
              <select
                className="select-custom"
                value={unit}
                onChange={handleChangeUnit}
              >
                <option value={0}>{"Select Unit"}</option>
                {getunits.map((item, index) => (
                  <option key={index} value={item.unit_id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Container>
        {loading && promiseInProgress ? (
          <LoadingIndicator />
        ) : (
          <>
            <GridComponent
              className="custom-grid"
              dataSource={AllProducts}
              allowPaging={true}
              recordDoubleClick={handleViewProductClick}
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
                services={[
                  Resize,
                  Page,
                  Toolbar,
                  Selection,
                  Edit,
                  Sort,
                  Filter,
                ]}
              />
            </GridComponent>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
