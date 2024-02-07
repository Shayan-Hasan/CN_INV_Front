import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import {
  addAssignProductVen,
  GetVendorDetail,
  GetAllProductListSup,
} from "../../api/Api";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/ProductAssign.css";

const ProductAssign = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const [CardList, setcartList] = useState([]);
  const [CardList1, setcartList1] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRows1, setSelectedRows1] = useState([]);
  const [name, setname] = useState("");

  let param = useParams();

  const [formData, setFormData] = useState({
    vendor_id: "",
    assign_products: [],
  });

  const toggleSelected = (item) => {
    setSelectedRows([]);
    setSelectedRows([item]);
  };
  const toggleSelected1 = (item) => {
    setSelectedRows1([]);
    setSelectedRows1([item]);
  };

  const handleBackClick1 = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("Back");
      navigate("/supplier");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddcartClick = () => {
    console.log(selectedRows);
    var a = null;
    const updatedItem = [...CardList1];
    if (selectedRows.length > 0) {
      const item = selectedRows[0];
      a = item.product_id;
      console.log(item.product_id);
      const defaultProduct = {
        product_id: item.product_id,
        name: item.name,
        code: item.code,
        unit_price: item.unit_price,
        image: item.image,
        details: item.details,
        unit: item.unit,
        delivery_days: 0,
      };
      setcartList1([defaultProduct, ...updatedItem]);
      const updatedCardList1 = CardList.filter((item) => item.product_id !== a);
      setcartList(updatedCardList1);
      setSelectedRows([]);
    }
  };

  const handleAddcartClick1 = () => {
    console.log(selectedRows1);
    var a = null;
    const updatedItem = [...CardList];
    if (selectedRows1.length > 0) {
      const item = selectedRows1[0];
      a = item.product_id;
      console.log(item.product_id);
      const defaultProduct = {
        product_id: item.product_id,
        name: item.name,
        code: item.code,
        unit_price: item.unit_price,
        image: item.image,
        details: item.details,
        unit: item.unit,
        delivery_days: 0,
      };
      setcartList([defaultProduct, ...updatedItem]);
      const updatedCardList1 = CardList1.filter(
        (item) => item.product_id !== a
      );
      setcartList1(updatedCardList1);
      setSelectedRows1([]);
    }
  };

  useEffect(() => {}, [CardList]);

  const handleSaleOrderClick = async (e) => {
    if (CardList1.length === 0) {
      alert("No product to assign.");
      return;
    }

    const updatedFormData = { ...formData };
    updatedFormData.vendor_id = param.Supplier_id;

    updatedFormData.assign_products = [];

    CardList1.forEach((product, index) => {
      const saleProduct = {
        product_id: product.product_id,
        delivery_days: product.delivery_days,
        unit_price: product.unit_price,
        notes: "Product Assigned",
      };
      updatedFormData.assign_products.push(saleProduct);
    });

    setFormData(updatedFormData);
    // console.log(updatedFormData);
    const response = await addAssignProductVen(updatedFormData);
    if (response.status === 200) {
      alert("Product assigned successfully.");
    } else {
      alert("Product Fail to assign.");
      return;
    }
    window.location.reload();
  };

  const handleUnitPriceChange = (index, value) => {
    const newCartList = [...CardList1];
    newCartList[index].delivery_days = value;
    setcartList1(newCartList);
  };

  const handleUnitPriceChange1 = (index, value) => {
    const newCartList = [...CardList1];
    newCartList[index].unit_price = value;
    setcartList1(newCartList);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  useEffect(() => {
    async function fetchData() {
      const resp = GetVendorDetail(param.Supplier_id);
      resp
        .then(function (result) {
          setname(result.data[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });

      GetAllProductListSup().then(function (result) {
        console.log(result.data);
        if (result.data) {
          const productList = result.data.map((item) => ({
            product_id: item.product_id,
            name: item.name,
            code: item.code,
            unit_price: item.unit_price,
            image: item.image,
            details: item.details,
            unit: item.unit_id,
          }));

          setcartList((prevProductList) => [
            ...prevProductList,
            ...productList,
          ]);
        }
      });
    }
    fetchData();
  }, []);

  return (
    <div className="user-body" style={{ paddingTop: "2px" }}>
      <div class="article-sale2">
        <div class="article-container-sale">
          <label
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              paddingLeft: "10px",
            }}
          >
            ASSIGN PRODUCTS
          </label>
        </div>
      </div>

      <div className="container_sale">
        <div class="article-container-product_assign">
          <div class="article-product_assign">
            <div className="col-lg-12">
              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>ID: </label>
                <br />
                <input
                  className="input"
                  required
                  type="text"
                  name="name"
                  value={param.Supplier_id}
                  placeholder="Sale Order"
                  readOnly
                  style={{ width: "30%", marginBottom: "20px" }}
                />
              </div>
            </div>
            {/* </div>
                    <div class="article"> */}

            <div className="col-lg-12">
              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Supplier: </label>
                <br />
                <input
                  type="text"
                  name="email"
                  value={name}
                  placeholder="Customer Name"
                  className="input"
                  readOnly
                  style={{ width: "30%" }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div class="article-product_assign0">
              <div>
                <div className="table-container-sale">
                  {/* <Card > */}
                  <table className="table table-striped table-bordered">
                    <thead
                      className="thead-dark"
                      style={{
                        color: currentColor,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontWeight: "bold",
                        fontSize: 14,
                        position: "sticky",
                        top: "0",

                        background: "white",
                        // borderSpacing: "10px",
                      }}
                    >
                      <tr
                        className="table-sale-tr"
                        style={{
                          Header: "70%",
                          color: "white",
                          backgroundColor: currentColor,
                          height: "60px",
                          fontSize: "16px",
                          textAlign: "center",
                        }}
                      >
                        <th
                          style={{
                            textAlign: "center",
                            width: "120px",
                          }}
                        >
                          CODE
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            minWidth: "100px",
                          }}
                        >
                          PRODUCT
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            width: "140px",
                          }}
                        >
                          UNIT
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            width: "140px",
                          }}
                        >
                          UNIT PRICE
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        verticalAlign: "middle",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      {CardList?.map((item, index) => (
                        <tr
                          key={item.product_id}
                          onClick={() => toggleSelected(item)}
                          style={{
                            cursor: "pointer",
                            background: selectedRows.includes(item)
                              ? "lightblue"
                              : "white",
                          }}
                        >
                          <td style={{ textAlign: "center" }}>{item.code}</td>
                          <td style={{ textAlign: "center" }}>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                              }}
                            >
                              <div
                                className="image flex gap-4"
                                style={{
                                  maxWidth: "64px",
                                  maxHeight: "64px",
                                }}
                              >
                                <img
                                  className="rounded-xl"
                                  src={`data:image/jpeg;base64,${item.image}`}
                                  alt={`Product ${item.product_id} Image`}
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  flex: "0 0 80%",
                                  paddingLeft: "20px",
                                  marginTop: "8px",
                                }}
                              >
                                <div style={{ fontWeight: "bold" }}>
                                  {item.name}
                                </div>
                                <div>{item.details}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ textAlign: "center" }}>{item.unit}</td>
                          <td style={{ textAlign: "center" }}>
                            {formatCurrency(item.unit_price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "200px" }}>
              <button
                style={{
                  padding: "10px",
                  backgroundColor: currentColor,
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  margin: "10px",
                }}
                color="white"
                borderRadius="10px"
                onClick={handleAddcartClick}
                text="heh"
                // disabled={!forceUpdate}
              >
                {">>"}
              </button>
              <button
                style={{
                  padding: "10px",
                  backgroundColor: currentColor,
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  margin: "10px",
                }}
                color="white"
                borderRadius="10px"
                onClick={handleAddcartClick1}
                text="heh"
                // disabled={!forceUpdate}
              >
                {"<<"}
              </button>
            </div>
            <div>
              <div className="table-container-product_assign">
                {/* <Card > */}
                <table className="table table-striped table-bordered">
                  <thead
                    className="thead-dark"
                    style={{
                      color: currentColor,
                      textAlign: "center",
                      verticalAlign: "middle",
                      fontWeight: "bold",
                      fontSize: 14,
                      position: "sticky",
                      top: "0",

                      background: "white",
                      // borderSpacing: "10px",
                    }}
                  >
                    <tr
                      className="table-sale-tr"
                      style={{
                        Header: "70%",
                        color: "white",
                        backgroundColor: currentColor,
                        height: "60px",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                    >
                      <th
                        style={{
                          textAlign: "center",
                          width: "120px",
                        }}
                      >
                        CODE
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          minWidth: "100px",
                        }}
                      >
                        PRODUCT
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          width: "140px",
                        }}
                      >
                        UNIT
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          width: "140px",
                        }}
                      >
                        UNIT PRICE
                      </th>

                      <th
                        style={{
                          textAlign: "center",
                          width: "140px",
                        }}
                      >
                        Delivery Days
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      verticalAlign: "middle",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    {CardList1?.map((item, index) => (
                      <tr
                        key={item.product_id}
                        onClick={() => toggleSelected1(item)}
                        style={{
                          cursor: "pointer",
                          background: selectedRows1.includes(item)
                            ? "lightblue"
                            : "white",
                        }}
                      >
                        <td style={{ textAlign: "center" }}>{item.code}</td>
                        <td style={{ textAlign: "center" }}>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              className="image flex gap-4"
                              style={{
                                maxWidth: "64px",
                                maxHeight: "64px",
                              }}
                            >
                              <img
                                className="rounded-xl"
                                src={`data:image/jpeg;base64,${item.image}`}
                                alt={`Product ${item.product_id} Image`}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                flex: "0 0 80%",
                                paddingLeft: "20px",
                                marginTop: "8px",
                              }}
                            >
                              <div style={{ fontWeight: "bold" }}>
                                {item.name}
                              </div>
                              <div>{item.details}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: "center" }}>{item.unit}</td>

                        <td style={{ textAlign: "center" }}>
                          {/* <AiOutlineMinusSquare /> */}

                          <div className="centered-input">
                            <input
                              className="input"
                              id="quantity"
                              type="number"
                              step="1.00"
                              min="0"
                              style={{
                                textAlign: "center",
                                width: "",
                              }}
                              value={item.unit_price}
                              onChange={(e) =>
                                handleUnitPriceChange1(index, e.target.value)
                              }
                            />
                          </div>
                        </td>

                        <td style={{ textAlign: "center" }}>
                          <div className="centered-input">
                            <input
                              className="input"
                              id="delivery_days"
                              type="number"
                              step="1.00"
                              min="0"
                              style={{
                                textAlign: "center",
                                width: "",
                              }}
                              value={item.delivery_days}
                              onChange={(e) =>
                                handleUnitPriceChange(index, e.target.value)
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-center" style={{ paddingLeft: "850px" }}>
            <div>
              <br />
              <br />
              <br />
              <button
                style={{
                  padding: "10px",
                  backgroundColor: currentColor,
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  margin: "10px",
                }}
                color="white"
                borderRadius="10px"
                onClick={handleSaleOrderClick}
                text="heh"
                // disabled={!forceUpdate}
              >
                Assign
              </button>

              <button
                style={{
                  padding: "10px",
                  backgroundColor: currentColor,
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  margin: "10px",
                }}
                color="white"
                borderRadius="10px"
                onClick={handleBackClick1}
                text="heh"
                // disabled={!forceUpdate}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductAssign;
