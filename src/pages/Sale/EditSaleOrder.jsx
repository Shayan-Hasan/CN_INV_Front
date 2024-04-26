import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import {
  GetAllCustomersName,
  //GetProductNameCodeInv,
  GetProductByIdSale,
  //GetSaleCustomerById,
  GetSaleOrderDetailsByID,
  GetSaleOrderCustomerByID,
  DeleteEditSaleOrderProduct,
  EditSaleOrderApi,
  RemoveProd_fromShipmentTrans,
  //GetProductByStoreID,
  EditSaleOrderStatusBYSo_id,
  //EditSaleOrderStatus,
  getProductFilterSubString,
  getAccNamesCash,
  GetAccToIdBySaleOrder,
  EditSpecialOrder,
} from "../../api/Api";
import { ValidOrderField } from "../../contexts/Utils";
import { Header } from "../../components";
import Select from "react-select";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/sale.css";
import { Card } from "react-bootstrap";
//import Sidebar from "../../components/ViewOrderProduct";
import "../../styles/viewCustomer.css";
import { Col, Container, Row } from "react-bootstrap";
import { openNewTab } from "../../contexts/SO_Invoice";

const EditSaleOrder = () => {
  const {
    currentColor,
    //activeProdMenu,
    setActiveProdMenu,
    setActiveProdMenuId,
  } = useStateContext();
  const navigate = useNavigate();
  const [GetCustomer, setGetCustomer] = useState([]);
  const [ProductStr, setProductStr] = useState("");
  //const [Customer, setCustomer] = useState("");
  const [CustomerOptions, setCustomerOptions] = useState([]);
  const [GetProduct, setGetProduct] = useState([]);
  const [product, setProducts] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [p_code, setp_code] = useState("");
  const [customer_ids, setcustomer_ids] = useState("");
  const [CardList, setcartList] = useState([]);
  const [cardList_old, setcartList_old] = useState([]);
  const [total_amount, settotalAmount] = useState(0);
  const [tax, settax] = useState(0);
  const [totaldiscount, settotaldiscount] = useState(0.0);
  const [total_item, settotalitem] = useState(0);
  const [index1, setindex1] = useState("");
  const [status_id, setstatus_id] = useState("");
  const [grandtotal, setgrandtotal] = useState(0);
  const [note, setnote] = useState("");
  //const [CustomerDetail, setCustomerDetail] = useState([]);
  //const [cusPhone, setcusPhone] = useState("");
  const [trackingno, settrackingno] = useState("");
  const [projectname, setprojectname] = useState("");
  const [shipmethod, setshipmethod] = useState("");
  const [cusFlag, setcusFlag] = useState("");
  const [invoice_id, setinvoice_id] = useState("");
  const [projectname2, setprojectname2] = useState(0);
  const [deleteprodList, setdeleteprodList] = useState([]);
  const [OrderStatus, setOrderStatus] = useState("");
  const [orderstatuslable, setorderstatuslable] = useState("");
  //const [ValError, setValError] = useState([]);
  const [unshippedList, setunshippedList] = useState([]);
  const [qtyShipped, setqtyShipped] = useState([]);
  const [projectname1, setprojectname1] = useState("");
  const [acc_from_id, setacc_from_id] = useState("");
  //const [acc_to_id, setacc_to_id] = useState("");
  const [amount_paid, setamount_paid] = useState(0);
  const [getacc_tos, setGetacc_tos] = useState([]);
  const [acc_to, setacc_to] = useState("");
  const [acc_from_bal, setacc_from_bal] = useState("");
  //const [productID, setproductID] = useState("");
  //const [toggle, setToggle] = useState(false);
  const [store_id_param, setstore_id_param] = useState("");
  const [dot, setdot] = useState(0);
  const [ActiveProduct, setActiveProduct] = useState(0);
  //const [aexist, setaexist] = useState("");
  // const [name, setname] = useState("");
  const [isPageFrozen, setIsPageFrozen] = useState(false);
  const [req_date, setreq_date] = useState();
  const [saveClick, setsaveClick] = useState(false);
  const [ppo_id, setppo_id] = useState(0);
  const [print_flag, setprint_flag] = useState(false);

  let param = useParams();
  // console.log(param.so_ids)
  // const paramString = String(param.so_ids);
  var so_id_param = param.so_ids;
  // const [so_id_param, store_id_param] = paramString.split("_");

  const [formData, setFormData] = useState({
    so_id: 0,
    est_sale: "S",
    customer_id: 0,
    customer_po_no: "",
    project_name: "",
    ship_method: "",
    tracking_no: "",
    total: 0,
    amount_paid: 0,
    amount_pending: 0,
    user_id: 102,
    so_note: "",
    total_price: 0,
    discount: 0,
    tax: 0,
    status_id: 0,
    shipment: 0,
    store_id: 0,
    invoice_id: 0,
    t_type_id: 700,
    sale_products: [],
    shipments: [],
  });

  const [formData1, setFormData1] = useState({
    so_id: so_id_param,
    store_id: store_id_param,
    invoice_id: 0,
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
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleInputClick = (inputId, index) => {
    setActiveInput(inputId);
    setindex1(index);
  };
  const handleSpecQtyClick = (inputId, index) => {
    setActiveInput(inputId);
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

  const handleShipmentChange2 = (index, value) => {
    const newCartList = [...CardList];
    var ss = newCartList[index].spec_qty;
    if (value > newCartList[index].quantity || value === "") {
      if (value !== "") {
        alert("Special order qty must be less or equal to total qty.");
      }
      newCartList[index].spec_qty = ss;
      setcartList(newCartList);
      setActiveInput("spec_order");
      setindex1(index);
      // }
    } else {
      newCartList[index].spec_qty = value;
      setcartList(newCartList);
      setActiveInput("spec_order");
      setindex1(index);
    }
  };
  const handleShipmentChange1 = (index, value) => {
    const newCartList = [...CardList];
    if (value > newCartList[index].quantity || value === "") {
      if (value !== "") {
        alert("Ship qty must be less or equal to total qty.");
      }
      // if (
      //   window.confirm(
      //     `Ship qty greater than total qty.\nStill want to continue?`
      //   )
      // ) {
      newCartList[index].shipment = 0;
      setcartList(newCartList);
      setActiveInput("shipment");
      setindex1(index);
      // }
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

  const handleChangeActive = (index) => {
    const newCartList = [...CardList];
    newCartList[index].shipment = newCartList[index].shipment === 0 ? 1 : 0;
    setcartList(newCartList);
  };

  const handleKeypadClick = (value) => {
    // try {
    if (activeInput !== null) {
      const newCartList = [...CardList];
      const indexToUpdate = index1;

      if (
        activeInput === "quantity" ||
        activeInput === "unit_price" ||
        activeInput === "discount" ||
        activeInput === "shipment" ||
        activeInput === "spec_qty"
      ) {
        var currentValue = String(
          newCartList[indexToUpdate][activeInput] || ""
        );
        //console.log(currentValue);
        if (value === "." && currentValue.includes(".")) {
          return;
        }

        if (value === "." && !currentValue.includes(".")) {
          if (currentValue === "") {
            currentValue = "0";
          }
          newCartList[indexToUpdate][activeInput] = currentValue + ".0";
          setcartList(newCartList);
          setdot(1);
          return;
        }
        var newValue = currentValue + String(value);
        if (dot === 1) {
          var [integerPart, decimalPart] = currentValue.split(".");
          if (integerPart === "") {
            integerPart = "0";
          }
          newValue = integerPart + "." + value;
          setdot(0);
        }

        if (!isNaN(newValue)) {
          // if (activeInput === "shipment" || activeInput === "spec_order") {
          //   // newValue = String(parseInt(newValue));
          //   if (parseFloat(newValue) > newCartList[indexToUpdate].quantity) {
          //     if (activeInput === "shipment") {
          //       alert("Ship qty must be less or equal to total qty.");
          //     } else {
          //       alert("Special order qty must be less or equal to total qty.");
          //     }

          //     newCartList[indexToUpdate][activeInput] =
          //       newCartList[indexToUpdate][activeInput] + "";
          //     setcartList(newCartList);
          //     setdot(0);
          //     return;
          //   }
          // }
          newCartList[indexToUpdate][activeInput] = newValue;
          newCartList[indexToUpdate].total =
            newCartList[indexToUpdate].unit_price *
            newCartList[indexToUpdate].quantity;
          //-newCartList[indexToUpdate].discount;

          setcartList(newCartList);
          setdot(0);
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
            total: result.data[0].unit_price,
            // - result.data[0].discount,
            shipment: 0,
            image: result.data[0].image,
            details: result.data[0].details,
            req_delivery_date: null,
            spec_qty: 0,
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
    setSelectedProduct("");
  };

  const handleChangeReqDate = (index, e) => {
    const newCartList = [...CardList];
    if (e === "undefined") {
      newCartList[index].req_delivery_date = null;
      setreq_date(null);
    } else {
      newCartList[index].req_delivery_date = e;
      setreq_date(e);
    }
  };

  // const handleChangeCustomer = (selectedOption) => {
  //   if (selectedOption && selectedOption.value) {
  //     setSelectedCustomer(selectedOption);
  //     setacc_from_id(selectedOption.account_id);
  //     setActiveInput("customer");
  //     setCustomer(selectedOption);
  //     setcustomer_ids(selectedOption.value);
  //     getCustomerDetail(selectedOption.value);
  //     if (selectedOption.value) {
  //       setGetProduct([]);
  //       // getProductsAll();
  //     } else {
  //       setGetProduct([]);
  //     }
  //     setcartList([]);
  //     settax(0);
  //     settotaldiscount(0);
  //     settotalitem(0);
  //     setSelectedProduct("");
  //     setnote("");
  //     settrackingno("");
  //     setprojectname("");
  //     setprojectname1("");
  //     setprojectname2(0);
  //     setshipmethod("");
  //   }
  // };

  const handleAccToChange = (e) => {
    setacc_to(e.target.value);
  };
  const handleSpecQtyChange = (index, value) => {
    const newCartList = [...CardList];
    newCartList[index].spec_qty = value;
    setcartList(newCartList);
    setActiveInput("spec_qty");
    setindex1(index);
    // }
  };

  const handleChangeProduct1 = (selectedOption, event) => {
    if (event.key === "Enter" && selectedOption && selectedOption.value) {
      setSelectedProduct(selectedOption);
      setActiveInput("product");
      setProducts(selectedOption);
      const selectedProduct = selectedOption.value;
      setp_code(selectedProduct);
      handleAddcartClick();
    }
  };

  const handleChangeProduct = (selectedOption) => {
    if (selectedOption && selectedOption.values) {
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
  const handleChangeAmountPaid = (e) => {
    setActiveInput("amount_paid");
    setamount_paid(e.target.value);
    setindex1(-4);
  };
  const handleChangeProjectName2 = (e) => {
    setActiveInput("shipment1");
    setprojectname2(e.target.value);
    setindex1(-3);
  };
  const handleChangeProjectName1 = (e) => {
    setprojectname1(e.target.value);
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

  // const getCustomerDetail = async (id) => {
  //   try {
  //     const resp = await GetSaleCustomerById(id);
  //     setCustomerDetail(resp.data || []);
  //     // console.log(resp.data[0].phone);
  //     setcusPhone(resp.data[0].phone);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // const getProductsAll = async () => {
  //   try {
  //     const resp = await GetProductByStoreID(store_id_param);
  //     setGetProduct(resp.data || []);
  //     //console.log(resp.data);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }
  const handleInputChange = (inputValue) => {
    // if (customer_ids) {
    if (customer_ids || ActiveProduct) {
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
    // }
  };
  const customFilter = (option, inputValue) => {
    const optionSearchField = String(option.value).toLowerCase();
    const lowerCasedInput = inputValue.toLowerCase();
    return optionSearchField.includes(lowerCasedInput);
  };

  const UpdateStatus = async (stat, id) => {
    // imgg.preventDefault();
    const response = await EditSaleOrderStatusBYSo_id(stat, id);
    if (response.status === 200) {
      // if(response.data[0][0].result){
      alert("Sale order status updated successfully.");
      // }
      // else{
      //   alert("Order Status Failed to Update!");
      // }
    } else {
      alert("Failed to update sale order status.");
    }
  };
  const handlePrintOrderClick = async (e) => {
    setprint_flag(true);
    handleSaleOrderClick();
  };
  const handleSaleOrderClick = async (e) => {
    if (CardList.length === 0) {
      alert("Sale order cart is empty.");
      return;
    }
    //console.log(unshippedList);
    setIsPageFrozen(true);
    setsaveClick(!saveClick);
  };

  useEffect(async () => {
    if (saveClick) {
      const updatedFormData = { ...formData };
      updatedFormData.so_id = so_id_param;
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
      updatedFormData.invoice_id = invoice_id;
      updatedFormData.store_id = store_id_param;
      updatedFormData.shipment = projectname2;
      updatedFormData.acc_from_id = acc_from_id;

      updatedFormData.sale_products = [];
      updatedFormData.shipments = [];
      var specOrder = {
        products: [],
        remove_products: [],
      };

      if (OrderStatus === "MARK AS OPEN") {
        updatedFormData.status_id = 81;
      } else {
        updatedFormData.status_id = 80;
      }
      //console.log(unshippedList);
      var ff = 0,
        xx = null;
      CardList.forEach((product, index) => {
        const qtyShippedProduct = qtyShipped.find(
          (item) => parseInt(item.product_id) === parseInt(product.product_id)
        );
        const shipprod = unshippedList.find(
          (item) => parseInt(item.product_id) === parseInt(product.product_id)
        );

        //console.log("Product:", qtyShipped);
        //console.log("QtyShippedProduct:", unshippedList.product_id);

        if (parseFloat(product.shipment) > 0 || shipprod) {
          if (parseFloat(product.shipment) <= parseFloat(product.quantity)) {
            if (qtyShippedProduct) {
              const shippedQuantity =
                parseFloat(product.shipment) -
                parseFloat(qtyShippedProduct.shipment);
              //console.log(parseFloat(qtyShippedProduct.shipment));
              if (shippedQuantity !== 0) {
                const shipment = {
                  product_id: product.product_id,
                  s_quantity: product.quantity,
                  quantity_shipped: shippedQuantity,
                  shipped_note: "",
                };
                updatedFormData.shipments.push(shipment);
              }
            } else {
              const shipment = {
                product_id: product.product_id,
                s_quantity: product.quantity,
                quantity_shipped: product.shipment,
                shipped_note: "",
              };
              updatedFormData.shipments.push(shipment);
            }
          } else {
            if (ff === 0) {
              xx = product.code;
              ff = 1;
            }
          }
        }
        var dt = null;
        if (
          product.req_delivery_date !== null ||
          product.req_delivery_date !== ""
        ) {
          dt = product.req_delivery_date;
        }
        const saleProduct = {
          product_id: product.product_id,
          quantity: product.quantity,
          price: product.unit_price,
          cost_price: product.cost_price,
          item_note: "",
          discount: product.discount,
          req_delivery_date: dt,
        };
        updatedFormData.sale_products.push(saleProduct);
      });
      if (ff === 1) {
        alert(
          `Ship qty of ${xx} must be less or equal to total qty.\nSale Order failed to update.`
        );
        setsaveClick(!saveClick);
        setIsPageFrozen(false);
        return;
      }

      //console.log(updatedFormData);

      ff = 0;

      // if (!ppo_id) {
      CardList.forEach((product, index) => {
        var dt = "",
          qq = 10;
        const prodexist = cardList_old.find(
          (item) => item.product_id === product.product_id
        );
        var t = 1;
        if (prodexist) {
          t = parseFloat(prodexist.spec_qty);
        }
        const sty = qtyShipped.find(
          (item) => parseInt(item.product_id) === parseInt(product.product_id)
        );
        if (sty) {
          if (
            parseFloat(sty.spec_qty) > 0 &&
            parseFloat(product.spec_qty) === 0
          ) {
            const spec_prd = {
              product_id: product.product_id,
              so_id: so_id_param,
            };
            specOrder.remove_products.push(spec_prd);
          }
        }

        if (
          (parseFloat(product.spec_qty) >= 0 && t > 0) ||
          product.spec_qty > 0
        ) {
          if (product.req_delivery_date) {
            dt = product.req_delivery_date;
          }
          if (parseFloat(product.spec_qty) <= parseFloat(product.quantity)) {
            const qtyShippedProduct = qtyShipped.find(
              (item) =>
                parseInt(item.product_id) === parseInt(product.product_id)
            );
            const shipprod = unshippedList.find(
              (item) =>
                parseInt(item.product_id) === parseInt(product.product_id)
            );

            if (parseFloat(product.shipment) > 0 || shipprod) {
              if (
                parseFloat(product.shipment) <= parseFloat(product.quantity)
              ) {
                if (qtyShippedProduct) {
                  const shippedQuantity =
                    parseFloat(product.shipment) -
                    parseFloat(qtyShippedProduct.shipment);
                  //console.log(parseFloat(qtyShippedProduct.shipment));
                  if (shippedQuantity !== 0) {
                    if (
                      parseFloat(product.shipment) >=
                      parseFloat(product.spec_qty)
                    ) {
                      qq = 13;
                    }
                  }
                }
              }
            }

            const Specproduct = {
              product_id: product.product_id,
              so_id: so_id_param,
              quantity_req: product.spec_qty,
              quantity_order: 0,
              status_id: qq,
              req_delivery_date: dt,
              note: "",
            };
            specOrder.products.push(Specproduct);
          } else {
            if (ff === 0) {
              xx = product.code;
              ff = 1;
            }
          }
        }
      });
      if (ff === 1) {
        alert(
          `Special order qty of ${xx} must be less or equal to total qty.\nSale Order failed to update.`
        );
        setsaveClick(!saveClick);
        setIsPageFrozen(false);
        return;
      }
      // }

      // setFormData(updatedFormData);
      if (deleteprodList.length === 0) {
      } else {
        DeleteProductfrom_SaleOrder();
      }

      // if (unshippedList.length === 0) {
      // } else {
      //   DeleteUnshippedProductsfrom_SaleOrder();
      // }
      const response = await EditSaleOrderApi(updatedFormData);
      if (response.status === 200) {
        if (print_flag && so_id_param) {
          alert("Sale order updated successfully.");
          await openNewTab(so_id_param);
          setprint_flag(false);
          window.location.reload();
        }
        // if (orderstatuslable === "OPEN") {
        //   // console.log(response.data[0][0].so_id)
        //   if (so_id_param) {
        //     // console.log(response.data[0][0].so_id)
        //     UpdateStatus(80, so_id_param);
        //   } else {
        //     UpdateStatus(81, so_id_param);
        //   }
        // } else {
        //   // return;
        // }
        if (!print_flag) {
          alert("Sale order updated successfully.");
        }
      } else {
        alert("Sale order failed to update.");
        setsaveClick(!saveClick);
        setIsPageFrozen(false);
        return;
      }
      // if (!ppo_id) {
      if (specOrder.products.length > 0) {
        //console.log(specOrder);
        const resp = await EditSpecialOrder(specOrder);
        if (resp.status === 200) {
          //console.log(resp.data);
          if (resp.data.id) {
          } else {
            setsaveClick(!saveClick);
            setIsPageFrozen(false);
            alert("Special qty failed to update.");
            return;
          }
        } else {
          alert("Special qty failed to update.");
          setsaveClick(!saveClick);
          setIsPageFrozen(false);
          return;
        }
      }
      // }

      setsaveClick(!saveClick);
      setIsPageFrozen(false);
      if (!print_flag) {
        window.location.reload();
      }
    }
  }, [saveClick]);

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
      // setcartList([]);
      // setshipmethod("");
      // settrackingno("");
      // setprojectname1("");
      // setprojectname2(0);
      // setprojectname("");
      // settax(0);
      // setProductOptions([]);
      // setnote("");
      // setSelectedProduct("");
      // setSelectedCustomer("");
      window.location.reload();
    }
  };

  const handleToggle = (value) => {
    // console.log(value);
    // setToggle((pre) => !pre);
    // if (!viewOrderProductOpen) {
    //   openViewOrderProduct();
    // }
    setActiveProdMenuId({
      product_id: value.product_id,
      store_id: store_id_param,
    });
    setActiveProdMenu(true);
    //setproductID(value.product_id);
  };

  const handleNewClick = async (event) => {
    event.preventDefault();
    try {
      //console.log("Add new");
      const path = `/Sales/AddSaleOrder/${store_id_param}`;
      window.open(path, "_blank");
    } catch (error) {
      console.error("Error:", error);
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
      if (projectname2) {
        dd = parseFloat(projectname2);
      }
      total_amt = total_amt + a;
      total_dis = total_dis + b * c;
      total_itm = total_itm + c;

      // grandTotal = ((parseFloat(CardList[i].unit_price) - parseFloat(CardList[i].discount)) * parseFloat(CardList[i].quantity));
    }
    settotaldiscount(total_dis);
    settotalAmount(total_amt);
    settotalitem(total_itm);
    taxx = (taxx / 100) * (total_amt - total_dis);
    grandTotal = total_amt - total_dis + taxx + dd;
    // taxx = (taxx / 100) * total_amt;
    // grandTotal = total_amt + taxx + dd;

    setgrandtotal(grandTotal);
  };

  const handleBackClick = async (event) => {
    if (window.confirm(`Are you sure you want to Cancel?`)) {
      //console.log(CardList);
      window.close();
    }
  };

  const handleShipmentClick = (inputId, index) => {
    setActiveInput(inputId);
    setindex1(index);
  };

  const handleShipmentChange = (index, value) => {
    const newCartList = [...CardList];
    newCartList[index].shipment = value;
    setcartList(newCartList);
    setActiveInput("shipment");
    setindex1(index);
  };

  useEffect(() => {
    // handleStatusClick();
    // console.log(unshippedList);
  }, [unshippedList]);

  const handleQuantityChange = (index, value) => {
    const newCartList = [...CardList];
    if (!ValidOrderField(value)) {
      if (value !== "") {
        newCartList[index].quantity = 0;
        newCartList[index].total =
          value * parseFloat(newCartList[index].unit_price);
        setcartList(newCartList);
        setActiveInput("quantity");
        setindex1(index);
        return;
      }
    }
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
    //   newCartList[index].unit_price * newCartList[index].quantity - value;
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

  const handleChangeTax = (e) => {
    setActiveInput("tax");
    settax(e.target.value);
    setindex1(-2);
  };

  const DeleteProductfrom_SaleOrder = async () => {
    const updatedFormData = { ...formData1 };
    updatedFormData.invoice_id = invoice_id;
    setFormData1(updatedFormData);

    try {
      await Promise.all(
        deleteprodList.map(async (productId) => {
          const deleteFormData = { ...updatedFormData, product_id: productId };
          const response = await DeleteEditSaleOrderProduct(deleteFormData);

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

  const DeleteUnshippedProductsfrom_SaleOrder = async () => {
    //console.log(unshippedList);
    const shippableProductIds = CardList.filter(
      (product) => product.shipment > 0
    ).map((product) => product.product_id);
    const updatedUnshippedList = unshippedList.filter(
      (productId) => !shippableProductIds.includes(productId)
    );
    setunshippedList(updatedUnshippedList);
    const updatedFormData = { ...formData1 };
    updatedFormData.invoice_id = invoice_id;
    setFormData1(updatedFormData);
    // console.log("heheh " + updatedUnshippedList);
    try {
      await Promise.all(
        updatedUnshippedList.map(async (productId) => {
          const deleteFormData = { ...updatedFormData, product_id: productId };
          const response = await RemoveProd_fromShipmentTrans(deleteFormData);

          if (response.status !== 200) {
            console.error(`Product shipment  ${productId} failed to remove.`);
          }
        })
      );
    } catch (error) {
      console.error("Error during product shipment removal:", error);
      alert("An error occurred during product shipment removal.");
    }
  };

  const handleDeleteClick = async (index) => {
    const removedProduct = CardList[index];
    //console.log(removedProduct.shipment);
    if (removedProduct.shipment === 0) {
      if (removedProduct.spec_qty === 0) {
        if (
          window.confirm(
            `Do you want to remove ${removedProduct.code} from cart?`
          )
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
        }
      } else {
        alert(
          "Special order qty is greater than zero. So, it could not be deleted."
        );
      }
    } else {
      alert("Ship qty is greater than zero. So, it could not be deleted.");
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed month
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year}`;
  }

  useEffect(() => {
    async function fetchData() {
      await getAccNamesCash()
        .then((resp) => {
          setGetacc_tos(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      await GetAllCustomersName()
        .then((resp) => {
          setGetCustomer(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });

      await GetAccToIdBySaleOrder(so_id_param)
        .then((resp) => {
          //setacc_to_id(resp.data[0].name);
          setacc_from_bal(resp.data[0].end_balance);
          setacc_to(resp.data[0].name);
        })
        .catch((err) => {
          console.log(err.message);
        });

      await GetSaleOrderCustomerByID(so_id_param)
        .then((resp) => {
          setstore_id_param(resp.data[0].store_id);
          // setreq_date(resp.data[0].req_delivery_date);
          setcusFlag(resp.data[0].customer_id + " " + resp.data[0].name);
          setcustomer_ids(resp.data[0].customer_id);
          setprojectname1(resp.data[0].customer_po_no);
          //setcusPhone(resp.data[0].customer_po_no);
          settrackingno(resp.data[0].tracking_no);
          setprojectname(resp.data[0].project_name);
          setshipmethod(resp.data[0].ship_method);
          settax(resp.data[0].tax);
          setnote(resp.data[0].so_note);
          setinvoice_id(resp.data[0].invoice_id);
          setprojectname2(resp.data[0].shipment);
          setstatus_id(resp.data[0].status_id);
          setamount_paid(resp.data[0].amount_paid);
          setacc_from_id(resp.data[0].account_id);
          setppo_id(resp.data[0].po_id);
          if (resp.data[0].status_id === 81) {
            setOrderStatus("MARK AS OPEN");
            setorderstatuslable("CLOSE");
          } else {
            setOrderStatus("MARK AS CLOSE");
            setorderstatuslable("OPEN");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      //setcartList([]);
      // getProductsAll();
      //   getProductsAll();
      await GetSaleOrderDetailsByID(so_id_param).then(function (result) {
        //console.log(result.data);

        if (result.data) {
          const productList = result.data.map((item) => {
            var reqDeliveryDate = "";
            if (item.req_delivery_date !== null) {
              reqDeliveryDate = new Date(item.req_delivery_date);
              reqDeliveryDate.setUTCHours(24);
              reqDeliveryDate = reqDeliveryDate.toISOString().split("T")[0];
            }
            return {
              product_id: item.product_id,
              name: item.product_name,
              code: item.code,
              unit_price: item.unit_price,
              cost_price: item.cost_price,
              quantity: item.quantity,
              discount: item.discount,
              total: item.unit_price * item.quantity,
              // - item.discount,
              shipment: item.product_shipped,
              image: item.image,
              details: item.details,
              req_delivery_date: reqDeliveryDate,
              spec_qty: item.quantity_req,
            };
          });
          //console.log(result.data);

          setcartList((prevProductList) => [
            ...productList,
            ...prevProductList,
          ]);
          setcartList_old((prevProductList) => [
            ...prevProductList,
            ...productList,
          ]);

          const qtyShippedList = productList.map((product) => ({
            product_id: product.product_id,
            shipment: product.shipment,
            spec_qty: product.spec_qty,
          }));

          setqtyShipped((prevQtyShippedList) => [
            ...prevQtyShippedList,
            ...qtyShippedList,
          ]);

          // setqtyShipped([CardList]);
          const unshippedSet = new Set();

          productList.forEach((product, index) => {
            if (product.shipment > 0) {
              unshippedSet.add({ product_id: product.product_id });
            }
          });
          const unshippedArray = Array.from(unshippedSet);
          setunshippedList(unshippedArray);

          //console.log(unshippedArray);
        }
      });
      // const productIdsInCart = CardList.map((product) => product.product_id);
      // setProductOptions((prevOptions) =>
      //   prevOptions.filter((option) => !productIdsInCart.includes(option.value))
      // );
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
  }, [GetProduct, customer_ids]);

  useEffect(() => {
    const fetchCustomerOptions = async () => {
      const fetchedCustomerOption = GetCustomer.map((item) => ({
        label: `${item.name}`,
        value: item.customer_id,
        balance: item.balance,
        account_id: item.account_id,
      }));
      setCustomerOptions(fetchedCustomerOption);
      //setcartList([]);
    };
    fetchCustomerOptions();
  }, [GetCustomer]);

  useEffect(() => {
    CalculateAllFields();
    //console.log(cusFlag);
    setSelectedCustomer(cusFlag);
    const productIdsInCart = CardList.map((product) => product.product_id);
    setProductOptions((prevOptions) =>
      prevOptions.filter((option) => !productIdsInCart.includes(option.values))
    );
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
      {isPageFrozen && <div className="overlay-freeze" />}
      <Container fluid className="g-0 p-0 justify-end">
        <Row
          xs={1}
          sm={1}
          // className="justify-content-center"
          style={{
            padding: "7",
          }}
        >
          <Col md={7} className="container-col">
            <Header title="EDIT SALE ORDER" />
          </Col>

          <Col md={2} className="container-col">
            <div
              style={{
                // width: "100%",
                // marginLeft: "auto",
                marginRight: "34px",

                textAlign: "right",
              }}
            >
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
                  // textAlign: "right",
                }}
              >
                SO# {so_id_param}
              </label>
            </div>
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
                    Customer:
                  </label>
                  <div className="sale-input-div">
                    <div className="sale-input">
                      <input
                        className="input"
                        style={{
                          width: "100%",
                          height: "36px",
                        }}
                        type="text"
                        value={cusFlag}
                        readOnly
                        disabled
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
                          SHIP QTY
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            width: "135px",
                          }}
                        >
                          REQ DATE
                        </th>

                        <th
                          style={{
                            textAlign: "center",
                            width: "90px",
                          }}
                        >
                          SPEC QTY
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
                                  height: "64px",
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
                                id="shipment"
                                type="number"
                                min="0"
                                step="1.00"
                                style={{
                                  textAlign: "center",
                                  fontSize: "12px",
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
                            <div className="centered-input">
                              <input
                                className="input"
                                id="req_date"
                                type="date"
                                style={{
                                  textAlign: "center",
                                  fontSize: "12px",
                                }}
                                value={item.req_delivery_date}
                                // onClick={() =>
                                //   handleShipmentClick("req_date", index)
                                // }
                                onChange={(e) =>
                                  handleChangeReqDate(index, e.target.value)
                                }
                              />
                            </div>
                          </td>

                          <td>
                            <div className="centered-input">
                              <input
                                disabled={ppo_id}
                                className="input"
                                id="spec_order"
                                type="number"
                                min="0"
                                step="1.00"
                                style={{
                                  textAlign: "center",
                                  fontSize: "12px",
                                }}
                                value={item.spec_qty}
                                onClick={() =>
                                  handleSpecQtyClick("spec_qty", index)
                                }
                                onChange={(e) =>
                                  handleSpecQtyChange(index, e.target.value)
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
                        rowSpan="7"
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
                          <br />
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
                          {"%"}
                        </label>
                        <input
                          id="tax"
                          type="number"
                          step="1"
                          min="0"
                          max="100"
                          className="input table-sum-tb"
                          // defaultValue={0.0}
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
                      <td className="table-sum-label">SHIPPING:</td>
                      <td className="table-sum-cash">
                        <label
                          style={{
                            color: currentColor,
                          }}
                        >
                          {"$"}
                        </label>
                        <input
                          // defaultValue={0.0}
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
                          // defaultValue={0.0}
                          type="number"
                          name="shipment"
                          min="0"
                          step="1.00"
                          disabled
                          value={amount_paid}
                          onChange={handleChangeAmountPaid}
                          onClick={() => handleInputClick("amount_paid", -4)}
                          className="input table-sum-tb"
                          style={{
                            color: currentColor,
                            width: "140px",
                            background: "lightgray",
                          }}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="table-sum-label">RECEIVED IN:</td>
                      <td className="table-sum-cash">
                        <select
                          className="select table-sum-tb"
                          disabled={true}
                          style={{
                            color: currentColor,
                            margin: "0px",
                            width: "158px",
                            fontWeight: "500",
                            fontSize: "15px",
                            background: "lightgray",
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
            <div className="card-sale">
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
                    onClick={handlePrintOrderClick}
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
                    <div className="action-btn">CLOSE</div>
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
                  md={6}
                  className="container-col"
                  style={{ paddingRight: "5px", paddingBottom: "6px" }}
                >
                  <label
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Customer PO:
                  </label>
                  <input
                    type="text"
                    name="Customer_po"
                    value={projectname1}
                    onChange={handleChangeProjectName1}
                    placeholder="Customer PO"
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
                    placeholder="Sale Order Note: "
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
                {keypadButtons.map((number, index) => (
                  <Col md={4} className="container-col" key={index}>
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
          {/* {toggle && (
            <div className="overlay1">
              <Sidebar
                close={() => setToggle(false)}
                product_id={productID}
                store_id={store_id_param}
              />
            </div>
          )} */}
        </Row>
      </Container>
    </div>
  );
};
export default EditSaleOrder;
