import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import {
  addAssignProductVen,
  GetVendorDetail,
  GetAllProductListSup,
  GetAssignedProductDetailById,
} from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
// import "../../styles/ProductAssign.css";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/AddProduct.css";
const ProductAssign = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const [CardList, setcartList] = useState([]);
  const [CardList1, setcartList1] = useState([]);
  const [CardList2, setcartList2] = useState([]);
  const [CardList3, setcartList3] = useState([]);
  const [CardList4, setcartList4] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRows1, setSelectedRows1] = useState([]);
  const [name, setname] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [selectedRowIndex1, setSelectedRowIndex1] = useState(-1);
  let param = useParams();

  const [formData, setFormData] = useState({
    vendor_id: "",
    assign_products: [],
  });

  const toggleSelected = (item, index) => {
    //console.log(index);
    setSelectedRowIndex(item.product_id);
    //setSelectedRows([]);
    setSelectedRows([item]);
  };
  useEffect(() => {
    console.log(selectedRowIndex);
  }, [selectedRowIndex]);

  const toggleSelected1 = (item) => {
    //setSelectedRows1([]);
    setSelectedRowIndex1(item.product_id);
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
      const updatedCardList2 = CardList3.find((item) => item.product_id === a);
      if (updatedCardList2) {
        const defaultProduct = {
          product_id: updatedCardList2.product_id,
          name: updatedCardList2.name,
          code: updatedCardList2.code,
          unit_price: updatedCardList2.unit_price,
          image: updatedCardList2.image,
          details: updatedCardList2.details,
          unit: updatedCardList2.unit,
          delivery_days: 0,
        };
        setcartList([defaultProduct, ...updatedItem]);
      } else {
        const updatedCardList3 = CardList4.find(
          (item) => item.product_id === a
        );
        if (updatedCardList3) {
          const defaultProduct = {
            product_id: updatedCardList3.product_id,
            name: updatedCardList3.name,
            code: updatedCardList3.code,
            unit_price: updatedCardList3.unit_price,
            image: updatedCardList3.image,
            details: updatedCardList3.details,
            unit: updatedCardList3.unit,
            delivery_days: 0,
          };
          setcartList([defaultProduct, ...updatedItem]);
        }
      }
      // console.log(item.product_id);
      // const defaultProduct = {
      //   product_id: item.product_id,
      //   name: item.name,
      //   code: item.code,
      //   unit_price: item.unit_price,
      //   image: item.image,
      //   details: item.details,
      //   unit: item.unit,
      //   delivery_days: 0,
      // };
      // setcartList([defaultProduct, ...updatedItem]);
      const updatedCardList1 = CardList1.filter(
        (item) => item.product_id !== a
      );
      setcartList1(updatedCardList1);
      setSelectedRows1([]);
    }
  };

  // useEffect(() => {}, [CardList]);

  const handleSaleOrderClick = async (e) => {
    if (CardList1.length === 0 && CardList2.length === 0) {
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
      await GetVendorDetail(param.Supplier_id)
        .then(function (result) {
          setname(result.data[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });
      await GetAssignedProductDetailById(param.Supplier_id)
        .then(function (result) {
          if (result.data) {
            const productList = result.data.map((item) => ({
              product_id: item.product_id,
              name: item.name,
              code: item.code,
              unit_price: item.unit_price,
              image: item.image,
              details: item.details,
              unit: item.unit_id,
              delivery_days: item.delivery_days,
            }));

            setcartList1((prevProductList) => [
              ...prevProductList,
              ...productList,
            ]);
            setcartList2((prevProductList) => [
              ...prevProductList,
              ...productList,
            ]);
            setcartList3((prevProductList) => [
              ...prevProductList,
              ...productList,
            ]);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });

      await GetAllProductListSup().then(function (result) {
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
          setcartList4((prevProductList) => [
            ...prevProductList,
            ...productList,
          ]);
        }
      });
    }
    fetchData();
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="ASSIGN PRODUCTS" />

      <Container
        fluid="true"
        className="g-0 p-0 justify-end"
        style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "18px" }}
      >
        <Row
          xs={1}
          sm={1}
          style={{
            paddingLeft: "10px",
          }}
        >
          <Col md={2} className="container-col">
            <div className="col-lg-12">
              <div className="form-group">
                <label className="label">ID: </label>
                <input
                  className="input"
                  required
                  type="text"
                  name="name"
                  value={param.Supplier_id}
                  placeholder="Sale Order"
                  readOnly
                />
              </div>
            </div>
          </Col>
          <Col md={2} className="container-col">
            <div className="col-lg-12">
              <div className="form-group">
                <label className="label">Supplier: </label>
                <input
                  type="text"
                  name="email"
                  value={name}
                  placeholder="Customer Name"
                  className="input"
                  readOnly
                />
              </div>
            </div>
          </Col>
        </Row>
        <br />

        {/* <div className="flex justify-center"> */}
        <Row md={12} xs={1} sm={1}>
          <Col
            md={5}
            className="container-col table-container-sale03 justify-content-left"
          >
            {/* <div className="flex justify-center"> */}
            <div className="m-0 p-0">
              <table className="table table-striped table-bordered">
                <thead
                  className="table-responsive"
                  style={{
                    backgroundColor: currentColor,
                    verticalAlign: "middle",
                    position: "sticky",
                    top: "0",
                  }}
                >
                  <tr className="table-sale-tr">
                    <th
                      style={{
                        textAlign: "center",
                        width: "90px",
                      }}
                    >
                      CODE
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        minWidth: "90px",
                      }}
                    >
                      PRODUCT
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        width: "90px",
                      }}
                    >
                      UNIT
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        width: "90px",
                      }}
                    >
                      UNIT PRICE
                    </th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    verticalAlign: "middle",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  {CardList?.map((item, index) => (
                    <tr
                      className="text_data selected_grey"
                      key={index}
                      onClick={() => toggleSelected(item, index)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <td
                        style={{
                          textAlign: "center",
                          backgroundColor:
                            selectedRowIndex !== -1 &&
                            selectedRowIndex === item.product_id
                              ? "lightblue"
                              : "transparent",
                        }}
                      >
                        {item.code}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          backgroundColor:
                            selectedRowIndex !== -1 &&
                            selectedRowIndex === item.product_id
                              ? "lightblue"
                              : "transparent",
                        }}
                      >
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
                              paddingLeft: "10px",
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
                      <td
                        style={{
                          textAlign: "center",
                          backgroundColor:
                            selectedRowIndex !== -1 &&
                            selectedRowIndex === item.product_id
                              ? "lightblue"
                              : "transparent",
                        }}
                      >
                        {item.unit}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          backgroundColor:
                            selectedRowIndex !== -1 &&
                            selectedRowIndex === item.product_id
                              ? "lightblue"
                              : "transparent",
                        }}
                      >
                        {formatCurrency(item.unit_price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* </div> */}
            </div>
          </Col>

          <Col
            md={1}
            sm={true}
            className="d-none d-lg-block flex justify-center"
            style={{ paddingTop: "200px" }}
          >
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text=">>"
              borderradius="10px"
              onClick={handleAddcartClick}
            />
            <br />
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="<<"
              borderradius="10px"
              onClick={handleAddcartClick1}
            />
          </Col>
          <Col
            md={1}
            sm={true}
            className="d-block d-lg-none flex justify-center"
          >
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text=">>"
              borderradius="10px"
              onClick={handleAddcartClick}
            />
            <br />
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="<<"
              borderradius="10px"
              onClick={handleAddcartClick1}
            />
          </Col>

          {/* <Col md={1} className="container-col">
            <div style={{ marginTop: "200px", width: "0" }}>
              <button
                style={{
                  padding: "10px",
                  backgroundColor: currentColor,
                  color: "#fff",
                  border: "none",
                  borderradius: "5px",

                  // margin: "10px",
                }}
                color="white"
                borderradius="10px"
                onClick={handleAddcartClick}
                text="heh"
              >
                {">>"}
              </button>
              <br />

              <button
                style={{
                  padding: "10px",
                  backgroundColor: currentColor,
                  color: "#fff",
                  border: "none",
                  borderradius: "5px",
                  // margin: "10px",
                }}
                color="white"
                borderradius="10px"
                onClick={handleAddcartClick1}
                text="heh"
                // disabled={!forceUpdate}
              >
                {"<<"}
              </button>
            </div>
          </Col> */}
          <Col
            md={6}
            className="container-col table-container-sale03 justify-content-end"
          >
            {/* <div className="flex justify-end"> */}
            <div className="m-0 p-0 ">
              <table className="table table-striped table-bordered ">
                <thead
                  className="thead-dark"
                  style={{
                    width: "0",
                    backgroundColor: currentColor,
                    verticalAlign: "middle",
                    position: "sticky",
                    top: "0",
                  }}
                >
                  <tr className="table-sale-tr">
                    <th
                      style={{
                        textAlign: "center",
                        width: "90px",
                      }}
                    >
                      CODE
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        minWidth: "90px",
                      }}
                    >
                      PRODUCT
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        width: "90px",
                      }}
                    >
                      UNIT
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        width: "90px",
                      }}
                    >
                      UNIT PRICE
                    </th>

                    <th
                      style={{
                        textAlign: "center",
                        width: "90px",
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
                      }}
                    >
                      <td
                        style={{
                          textAlign: "center",
                          backgroundColor:
                            selectedRowIndex1 !== -1 &&
                            selectedRowIndex1 === item.product_id
                              ? "lightblue"
                              : "transparent",
                        }}
                      >
                        {item.code}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          backgroundColor:
                            selectedRowIndex1 !== -1 &&
                            selectedRowIndex1 === item.product_id
                              ? "lightblue"
                              : "transparent",
                        }}
                      >
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
                      <td
                        style={{
                          textAlign: "center",
                          backgroundColor:
                            selectedRowIndex1 !== -1 &&
                            selectedRowIndex1 === item.product_id
                              ? "lightblue"
                              : "transparent",
                        }}
                      >
                        {item.unit}
                      </td>

                      <td
                        style={{
                          textAlign: "center",
                          backgroundColor:
                            selectedRowIndex1 !== -1 &&
                            selectedRowIndex1 === item.product_id
                              ? "lightblue"
                              : "transparent",
                        }}
                      >
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
                              fontSize: "12px",
                            }}
                            value={item.unit_price}
                            onChange={(e) =>
                              handleUnitPriceChange1(index, e.target.value)
                            }
                          />
                        </div>
                      </td>

                      <td
                        style={{
                          textAlign: "center",
                          backgroundColor:
                            selectedRowIndex1 !== -1 &&
                            selectedRowIndex1 === item.product_id
                              ? "lightblue"
                              : "transparent",
                        }}
                      >
                        <div className="centered-input">
                          <input
                            className="input"
                            id="delivery_days"
                            type="number"
                            step="1.00"
                            min="0"
                            style={{
                              textAlign: "center",
                              fontSize: "12px",
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
            {/* </div> */}
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <Row md={"auto"} className="justify-content-center">
        <button
          style={{
            padding: "10px",
            backgroundColor: currentColor,
            color: "#fff",
            border: "none",
            borderradius: "5px",
            margin: "10px",
          }}
          color="white"
          borderradius="10px"
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
            borderradius: "5px",
            margin: "10px",
          }}
          color="white"
          borderradius="10px"
          onClick={handleBackClick1}
          text="heh"
          // disabled={!forceUpdate}
        >
          Back
        </button>
      </Row>
    </div>
  );
};
export default ProductAssign;
