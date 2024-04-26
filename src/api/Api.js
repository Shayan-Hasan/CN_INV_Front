import axios from "axios";

//const BASE_URL = "http://147.182.241.192:3001";
const BASE_URL = "http://localhost:3001";

export const LoginApi = async (username, password) => {
  try {
    //console.log("LoginApi");
    const response = await axios.post(`${BASE_URL}/login/userLogin`, {
      username: username,
      password: password,
    });
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const GetOrderProductDetailById = async (product_id, store_id) => {
  try {
    //console.log("GetOrderProductDetailById");
    const response = await axios.post(
      `${BASE_URL}/product/GetOrderProductDetailById`,
      {
        product_id: product_id,
        store_id: store_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllStoreDetails = async () => {
  try {
    //console.log("GetAllProducts");
    const response = await axios.get(
      `${BASE_URL}/stores/getAllStoreDetails`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetProductByStoreID = async (store_id) => {
  try {
    //console.log("GetProductByStoreID");
    const response = await axios.post(
      `${BASE_URL}/stores/getProductByStoreID`,
      {
        store_id: store_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllProductByStoreID = async (store_id) => {
  try {
    //console.log("getAllProductByStoreID");
    const response = await axios.post(
      `${BASE_URL}/stores/getAllProductByStoreID`,
      {
        store_id: store_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const getProductFilterSubString = async (store_id, sub_string, str) => {
  try {
    //console.log("getProductFilterSubString");
    const response = await axios.post(
      `${BASE_URL}/stores/getProductFilterSubString`,
      {
        store_id: store_id,
        sub_string: sub_string,
        str: str,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deletePayment = async (payment_id) => {
  try {
    //console.log("DeletePayment");
    const response = await axios.post(`${BASE_URL}/payment/deletePayment`, {
      payment_id: payment_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteJournalById = async (journal_id) => {
  try {
    //console.log("deleteJournalById");
    const response = await axios.post(`${BASE_URL}/journal/deleteJournalById`, {
      journal_id: journal_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const EditSaleOrderStatus = async (so_id) => {
  try {
    //console.log("EditSaleOrderStatus");
    const response = await axios.post(`${BASE_URL}/sale/EditSaleOrderStatus`, {
      so_id: so_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const EditPurchaseStatusBYPo_id = async (po_id, status_id) => {
  try {
    //console.log("EditPurchaseStatusBYPo_id");
    const response = await axios.post(
      `${BASE_URL}/purchase/EditPurchaseStatusBYPo_id`,
      {
        po_id: po_id,
        status_id: status_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const EditSaleOrderStatusBYSo_id = async (status_id, so_id) => {
  try {
    //console.log("EditSaleOrderStatusBYSo_id");
    const response = await axios.post(
      `${BASE_URL}/sale/EditSaleOrderStatusBYSo_id`,
      {
        so_id: so_id,
        status_id: status_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetProductsByStoreVendorId = async (store_id, vendor_id) => {
  try {
    //console.log("GetProductsByStoreVendorId");
    console.log(store_id + " cssc " + vendor_id);
    const response = await axios.post(
      `${BASE_URL}/purchase/getProductsByStoreVendorId`,
      {
        store_id: store_id,
        vendor_id: vendor_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetProductById = async (product_id) => {
  try {
    //console.log("GetProductById");
    const response = await axios.post(`${BASE_URL}/product/getProductById`, {
      product_id: product_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const CheckDefaultAcc = async (account_id) => {
  try {
    //console.log("CheckDefaultAcc");
    const response = await axios.post(`${BASE_URL}/account/CheckDefaultAcc`, {
      account_id: account_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const CheckProdNameCodeExist = async (name, code) => {
  try {
    //console.log("CheckProdNameCodeExist");
    const response = await axios.post(
      `${BASE_URL}/product/CheckProdNameCodeExist`,
      {
        name: name,
        code: code,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const CheckAccNameExist = async (name) => {
  try {
    //console.log("CheckAccNameExist");
    const response = await axios.post(`${BASE_URL}/account/CheckAccNameExist`, {
      name: name,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const CheckVendNameExist = async (name) => {
  try {
    //console.log("CheckVendNameExist");
    const response = await axios.post(
      `${BASE_URL}/supplier/CheckVendNameExist`,
      {
        name: name,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const CheckCusNameExist = async (name) => {
  try {
    //console.log("CheckCusNameExist");
    const response = await axios.post(
      `${BASE_URL}/customer/CheckCusNameExist`,
      {
        name: name,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const CheckEmpNameExist = async (name) => {
  try {
    //console.log("CheckAccNameExist");
    const response = await axios.post(
      `${BASE_URL}/employee/CheckEmpNameExist`,
      {
        name: name,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllManagersByID = async (employee_id) => {
  try {
    //console.log("getAllManagersByID");
    const response = await axios.post(
      `${BASE_URL}/employee/getAllManagersByID`,
      {
        employee_id: employee_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const CheckStoreNameExist = async (name) => {
  try {
    //console.log("CheckStoreNameExist");
    const response = await axios.post(
      `${BASE_URL}/stores/CheckStoreNameExist`,
      {
        name: name,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetProductImagesById = async (product_id) => {
  try {
    //console.log("GetProductImagesById");
    const response = await axios.post(
      `${BASE_URL}/product/getProductImagesById`,
      {
        product_id: product_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetProductVideoById = async (product_id) => {
  try {
    //console.log("GetProductVideoById");
    const response = await axios.post(
      `${BASE_URL}/product/getProductVideoById`,
      {
        product_id: product_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetProductByIdSale = async (product_id) => {
  try {
    //console.log("GetProductByIdSale");
    const response = await axios.post(
      `${BASE_URL}/product/getProductByIdSale`,
      {
        product_id: product_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetCustomerById = async (customer_id) => {
  try {
    //console.log("GetCustomerById");
    const response = await axios.post(`${BASE_URL}/customer/getCustomerByID`, {
      customer_id: customer_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllSalesByID = async (store_id, est_sale) => {
  try {
    //console.log("GetAllSalesByID");
    const response = await axios.post(`${BASE_URL}/sale/getAllSalesByID`, {
      store_id: store_id,
      est_sale: est_sale,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const getAllSalesByCusID = async (store_id, est_sale, customer_id) => {
  try {
    //console.log("getAllSalesByCusID");
    const response = await axios.post(`${BASE_URL}/sale/getAllSalesByCusID`, {
      store_id: store_id,
      est_sale: est_sale,
      customer_id: customer_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetSpecialOrderDetail = async (store_id, vendor_id) => {
  try {
    //console.log("GetSpecialOrderDetail", store_id, vendor_id);
    const response = await axios.post(
      `${BASE_URL}/special/GetSpecialOrderDetail`,
      {
        store_id: store_id,
        vendor_id: vendor_id,
      }
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const SpecialOrderApi = async (store_id) => {
  try {
    //console.log("SpecialOrder");
    const response = await axios.post(`${BASE_URL}/supplier/SpecialOrder`, {
      store_id: store_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetSpecialOrderProdDetail = async (store_id, vendor_id) => {
  try {
    //console.log("SpecialOrder");
    const response = await axios.post(
      `${BASE_URL}/purchase/GetSpecialOrderProdDetail`,
      {
        store_id: store_id,
        vendor_id: vendor_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const GetSpecialOrderProdByStoreID = async (store_id, vendor_id) => {
  try {
    //console.log("GetSpecialOrderProdByStoreID");
    const response = await axios.post(
      `${BASE_URL}/special/GetSpecialOrderProdByStoreID`,
      {
        store_id: store_id,
        vendor_id: vendor_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetInvoiceProdBySoId = async (so_id) => {
  try {
    //console.log("GetInvoiceProdBySoId");
    const response = await axios.post(
      `${BASE_URL}/Invoice/GetInvoiceProdBySoId`,
      {
        so_id: so_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const GetPOProdByPoId = async (po_id) => {
  try {
    //console.log("GetPOProdByPoId");
    const response = await axios.post(`${BASE_URL}/Invoice/GetPOProdByPoId`, {
      po_id: po_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetInvoiceDetailBySoId = async (so_id) => {
  try {
    //console.log("GetInvoiceDetailBySoId");
    const response = await axios.post(
      `${BASE_URL}/Invoice/GetInvoiceDetailBySoId`,
      {
        so_id: so_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const GetPODetailByPoId = async (po_id) => {
  try {
    //console.log("GetPODetailByPoId");
    const response = await axios.post(`${BASE_URL}/Invoice/GetPODetailByPoId`, {
      po_id: po_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllPurchaseByID = async (store_id) => {
  try {
    //console.log("GetAllPurchaseByID");
    const response = await axios.post(
      `${BASE_URL}/purchase/getAllPurchaseByID`,
      {
        store_id: store_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllPurchaseByVenID = async (store_id, vendor_id) => {
  try {
    //console.log("getAllPurchaseByVenID");
    const response = await axios.post(
      `${BASE_URL}/purchase/getAllPurchaseByVenID`,
      {
        store_id: store_id,
        vendor_id: vendor_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetSaleOrderDetailShipmentByID = async (so_id) => {
  try {
    //console.log("GetSaleOrderDetailShipmentByID");
    const response = await axios.post(
      `${BASE_URL}/sale/getSaleOrderDetailShipmentByID`,
      {
        so_id: so_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetPurchaseOrderDetailRecByID = async (po_id) => {
  try {
    //console.log("GetPurchaseOrderDetailRecByID");
    const response = await axios.post(
      `${BASE_URL}/purchase/getPurchaseOrderDetailRecByID`,
      {
        po_id: po_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetShipmentSaleOrderByID = async (so_id) => {
  try {
    //console.log("GetShipmentSaleOrderByID");
    const response = await axios.post(
      `${BASE_URL}/sale/getShipmentSaleOrderByID`,
      {
        so_id: so_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetReceiveLogPurchaseOrderByID = async (po_id, store_id) => {
  try {
    //console.log("GetReceiveLogPurchaseOrderByID");
    const response = await axios.post(
      `${BASE_URL}/purchase/getReceiveLogPurchaseOrderByID`,
      {
        po_id: po_id,
        store_id: store_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetShipmentProductsBySO_ID = async (so_id, store_id) => {
  try {
    //console.log("GetShipmentProductsBySO_ID");
    const response = await axios.post(
      `${BASE_URL}/sale/getShipmentProductsBySO_ID`,
      {
        so_id: so_id,
        store_id: store_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetReceiveProductsByPO_ID = async (po_id, store_id) => {
  try {
    //console.log("GetReceiveProductsByPO_ID");
    const response = await axios.post(
      `${BASE_URL}/purchase/getReceiveProductsByPO_ID`,
      {
        po_id: po_id,
        store_id: store_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetSaleOrderDetail = async (so_id) => {
  try {
    //console.log("GetSaleOrderDetail");
    const response = await axios.post(`${BASE_URL}/sale/getSaleOrderDetail`, {
      so_id: so_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetPurchaseOrderDetail = async (po_id) => {
  try {
    //console.log("GetPurchaseOrderDetail");
    const response = await axios.post(
      `${BASE_URL}/purchase/getPurchaseOrderDetail`,
      {
        po_id: po_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetSaleCustomerById = async (customer_id) => {
  try {
    //console.log("GetSaleCustomerById");
    const response = await axios.post(`${BASE_URL}/sale/getCustomerByID`, {
      customer_id: customer_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const DeleteEditSaleOrderProduct = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/sale/deleteEditSaleOrderProduct`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const DeleteEditPurchaseOrderProduct = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/purchase/deleteEditPurchaseOrderProduct`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const GetSupplierById = async (supplier_id) => {
  try {
    //console.log("GetSupplierById");
    const response = await axios.post(`${BASE_URL}/supplier/getSupplierByID`, {
      supplier_id: supplier_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const GetVendorIDProductsDetail = async (vendor_id) => {
  try {
    //console.log("GetVendorIDProductsDetail");
    const response = await axios.post(
      `${BASE_URL}/supplier/GetVendorIDProductsDetail`,
      {
        vendor_id: vendor_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetStoreByID = async (store_id) => {
  try {
    //console.log("getStoreByID");
    const response = await axios.post(`${BASE_URL}/stores/getStoreByID`, {
      store_id: store_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const CheckStoreBeforeDel = async (store_id) => {
  try {
    //console.log("CheckStoreBeforeDel");
    const response = await axios.post(
      `${BASE_URL}/stores/CheckStoreBeforeDel`,
      {
        store_id: store_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const DelStore = async (store_id) => {
  try {
    //console.log("DelStore");
    const response = await axios.post(`${BASE_URL}/stores/DelStore`, {
      store_id: store_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const CheckProductBeforeDel = async (product_id) => {
  try {
    //console.log("CheckProductBeforeDel");
    const response = await axios.post(
      `${BASE_URL}/product/CheckProductBeforeDel`,
      {
        product_id: product_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const DelProduct = async (product_id) => {
  try {
    //console.log("DelProduct");
    const response = await axios.post(`${BASE_URL}/product/DelProduct`, {
      product_id: product_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getProductsByFilter = async (unit_id, brand_id, category_id) => {
  try {
    //console.log("getProductsByFilter");
    const response = await axios.post(
      `${BASE_URL}/product/getProductsByFilter`,
      {
        unit_id: unit_id,
        brand_id: brand_id,
        category_id: category_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllProducts = async () => {
  try {
    //console.log("GetAllProducts");
    const response = await axios.get(`${BASE_URL}/product/getallproducts`, {});
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllProductListSup = async () => {
  try {
    //console.log("GetAllProducts");
    const response = await axios.get(
      `${BASE_URL}/product/GetAllProductListSup`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllProductsInv = async () => {
  try {
    //console.log("GetAllProductsInv");
    const response = await axios.get(
      `${BASE_URL}/product/getAllProductsInv`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const GetVendorDetail = async (vendor_id) => {
  try {
    //console.log("GetVendorDetail");
    const response = await axios.post(`${BASE_URL}/supplier/GetVendorDetail`, {
      vendor_id: vendor_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const GetAssignedProductDetailById = async (vendor_id) => {
  try {
    //console.log("GetAssignedProductDetailById");
    const response = await axios.post(
      `${BASE_URL}/product/GetAssignedProductDetailById`,
      {
        vendor_id: vendor_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const ProductInAllStores = async (product_id) => {
  try {
    //console.log("ProductInAllStores");
    const response = await axios.post(
      `${BASE_URL}/product/ProductInAllStores`,
      {
        product_id: product_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetShipmentDetailByid = async (so_id) => {
  try {
    //console.log("GetShipmentDetailByid");
    const response = await axios.post(
      `${BASE_URL}/sale/GetShipmentDetailByid`,
      {
        so_id: so_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetReceiveLogDetailByid = async (po_id) => {
  try {
    //console.log("GetReceiveLogDetailByid");
    const response = await axios.post(
      `${BASE_URL}/purchase/GetReceiveLogDetailByid`,
      {
        po_id: po_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetProductNameCode = async () => {
  try {
    //console.log("getProductNameCode");
    const response = await axios.get(
      `${BASE_URL}/product/getProductNameCode`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetProductNameCodeInv = async () => {
  try {
    //console.log("GetProductNameCodeInv");
    const response = await axios.get(
      `${BASE_URL}/product/getProductNameCodeInv`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const EditStoreApi = async (
  store_id,
  name,
  email,
  contact,
  manager_id,
  location_id,
  street_address,
  city,
  state,
  postal_code,
  tax
) => {
  try {
    const response = await axios.put(`${BASE_URL}/stores/editStoreApi`, {
      store_id: store_id,
      name: name,
      email: email,
      contact: contact,
      manager_id: manager_id,
      location_id: location_id,
      street_address: street_address,
      city: city,
      state: state,
      postal_code: postal_code,
      tax: tax,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const GetopeningBal = async (product_id, store_id) => {
  try {
    //console.log("GetopeningBal");
    const headers = {
      "Content-Type": "application/json",
      product_id: product_id,
      store_id: store_id,
    };
    const response = await axios.get(`${BASE_URL}/inventory/getopeningBal`, {
      headers,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetinvStock = async (product_id, store_id) => {
  try {
    //console.log("GetinvStock");
    const headers = {
      "Content-Type": "application/json",
      product_id: product_id,
      store_id: store_id,
    };
    const response = await axios.get(`${BASE_URL}/inventory/getinvStock`, {
      headers,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const Ledger_GetopeningBal = async (account_id, type_id) => {
  try {
    //console.log("Ledger_GetopeningBal");
    const headers = {
      "Content-Type": "application/json",
      account_id: account_id,
      type_id: type_id,
    };
    const response = await axios.get(`${BASE_URL}/account/getopeningBal`, {
      headers,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const Verifyopeningbalexist = async (product_id, store_id) => {
  try {
    //console.log("Verifyopeningbalexist");
    const headers = {
      "Content-Type": "application/json",
      product_id: product_id,
      store_id: store_id,
    };
    const response = await axios.get(
      `${BASE_URL}/inventory/verifyopeningbalexist`,
      {
        headers,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const Ledger_Verifyopeningbalexist = async (account_id, type_id) => {
  try {
    //console.log("Ledger_Verifyopeningbalexist");
    const headers = {
      "Content-Type": "application/json",
      account_id: account_id,
      type_id: type_id,
    };
    const response = await axios.get(
      `${BASE_URL}/account/verifyopeningbalexist`,
      {
        headers,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllInventory = async () => {
  try {
    //console.log("GetAllInventory");
    const response = await axios.get(
      `${BASE_URL}/inventory/getallinventory`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetProductsByStoreId = async (store_id) => {
  try {
    //console.log("GetProductNameIdCode");
    //console.log(store_id);
    const headers = {
      "Content-Type": "application/json",
      store_id: store_id,
    };
    const response = await axios.get(
      `${BASE_URL}/product/getProductsByStoreId`,
      {
        headers,
      }
    );
    // console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetEmployeeById = async (employee_id) => {
  try {
    //console.log("GetEmployeeById");
    const response = await axios.post(`${BASE_URL}/employee/getEmployeeByID`, {
      employee_id: employee_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAccountByID = async (account_id) => {
  try {
    //console.log("GetAccountByID");
    const response = await axios.post(`${BASE_URL}/account/getAccountByID`, {
      account_id: account_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetSaleOrderDetailsByID = async (so_id) => {
  try {
    //console.log("GetSaleOrderDetailsByID");
    const response = await axios.post(
      `${BASE_URL}/sale/getSaleOrderDetailsByID`,
      {
        so_id: so_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const GetPurchaseOrderDetailsByID = async (po_id) => {
  try {
    //console.log("GetPurchaseOrderDetailsByID");
    const response = await axios.post(
      `${BASE_URL}/purchase/getPurchaseOrderDetailsByID`,
      {
        po_id: po_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetSaleOrderCustomerByID = async (so_id) => {
  try {
    //console.log("GetSaleOrderCustomerByID");
    const response = await axios.post(
      `${BASE_URL}/sale/getSaleOrderCustomerByID`,
      {
        so_id: so_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getSaleCusBalByID = async (customer_id) => {
  try {
    //console.log("getSaleCusBalByID");
    const response = await axios.post(`${BASE_URL}/sale/getSaleCusBalByID`, {
      customer_id: customer_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAccToIdBySaleOrder = async (so_id) => {
  try {
    //console.log("GetAccToIdBySaleOrder");
    const response = await axios.post(
      `${BASE_URL}/sale/GetAccToIdBySaleOrder`,
      {
        so_id: so_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAccToIdBySaleOrder1 = async (so_id) => {
  try {
    //console.log("GetAccToIdBySaleOrder1");
    const response = await axios.post(
      `${BASE_URL}/sale/GetAccToIdBySaleOrder1`,
      {
        so_id: so_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAccToIdByPusOrder = async (po_id) => {
  try {
    //console.log("GetAccToIdByPusOrder");
    const response = await axios.post(
      `${BASE_URL}/purchase/GetAccToIdByPusOrder`,
      {
        po_id: po_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetPurchaseOrderVendorByID = async (po_id) => {
  try {
    //console.log("GetPurchaseOrderVendorByID");
    const response = await axios.post(
      `${BASE_URL}/purchase/getPurchaseOrderVendorByID`,
      {
        po_id: po_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetPaymentDetailByID = async (payment_id) => {
  try {
    console.log(payment_id);
    const response = await axios.post(
      `${BASE_URL}/payment/getPaymentDetailByID`,
      {
        payment_id: payment_id,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetVendorList = async () => {
  try {
    // console.log(payment_id);
    const response = await axios.post(`${BASE_URL}/special/GetVendorList`, {});
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllCustomers = async () => {
  try {
    //console.log("GetAllCustomers");
    const response = await axios.get(
      `${BASE_URL}/customer/getAllCustomers`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllCustomersName = async () => {
  try {
    //console.log("GetAllCustomersName");
    const response = await axios.get(
      `${BASE_URL}/customer/getAllCustomersName`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllVendorsName = async () => {
  try {
    //console.log("GetAllVendorsName");
    const response = await axios.get(
      `${BASE_URL}/supplier/getAllVendorsName`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllSuppliers = async () => {
  try {
    //console.log("GetAllSuppliers");
    const response = await axios.get(`${BASE_URL}/supplier/getAllSupplier`, {});
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllStores = async () => {
  try {
    //console.log("GetAllStores");
    const response = await axios.get(`${BASE_URL}/stores/getAllStores`, {});
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllManagers = async () => {
  try {
    //console.log("GetAllManagers");
    const response = await axios.get(`${BASE_URL}/employee/getAllManagers`, {});
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllAccountTypes = async () => {
  try {
    //console.log("GetAllAccountTypes");
    const response = await axios.get(
      `${BASE_URL}/account/GetAllAccountTypes`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllPaymentDetail = async () => {
  try {
    //console.log("GetAllPaymentDetail");
    const response = await axios.get(
      `${BASE_URL}/payment/getAllPaymentDetail`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllJournals = async () => {
  try {
    //console.log("getAllJournals");
    const response = await axios.get(`${BASE_URL}/journal/getAllJournals`, {});
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllPaymentDetail_Pay = async () => {
  try {
    //console.log("GetAllPaymentDetail_Pay");
    const response = await axios.get(
      `${BASE_URL}/payment/getAllPaymentDetail_Pay`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAccNamesCash = async () => {
  try {
    //console.log("getAccNamesCash");
    const response = await axios.get(`${BASE_URL}/payment/getAccNamesCash`, {});
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAccNameCusVen = async () => {
  try {
    //console.log("getAccNameCusVen");
    const response = await axios.get(
      `${BASE_URL}/payment/getAccNameCusVen`,
      {}
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAcc1BalFrom = async (account_id) => {
  try {
    //console.log("getAcc1BalFrom");
    const response = await axios.post(`${BASE_URL}/payment/getAcc1BalFrom`, {
      account_id: account_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetTaxByStoreId = async (store_id) => {
  try {
    //console.log("GetTaxByStoreId");
    const response = await axios.post(`${BASE_URL}/sale/GetTaxByStoreId`, {
      store_id: store_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getJournalById = async (journal_id) => {
  try {
    //console.log("getJournalById");
    const response = await axios.post(`${BASE_URL}/journal/getJournalById`, {
      journal_id: journal_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllEmployees = async () => {
  try {
    //console.log("GetAllEmployees");
    const response = await axios.get(
      `${BASE_URL}/employee/getAllEmployees`,
      {}
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const DeleteUnitById = async (unit_id) => {
  try {
    //console.log("DeleteUnitById");
    const response = await axios.post(`${BASE_URL}/unit/deleteunitbyid`, {
      unit_id: unit_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const AddUnitApi = async (names) => {
  try {
    //console.log("AddUnit");
    //console.log(names);
    const response = await axios.post(`${BASE_URL}/unit/addUnit`, {
      name: names,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const DeleteCategoryById = async (category_id) => {
  try {
    //console.log("DeleteCategoryById");
    //console.log(category_id);
    const response = await axios.post(
      `${BASE_URL}/category/deletecategorybyid`,
      {
        category_id: category_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const AddCategoryApi = async (names) => {
  try {
    //console.log("AddCategoryApi");
    //console.log(names);
    const response = await axios.post(`${BASE_URL}/category/addCategory`, {
      name: names,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const DeleteBrandById = async (brand_id) => {
  try {
    //console.log("DeleteBrandById");
    //console.log(brand_id);
    const response = await axios.post(`${BASE_URL}/brand/deletebrandbyid`, {
      brand_id: brand_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const AddBrandApi = async (names) => {
  try {
    //console.log("AddBrandApi");
    //console.log(names);
    const response = await axios.post(`${BASE_URL}/brand/addBrand`, {
      name: names,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const CheckAccDeleteStatus = async (account_id) => {
  try {
    //console.log("CheckAccDeleteStatus");
    // console.log(names);
    const response = await axios.post(
      `${BASE_URL}/account/CheckAccDeleteStatus`,
      {
        account_id: account_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const DeleteAccount = async (account_id) => {
  try {
    //console.log("DeleteAccount");
    // console.log(names);
    const response = await axios.post(`${BASE_URL}/account/DeleteAccount`, {
      account_id: account_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const CheckCusDeleteStatus = async (customer_id) => {
  try {
    //console.log("CheckCusDeleteStatus");
    // console.log(names);
    const response = await axios.post(
      `${BASE_URL}/customer/CheckCusDeleteStatus`,
      {
        customer_id: customer_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const DeleteCustomer = async (customer_id) => {
  try {
    //console.log("DeleteAccount");
    // console.log(names);
    const response = await axios.post(`${BASE_URL}/customer/DeleteCustomer`, {
      customer_id: customer_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const DeleteEmp = async (employee_id) => {
  try {
    //console.log("DeleteEmp");
    // console.log(names);
    const response = await axios.post(`${BASE_URL}/employee/DeleteEmp`, {
      employee_id: employee_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const CheckVenDeleteStatus = async (vendor_id) => {
  try {
    //console.log("CheckVenDeleteStatus");
    // console.log(names);
    const response = await axios.post(
      `${BASE_URL}/supplier/CheckVenDeleteStatus`,
      {
        vendor_id: vendor_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const DeleteVendor = async (vendor_id) => {
  try {
    //console.log("DeleteVendor");
    // console.log(names);
    const response = await axios.post(`${BASE_URL}/supplier/DeleteVendor`, {
      vendor_id: vendor_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const AddAccountOpeningBal = async (
  acc_name,
  acc_description,
  acc_type_id,
  acc_notes,
  ledger_notes,
  opening_balance,
  ledger_date,
  ledger_type_id
) => {
  try {
    //console.log("AddAccountOpeningBal");
    const response = await axios.post(
      `${BASE_URL}/account/AddAccountOpeningBal`,
      {
        acc_name: acc_name,
        acc_description: acc_description,
        acc_type_id: acc_type_id,
        acc_notes: acc_notes,
        ledger_notes: ledger_notes,
        opening_balance: opening_balance,
        ledger_date: ledger_date,
        ledger_type_id: ledger_type_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const AddSpecialOrder = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/special/AddSpecialOrder`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditSpecialOrder = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/special/EditSpecialOrder`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditAccountOpeningBal = async (
  account_id,
  acc_name,
  acc_description,
  acc_type_id,
  acc_notes,
  ledger_notes,
  opening_balance,
  ledger_date,
  ledger_type_id
) => {
  try {
    //console.log("EditAccountOpeningBal");
    const response = await axios.put(
      `${BASE_URL}/account/EditAccountOpeningBal`,
      {
        account_id: account_id,
        acc_name: acc_name,
        acc_description: acc_description,
        acc_type_id: acc_type_id,
        acc_notes: acc_notes,
        ledger_notes: ledger_notes,
        opening_balance: opening_balance,
        ledger_date: ledger_date,
        ledger_type_id: ledger_type_id,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const DeleteProductById = async (unit_id) => {
  try {
    //console.log("DeleteUnitById");
    const response = await axios.get(`${BASE_URL}/unit/deleteunitbyid?id`, {
      unit_id: unit_id,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const AddProductApi = async (
  ProductName,
  ProductCode,
  Details,
  Discount,
  UnitPrice,
  Unit,
  Brand,
  Category,
  DisplayProduct,
  ActiveProduct,
  video,
  cost_price
) => {
  try {
    const formData = new FormData();
    formData.append("video", video);
    formData.append("name", ProductName);
    formData.append("code", ProductCode);
    formData.append("details", Details);
    formData.append("unit_price", UnitPrice);
    formData.append("discount", Discount);
    formData.append("unit_id", Unit);
    formData.append("brand_id", Brand);
    formData.append("category_id", Category);
    formData.append("display_product", DisplayProduct);
    formData.append("active_product", ActiveProduct);
    formData.append("cost_price", cost_price);
    const response = await axios.post(
      `${BASE_URL}/product/addproduct`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const AddProductImage = async (product_id, ProductImage) => {
  try {
    //console.log("addapi here");
    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("product_image", ProductImage);
    //console.log(formData);
    const response = await axios.post(
      `${BASE_URL}/product/addProductImage`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const AddSaleOrderApi = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/sale/addSaleOrder`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditSpecialOrderPurchase = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/special/EditSpecialOrderPurchase`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const addAssignProductVen = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/supplier/addAssignProductVen`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const addJournalApi = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/journal/addJournal`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const editJournalApi = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/journal/editJournal`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const AddEstimationApi = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/sale/addEstimation`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const AddPurchaseOrderApi = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/purchase/addPurchaseOrder`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditSaleOrderApi = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/sale/EditSaleOrder`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const ConvertEst = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/sale/ConvertEst`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditEstimationApi = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/sale/EditEstimation`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditPurchaseOrderAPi = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/purchase/EditPurchaseOrder`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditShipment = async (JsonObject) => {
  try {
    //console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/sale/EditShipment`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditReceive_Log = async (JsonObject) => {
  try {
    //console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/purchase/EditReceive_Log`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const RemoveProd_fromShipmentTrans = async (JsonObject) => {
  try {
    // console.log(JSON.stringify(JsonObject));
    const response = await axios.post(
      `${BASE_URL}/sale/RemoveProd_fromShipmentTrans`,
      JsonObject,
      {}
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditProductApi = async (
  product_id,
  code,
  name,
  details,
  unit_price,
  discount,
  unit_id,
  category_id,
  brand_id,
  display_product,
  active_product,
  video,
  flag
) => {
  try {
    //console.log("EditProductApi");

    const formData = new FormData();
    formData.append("video", video);
    formData.append("name", name);
    formData.append("code", code);
    formData.append("details", details);
    formData.append("unit_price", unit_price);
    formData.append("discount", discount);
    formData.append("unit_id", unit_id);
    formData.append("brand_id", brand_id);
    formData.append("category_id", category_id);
    formData.append("display_product", display_product);
    formData.append("active_product", active_product);
    formData.append("product_id", product_id);
    formData.append("flag", flag);

    const response = await axios.put(
      `${BASE_URL}/product/editProductApi`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditProductImagesById = async (image_id, ProductImage) => {
  try {
    //console.log("EditProductImagesById");
    const formData = new FormData();
    formData.append("image_id", image_id);
    formData.append("product_image", ProductImage);
    //console.log(formData);
    const response = await axios.post(
      `${BASE_URL}/product/editProductImagesById`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const AddOpeningBalance = async (
  store_id,
  product_id,
  min_stock,
  max_stock,
  opening_balance,
  t_type_id,
  t_note
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/inventory/AddOpeningBalance`,
      {
        store_id: store_id,
        product_id: product_id,
        min_stock: min_stock,
        max_stock: max_stock,
        opening_balance: opening_balance,
        t_type_id: t_type_id,
        t_note: t_note,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const Ledger_AddOpeningBalance = async (
  account_id,
  opening_balance,
  date,
  type_id,
  note
) => {
  try {
    const response = await axios.post(`${BASE_URL}/account/AddOpeningBalance`, {
      account_id: account_id,
      opening_balance: opening_balance,
      date: date,
      type_id: type_id,
      note: note,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const AddCustomerApi = async (
  name,
  phone,
  email,
  website,
  contact_name,
  contact_phone,
  contact_email,
  profile,
  note,
  b_street,
  b_city,
  b_state,
  b_zip,
  b_country,
  b_phone1,
  b_phone2,
  s_street,
  s_city,
  s_state,
  s_zip,
  s_country,
  attention_name,
  s_phone,
  acc_name,
  acc_type_id,
  type_id,
  opening_balance
) => {
  try {
    console.log(profile);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("website", website);
    formData.append("contact_name", contact_name);
    formData.append("contact_phone", contact_phone);
    formData.append("contact_email", contact_email);
    formData.append("profile", profile);
    formData.append("notes", note);
    formData.append("b_street", b_street);
    formData.append("b_city", b_city);
    formData.append("b_state", b_state);
    formData.append("b_zip", b_zip);
    formData.append("b_country", b_country);
    formData.append("b_phone1", b_phone1);
    formData.append("b_phone2", b_phone2);
    formData.append("s_street", s_street);
    formData.append("s_city", s_city);
    formData.append("s_state", s_state);
    formData.append("s_zip", s_zip);
    formData.append("s_country", s_country);
    formData.append("s_attention_name", attention_name);
    formData.append("s_phone", s_phone);
    formData.append("acc_name", acc_name);
    formData.append("acc_type_id", acc_type_id);
    formData.append("type_id", type_id);
    formData.append("opening_balance", opening_balance);

    const response = await axios.post(
      `${BASE_URL}/customer/addCustomer`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const AddSupplierApi = async (
  name,
  phone,
  website,
  contact_name,
  contact_phone,
  contact_email,
  profile,
  note,
  r_street,
  r_city,
  r_state,
  r_zip,
  r_country,
  r_phone,
  s_street,
  s_city,
  s_state,
  s_zip,
  s_country,
  attention_name,
  s_phone,
  acc_type_id,
  type_id,
  opening_balance
) => {
  try {
    //console.log("hello");
    //console.log(profile);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("website", website);
    formData.append("contact_name", contact_name);
    formData.append("contact_phone", contact_phone);
    formData.append("contact_email", contact_email);
    formData.append("profile", profile);
    formData.append("notes", note);
    formData.append("r_street", r_street);
    formData.append("r_city", r_city);
    formData.append("r_state", r_state);
    formData.append("r_zip", r_zip);
    formData.append("r_country", r_country);
    formData.append("r_phone", r_phone);
    formData.append("s_street", s_street);
    formData.append("s_city", s_city);
    formData.append("s_state", s_state);
    formData.append("s_zip", s_zip);
    formData.append("s_country", s_country);
    formData.append("s_attention_name", attention_name);
    formData.append("acc_type_id", acc_type_id);
    formData.append("s_phone", s_phone);
    formData.append("type_id", type_id);
    formData.append("opening_balance", opening_balance);

    const response = await axios.post(
      `${BASE_URL}/supplier/addSupplier`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditSupplierApi = async (
  supplier_id,
  name,
  phone,
  website,
  contact_name,
  contact_phone,
  contact_email,
  profile,
  note,
  r_id,
  r_street,
  r_city,
  r_state,
  r_zip,
  r_country,
  r_phone,
  s_id,
  s_street,
  s_city,
  s_state,
  s_zip,
  s_country,
  attention_name,
  s_phone,
  account_id,
  acc_type_id,
  type_id,
  opening_balance
) => {
  try {
    //console.log("EditSupplierApi");

    const formData = new FormData();
    formData.append("supplier_id", supplier_id);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("website", website);
    formData.append("contact_name", contact_name);
    formData.append("contact_phone", contact_phone);
    formData.append("contact_email", contact_email);
    formData.append("profile", profile);
    formData.append("notes", note);
    formData.append("remitting_address_id", r_id);
    formData.append("r_street", r_street);
    formData.append("r_city", r_city);
    formData.append("r_state", r_state);
    formData.append("r_zip", r_zip);
    formData.append("r_country", r_country);
    formData.append("r_phone", r_phone);
    formData.append("shipping_address_id", s_id);
    formData.append("s_street", s_street);
    formData.append("s_city", s_city);
    formData.append("s_state", s_state);
    formData.append("s_zip", s_zip);
    formData.append("s_country", s_country);
    formData.append("s_attention_name", attention_name);
    formData.append("s_phone", s_phone);
    formData.append("account_id", account_id);
    formData.append("acc_type_id", acc_type_id);
    formData.append("type_id", type_id);
    formData.append("opening_balance", opening_balance);

    //console.log(formData);
    const response = await axios.put(
      `${BASE_URL}/supplier/editSupplier`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditCustomerApi = async (
  customer_id,
  name,
  phone,
  email,
  website,
  contact_name,
  contact_phone,
  contact_email,
  profile,
  note,
  b_id,
  b_street,
  b_city,
  b_state,
  b_zip,
  b_country,
  b_phone1,
  b_phone2,
  s_id,
  s_street,
  s_city,
  s_state,
  s_zip,
  s_country,
  attention_name,
  s_phone,
  account_id,
  acc_type_id,
  type_id,
  opening_balance
) => {
  try {
    //console.log("EditCustomerApi");

    const formData = new FormData();
    formData.append("customer_id", customer_id);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("website", website);
    formData.append("contact_name", contact_name);
    formData.append("contact_phone", contact_phone);
    formData.append("contact_email", contact_email);
    formData.append("profile", profile);
    formData.append("notes", note);
    formData.append("billing_address_id", b_id);
    formData.append("b_street", b_street);
    formData.append("b_city", b_city);
    formData.append("b_state", b_state);
    formData.append("b_zip", b_zip);
    formData.append("b_country", b_country);
    formData.append("b_phone1", b_phone1);
    formData.append("b_phone2", b_phone2);
    formData.append("shipping_address_id", s_id);
    formData.append("s_street", s_street);
    formData.append("s_city", s_city);
    formData.append("s_state", s_state);
    formData.append("s_zip", s_zip);
    formData.append("s_country", s_country);
    formData.append("s_attention_name", attention_name);
    formData.append("s_phone", s_phone);
    formData.append("account_id", account_id);
    formData.append("acc_type_id", acc_type_id);
    formData.append("type_id", type_id);
    formData.append("opening_balance", opening_balance);

    //console.log(formData);
    const response = await axios.put(
      `${BASE_URL}/customer/editCustomer`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const AddStoreApi = async (
  name,
  email,
  contact,
  manager_id,
  street_address,
  city,
  state,
  postal_code,
  tax
) => {
  try {
    const response = await axios.post(`${BASE_URL}/stores/addStore`, {
      name: name,
      email: email,
      contact: contact,
      manager_id: manager_id,
      street_address: street_address,
      city: city,
      state: state,
      postal_code: postal_code,
      tax: tax,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const addPayment = async (
  acc_from_id,
  acc_to_id,
  opening_balance,
  acc_notes,
  from_acc_bal,
  type_id,
  to_acc_bal
) => {
  try {
    const response = await axios.post(`${BASE_URL}/payment/addPayment`, {
      acc_from_id: acc_from_id,
      acc_to_id: acc_to_id,
      opening_balance: opening_balance,
      acc_notes: acc_notes,
      from_acc_bal: from_acc_bal,
      type_id: type_id,
      to_acc_bal: to_acc_bal,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const editPayment = async (
  payment_id,
  acc_from_id,
  acc_to_id,
  acc_from_id1,
  acc_to_id1,
  amount_paid,
  acc_notes,
  from_acc_bal,
  to_acc_bal
) => {
  try {
    const response = await axios.post(`${BASE_URL}/payment/editPayment`, {
      payment_id: payment_id,
      acc_from_id: acc_from_id,
      acc_to_id: acc_to_id,
      acc_from_id1: acc_from_id1,
      acc_to_id1: acc_to_id1,
      amount_paid: amount_paid,
      acc_notes: acc_notes,
      from_acc_bal: from_acc_bal,
      to_acc_bal: to_acc_bal,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const AddEmployeeApi = async (
  name,
  email,
  contact,
  hire_date,
  manager_id,
  salary,
  store_id,
  street_address,
  city,
  state,
  postal_code,
  acc_type_id,
  acc_notes,
  opening_balance
) => {
  try {
    const response = await axios.post(`${BASE_URL}/employee/addEmployee`, {
      name: name,
      email: email,
      contact: contact,
      hire_date: hire_date,
      manager_id: manager_id,
      salary: salary,
      store_id: store_id,
      street_address: street_address,
      city: city,
      state: state,
      postal_code: postal_code,
      acc_type_id: acc_type_id,
      acc_notes: acc_notes,
      opening_balance: opening_balance,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditEmployeeApi = async (
  employee_id,
  name,
  email,
  contact,
  hire_date,
  manager_id,
  salary,
  location_id,
  store_id,
  street_address,
  city,
  state,
  postal_code,
  account_id,
  acc_type_id,
  acc_notes,
  opening_balance,
  ledger_type_id
) => {
  try {
    const response = await axios.put(`${BASE_URL}/employee/editEmployee`, {
      employee_id: employee_id,
      name: name,
      email: email,
      contact: contact,
      hire_date: hire_date,
      manager_id: manager_id,
      salary: salary,
      location_id: location_id,
      store_id: store_id,
      street_address: street_address,
      city: city,
      state: state,
      postal_code: postal_code,
      account_id: account_id,
      acc_type_id: acc_type_id,
      acc_notes: acc_notes,
      opening_balance: opening_balance,
      ledger_type_id: ledger_type_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const AddOutStock = async (
  store_id,
  product_id,
  unit_instock,
  t_type_id,
  t_note
) => {
  try {
    const response = await axios.post(`${BASE_URL}/inventory/AddOutStock`, {
      store_id: store_id,
      product_id: product_id,
      unit_instock: unit_instock,
      t_type_id: t_type_id,
      t_note: t_note,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const AddInStock = async (
  store_id,
  product_id,
  unit_instock,
  t_type_id,
  t_note
) => {
  try {
    const response = await axios.post(`${BASE_URL}/inventory/AddInStock`, {
      store_id: store_id,
      product_id: product_id,
      unit_instock: unit_instock,
      t_type_id: t_type_id,
      t_note: t_note,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const EditOpeningBalance = async (
  store_id,
  product_id,
  opening_balance,
  mn,
  mx
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/inventory/EditOpeningBalance`,
      {
        store_id: store_id,
        product_id: product_id,
        opening_balance: opening_balance,
        mn: mn,
        mx: mx,
      }
    );
    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const Ledger_EditOpeningBalance = async (
  account_id,
  opening_balance,
  type_id
) => {
  try {
    const response = await axios.put(`${BASE_URL}/account/EditOpeningBalance`, {
      account_id: account_id,
      opening_balance: opening_balance,
      type_id: type_id,
    });
    //console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const AddInventoryApi = async (
  product_id,
  store_id,
  unit_instock,
  currentDate,
  t_type_id,
  t_note
) => {
  try {
    //console.log("AddInventoryApi");
    // console.log(product_id.value);
    // console.log(store_id.value);
    // console.log(unit_instock.value);
    // console.log(currentDate);
    const response = await axios.post(`${BASE_URL}/inventory/AddInventory`, {
      product_id: product_id,
      store_id: store_id,
      unit_instock: unit_instock,
      currentDate: currentDate,
      t_type_id: t_type_id,
      t_note: t_note,
    });
    //console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const GetAllUnits = async () => {
  try {
    //console.log("GetAllUnits");
    const response = await axios.get(`${BASE_URL}/unit/getallunits`, {});
    return await response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllAccounts = async () => {
  try {
    //console.log("GetAllAccounts");
    const response = await axios.get(`${BASE_URL}/account/getAllAccounts`, {});
    return await response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllSales = async () => {
  try {
    //console.log("GetAllSales");
    const response = await axios.get(`${BASE_URL}/sale/getAllSales`, {});
    return await response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllBrands = async () => {
  try {
    //console.log("GetAllBrands");
    const response = await axios.get(`${BASE_URL}/brand/getallbrands`, {});
    return await response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const GetAllCategories = async () => {
  try {
    //console.log("GetAllCategories");
    const response = await axios.get(
      `${BASE_URL}/category/getallcategories`,
      {}
    );
    return await response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
