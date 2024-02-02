import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import {
  GetAllCustomersName,
  GetProductNameCodeInv,
  GetProductByIdSale,
  GetSaleCustomerById,
  AddSaleOrderApi,
  GetProductByStoreID,
  EditSaleOrderStatus,
  getProductFilterSubString,
  getAccNamesCash,
} from "../../api/Api";
import { AiOutlineMinusSquare } from "react-icons/ai";

import { ReactTableScroll } from "react-table-scroll";
import { customersData } from "../../data/dummy";
import { Header, Button } from "../../components";
import Select from "react-select";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import default_img from "../../data/default_img.jpg";
import "../../styles/sale.css";
import { Card } from "react-bootstrap";

const AddSaleOrder = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [GetCustomer, setGetCustomer] = useState([]);
  const [Customer, setCustomer] = useState("");
  const [ProductStr, setProductStr] = useState("");
  const [CustomerOptions, setCustomerOptions] = useState([]);
  const [GetProduct, setGetProduct] = useState([]);
  const [GetProduct2, setGetProduct2] = useState([]);
  const [CardProductID, setGetProduct1] = useState([]);
  const [product, setProducts] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [productOptions1, setProductOptions1] = useState([]);
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
  const [trackingno, settrackingno] = useState("");
  const [projectname, setprojectname] = useState("");
  const [projectname1, setprojectname1] = useState("");
  const [projectname2, setprojectname2] = useState(0);
  const [shipmethod, setshipmethod] = useState("");
  const [OrderStatus, setOrderStatus] = useState("MARK AS CLOSE");
  const [orderstatuslable, setorderstatuslable] = useState("OPEN");
  const [ValError, setValError] = useState([]);
  const [acc_to, setacc_to] = useState("");
  const [getacc_tos, setGetacc_tos] = useState([]);
  const [amount_paid, setamount_paid] = useState(0);
  const [acc_to_id, setacc_to_id] = useState("");
  const [acc_to_bal, setacc_to_bal] = useState("");
  const [acc_from_id, setacc_from_id] = useState("");
  const [acc_from_bal, setacc_from_bal] = useState("");

  let param = useParams();

  const [formData, setFormData] = useState({
    est_sale: "S",
    customer_id: 5,
    customer_po_no: "PO12345",
    project_name: "Project XYZ",
    ship_method: "Express Shipping",
    tracking_no: "TRK123456",
    total: 500.0,
    amount_paid: 300.0,
    amount_pending: 200.0,
    user_id: 102,
    so_note: "Sale order note",
    total_price: 450.0,
    discount: 50.0,
    tax: 25.0,
    status_id: 80,
    shipment: 10.0,
    store_id: 1,
    t_type_id: 700,
    sale_products: [],
    shipments: [],
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
    if (activeInput !== null) {
      const newCartList = [...CardList];
      const indexToUpdate = index1;

      if (
        activeInput === "quantity" ||
        activeInput === "unit_price" ||
        activeInput === "discount" ||
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
      } else if (activeInput === "amount_paid" && index1 === -4) {
        const currentShipmentValue = String(amount_paid || "");

        if (value === "." && currentShipmentValue.includes(".")) {
          return;
        }

        const newValue = currentShipmentValue + String(value || "");
        if (!isNaN(newValue)) {
          setamount_paid(newValue);
        }
      }
    }
  };

  const handleAddcartClick = () => {
    const isProductInCart = CardList.some(
      (item) => item.product_id === product.value
    );
    if (!isProductInCart && product.value) {
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
            shipment: 0,
            image: result.data[0].image,
            details: result.data[0].details,
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

          // const getProductDetail = GetProduct.find(
          //   (item) => item.product_id === result.data[0].product_id
          // );

          // setGetProduct1((prevGetProduct1) => [
          //   ...prevGetProduct1,
          //   {
          //     unit_instock: getProductDetail.unit_instock,
          //     opening_balance: getProductDetail.opening_balance,
          //     product_id: getProductDetail.product_id,
          //     productname: getProductDetail.productname,
          //     code: getProductDetail.code,
          //     unit_price: getProductDetail.unit_price,
          //     image: getProductDetail.image,
          //     unit: getProductDetail.unit,
          //     details: getProductDetail.details,
          //   },
          // ]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleChangeCustomer = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setSelectedCustomer(selectedOption);
      setacc_from_id(selectedOption.account_id);
      setacc_from_bal(selectedOption.balance);
      console.log(selectedOption.account_id);
      console.log(selectedOption.balance);
      setActiveInput("customer");
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
      setProductStr("");
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
    console.log("jej");
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
  const handleAccToChange = (e) => {
    setacc_to(e.target.value);
    const acc = getacc_tos.find((item) => item.name === e.target.value);
    console.log(acc.account_id);
    setacc_to_bal(acc.end_balance);
    setacc_to_id(acc.account_id);
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
  const handleChangeAmountPaid = (e) => {
    setActiveInput("amount_paid");
    setamount_paid(e.target.value);
    setindex1(-4);
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
      const resp = await GetProductByStoreID(param.store_id);
      setGetProduct(resp.data || []);
      console.log(resp.data);
    } catch (err) {
      console.log(err.message);
    }
  };

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
                    flexWrap: "wrap",
                    marginTop: "10px",
                  }}
                >
                  <div>
                    <img
                      className="rounded-xl"
                      src={`data:image/jpeg;base64,${item.image}`}
                      alt={`Product ${item.product_id} Image`}
                      style={{
                        maxWidth: "60px",
                        maxHeight: "60px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      flex: "0 0 80%",
                      paddingLeft: "60px",
                    }}
                  >
                    <div>
                      <div
                        style={{ fontWeight: "bold" }}
                      >{`${item.code} ${item.productname}`}</div>
                    </div>
                    <div>{`${item.details}`}</div>
                  </div>

                  <div
                    style={{ paddingLeft: "90px", marginTop: "15px" }}
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
        setProductOptions(productOptions1);
      }
    }
  };

  const UpdateStatus = async (id) => {
    // imgg.preventDefault();
    const response = await EditSaleOrderStatus(id);
    if (response.status === 200) {
      if (response.data[0][0].result === 1) {
        alert("Sale order closed successfully.");
      } else if (orderstatuslable === "CLOSE") {
      } else {
        alert("Order failed to close.\nAs order is not completely shipped.");
      }
    } else {
      alert("Failed to update sale order status.");
    }
  };

  const handleSaleOrderClick = async (e) => {
    if (CardList.length === 0) {
      alert("Sale order cart is empty.");
      return;
    }

    const updatedFormData = { ...formData };
    updatedFormData.est_sale = "S";
    updatedFormData.customer_id = customer_ids;
    updatedFormData.customer_po_no = projectname1;
    updatedFormData.total = grandtotal;
    updatedFormData.amount_pending = grandtotal - amount_paid;
    updatedFormData.amount_paid = amount_paid;
    updatedFormData.so_note = note;
    updatedFormData.total_price = grandtotal;
    updatedFormData.tax = tax;
    updatedFormData.discount = totaldiscount;
    updatedFormData.tracking_no = trackingno;
    updatedFormData.project_name = projectname;
    updatedFormData.ship_method = shipmethod;
    updatedFormData.store_id = param.store_id;
    updatedFormData.shipment = projectname2;
    updatedFormData.acc_from_id = acc_from_id;
    updatedFormData.acc_to_id = acc_to_id;
    updatedFormData.acc_from_bal = acc_from_bal;
    updatedFormData.acc_to_bal = acc_to_bal;

    updatedFormData.sale_products = [];
    updatedFormData.shipments = [];

    CardList.forEach((product, index) => {
      if (product.shipment > 0) {
        const shipment = {
          product_id: product.product_id,
          s_quantity: product.quantity,
          quantity_shipped: product.shipment,
          shipped_note: "",
        };
        updatedFormData.shipments.push(shipment);
      }
      const saleProduct = {
        product_id: product.product_id,
        quantity: product.quantity,
        cost_price: product.cost_price,
        price: product.unit_price,
        discount: product.discount,
        item_note: "",
      };
      updatedFormData.sale_products.push(saleProduct);
    });

    setFormData(updatedFormData);
    // console.log(updatedFormData);
    const response = await AddSaleOrderApi(updatedFormData);
    if (response.status === 200) {
      if (OrderStatus === "MARK AS OPEN") {
        console.log(response.data[0][0].so_id);
        if (response.data[0][0].so_id) {
          console.log(response.data[0][0].so_id);
          UpdateStatus(response.data[0][0].so_id);
        }
      } else {
        // return;
      }
      alert("Sale order added successfully.");
    } else {
      alert("Sale order failed to add.");
      return;
    }
    window.location.reload();
  };

  const handleNewClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      const baseUrl = "http://localhost:3000";
      const path = `/sales/addSaleOrder/${param.store_id}`;
      const url = `${baseUrl}${path}`;
      window.open(url, "_blank");
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
    if (orderstatuslable === "CLOSE") {
      if (window.confirm(`Order is already closed.\nStill want to continue?`)) {
        setOrderStatus("MARK AS CLOSE");
        setorderstatuslable("OPEN");
        return;
      } else {
        // return;
      }
    } else {
      if (orderstatuslable === "OPEN") {
        let f = 0;
        CardList.forEach((element) => {
          if (!(parseInt(element.quantity) <= parseInt(element.shipment))) {
            f = 1;
          } else {
            setOrderStatus("MARK AS OPEN");
            setorderstatuslable("CLOSE");
            return;
          }
        });
        if (f === 1) {
          if (
            window.confirm(
              `Quantity is not completely shipped.\nStill want to continue?`
            )
          ) {
            setOrderStatus("MARK AS OPEN");
            setorderstatuslable("CLOSE");
            return;
          }
        }
      }
    }
  };

  const handleClearClick = async (event) => {
    if (window.confirm(`Are you sure you want to Clear the sale order?`)) {
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
    if (window.confirm(`Are you sure you want to Cancel?`)) {
      console.log(CardList);
      window.close();
    }
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

  const handleUnitPriceChange = (index, value) => {
    const newCartList = [...CardList];
    newCartList[index].unit_price = value;
    newCartList[index].total = value * parseFloat(newCartList[index].quantity);
    setcartList(newCartList);
    setActiveInput("unit_price");
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
    } else if (
      value < newCartList[index].quantity &&
      orderstatuslable === "CLOSE"
    ) {
      if (
        window.confirm(`Order is already shipped.\nStill want to continue?`)
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

  useEffect(() => {
    async function fetchData() {
      try {
        setacc_to(getacc_tos[0]);
        var bal = getacc_tos[0];
        setacc_to_id(bal.account_id);
        setacc_to_bal(bal.end_balance);
        console.log(bal.end_balance);
      } catch (err) {}
    }
    fetchData();
  }, [getacc_tos]);

  useEffect(() => {
    async function fetchData() {
      getAccNamesCash()
        .then((resp) => {
          setGetacc_tos(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

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
    const fetchProductOptions = async () => {
      const fetchedProductOptions = GetProduct.map((item) => ({
        values: item.product_id,
        value: `${item.code} ${item.productname} ${
          item.details
        } ${formatCurrency(item.unit_price)}`.toLowerCase(),
        label: (
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
            <div>
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={`Product ${item.product_id} Image`}
                style={{
                  maxWidth: "60px",
                  maxHeight: "60px",
                  objectFit: "contain",
                }}
              />
            </div>

            <div
              style={{
                flex: "0 0 80%",
                paddingLeft: "60px",
              }}
            >
              <div>
                <div
                  style={{ fontWeight: "bold" }}
                >{`${item.code} ${item.productname}`}</div>
              </div>
              <div>{`${item.details}`}</div>
            </div>

            <div
              style={{ paddingLeft: "90px", marginTop: "15px" }}
            >{`${formatCurrency(item.unit_price)}`}</div>
          </div>
        ),
      }));
      setProductOptions(fetchedProductOptions);
    };
    fetchProductOptions();
  }, [GetProduct, customer_ids]);

  const customFilter = (option, inputValue) => {
    const optionSearchField = String(option.value).toLowerCase();
    const lowerCasedInput = inputValue.toLowerCase();
    return optionSearchField.includes(lowerCasedInput);
  };

  useEffect(() => {
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
    CalculateAllFields();
  }, [CardList, tax, projectname2]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      maxHeight: "80px",
      // fontWeight:"bold",
      fontSize: "16px",
      // zIndex: "2",
    }),
    option: (provided) => ({
      ...provided,
      maxHeight: "80px",
      //fontWeight:"bold",
      fontSize: "16px",
      // zIndex: "2",
    }),
  };

  return (
    <div className="user-body" style={{ paddingTop: "2px" }}>
      <div class="article-sale2">
        <div class="article-container-sale">
          <label
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              paddingLeft: "120px",
            }}
          >
            CREATE SALE ORDER
          </label>
          {/* <Header  title="CREATE SALE ORDER" /> */}
          {/* <div style={{paddingLeft:"1630px",}}> */}
          <div style={{ paddingLeft: "1750px" }}>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                backgroundColor: "#03C9D7",
                color: "black",
              }}
            >
              {" "}
              ORDER STATUS: {orderstatuslable}
            </label>
          </div>

          {/* </div> */}
        </div>
      </div>

      <div className="container_sale">
        <div class="article-container-sale">
          <div className="flex justify-center">
            <div class="article-sale0">
              <div className="card-sale">
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                      font: "100px",
                      fontSize: "20px",
                    }}
                    htmlFor="ProductSelect"
                  >
                    Customer:{" "}
                  </label>
                  <div class="article-container-select">
                    <Select
                      className="css-13cymwt-control02"
                      id="customer"
                      value={selectedCustomer}
                      onChange={handleChangeCustomer}
                      options={CustomerOptions}
                      isSearchable
                      placeholder="Select Customer"
                      isClearable={true}
                      autoFocus
                    />
                    {/* <label
                      className="label"
                      style={{
                        border: "3px solid #03C9D7",
                        width: "13%",
                        fontWeight: "bold",
                        // fontSize: "18px",
                        // font: "100px",
                      }}
                    > */}
                    <label
                      style={{
                        padding: "8px",
                        marginLeft: "8px",
                        fontWeight: "bold",
                        width: "13%",
                        fontSize: "18px",
                        border: "2px solid #03C9D7",
                      }}
                    >
                      Bal: {formatCurrency(acc_from_bal)}
                    </label>
                    {/* </label> */}
                  </div>

                  <br />
                  <label
                    htmlFor="ProductSelect"
                    style={{
                      fontWeight: "bold",
                      font: "100px",
                      fontSize: "18px",
                      marginTop: "6px",
                    }}
                  >
                    Product:{" "}
                  </label>
                  <div class="article-container-select">
                    <Select
                      className="css-13cymwt-control2"
                      id="product"
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

                    <button
                      // className="article-container1"
                      style={{
                        padding: "10px",
                        backgroundColor: "#03C9D7",
                        color: "#fff",
                        borderRadius: "11px",
                        marginLeft: "10px",
                        height: "42px",
                      }}
                      type="button"
                      onClick={handleAddcartClick}
                    >
                      ➕
                    </button>
                  </div>
                </div>

                <br />
                <div>
                  <div className="table-container-sale">
                    {/* <Card > */}
                    <table className="table table-striped table-bordered">
                      <thead
                        className="thead-dark"
                        style={{
                          color: "#03C9D7",
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
                            backgroundColor: "#03c9d7",
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
                            UNIT PRICE
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              width: "120px",
                            }}
                          >
                            QTY
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              width: "120px",
                            }}
                          >
                            DISCOUNT
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              width: "120px",
                            }}
                          >
                            TOTAL
                          </th>

                          <th
                            style={{
                              textAlign: "center",
                              width: "130px",
                            }}
                          >
                            SHIP QTY
                          </th>

                          <th
                            style={{
                              textAlign: "center",
                              width: "60px",
                            }}
                          >
                            DEL
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
                          <tr key={index} style={{}}>
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
                                // backgroundColor: "#afeeee",
                                // fontWeight:"bold"
                              }}
                            >
                              {formatCurrency(item.total)}
                            </td>
                            <td>
                              <div className="centered-input">
                                <input
                                  className="input"
                                  id="shipment"
                                  type="number"
                                  min="0"
                                  step="1.00"
                                  style={{
                                    textAlign: "center",
                                  }}
                                  value={item.shipment}
                                  onClick={() =>
                                    handleShipmentClick("shipment", index)
                                  }
                                  onChange={(e) =>
                                    handleShipmentChange(index, e.target.value)
                                  }
                                />
                              </div>
                            </td>
                            <td>
                              <button
                                style={{
                                  textAlign: "left",
                                  marginLeft: "14px",
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
                    {/* </Card> */}
                  </div>

                  <div className="table-container-sale1">
                    {/* <Card > */}
                    <table
                      className="table table-bordered"
                      style={{ width: "100%", border: "0px" }}
                    >
                      <tbody style={{ width: "10px" }}>
                        <tr
                          style={{
                            width: "20px",
                          }}
                        >
                          <td
                            style={{
                              width: "140px",
                              textAlign: "right",
                              fontWeight: "bold",
                            }}
                          >
                            SUB TOTAL:
                          </td>
                          <td
                            // colSpan="2"
                            style={{
                              fontSize: "20px",
                              color: "#03C9D7",
                              textAlign: "left",
                              fontWeight: "Bold",
                              paddingLeft: "10px",
                            }}
                          >
                            {formatCurrency(total_amount)}
                          </td>
                          <td
                            rowSpan="7"
                            style={{
                              backgroundColor: "#03C9D7",
                              textAlign: "center",
                              fontWeight: "bold",
                              // width: "60px !important",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "34px",
                                color: "black",
                                width: "60px !important",
                              }}
                            >
                              GRAND TOTAL:
                              <bar />
                              <div
                                style={{
                                  fontSize: "64px",
                                  color: "white",
                                  wordWrap: "break-word",
                                  paddingLeft: "10px",
                                  // width: "60px !important",
                                }}
                              >
                                {formatCurrency(grandtotal)}
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr
                          style={{
                            width: "20px",
                          }}
                        >
                          <td
                            style={{ textAlign: "right", fontWeight: "bold" }}
                          >
                            DISCOUNT:
                          </td>
                          <td
                            style={{
                              fontSize: "20px",
                              color: "#03C9D7",
                              textAlign: "left",
                              fontWeight: "Bold",
                              paddingLeft: "10px",
                              fontSize: "20px",
                            }}
                          >
                            {formatCurrency(totaldiscount)}
                          </td>
                        </tr>

                        <tr
                          style={{
                            width: "100px",
                          }}
                        >
                          <td
                            style={{
                              fontWeight: "bold",
                              textAlign: "right",
                            }}
                          >
                            TAX:
                          </td>
                          <td>
                            <label
                              style={{
                                fontWeight: "bold",
                                color: "#03C9D7",
                                fontSize: "20px",
                                paddingLeft: "7px",
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
                              className="input"
                              defaultValue={0.0}
                              value={tax}
                              onClick={() => handleInputClick("tax", -2)}
                              onChange={handleChangeTax}
                              style={{
                                textAlign: "left",
                                width: "100px",
                                height: "27px",
                                fontSize: "20px",
                                color: "#03C9D7",
                                fontWeight: "Bold",
                              }}
                            />
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{ fontWeight: "bold", textAlign: "right" }}
                          >
                            SHIPMENT:
                          </td>

                          <td style={{ fontWeight: "bold", color: "#03C9D7" }}>
                            <label
                              style={{
                                fontWeight: "bold",
                                fontSize: "20px",
                                color: "#03C9D7",
                                paddingLeft: "7px",
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
                              className="input"
                              style={{
                                textAlign: "left",
                                width: "100px",
                                height: "27px",
                                fontSize: "20px",
                                color: "#03C9D7",
                                fontWeight: "Bold",
                              }}
                            />
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{ fontWeight: "bold", textAlign: "right" }}
                          >
                            AMOUNT PAID:
                          </td>

                          <td style={{ fontWeight: "bold", color: "#03C9D7" }}>
                            <label
                              style={{
                                fontWeight: "bold",
                                color: "#03C9D7",
                                paddingLeft: "7px",
                                fontSize: "20px",
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
                              value={amount_paid}
                              onChange={handleChangeAmountPaid}
                              onClick={() =>
                                handleInputClick("amount_paid", -4)
                              }
                              className="input"
                              style={{
                                textAlign: "left",
                                width: "100px",
                                height: "27px",
                                fontSize: "20px",
                                color: "#03C9D7",
                                fontWeight: "Bold",
                              }}
                            />
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{ fontWeight: "bold", textAlign: "right" }}
                          >
                            RECEIVED IN:
                          </td>

                          <td style={{ fontWeight: "bold", color: "#03C9D7" }}>
                            <label
                              style={{
                                fontWeight: "bold",
                                color: "#03C9D7",
                                paddingLeft: "18px",
                              }}
                            >
                              {` `}
                            </label>
                            <select
                              style={{
                                textAlign: "left",
                                width: "180px",
                                height: "30px",
                                fontSize: "20px",
                                color: "#03C9D7",
                                // fontWeight: "Bold",
                                borderWidth: "2px",
                                borderStyle: "solid",
                              }}
                              value={acc_to}
                              onChange={handleAccToChange}
                              // style={{
                              // borderWidth: "2px",
                              // borderStyle: "solid",
                              // padding: "8px",
                              // marginTop: "10px",
                              // width: "170px",
                              // }}
                            >
                              {/* <option value="select"> select </option> */}

                              {getacc_tos.map((item) => (
                                <option key={item.account_id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{ fontWeight: "bold", textAlign: "right" }}
                          >
                            TOTAL ITEMS:
                          </td>
                          <td
                            style={{
                              fontSize: "20px",
                              color: "#03C9D7",
                              textAlign: "left",
                              fontWeight: "Bold",
                              paddingLeft: "20px",
                            }}
                          >
                            {total_item || 0}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* </Card> */}
                  </div>
                </div>
              </div>
            </div>

            <div
              class="article-sale1"
              style={{
                justifyContent: "center",
              }}
            >
              <div class="card-sale3">
                <div class="article-container-sale1">
                  <Card
                    className="keypad-button2"
                    style={{
                      width: "180px",
                      height: "100px",
                      background: "#03C9D7",
                      marginTop: "6px",
                    }}
                    onClick={handleSaleOrderClick}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        marginTop: "7%",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      SAVE
                    </div>
                  </Card>
                  <Card
                    className="keypad-button2"
                    style={{
                      width: "180px",
                      height: "100px",
                      background: "#03C9D7",
                      marginTop: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        marginTop: "7%",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      PRINT
                    </div>
                  </Card>
                </div>
                <div class="article-container-sale1">
                  <Card
                    className="keypad-button"
                    style={{
                      width: "180px",
                      height: "100px",
                      background: "#03C9D7",
                    }}
                    onClick={handleNewClick}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        marginTop: "7%",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      NEW
                    </div>
                  </Card>
                  <Card
                    className="keypad-button"
                    style={{
                      width: "180px",
                      height: "100px",
                      background: "#03C9D7",
                    }}
                    onClick={handleClearClick}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        marginTop: "7%",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      CLEAR
                    </div>
                  </Card>
                </div>

                <div class="article-container-sale1">
                  <Card
                    className="keypad-button"
                    style={{
                      width: "180px",
                      height: "100px",
                      background: "#03C9D7",
                    }}
                    onClick={handleStatusClick}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        marginTop: "2%",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      {OrderStatus}
                    </div>
                  </Card>
                  <Card
                    className="keypad-button"
                    style={{
                      width: "180px",
                      height: "100px",
                      background: "#03C9D7",
                    }}
                    onClick={handleBackClick}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        marginTop: "7%",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      CANCEL
                    </div>
                  </Card>
                </div>
                <div>
                  <div class="article-sale1">
                    <div class="article-container-sale1">
                      <tbody>
                        <tr>
                          <td>
                            <label
                              style={{
                                fontWeight: "Bold",
                              }}
                            >
                              Ship Method:{" "}
                            </label>
                          </td>

                          <td>
                            <label
                              style={{
                                fontWeight: "Bold",
                              }}
                            >
                              Tracking No:{" "}
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="text"
                              name="shipmethod"
                              placeholder="Ship-Method"
                              value={shipmethod}
                              onChange={handleChangeShipMethod}
                              className="input"
                              style={{
                                width: "180px",
                              }}
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              name="tracking_no"
                              value={trackingno}
                              onChange={handleChangeTrackingNo}
                              placeholder="Tracking No."
                              className="input"
                              style={{
                                width: "180px",
                              }}
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <label
                              style={{
                                fontWeight: "Bold",
                              }}
                            >
                              Project Name:
                            </label>
                          </td>

                          <td>
                            <label
                              style={{
                                fontWeight: "Bold",
                              }}
                            >
                              Customer PO:{" "}
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="text"
                              name="project name"
                              value={projectname}
                              onChange={handleChangeProjectName}
                              placeholder="Project Name"
                              className="input"
                              style={{
                                width: "180px",
                              }}
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              name="Customer_po"
                              value={projectname1}
                              onChange={handleChangeProjectName1}
                              placeholder="Customer PO"
                              className="input"
                              style={{
                                width: "180px",
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </div>
                  </div>

                  <div className="article-container-sale1">
                    <div>
                      <textarea
                        placeholder="Sale Order Note: "
                        id="noteTextarea"
                        value={note}
                        onChange={handleChangeNote}
                        rows="4"
                        style={{
                          display: "flex",
                          width: "360px",
                          height: "130px",
                          marginBottom: "12px",
                          marginTop: "10px",
                        }}
                        className="textarea"
                      />
                    </div>
                  </div>
                </div>
                <div className="article-container-sale1">
                  <div className="keypad-grid1">
                    {keypadButtons.map((number) => (
                      <Card
                        style={{
                          fontWeight: "Bold",
                          border: "2px solid #03C9D7",
                          margin: "2px",
                        }}
                        className="keypad-button1"
                        key={number}
                        onClick={() => handleKeypadClick(number)}
                      >
                        {number}
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Button
            margin="10px"
            padding="20px"
            color="white"
            className="custom-button ml-2"
            bgColor={currentColor}
            text="Complete"
            borderRadius="10px"
            onClick={handleSaleOrderClick}
          />
          <Button
            margin="10px"
            padding="20px"
            color="white"
            className="custom-button ml-2"
            bgColor={currentColor}
            text="Close Tab"
            borderRadius="10px"
            onClick={handleBackClick}
          /> */}
        </div>
      </div>
    </div>
  );
};
export default AddSaleOrder;
