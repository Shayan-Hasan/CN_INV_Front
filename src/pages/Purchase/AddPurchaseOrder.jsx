import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import {
  GetAllVendorsName,
  GetProductsByStoreVendorId,
  GetProductByIdSale,
  GetSaleCustomerById,
  AddPurchaseOrderApi,
  GetProductByStoreID,
  EditPurchaseStatusBYPo_id,
  getProductFilterSubString,
  getAccNamesCash,
  GetSpecialOrderProdDetail,
} from "../../api/Api";
import Select from "react-select";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import default_img from "../../data/default_img.jpg";
import "../../styles/sale.css";
import { Card } from "react-bootstrap";
import Sidebar from "../../components/ViewOrderProduct";
import "../../styles/viewCustomer.css";
import { Col, Container, Row } from "react-bootstrap";
import { Header } from "../../components";

const AddPurchaseOrder = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [GetSupplier, setGetSupplier] = useState([]);
  const [Supplier, setSupplier] = useState("");
  const [SupplierOptions, setSupplierOptions] = useState([]);
  const [GetProduct, setGetProduct] = useState([]);
  const [product, setProducts] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [p_code, setp_code] = useState("");
  const [Supplier_ids, setSupplier_ids] = useState("");
  const [CardList, setcartList] = useState([]);
  const [total_amount, settotalAmount] = useState(0);
  const [tax, settax] = useState(0);
  const [totaldiscount, settotaldiscount] = useState(0.0);
  const [total_item, settotalitem] = useState(0);
  const [index1, setindex1] = useState("");
  const [grandtotal, setgrandtotal] = useState(0);
  const [note, setnote] = useState("");
  const [SupplierDetail, setSupplierDetail] = useState([]);
  const [cusPhone, setcusPhone] = useState("");
  const [trackingno, settrackingno] = useState("");
  const [projectname, setprojectname] = useState("");
  const [OrderStatus, setOrderStatus] = useState("MARK AS CLOSE");
  const [orderstatuslable, setorderstatuslable] = useState("OPEN");
  const [shipmethod, setshipmethod] = useState("");
  const [ValError, setValError] = useState([]);
  const [Invoice_No, setInvoice_No] = useState("");
  const [acc_to, setacc_to] = useState("");
  const [getacc_tos, setGetacc_tos] = useState([]);
  const [amount_paid, setamount_paid] = useState(0);
  const [acc_to_id, setacc_to_id] = useState("");
  const [acc_to_bal, setacc_to_bal] = useState("");
  const [acc_from_id, setacc_from_id] = useState("");
  const [acc_from_bal, setacc_from_bal] = useState("");
  const [ProductStr, setProductStr] = useState("");
  const [Svendor_id, setSvendor_id] = useState("");
  const [Sstore_id, setSstore_id] = useState("");
  const [productID, setproductID] = useState("");
  const [toggle, setToggle] = useState(false);

  let param = useParams();

  const [formData, setFormData] = useState({
    vendor_id: "",
    vendor_invoice_no: "",
    user_id: 0,
    store_id: 0,
    ship_method: "",
    tracking_no: "",
    total: 0,
    amount_paid: 0,
    amount_pending: 0,
    status_id: 0,
    po_note: "",
    t_type_id: 0,
    purchase_products: [],
    receive_logs: [],
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
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handlereceiveChange = (index, value) => {
    const newCartList = [...CardList];
    if (value > newCartList[index].quantity) {
      if (
        window.confirm(
          `Receive qty greater than total qty.\nStill want to continue?`
        )
      ) {
        newCartList[index].receive = value;
        setcartList(newCartList);
        setActiveInput("receive");
        setindex1(index);
      }
    } else if (
      value < newCartList[index].quantity &&
      orderstatuslable === "CLOSE"
    ) {
      if (window.confirm(`Order is already Closed.\nStill want to continue?`)) {
        newCartList[index].receive = value;
        setcartList(newCartList);
        setActiveInput("receive");
        setindex1(index);
      }
    } else {
      newCartList[index].receive = value;
      setcartList(newCartList);
      setActiveInput("receive");
      setindex1(index);
    }
  };

  const handlereceiveClick = (inputId, index) => {
    setActiveInput(inputId);
    setindex1(index);
  };

  const handleInputClick = (inputId, index) => {
    setActiveInput(inputId);
    setindex1(index);
  };

  const handleChangeActive = (index) => {
    const newCartList = [...CardList];
    newCartList[index].receive = newCartList[index].receive === 0 ? 1 : 0;
    setcartList(newCartList);
  };

  const handleKeypadClick = (value) => {
    if (activeInput !== null) {
      const newCartList = [...CardList];
      const indexToUpdate = index1;

      if (
        activeInput === "quantity" ||
        activeInput === "discount" ||
        activeInput === "unit_price" ||
        activeInput === "receive"
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
      (item) => item.product_id === product.values
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
            receive: 0,
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
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleChangeSupplier = (selectedOption) => {
    console.log(selectedOption.account_id);

    if (selectedOption && selectedOption.value) {
      setSelectedSupplier(selectedOption);
      setacc_from_id(selectedOption.account_id);
      setacc_from_bal(selectedOption.balance);
      console.log(selectedOption.account_id);
      console.log(selectedOption.balance);
      console.log(selectedOption);
      setActiveInput("Supplier");
      setSupplier(selectedOption);
      setSupplier_ids(selectedOption.value);
      getSupplierDetail(selectedOption.value);
      if (selectedOption.value) {
        setGetProduct([]);
        // getProductsAll(selectedOption.value);
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
    if (selectedOption && selectedOption.value) {
      setSelectedProduct(selectedOption);
      var ProductStr1 = ProductStr;
      ProductStr1 = ProductStr1 + selectedOption.values + " ";
      setProductStr(ProductStr1);
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
  const handleChangeTrackingNo = (e) => {
    settrackingno(e.target.value);
  };
  const handleChangeShipMethod = (e) => {
    setshipmethod(e.target.value);
  };
  const handleChangeInvNo = (e) => {
    setInvoice_No(e.target.value);
  };

  const getSupplierDetail = async (id) => {
    // try {
    //   const resp = await GetcustomeById(id);
    //   setSupplierDetail(resp.data || []);
    //   console.log(resp.data[0].phone);
    //   setcusPhone(resp.data[0].phone);
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  const getProductsAll = async (v) => {
    try {
      const resp = await GetProductsByStoreVendorId(param.store_id, v);
      setGetProduct(resp.data || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAccToChange = (e) => {
    setacc_to(e.target.value);
    const acc = getacc_tos.find((item) => item.name === e.target.value);
    console.log(acc.account_id);
    setacc_to_bal(acc.end_balance);
    setacc_to_id(acc.account_id);
  };
  const handleChangeAmountPaid = (e) => {
    setActiveInput("amount_paid");
    setamount_paid(e.target.value);
    setindex1(-4);
  };
  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }
  const handleInputChange = (inputValue) => {
    if (Supplier_ids) {
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

  const UpdateStatus = async (id) => {
    // imgg.preventDefault();
    const response = await EditPurchaseStatusBYPo_id(id, 72);
    if (response.status === 200) {
      // if (response.data[0][0].result === 1) {
      alert("Purchase order status closed successfully.");
      //   }
      // if (orderstatuslable === "CLOSE") {
      //   }
      //   else {
      //     alert("Order Failed to Close.\nAs Order is not completely Shipped");
      //   }
    } else {
      alert("Failed to update purchase order status.");
      return;
    }
  };

  const handleSaleOrderClick = async (e) => {
    if (CardList.length === 0) {
      alert("Purchase order cart is empty.");
      return;
    }

    const updatedFormData = { ...formData };
    updatedFormData.vendor_id = Supplier_ids;
    updatedFormData.vendor_invoice_no = Invoice_No;
    updatedFormData.user_id = 102;
    updatedFormData.store_id = param.store_id;
    updatedFormData.ship_method = shipmethod;
    updatedFormData.tracking_no = trackingno;
    updatedFormData.total = grandtotal;
    updatedFormData.amount_paid = amount_paid;
    updatedFormData.amount_pending = grandtotal - amount_paid;
    updatedFormData.status_id = 73;
    updatedFormData.po_note = note;
    updatedFormData.t_type_id = 705;
    updatedFormData.acc_from_id = acc_from_id;
    updatedFormData.acc_to_id = acc_to_id;
    updatedFormData.acc_from_bal = acc_from_bal;
    updatedFormData.acc_to_bal = acc_to_bal;

    updatedFormData.purchase_products = [];
    updatedFormData.receive_logs = [];

    CardList.forEach((product, index) => {
      if (product.receive > 0) {
        let a = 73;
        if (parseFloat(product.receive) >= parseFloat(product.quantity)) {
          a = 72;
        }
        const receive = {
          recv_status_id: a,
          quantity: product.quantity,
          product_id: product.product_id,
          recv_by: projectname,
          quantity_recv: product.receive,
          quantity_reject: 0,
          // mfg_date: '',
          recv_note: "",
        };
        updatedFormData.receive_logs.push(receive);
      }
      const purchaseProduct = {
        product_id: product.product_id,
        quantity: product.quantity,
        cost_price: product.cost_price,
        unit_price: product.unit_price,
        discount: product.discount,
        // exp_rec_date : '',
        item_note: "",
      };
      updatedFormData.purchase_products.push(purchaseProduct);
    });

    setFormData(updatedFormData);
    // console.log(updatedFormData);
    const response = await AddPurchaseOrderApi(updatedFormData);
    if (response.status === 200) {
      if (OrderStatus === "MARK AS OPEN") {
        console.log(response.data[2][0].po_id);

        if (response.data[2][0].po_id) {
          console.log(response.data[2][0].po_id);
          console.log("ss");
          UpdateStatus(response.data[2][0].po_id);
        }
      } else {
        // return;
      }
      alert("Purchase order Added successfully");
      // window.location.reload();
    } else {
      alert("Purchase order failed to add");
      return;
    }
  };

  const handleToggle = (value) => {
    setToggle((pre) => !pre);
    // if (!viewOrderProductOpen) {
    //   openViewOrderProduct();
    // }
    setproductID(value.product_id);
  };

  const handleBackClick = async (event) => {
    if (window.confirm(`Are you sure you want to Cancel?`)) {
      console.log(CardList);
      window.close();
    }
  };

  const handleNewClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Add new");
      const path = `/Purchase/addPurchaseOrder/${param.store_id}`;
      window.open(path, "_blank");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStatusClick = async (event) => {
    event.preventDefault();
    if (CardList.length === 0) {
      alert("Purchase order cart is empty.");
      return;
    }
    if (orderstatuslable === "CLOSE") {
      if (window.confirm(`Order is already closed?\nStill want to continue?`)) {
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
          if (parseInt(element.quantity) > parseInt(element.receive)) {
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
              `Quantity is not completely received.\nStill want to continue?`
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
    if (window.confirm(`Are you sure you want to Clear the purchase order?`)) {
      setcartList([]);
      setshipmethod("");
      settrackingno("");
      setprojectname("");
      settax(0);
      setProductOptions([]);
      setnote("");
      setSelectedProduct("");
      setSelectedSupplier("");
      setInvoice_No("");
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
    let taxx = 0;

    if (tax) {
      taxx = parseFloat(tax);
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

    grandTotal = total_amt - total_dis + taxx;

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

  const handleDiscountChange = (index, value) => {
    const newCartList = [...CardList];
    newCartList[index].discount = value;
    // newCartList[index].total =
    //   newCartList[index].quantity * newCartList[index].unit_price -
    //   newCartList[index].quantity * newCartList[index].unit_price * value;
    setcartList(newCartList);
    setActiveInput("discount");
    setindex1(index);
  };
  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const customFilter = (option, inputValue) => {
    const optionSearchField = String(option.value).toLowerCase();
    const lowerCasedInput = inputValue.toLowerCase();
    return optionSearchField.includes(lowerCasedInput);
  };

  const handleChangeTax = (e) => {
    setActiveInput("tax");
    settax(e.target.value);
    setindex1(-2);
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
      var a = null,
        b = null;
      if (localStorage.getItem("SpecOrder_Tag")) {
        const SpecOrder_Tag = localStorage.getItem("SpecOrder_Tag");
        if (SpecOrder_Tag === "Y") {
          if (JSON.parse(localStorage.getItem("Spec_Order_Page"))) {
            const Spec_Order_Page = JSON.parse(
              localStorage.getItem("Spec_Order_Page")
            );
            console.log(Spec_Order_Page["SpecVendor_id"]);
            a = Spec_Order_Page["SpecVendor_id"];
            b = Spec_Order_Page["Store_id"];
            await GetSpecialOrderProdDetail(
              Spec_Order_Page["Store_id"],
              Spec_Order_Page["SpecVendor_id"]
            )
              .then(function (result) {
                console.log(result.data);
                const productList = result.data.map((item) => ({
                  product_id: item.product_id,
                  name: item.productname,
                  code: item.code,
                  unit_price: item.unit_price,
                  quantity: item.quantity,
                  discount: item.discount,
                  total: item.quantity * item.unit_price,
                  receive: 0,
                  image: item.image,
                  details: item.details,
                }));

                var ProductStr1 = ProductStr;
                ProductStr1 = ProductStr1 + productList.product_id + " ";
                setProductStr(ProductStr1);

                setcartList((prevProductList) => [
                  ...prevProductList,
                  ...productList,
                ]);
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        }
      }
      await getAccNamesCash()
        .then((resp) => {
          setGetacc_tos(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      await GetAllVendorsName()
        .then((resp) => {
          setGetSupplier(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
      if (b) {
        setSstore_id(b);
      }
      if (a) {
        setSvendor_id(a);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProductOptions = async () => {
      const fetchedProductOptions = GetProduct.map((item) => ({
        label: `${item.code} ${item.productname}`,
        value: item.product_id,
      }));
      setProductOptions(fetchedProductOptions);
    };
    fetchProductOptions();
  }, [GetProduct, Supplier_ids]);

  useEffect(() => {
    const fetchSupplierOptions = async () => {
      const fetchedSupplierOption = GetSupplier.map((item) => ({
        label: `${item.name}`,
        value: item.vendor_id,
        balance: item.balance,
        account_id: item.account_id,
      }));
      setSupplierOptions(fetchedSupplierOption);
      //setcartList([]);
    };
    fetchSupplierOptions();
  }, [GetSupplier]);

  useEffect(() => {
    CalculateAllFields();
  }, [CardList, tax]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(Svendor_id);
        const toAccOption = GetSupplier.find(
          (option) => option.vendor_id === parseInt(Svendor_id)
        );
        console.log(toAccOption);

        const toAccOption1 = {
          label: `${toAccOption.name}`,
          value: toAccOption.vendor_id,
          balance: toAccOption.balance,
          account_id: toAccOption.account_id,
        };
        setSelectedSupplier(toAccOption1);
        setacc_from_bal(toAccOption.balance);
        setSupplier(toAccOption1);
        setSupplier_ids(toAccOption1.value);
        setacc_from_id(toAccOption.account_id);
      } catch (err) {}
    }
    fetchData();
  }, [Svendor_id]);

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
          <Col md={9} className="container-col">
            <Header title="CREATE PURCHASE ORDER" />
          </Col>

          <Col md={3} className="container-col">
            <label
              style={{
                marginLeft: "32px",
                fontWeight: "bold",
                fontSize: "18px",
                backgroundColor: currentColor,
                color: "white",
                padding: "4px",
                paddingLeft: "8px",
                paddingRight: "8px",
                borderRadius: "5px",
              }}
            >
              ORDER STATUS: {orderstatuslable}
            </label>
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
                    Supplier:
                  </label>
                  <div className="sale-input-div">
                    <div className="sale-input">
                      <Select
                        className="myreact-select"
                        id="customer"
                        value={selectedSupplier}
                        onChange={handleChangeSupplier}
                        options={SupplierOptions}
                        isSearchable
                        placeholder="Select Supplier"
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
                            width: "90px",
                          }}
                        >
                          RCVD QTY
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
                            <div className="centered-input">
                              <input
                                className="input"
                                id="receive"
                                type="number"
                                min="0"
                                step="1.00"
                                style={{
                                  textAlign: "center",
                                  fontSize: "12px",
                                }}
                                value={item.receive}
                                onClick={() =>
                                  handlereceiveClick("receive", index)
                                }
                                onChange={(e) =>
                                  handlereceiveChange(index, e.target.value)
                                }
                              />
                            </div>
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
                          GRAND TOTAL:
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
                      <td className="table-sum-label">AMOUNT PAID:</td>
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
                          value={amount_paid}
                          onChange={handleChangeAmountPaid}
                          onClick={() => handleInputClick("amount_paid", -4)}
                          className="input table-sum-tb"
                          style={{
                            color: currentColor,
                            width: "140px",
                          }}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="table-sum-label">PAID FROM:</td>
                      <td className="table-sum-cash">
                        <select
                          className="select table-sum-tb"
                          style={{
                            color: currentColor,
                            margin: "0px",
                            width: "158px",
                            fontWeight: "500",
                            fontSize: "15px",
                          }}
                          value={acc_to}
                          onChange={handleAccToChange}
                        >
                          {getacc_tos.map((item) => (
                            <option key={item.account_id}>{item.name}</option>
                          ))}
                        </select>
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
                    onClick={handleStatusClick}
                  >
                    <div className="action-btn">{OrderStatus}</div>
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
                  md={6}
                  className="container-col"
                  style={{ paddingLeft: "5px", paddingBottom: "6px" }}
                >
                  <label
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Ship Method:
                  </label>
                  <input
                    type="text"
                    name="shipmethod"
                    placeholder="Ship-Method"
                    value={shipmethod}
                    onChange={handleChangeShipMethod}
                    className="input"
                    style={{
                      width: "100%",
                    }}
                  />
                </Col>
                <Col
                  md={6}
                  className="container-col"
                  style={{ paddingRight: "5px", paddingBottom: "6px" }}
                >
                  <label
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Tracking No:{" "}
                  </label>
                  <input
                    type="text"
                    name="tracking_no"
                    value={trackingno}
                    onChange={handleChangeTrackingNo}
                    placeholder="Tracking No."
                    className="input"
                    style={{
                      width: "100%",
                    }}
                  />
                </Col>
                <Col
                  md={6}
                  className="container-col"
                  style={{ paddingLeft: "5px", paddingBottom: "6px" }}
                >
                  <label
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Supplier Inv No:
                  </label>
                  <input
                    type="text"
                    name="Invoice No"
                    value={Invoice_No}
                    onChange={handleChangeInvNo}
                    placeholder="Supplier Invoive No."
                    className="input"
                    style={{
                      width: "100%",
                    }}
                  />
                </Col>
                <Col
                  md={6}
                  className="container-col"
                  style={{ paddingRight: "5px", paddingBottom: "6px" }}
                >
                  <label
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Recv By:
                  </label>
                  <input
                    type="text"
                    name="project name"
                    value={projectname}
                    onChange={handleChangeProjectName}
                    placeholder="Receive By"
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
                    placeholder="Purchase Order Note: "
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
export default AddPurchaseOrder;
