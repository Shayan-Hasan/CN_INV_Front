import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import {
  GetAllCustomersName,
  GetProductNameCodeInv,
  GetProductByIdSale,
  GetSaleCustomerById,
  AddEstimationApi,
  GetProductByStoreID,
  EditSaleOrderStatus,
  getProductFilterSubString,
} from "../../api/Api";
import { Header, Button } from "../../components";
import Select from "react-select";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/sale.css";
import { Card } from "react-bootstrap";
import Sidebar from "../../components/ViewOrderProduct";
import "../../styles/viewCustomer.css";
import { Col, Container, Row } from "react-bootstrap";

const AddEstimation = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [GetCustomer, setGetCustomer] = useState([]);
  const [Customer, setCustomer] = useState("");
  const [CustomerOptions, setCustomerOptions] = useState([]);
  const [GetProduct, setGetProduct] = useState([]);
  const [product, setProducts] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [p_code, setp_code] = useState("");
  const [customer_ids, setcustomer_ids] = useState("");
  const [CardList, setcartList] = useState([]);
  const [total_amount, settotalAmount] = useState(0.0);
  const [tax, settax] = useState(0.0);
  const [totaldiscount, settotaldiscount] = useState(0.0);
  const [total_item, settotalitem] = useState(0.0);
  const [index1, setindex1] = useState("");
  const [grandtotal, setgrandtotal] = useState(0.0);
  const [note, setnote] = useState("");
  const [CustomerDetail, setCustomerDetail] = useState([]);
  const [cusPhone, setcusPhone] = useState("");
  const [ProductStr, setProductStr] = useState("");
  const [trackingno, settrackingno] = useState("");
  const [projectname, setprojectname] = useState("");
  const [projectname1, setprojectname1] = useState("");
  const [acc_from_bal, setacc_from_bal] = useState("");
  const [projectname2, setprojectname2] = useState(0);
  const [shipmethod, setshipmethod] = useState("");
  const [OrderStatus, setOrderStatus] = useState("MARK AS CLOSE");
  const [orderstatuslable, setorderstatuslable] = useState("OPEN");
  const [ValError, setValError] = useState([]);
  const [productID, setproductID] = useState("");
  const [toggle, setToggle] = useState(false);

  let param = useParams();

  const [formData, setFormData] = useState({
    est_sale: "E",
    customer_id: 5,
    project_name: "Project XYZ",
    total: 500.0,
    amount_paid: 300.0,
    amount_pending: 200.0,
    user_id: 102,
    so_note: "Sale order note",
    total_price: 450.0,
    discount: 50.0,
    tax: 25.0,
    shipment: 10.0,
    store_id: 1,
    sale_products: [],
  });

  const keypadButtons = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    ".",
    "0",
    "00",
  ];

  const [activeInput, setActiveInput] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [ship_qty, setship_qty] = useState(0);

  const handleInputClick = (inputId, index) => {
    setActiveInput(inputId);
    setindex1(index);
  };
  const handleShipmentClick = (inputId, index) => {
    setActiveInput(inputId);
    setindex1(index);
  };

  const handleChangeActive = (index) => {
    const newCartList = [...CardList];
    newCartList[index].shippment = newCartList[index].shippment === 0 ? 1 : 0;
    setcartList(newCartList);
  };

  const handleKeypadClick = (value) => {
    TimeoutUtility.resetTimeout();
    if (activeInput !== null) {
      const newCartList = [...CardList];
      const indexToUpdate = index1;

      if (
        activeInput === "quantity" ||
        activeInput === "discount" ||
        activeInput === "unit_price" ||
        activeInput === "shipment"
      ) {
        const currentValue = String(
          newCartList[indexToUpdate][activeInput] || ""
        );
        if (value === "." && currentValue.includes(".")) {
          return;
        }
        if (value === "." && !currentValue.includes(".")) {
          newCartList[indexToUpdate][activeInput] = currentValue + ".";
          setcartList(newCartList);
          return;
        }
        const newValue = currentValue + String(value);

        if (!isNaN(newValue)) {
          newCartList[indexToUpdate][activeInput] = newValue;
          newCartList[indexToUpdate].total =
            newCartList[indexToUpdate].unit_price *
            newCartList[indexToUpdate].quantity;

          setcartList(newCartList);
        }
      } else if (activeInput === "tax" && index1 === -2) {
        const currentTaxValue = String(tax || "");

        if (value === "." && currentTaxValue.includes(".")) {
          return;
        }

        const newValue = currentTaxValue + String(value || "");
        if (!isNaN(newValue)) {
          settax(newValue);
        }
      } else if (activeInput === "shipment1" && index1 === -3) {
        const currentShipmentValue = String(projectname2 || "");

        if (value === "." && currentShipmentValue.includes(".")) {
          return;
        }

        const newValue = currentShipmentValue + String(value || "");
        if (!isNaN(newValue)) {
          setprojectname2(newValue);
        }
      }
    }
  };

  const handleAddcartClick = () => {
    TimeoutUtility.resetTimeout();
    const isProductInCart = CardList.some(
      (item) => item.product_id === product.values
    );
    if (!isProductInCart && product.values) {
      const resp1 = GetProductByIdSale(p_code);
      resp1
        .then(function (result) {
          const defaultProduct = {
            product_id: result.data[0].product_id,
            name: result.data[0].name,
            code: result.data[0].code,
            unit_price: result.data[0].unit_price,
            cost_price: result.data[0].cost_price,
            quantity: 1,
            discount: result.data[0].discount,
            total: result.data[0].unit_price * 1,
            image: result.data[0].image,
            details: result.data[0].details,
            shipment: 0,
          };

          setcartList((prevProductList) => [
            defaultProduct,
            ...prevProductList,
          ]);
          setProducts("");
          setSelectedProduct("");

          setProductOptions((prevOptions) =>
            prevOptions.filter(
              (option) => option.values !== result.data[0].product_id
            )
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleChangeCustomer = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setSelectedCustomer(selectedOption);
      setActiveInput("customer");
      setacc_from_bal(selectedOption.balance);
      setCustomer(selectedOption);
      setcustomer_ids(selectedOption.value);
      getCustomerDetail(selectedOption.value);
      if (selectedOption.value) {
        setGetProduct([]);
        // getProductsAll();
      } else {
        setGetProduct([]);
      }
      setcartList([]);
      settax(0);
      settotaldiscount(0);
      settotaldiscount(0);
      settotalitem(0);
      setSelectedProduct("");
      setnote("");
      settrackingno("");
      setprojectname("");
      setprojectname1("");
      setprojectname2(0);
      setshipmethod("");
    }
  };

  const handleChangeProduct1 = (selectedOption, event) => {
    if (event.key === "Enter" && selectedOption && selectedOption.values) {
      setSelectedProduct(selectedOption);
      setActiveInput("product");
      setProducts(selectedOption);
      const selectedProduct = selectedOption.values;
      setp_code(selectedProduct);
      handleAddcartClick();
    }
  };

  const handleChangeProduct = (selectedOption) => {
    if (selectedOption && selectedOption.values) {
      var ProductStr1 = ProductStr;
      ProductStr1 = ProductStr1 + selectedOption.values + " ";
      setProductStr(ProductStr1);
      setSelectedProduct(selectedOption);
      setActiveInput("product");
      setProducts(selectedOption);
      const selectedProduct = selectedOption.values;
      setp_code(selectedProduct);
    }
  };

  const handleChangeNote = (e) => {
    setnote(e.target.value);
  };
  const handleChangeProjectName = (e) => {
    setprojectname(e.target.value);
  };
  const handleChangeProjectName1 = (e) => {
    setprojectname1(e.target.value);
  };
  const handleChangeProjectName2 = (e) => {
    setActiveInput("shipment1");
    setprojectname2(e.target.value);
    setindex1(-3);
  };
  const handleChangeTrackingNo = (e) => {
    settrackingno(e.target.value);
  };
  const handleChangeShipMethod = (e) => {
    setshipmethod(e.target.value);
  };

  const getCustomerDetail = async (id) => {
    try {
      const resp = await GetSaleCustomerById(id);
      setCustomerDetail(resp.data || []);
      console.log(resp.data[0].phone);
      setcusPhone(resp.data[0].phone);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getProductsAll = async () => {
    try {
      TimeoutUtility.resetTimeout();
      const resp = await GetProductByStoreID(param.store_id);
      setGetProduct(resp.data || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  const UpdateStatus = async (id) => {
    // imgg.preventDefault();
    const response = await EditSaleOrderStatus(id);
    if (response.status === 200) {
      if (response.data[0][0].result === 1) {
        alert("Sale Order Closed Successfully");
      } else {
        alert("Order Failed to Close.\nAs Order is not completely Shipped");
      }
    } else {
      alert("Failed to Update Sale Order Status");
    }
  };

  const handleSaleOrderClick = async (e) => {
    TimeoutUtility.resetTimeout();
    if (CardList.length === 0) {
      alert("Estimation cart is empty.");
      return;
    }

    const updatedFormData = { ...formData };
    updatedFormData.est_sale = "E";
    updatedFormData.customer_id = customer_ids;
    updatedFormData.total = grandtotal;
    updatedFormData.amount_pending = grandtotal;
    updatedFormData.amount_paid = 0.0;
    updatedFormData.so_note = note;
    updatedFormData.total_price = grandtotal;
    updatedFormData.tax = tax;
    updatedFormData.discount = totaldiscount;
    updatedFormData.project_name = projectname;
    updatedFormData.store_id = param.store_id;
    updatedFormData.shipment = projectname2;

    updatedFormData.sale_products = [];

    CardList.forEach((product, index) => {
      const saleProduct = {
        product_id: product.product_id,
        quantity: product.quantity,
        price: product.unit_price,
        discount: product.discount,
        item_note: "",
      };
      updatedFormData.sale_products.push(saleProduct);
    });

    setFormData(updatedFormData);
    // console.log(updatedFormData);
    const response = await AddEstimationApi(updatedFormData);
    if (response.status === 200) {
      alert("Estimation created successfully.");
    } else {
      alert("Estimation failed to add.");
      return;
    }
    window.location.reload();
  };

  const handleToggle = (value) => {
    setToggle((pre) => !pre);
    // if (!viewOrderProductOpen) {
    //   openViewOrderProduct();
    // }
    setproductID(value.product_id);
  };

  const handleNewClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("Add new");
      const path = `/Estimates/AddEstimation/${param.store_id}`;
      window.open(path, "_blank");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStatusClick = async (event) => {
    event.preventDefault();
    if (CardList.length === 0) {
      alert("Sale order cart is empty.");
      return;
    }
    var f = 0;
    CardList.forEach((element) => {
      if (parseInt(element.quantity) <= parseInt(element.shipment)) {
      } else {
        f = 0;
        alert("Order cannot be Closed.\nQuantity is not completely shipped");
        return;
      }
      f = 1;
    });

    if (f === 1) {
      if (OrderStatus === "MARK AS OPEN") {
        setOrderStatus("MARK AS CLOSE");
        setorderstatuslable("OPEN");
      } else {
        setOrderStatus("MARK AS OPEN");
        setorderstatuslable("CLOSE");
      }
    }
  };

  const handleClearClick = async (event) => {
    TimeoutUtility.resetTimeout();
    if (window.confirm(`Are you sure you want to Clear the order?`)) {
      setcartList([]);
      setshipmethod("");
      settrackingno("");
      setprojectname1("");
      setprojectname2(0);
      setprojectname("");
      settax(0);
      setProductOptions([]);
      setnote("");
      setSelectedProduct("");
      setSelectedCustomer("");
    }
  };

  const handleBackClick = async (event) => {
    TimeoutUtility.resetTimeout();
    if (window.confirm(`Are you sure you want to Cancel?`)) {
      console.log(CardList);
      window.close();
    }
  };
  const handleUnitPriceChange = (index, value) => {
    const newCartList = [...CardList];
    newCartList[index].unit_price = value;
    newCartList[index].total = value * parseFloat(newCartList[index].quantity);
    setcartList(newCartList);
    setActiveInput("unit_price");
    setindex1(index);
  };

  const CalculateAllFields = () => {
    let total_amt = 0,
      total_itm = 0;
    let total_dis = 0;
    let grandTotal = 0.0;
    let taxx = 0,
      dd = 0;

    if (tax) {
      taxx = parseFloat(tax);
    }
    if (projectname2) {
      dd = parseFloat(projectname2);
    }

    for (let i = 0; i < CardList.length; i++) {
      let a = 0,
        b = 0,
        c = 0;
      if (CardList[i].total) {
        a = parseFloat(CardList[i].total);
      }
      if (CardList[i].discount) {
        b = parseFloat(CardList[i].discount);
      }
      if (CardList[i].quantity) {
        c = parseFloat(CardList[i].quantity);
      }
      total_amt = total_amt + a;
      total_dis = total_dis + b;
      total_itm = total_itm + c;

      // grandTotal = ((parseFloat(CardList[i].unit_price) - parseFloat(CardList[i].discount)) * parseFloat(CardList[i].quantity));
    }
    settotaldiscount(total_dis);
    settotalAmount(total_amt);
    settotalitem(total_itm);

    grandTotal = total_amt - total_dis + taxx + dd;

    setgrandtotal(grandTotal);
  };

  const handleQuantityChange = (index, value) => {
    const newCartList = [...CardList];
    newCartList[index].quantity = value;
    newCartList[index].total =
      value * parseFloat(newCartList[index].unit_price);
    setcartList(newCartList);
    setActiveInput("quantity");
    setindex1(index);
  };

  const handleShipmentChange = (index, value) => {
    const newCartList = [...CardList];
    if (value > newCartList[index].quantity) {
      if (
        window.confirm(
          `Ship qty greater than total qty.\nStill want to continue?`
        )
      ) {
        newCartList[index].shipment = value;
        setcartList(newCartList);
        setActiveInput("shipment");
        setindex1(index);
      }
    } else {
      newCartList[index].shipment = value;
      setcartList(newCartList);
      setActiveInput("shipment");
      setindex1(index);
    }
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    // handleStatusClick();
  }, [OrderStatus]);

  const handleDiscountChange = (index, value) => {
    const newCartList = [...CardList];
    newCartList[index].discount = value;
    // newCartList[index].total =
    //   (newCartList[index].quantity * newCartList[index].unit_price) - value;
    setcartList(newCartList);
    setActiveInput("discount");
    setindex1(index);
  };

  const handleChangeTax = (e) => {
    setActiveInput("tax");
    settax(e.target.value);
    setindex1(-2);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const handleDeleteClick = (index) => {
    TimeoutUtility.resetTimeout();
    const item1 = CardList[index].product_id;
    const newCartList = [...CardList];
    newCartList.splice(index, 1);
    setcartList(newCartList);

    const currentIdsArray = ProductStr.split(" ");
    const updatedIdsArray = currentIdsArray.filter(
      (id) => id !== String(item1)
    );
    const updatedProductIds = updatedIdsArray.join(" ");
    setProductStr(updatedProductIds);
  };
  const customFilter = (option, inputValue) => {
    const optionSearchField = String(option.value).toLowerCase();
    const lowerCasedInput = inputValue.toLowerCase();
    return optionSearchField.includes(lowerCasedInput);
  };
  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }
  const handleInputChange = (inputValue) => {
    if (customer_ids) {
      if (inputValue && inputValue.length >= 3) {
        const searchResults = getProductFilterSubString(
          param.store_id,
          inputValue,
          ProductStr
        );
        searchResults
          .then((response) => {
            const productsArray = response.data;
            const filteredProducts = productsArray.filter(
              (product) =>
                !CardList.some((item) => item.product_id === product.product_id)
            );
            const newProductOptions = filteredProducts.map((item) => ({
              values: item.product_id,
              value: `${item.code} ${item.productname} ${
                item.details
              } ${formatCurrency(item.unit_price)}`.toLowerCase(),
              label: (
                <div
                  style={{
                    display: "flex",
                    marginTop: "4px",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 10%",
                    }}
                  >
                    <img
                      className="rounded-xl"
                      src={`data:image/jpeg;base64,${item.image}`}
                      alt={`Product ${item.product_id} Image`}
                      style={{
                        maxWidth: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      flex: "0 0 80%",
                      paddingLeft: "0px",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "18px" }}>{`${
                        item.code
                      } ${truncate(item.productname, 75)}`}</div>
                    </div>
                    <div style={{ fontSize: "14px" }}>{`${truncate(
                      item.details,
                      120
                    )}`}</div>
                  </div>

                  <div
                    style={{
                      flex: "0 0 10%",
                      fontWeight: "500",
                      color: currentColor,
                      textAlign: "right",
                      verticalAlign: "middle",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      fontSize: "16px",
                    }}
                  >{`${formatCurrency(item.unit_price)}`}</div>
                </div>
              ),
            }));
            setProductOptions(newProductOptions);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      } else {
        // setProductOptions(productOptions1);
      }
    }
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    async function fetchData() {
      GetAllCustomersName()
        .then((resp) => {
          setGetCustomer(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    const fetchProductOptions = async () => {
      const fetchedProductOptions = GetProduct.map((item) => ({
        label: `${item.code} ${item.productname}`,
        value: item.product_id,
      }));
      setProductOptions(fetchedProductOptions);
    };
    fetchProductOptions();
  }, [GetProduct, customer_ids]);

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    const fetchCustomerOptions = async () => {
      const fetchedCustomerOption = GetCustomer.map((item) => ({
        label: `${item.name}`,
        value: item.customer_id,
        balance: item.balance,
        account_id: item.account_id,
      }));
      setCustomerOptions(fetchedCustomerOption);
      setcartList([]);
    };
    fetchCustomerOptions();
  }, [GetCustomer]);

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    CalculateAllFields();
  }, [CardList, tax, projectname2]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      maxHeight: "70px",
      height: "70px",
      fontSize: "14px",
    }),
    option: (provided) => ({
      ...provided,
      maxHeight: "70px",
      fontSize: "14px",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "250px",
    }),
  };

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Container fluid className="g-0 p-0 justify-end">
        <Row
          xs={1}
          sm={1}
          className="justify-content-center"
          style={{
            padding: "0",
          }}
        >
          <Col md={12} className="container-col">
            <Header title="CREATE ESTIMATION" />
          </Col>
        </Row>

        <Row
          xs={1}
          sm={1}
          className="justify-content-center"
          style={{
            padding: "0",
          }}
        >
          <Col md={9} className="container-col">
            <div className="card-sale">
              <Row
                xs={1}
                sm={1}
                className="justify-content-center"
                style={{
                  padding: "0",
                }}
              >
                <Col md={12} className="container-col">
                  <label
                    className="label"
                    htmlFor="ProductSelect"
                    style={{ fontSize: "18px" }}
                  >
                    Customer:
                  </label>
                  <div className="sale-input-div">
                    <div className="sale-input">
                      <Select
                        className="myreact-select"
                        id="customer"
                        value={selectedCustomer}
                        onChange={handleChangeCustomer}
                        options={CustomerOptions}
                        isSearchable
                        placeholder="Select Customer"
                        isClearable={true}
                        autoFocus
                      />
                    </div>
                    <div
                      className="sale-bal ml-4"
                      style={{ backgroundColor: currentColor }}
                    >
                      <label>{formatCurrency(acc_from_bal)}</label>
                    </div>
                  </div>
                </Col>
              </Row>
              <br />
              <Row
                xs={1}
                sm={1}
                className="justify-content-center"
                style={{
                  padding: "0",
                }}
              >
                <Col md={12} className="container-col">
                  <label
                    htmlFor="ProductSelect"
                    className="label"
                    style={{ fontSize: "18px" }}
                  >
                    Product:
                  </label>
                  <div className="sale-input-div">
                    <div className="sale-input">
                      <Select
                        className="myreact-select-prod"
                        id="product"
                        menuPlacement="bottom"
                        menuPosition="fixed"
                        value={selectedProduct}
                        onChange={handleChangeProduct}
                        options={productOptions}
                        isSearchable
                        placeholder="Search Product With Name / Code"
                        isClearable
                        styles={customStyles}
                        onKeyDown={(event) =>
                          handleChangeProduct1(selectedProduct, event)
                        }
                        filterOption={customFilter}
                        onInputChange={handleInputChange}
                      />
                    </div>
                    <button
                      className="sale-bal ml-4"
                      type="button"
                      style={{
                        backgroundColor: currentColor,
                        fontWeight: "1000",
                        fontSize: "18px",
                        height: "100%",
                      }}
                      onClick={handleAddcartClick}
                    >
                      +
                    </button>
                  </div>
                </Col>
              </Row>
              <br />
              <br />
              <Row
                xs={1}
                sm={1}
                className="justify-content-center table-container-sale"
              >
                <div className="m-0 p-0">
                  <table className="table table-striped table-bordered">
                    <thead
                      className="thead-dark"
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
                            width: "100px",
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
                            width: "115px",
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
                          QTY
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            width: "100px",
                          }}
                        >
                          DISCOUNT
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            width: "100px",
                          }}
                        >
                          TOTAL
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            width: "50px",
                          }}
                        >
                          DEL
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
                        <tr key={index}>
                          <td
                            style={{ textAlign: "center" }}
                            onClick={() => handleToggle(item)}
                          >
                            {item.code}
                          </td>
                          <td
                            style={{ textAlign: "center" }}
                            onClick={() => handleToggle(item)}
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
                                  {truncate(item.name, 60)}
                                </div>
                                <div>{truncate(item.details, 120)}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ textAlign: "center" }}>
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
                                onClick={() =>
                                  handleInputClick("unit_price", index)
                                }
                                onChange={(e) =>
                                  handleUnitPriceChange(index, e.target.value)
                                }
                              />
                            </div>
                          </td>

                          <td>
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
                                value={item.quantity}
                                onClick={() =>
                                  handleInputClick("quantity", index)
                                }
                                onChange={(e) =>
                                  handleQuantityChange(index, e.target.value)
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="centered-input">
                              <input
                                className="input"
                                id="discount"
                                min="0"
                                type="number"
                                step="0.01"
                                value={item.discount}
                                style={{
                                  textAlign: "center",
                                  fontSize: "12px",
                                }}
                                onClick={() =>
                                  handleInputClick("discount", index)
                                }
                                onChange={(e) =>
                                  handleDiscountChange(index, e.target.value)
                                }
                              />
                            </div>
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {formatCurrency(item.total)}
                          </td>
                          <td>
                            <button
                              style={{
                                textAlign: "center",
                                marginLeft: "0px",
                              }}
                              type="button"
                              onClick={() => handleDeleteClick(index)}
                            >
                              ❌
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Row>
              <Row
                xs={1}
                sm={1}
                className="justify-content-center table-container-sale1"
              >
                <table
                  className="borderless"
                  style={{ width: "100%", height: "100%" }}
                >
                  <tbody>
                    <tr>
                      <td
                        className="table-sum-label"
                        style={{ paddingTop: "8px" }}
                      >
                        SUB TOTAL:
                      </td>
                      <td
                        className="table-sum-cash"
                        style={{
                          color: currentColor,
                          paddingTop: "8px",
                        }}
                      >
                        {formatCurrency(total_amount)}
                      </td>
                      <td
                        rowSpan="5"
                        style={{
                          backgroundColor: currentColor,
                          textAlign: "center",
                          fontWeight: "bold",
                          padding: "52px",
                          maxWidth: "160px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "28px",
                            color: "black",
                          }}
                        >
                          GRAND TOTAL
                          <bar />
                          <div
                            style={{
                              fontSize: "56px",
                              color: "white",
                              wordWrap: "break-word",
                            }}
                          >
                            {formatCurrency(grandtotal)}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="table-sum-label">DISCOUNT:</td>
                      <td
                        className="table-sum-cash"
                        style={{
                          color: currentColor,
                        }}
                      >
                        {formatCurrency(totaldiscount)}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-sum-label">TAX:</td>
                      <td className="table-sum-cash">
                        <label
                          style={{
                            color: currentColor,
                          }}
                        >
                          {"$"}
                        </label>
                        <input
                          id="tax"
                          type="number"
                          step="1"
                          min="0"
                          max="100"
                          className="input table-sum-tb"
                          defaultValue={0.0}
                          value={tax}
                          onClick={() => handleInputClick("tax", -2)}
                          onChange={handleChangeTax}
                          style={{
                            color: currentColor,
                            width: "140px",
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="table-sum-label">SHIPMENT:</td>
                      <td className="table-sum-cash">
                        <label
                          style={{
                            color: currentColor,
                          }}
                        >
                          {"$"}
                        </label>
                        <input
                          defaultValue={0.0}
                          type="number"
                          name="shipment"
                          min="0"
                          step="1.00"
                          value={projectname2}
                          onChange={handleChangeProjectName2}
                          onClick={() => handleInputClick("shipment1", -3)}
                          className="input table-sum-tb"
                          style={{
                            color: currentColor,
                            width: "140px",
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="table-sum-label"
                        style={{ marginBottom: "8px" }}
                      >
                        TOTAL ITEMS:
                      </td>
                      <td
                        className="table-sum-cash"
                        style={{
                          color: currentColor,
                          marginBottom: "8px",
                        }}
                      >
                        {total_item || 0}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Row>
            </div>
          </Col>
          <Col md={3} className="container-col">
            <div class="card-sale">
              <Row
                xs={1}
                sm={1}
                className="justify-content-center"
                style={{
                  padding: "0px",
                }}
              >
                <Col
                  md={6}
                  className="container-col"
                  style={{ paddingRight: "5px", paddingBottom: "10px" }}
                >
                  <Card
                    className="action-btns-card"
                    style={{
                      background: currentColor,
                    }}
                    onClick={handleSaleOrderClick}
                  >
                    <div className="action-btn">SAVE</div>
                  </Card>
                </Col>
                <Col
                  md={6}
                  className="container-col"
                  style={{ paddingLeft: "5px", paddingBottom: "10px" }}
                >
                  <Card
                    className="action-btns-card"
                    style={{
                      background: currentColor,
                    }}
                  >
                    <div className="action-btn">PRINT</div>
                  </Card>
                </Col>
              </Row>
              <Row
                xs={1}
                sm={1}
                className="justify-content-center"
                style={{
                  padding: "0px",
                }}
              >
                <Col
                  md={6}
                  className="container-col"
                  style={{ paddingRight: "5px", paddingBottom: "10px" }}
                >
                  <Card
                    className="action-btns-card"
                    style={{
                      background: currentColor,
                    }}
                    onClick={handleNewClick}
                  >
                    <div className="action-btn">NEW</div>
                  </Card>
                </Col>
                <Col
                  md={6}
                  className="container-col"
                  style={{ paddingLeft: "5px", paddingBottom: "10px" }}
                >
                  <Card
                    className="action-btns-card"
                    style={{
                      background: currentColor,
                    }}
                    onClick={handleClearClick}
                  >
                    <div className="action-btn">CLEAR</div>
                  </Card>
                </Col>
              </Row>
              <Row
                xs={1}
                sm={1}
                className="justify-content-center"
                style={{
                  padding: "0px",
                }}
              >
                <Col
                  md={6}
                  className="container-col"
                  style={{ paddingRight: "5px", paddingBottom: "10px" }}
                >
                  <Card
                    className="action-btns-card"
                    style={{
                      background: currentColor,
                    }}
                    // onClick={handleStatusClick}
                  >
                    {/* <div className="action-btn">{OrderStatus}</div> */}
                  </Card>
                </Col>
                <Col
                  md={6}
                  className="container-col"
                  style={{ paddingLeft: "5px", paddingBottom: "10px" }}
                >
                  <Card
                    className="action-btns-card"
                    style={{
                      background: currentColor,
                    }}
                    onClick={handleBackClick}
                  >
                    <div className="action-btn">CANCEL</div>
                  </Card>
                </Col>
              </Row>
              <Row
                xs={1}
                sm={1}
                className="justify-content-center"
                style={{
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
              >
                <Col
                  md={12}
                  className="container-col"
                  style={{ paddingLeft: "5px", paddingBottom: "6px" }}
                >
                  <label
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Project Name:
                  </label>
                  <input
                    type="text"
                    name="project name"
                    value={projectname}
                    onChange={handleChangeProjectName}
                    placeholder="Project Name"
                    className="input"
                    style={{
                      width: "100%",
                    }}
                  />
                </Col>
                <Col
                  md={12}
                  className="container-col"
                  style={{
                    paddingRight: "5px",
                    paddingLeft: "5px",
                    paddingTop: "4px",
                    paddingBottom: "16px",
                  }}
                >
                  <textarea
                    placeholder="Estimation Note: "
                    id="noteTextarea"
                    value={note}
                    onChange={handleChangeNote}
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "80px",
                    }}
                    className="textarea"
                  />
                </Col>
              </Row>
              <Row
                xs={1}
                sm={1}
                className="justify-content-center"
                style={{ padding: "0px" }}
              >
                {keypadButtons.map((number) => (
                  <Col md={4} className="container-col">
                    <Card
                      className="keypad-button1"
                      style={{
                        border: "1px solid " + currentColor,
                        color: currentColor,
                      }}
                      key={number}
                      onClick={() => handleKeypadClick(number)}
                    >
                      {number}
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          {toggle && (
            <div className="overlay1">
              <Sidebar
                close={() => setToggle(false)}
                product_id={productID}
                store_id={param.store_id}
              />
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};
export default AddEstimation;
