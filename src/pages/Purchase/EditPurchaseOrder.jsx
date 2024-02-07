import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import {
  GetAllVendorsName,
  GetProductNameCodeInv,
  GetProductByIdSale,
  GetSaleCustomerById,
  GetProductsByStoreVendorId,
  GetPurchaseOrderDetailsByID,
  GetPurchaseOrderVendorByID,
  DeleteEditPurchaseOrderProduct,
  EditPurchaseOrderAPi,
  RemoveProd_fromShipmentTrans,
  GetProductByStoreID,
  EditPurchaseStatusBYPo_id,
  getProductFilterSubString,
  getAccNamesCash,
  GetAccToIdByPusOrder,
} from "../../api/Api";
import { Header, Button } from "../../components";
import Select from "react-select";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/viewStore.css";
import { Card } from "react-bootstrap";

const EditPurchaseOrder = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [GetVendor, setGetVendor] = useState([]);
  const [Vendor, setVendor] = useState("");
  const [VendorOptions, setVendorOptions] = useState([]);
  const [GetProduct, setGetProduct] = useState([]);
  const [product, setProducts] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [p_code, setp_code] = useState("");
  const [Vendor_ids, setVendor_ids] = useState("");
  const [CardList, setcartList] = useState([]);
  const [total_amount, settotalAmount] = useState(0);
  const [tax, settax] = useState(0);
  const [totaldiscount, settotaldiscount] = useState(0.0);
  const [total_item, settotalitem] = useState(0);
  const [index1, setindex1] = useState("");
  const [grandtotal, setgrandtotal] = useState(0);
  const [note, setnote] = useState("");
  const [VendorDetail, setVendorDetail] = useState([]);
  const [cusPhone, setcusPhone] = useState("");
  const [trackingno, settrackingno] = useState("");
  const [projectname, setprojectname] = useState("");
  const [shipmethod, setshipmethod] = useState("");
  const [cusFlag, setcusFlag] = useState("");
  const [invoice_id, setinvoice_id] = useState("");
  const [OrderStatus, setOrderStatus] = useState("");
  const [status_id, setstatus_id] = useState("");
  const [orderstatuslable, setorderstatuslable] = useState("");
  const [deleteprodList, setdeleteprodList] = useState([]);
  const [ValError, setValError] = useState([]);
  const [unshippedList, setunshippedList] = useState([]);
  const [Invoice_No, setInvoice_No] = useState("");
  const [qtyShipped, setqtyShipped] = useState([]);
  const [ProductStr, setProductStr] = useState("");
  const [acc_from_id, setacc_from_id] = useState("");
  const [acc_to_id, setacc_to_id] = useState("");
  const [amount_paid, setamount_paid] = useState(0);
  const [getacc_tos, setGetacc_tos] = useState([]);
  const [acc_to, setacc_to] = useState("");
  const [acc_from_bal, setacc_from_bal] = useState("");

  let param = useParams();
  // console.log(param.so_ids)
  const paramString = String(param.po_ids);
  const [so_id_param, store_id_param] = paramString.split("_");

  const [formData, setFormData] = useState({
    po_id: 0,
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

  const [formData1, setFormData1] = useState({
    po_id: so_id_param,
    store_id: store_id_param,
    product_id: 0,
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
  const [selectedVendor, setSelectedVendor] = useState(null);

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
            newCartList[indexToUpdate].quantity *
            newCartList[indexToUpdate].unit_price;

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
            image: result.data[0].image,
            details: result.data[0].details,
            quantity: 1,
            discount: result.data[0].discount,
            total: 1 * result.data[0].unit_price,
            receive: 0,
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

  const handleChangeVendor = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setSelectedVendor(selectedOption);
      setActiveInput("vendor");
      setVendor(selectedOption);
      setVendor_ids(selectedOption.value);
      getVendorDetail(selectedOption.value);
      if (selectedOption.value) {
        setGetProduct([]);
        // getProductsAll(selectedOption.value);
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
      setshipmethod("");
    }
  };

  const handleChangeProduct = (selectedOption) => {
    if (selectedOption && selectedOption.values) {
      setSelectedProduct(selectedOption);
      setActiveInput("product");
      var ProductStr1 = ProductStr;
      ProductStr1 = ProductStr1 + selectedOption.values + " ";
      setProductStr(ProductStr1);
      setProducts(selectedOption);
      const selectedProduct = selectedOption.values;
      setp_code(selectedProduct);
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
  const handleChangeAmountPaid = (e) => {
    setActiveInput("amount_paid");
    setamount_paid(e.target.value);
    setindex1(-4);
  };

  const handleInputChange = (inputValue) => {
    // if (customer_ids) {
    if (inputValue && inputValue.length >= 3) {
      const searchResults = getProductFilterSubString(
        store_id_param,
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
      // setProductOptions(productOptions1);
    }
    // }
  };
  const customFilter = (option, inputValue) => {
    const optionSearchField = String(option.value).toLowerCase();
    const lowerCasedInput = inputValue.toLowerCase();
    return optionSearchField.includes(lowerCasedInput);
  };

  const handleChangeNote = (e) => {
    setnote(e.target.value);
  };
  const handleChangeProjectName = (e) => {
    setprojectname(e.target.value);
  };

  const handleChangeInvNo = (e) => {
    setInvoice_No(e.target.value);
  };

  // const handleAccToChange = (e) => {
  //   setacc_to(e.target.value);
  //   const acc = getacc_tos.find((item) => item.name === e.target.value);
  //   console.log(acc.account_id);
  //   setacc_to_bal(acc.end_balance);
  //   setacc_to_id(acc.account_id);
  // };

  const handleChangeTrackingNo = (e) => {
    settrackingno(e.target.value);
  };
  const handleChangeShipMethod = (e) => {
    setshipmethod(e.target.value);
  };

  const getVendorDetail = async (id) => {
    try {
      // const resp = await GetSaleCustomerById(id);
      // setVendorDetail(resp.data || []);
      // // console.log(resp.data[0].phone);
      // setcusPhone(resp.data[0].phone);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getProductsAll = async (v) => {
    try {
      const resp = await GetProductsByStoreVendorId(store_id_param, v);
      setGetProduct(resp.data || []);
      console.log(resp.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const UpdateStatus = async (id, stat) => {
    // imgg.preventDefault();
    const response = await EditPurchaseStatusBYPo_id(stat, id);
    if (response.status === 200) {
      // if(response.data[0][0].result){
      alert("Purchase order status updated successfully.");
      // }
      // else{
      //   alert("Order Status Failed to Update!");
      // }
    } else {
      alert("Failed to update purchase order status.");
    }
  };

  const handleSaleOrderClick = async (e) => {
    if (CardList.length === 0) {
      alert("Purchase order cart is empty.");
      return;
    }
    let ss = 73;
    if (orderstatuslable === "CLOSE") {
      ss = 72;
    }

    const updatedFormData = { ...formData };
    updatedFormData.po_id = so_id_param;
    updatedFormData.vendor_id = Vendor_ids;
    updatedFormData.vendor_invoice_no = Invoice_No;
    updatedFormData.user_id = 102;
    updatedFormData.store_id = store_id_param;
    updatedFormData.ship_method = shipmethod;
    updatedFormData.tracking_no = trackingno;
    updatedFormData.total = grandtotal;
    updatedFormData.amount_paid = amount_paid;
    updatedFormData.amount_pending = grandtotal - amount_paid;
    updatedFormData.status_id = ss;
    updatedFormData.po_note = note;
    updatedFormData.t_type_id = 706;
    updatedFormData.acc_from_id = acc_from_id;

    updatedFormData.purchase_products = [];
    updatedFormData.receive_logs = [];

    console.log(qtyShipped);

    CardList.forEach((product, index) => {
      const qtyShippedProduct = qtyShipped.find(
        (item) => parseInt(item.product_id) === parseInt(product.product_id)
      );
      console.log("Product:", product);
      console.log("QtyShippedProduct:", qtyShippedProduct);

      if (parseInt(product.receive) > 0) {
        let a = 73;
        if (parseFloat(product.receive) >= parseFloat(product.quantity)) {
          a = 72;
        }
        console.log("Condition 1: Receive > 0");
        if (qtyShippedProduct) {
          console.log("Condition 2: QtyShippedProduct found");
          const receivedQuantity =
            parseInt(product.receive) - parseInt(qtyShippedProduct.receive);
          console.log(parseInt(qtyShippedProduct.receive));
          if (receivedQuantity !== 0) {
            const shipment = {
              recv_status_id: a,
              quantity: product.quantity,
              product_id: product.product_id,
              quantity_recv: receivedQuantity,
              quantity_reject: 0,
              mfg_date: null,
              recv_by: projectname,
              recv_note: "",
            };
            updatedFormData.receive_logs.push(shipment);
          }
        } else {
          console.log("Condition 3: QtyShippedProduct not found");
          const shipment = {
            recv_status_id: a,
            quantity: product.quantity,
            product_id: product.product_id,
            quantity_recv: product.receive,
            quantity_reject: 0,
            recv_by: projectname,
            mfg_date: null,
            recv_note: "",
          };
          updatedFormData.receive_logs.push(shipment);
        }
      }

      const saleProduct = {
        product_id: product.product_id,
        quantity: product.quantity,
        unit_price: product.unit_price,
        discount: product.discount,
        exp_rec_date: null,
        item_note: "",
      };
      updatedFormData.purchase_products.push(saleProduct);
    });
    console.log(updatedFormData);
    // setFormData(updatedFormData);

    if (deleteprodList.length === 0) {
    } else {
      DeleteProductfrom_SaleOrder();
    }

    // if (unshippedList.length === 0) {
    // } else {
    //   DeleteUnshippedProductsfrom_SaleOrder();
    // }
    const response = await EditPurchaseOrderAPi(updatedFormData);
    if (response.status === 200) {
      // if (OrderStatus === "MARK AS OPEN") {
      //   console.log(response.data[0][0].po_id);
      //   if (response.data[0][0].po_id) {
      //     console.log(response.data[0][0].po_id);
      //     UpdateStatus(response.data[0][0].po_id, 72);
      //   }
      // } else {
      //   if (response.data[0][0].po_id) {
      //     console.log(response.data[0][0].po_id);
      //     UpdateStatus(response.data[0][0].po_id, 73);
      //   }
      // }
      alert("Purchase order updated successfully");
    } else {
      alert("Purchase order failed to update");
    }
  };

  const handleStatusClick = async (event) => {
    event.preventDefault();
    if (CardList.length === 0) {
      alert("Purchase order cart is empty");
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
              `Quantity is not completely Received.\nStill want to Continue?`
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
      // setSelectedSupplier("");
      setInvoice_No("");
    }
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
      const baseUrl = "http://localhost:3000";
      const path = `/Purchase/addPurchaseOrder/${param.store_id}`;
      const url = `${baseUrl}${path}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error:", error);
    }
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

    grandTotal = total_amt - total_dis;

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

  const handleUnitPriceChange = (index, value) => {
    const newCartList = [...CardList];
    newCartList[index].unit_price = value;
    newCartList[index].total = value * parseFloat(newCartList[index].quantity);
    setcartList(newCartList);
    setActiveInput("unit_price");
    setindex1(index);
  };
  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const handleChangeTax = (e) => {
    setActiveInput("tax");
    settax(e.target.value);
    setindex1(-2);
  };

  const DeleteProductfrom_SaleOrder = async () => {
    const updatedFormData = { ...formData1 };
    // updatedFormData.invoice_id = invoice_id;
    // setFormData1(updatedFormData);

    try {
      await Promise.all(
        deleteprodList.map(async (productId) => {
          const deleteFormData = { ...updatedFormData, product_id: productId };
          const response = await DeleteEditPurchaseOrderProduct(deleteFormData);

          if (response.status !== 200) {
            console.error(`Product ${productId} failed to remove.`);
          }
        })
      );
    } catch (error) {
      console.error("Error during product removal:", error);
      alert("An error occurred during product removal.");
    }
  };

  const handleShipmentChange = (index, value) => {
    const newCartList = [...CardList];
    if (value < newCartList[index].quantity) {
      if (
        window.confirm(
          `Receive qty less than total qty.\nStill want to continue?`
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
      if (
        window.confirm(`Order is already received.\nStill want to continue?`)
      ) {
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

  const DeleteUnshippedProductsfrom_SaleOrder = async () => {
    console.log(unshippedList);
    const shippableProductIds = CardList.filter(
      (product) => product.receive > 0
    ).map((product) => product.product_id);
    const updatedUnshippedList = unshippedList.filter(
      (productId) => !shippableProductIds.includes(productId)
    );
    setunshippedList(updatedUnshippedList);
    const updatedFormData = { ...formData1 };
    updatedFormData.invoice_id = invoice_id;
    setFormData1(updatedFormData);
    console.log("heheh " + updatedUnshippedList);
    try {
      await Promise.all(
        updatedUnshippedList.map(async (productId) => {
          const deleteFormData = { ...updatedFormData, product_id: productId };
          const response = await RemoveProd_fromShipmentTrans(deleteFormData);

          if (response.status !== 200) {
            console.error(`Product receive  ${productId} failed to remove.`);
          }
        })
      );
    } catch (error) {
      console.error("Error during product receive removal:", error);
      alert("An error occurred during product receive removal.");
    }
  };

  const handleDeleteClick = async (index) => {
    const removedProduct = CardList[index];
    if (
      window.confirm(`Do you want to remove ${removedProduct.code} from Cart?`)
    ) {
      setdeleteprodList((prevArray) => [
        ...prevArray,
        removedProduct.product_id,
      ]);
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
      // alert("Removed successfully.");
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "16px",
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "16px",
    }),
  };

  useEffect(() => {
    async function fetchData() {
      await getAccNamesCash()
        .then((resp) => {
          setGetacc_tos(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      await GetAccToIdByPusOrder(so_id_param)
        .then((resp) => {
          setacc_to_id(resp.data[0].name);
          setacc_from_bal(resp.data[0].end_balance);
        })
        .catch((err) => {
          console.log(err.message);
        });

      await GetAllVendorsName()
        .then((resp) => {
          setGetVendor(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
      let a = null;
      await GetPurchaseOrderVendorByID(so_id_param)
        .then((resp) => {
          console.log(resp.data[0].vendor_id);
          a = resp.data[0].vendor_id;
          setVendor_ids(resp.data[0].vendor_id);
          setcusFlag(resp.data[0].vendor_id + " " + resp.data[0].name);

          setInvoice_No(resp.data[0].vendor_invoice_no);
          settrackingno(resp.data[0].tracking_no);
          setshipmethod(resp.data[0].ship_method);
          setprojectname(resp.data[0].recv_by);
          setstatus_id(resp.data[0].status_id);
          setprojectname(resp.data[0].recv_by);
          setamount_paid(resp.data[0].amount_paid);
          setacc_from_id(resp.data[0].account_id);

          settax(resp.data[0].tax);
          if (resp.data[0].status_id === 72) {
            setOrderStatus("MARK AS OPEN");
            setorderstatuslable("CLOSE");
          } else {
            setOrderStatus("MARK AS CLOSE");
            setorderstatuslable("OPEN");
          }

          setnote(resp.data[0].po_note);
          return a; // Return the value of 'a' for the next then block
        })
        .then((vendorId) => {
          console.log(vendorId);
          setcartList([]);
          // getProductsAll(vendorId); // Call getProductsAll here
        })
        .catch((err) => {
          console.log(err.message);
        });
      // setcartList([]);
      // console.log(a)
      // getProductsAll(a);
      //   getProductsAll();
      await GetPurchaseOrderDetailsByID(so_id_param).then(function (result) {
        console.log(result.data);
        if (result.data) {
          const productList = result.data.map((item) => ({
            product_id: item.product_id,
            name: item.product_name,
            code: item.code,
            unit_price: item.unit_price,
            quantity: item.quantity,
            discount: item.discount,
            total: item.quantity * item.unit_price,
            receive: item.product_received,
            image: item.image,
            details: item.details,
          }));

          const productIdsInCart = CardList.map(
            (product) => product.product_id
          );
          setProductOptions((prevOptions) =>
            prevOptions.filter(
              (option) => !productIdsInCart.includes(option.value)
            )
          );
          // setProductOptions([...filteredProductOptions]);

          setcartList((prevProductList) => [
            ...prevProductList,
            ...productList,
          ]);

          const qtyShippedList = productList.map((product) => ({
            product_id: product.product_id,
            receive: product.receive,
          }));

          setqtyShipped((prevQtyShippedList) => [
            ...prevQtyShippedList,
            ...qtyShippedList,
          ]);

          const unshippedSet = new Set();

          productList.forEach((product, index) => {
            if (product.receive > 0) {
              unshippedSet.add(product.product_id);
            }
          });
          const unshippedArray = Array.from(unshippedSet);
          setunshippedList(unshippedArray);

          console.log(unshippedArray);
        }
      });
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
      const productIdsInCart = CardList.map((product) => product.product_id);
      setProductOptions((prevOptions) =>
        prevOptions.filter((option) => !productIdsInCart.includes(option.value))
      );
    };
    fetchProductOptions();
  }, [GetProduct, Vendor_ids]);

  useEffect(() => {
    const fetchVendorOptions = async () => {
      const fetchedVendorOption = GetVendor.map((item) => ({
        label: `${item.name}`,
        value: item.vendor_id,
      }));
      setVendorOptions(fetchedVendorOption);
      setcartList([]);
    };
    fetchVendorOptions();
  }, [GetVendor]);

  useEffect(() => {
    CalculateAllFields();
    console.log(cusFlag);
    setSelectedVendor(cusFlag);
    const productIdsInCart = CardList.map((product) => product.product_id);
    setProductOptions((prevOptions) =>
      prevOptions.filter((option) => !productIdsInCart.includes(option.value))
    );
  }, [CardList, tax]);

  return (
    <div className="user-body">
      <div class="article-sale2">
        <div class="article-container-sale">
          <label
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              paddingLeft: "120px",
            }}
          >
            EDIT PURCHASE ORDER
          </label>
          {/* <Header  title="CREATE SALE ORDER" /> */}
          {/* <div style={{paddingLeft:"1630px",}}> */}
          <div style={{ paddingLeft: "1750px" }}>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                backgroundColor: currentColor,
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
        <div div class="article-container-sale">
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
                    Supplier:{" "}
                  </label>
                  <br />
                  <div>
                    <input
                      className="input"
                      type="text"
                      value={cusFlag}
                      style={{
                        textAlign: "center",
                        width: "200px",
                        marginBottom: "10px",
                      }}
                      // onChange={handleChangeCustomer}
                      readOnly
                    />
                    <span style={{ paddingLeft: "72%" }}></span>
                    <label
                      //
                      style={{
                        // paddingLeft: "70%",
                        // width: "100%",
                        fontWeight: "bold",
                        font: "100px",
                        fontSize: "20px",
                        border: "3px solid currentColor",
                      }}
                    >
                      Bal:{" "}
                      <span
                        style={{
                          paddingLeft: "1px",
                        }}
                      >
                        {formatCurrency(acc_from_bal)}
                      </span>
                    </label>
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
                        backgroundColor: currentColor,
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
                  <div className="table-container-sale5">
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
                            backgroundColor: "#03c9d7",
                            height: "60px",
                            fontSize: "16px",
                            textAlign: "center",
                          }}
                        >
                          <td
                            style={{
                              textAlign: "center",
                              width: "120px",
                            }}
                          >
                            CODE
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              minWidth: "100px",
                            }}
                          >
                            PRODUCT
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              width: "140px",
                            }}
                          >
                            UNIT PRICE
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              width: "120px",
                            }}
                          >
                            QTY
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              width: "120px",
                            }}
                          >
                            DISCOUNT
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              width: "120px",
                            }}
                          >
                            TOTAL
                          </td>

                          <td
                            style={{
                              textAlign: "center",
                              width: "130px",
                            }}
                          >
                            RCV'D QTY
                          </td>

                          <td
                            style={{
                              textAlign: "center",
                              width: "60px",
                            }}
                          >
                            DEL
                          </td>
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
                                  id="receive"
                                  type="number"
                                  min="0"
                                  step="1.00"
                                  style={{
                                    textAlign: "center",
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
                              color: currentColor,
                              textAlign: "left",
                              fontWeight: "Bold",
                              paddingLeft: "10px",
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
                              width: "60px !important",
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
                                  width: "60px !important",
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
                              color: currentColor,
                              textAlign: "left",
                              fontWeight: "Bold",
                              paddingLeft: "10px",
                            }}
                          >
                            {formatCurrency(totaldiscount)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{ fontWeight: "bold", textAlign: "right" }}
                          >
                            AMOUNT PAID:
                          </td>

                          <td
                            style={{ fontWeight: "bold", color: currentColor }}
                          >
                            <label
                              style={{
                                fontWeight: "bold",
                                color: currentColor,
                                paddingLeft: "7px",
                                fontSize: "20px",
                              }}
                            >
                              {/* {"$"} */}
                            </label>
                            <label
                              // defaultValue={0.0}
                              // type="number"
                              // name="shipment"
                              // min="0"
                              // step="1.00"
                              // readOnly

                              // onChange={handleChangeAmountPaid}
                              // onClick={() =>
                              //   handleInputClick("amount_paid", -4)
                              // }
                              // className="input"
                              style={{
                                textAlign: "left",
                                width: "100px",
                                height: "27px",
                                fontSize: "20px",
                                color: currentColor,
                                fontWeight: "Bold",
                                // background: "#ddd",
                              }}
                            >
                              {formatCurrency(amount_paid)}
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{ fontWeight: "bold", textAlign: "right" }}
                          >
                            RECEIVED FROM:
                          </td>

                          <td
                            style={{ fontWeight: "bold", color: currentColor }}
                          >
                            <label
                              style={{
                                fontWeight: "bold",
                                color: currentColor,
                                // paddingLeft: "18px",
                              }}
                            >
                              {` `}
                            </label>
                            <div style={{ paddingLeft: "18px" }}>
                              <label
                                style={{
                                  textAlign: "left",
                                  width: "180px",
                                  height: "27px",
                                  fontSize: "20px",
                                  color: currentColor,
                                  fontWeight: "Bold",
                                  // background: "#ddd",
                                }}
                              >
                                {acc_to_id}
                              </label>
                            </div>
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
                              color: currentColor,
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
                      background: currentColor,
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
                      background: currentColor,
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
                      background: currentColor,
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
                      background: currentColor,
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
                      background: currentColor,
                    }}
                    onClick={handleStatusClick}
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
                      {OrderStatus}
                    </div>
                  </Card>
                  <Card
                    className="keypad-button"
                    style={{
                      width: "180px",
                      height: "100px",
                      background: currentColor,
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
                              Supplier Inv No:{" "}
                            </label>
                          </td>

                          <td>
                            <label
                              style={{
                                fontWeight: "Bold",
                              }}
                            >
                              Recv By:
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="text"
                              name="Invoice No"
                              value={Invoice_No}
                              onChange={handleChangeInvNo}
                              placeholder="Supplier Invoive No."
                              className="input"
                              style={{
                                width: "180px",
                              }}
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              name="project name"
                              value={projectname}
                              onChange={handleChangeProjectName}
                              placeholder="Receive By"
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
                        placeholder="Purchase Order Note: "
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
                          border: "2px solid currentColor",
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
export default EditPurchaseOrder;
