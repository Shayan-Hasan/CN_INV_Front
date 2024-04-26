import React, { //useState,
  useEffect,
  //useRef, lazy, Suspense
} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Login from "./pages/Login";
import { NavBar, Sidebar, ThemeSettings } from "./components";
import ViewOrderProduct from "./components/ViewOrderProduct";
import { Overview, Orders } from "./pages";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStateContext } from "./contexts/ContextProvider";
//import Preloader from "./pages/LoadingIndicator";
import TimeoutUtility from "./contexts/TimeoutUtility";
import ProtectedRoute from "./contexts/ProtectedRoute";

import Products from "./pages/Product/Products";
import EditProduct from "./pages/Product/EditProduct";
import Inventory from "./pages/Inventory/Inventory";
import AddInventory from "./pages/Inventory/AddOpeningBal";
import AddProduct from "./pages/Product/AddProduct";
import Out_stock from "./pages/Inventory/Out_stock";
import In_stock from "./pages/Inventory/In_stock";
import Stores from "./pages/Store/Stores";
import AddStore from "./pages/Store/AddStore";
import EditStore from "./pages/Store/EditStore";
import ViewInventory from "./pages/Inventory/ViewInventory";
import ViewStore from "./pages/Store/ViewStore";
import ViewProduct from "./pages/Product/ViewProduct";
import Customers from "./pages/Customer/Customers";
import AddCustomer from "./pages/Customer/AddCustomer";
import EditCustomer from "./pages/Customer/EditCustomer";
import ViewCustomer from "./pages/Customer/ViewCustomer";
import Employee from "./pages/Employee/Employee";
import AddEmployee from "./pages/Employee/AddEmployee";
import EditEmployee from "./pages/Employee/EditEmployee";
import ViewEmployee from "./pages/Employee/ViewEmployee";
import AddEditUnit from "./pages/Misc/AddEditUnit";
import AddEditBrand from "./pages/Misc/AddEditBrand";
import AddEditCategory from "./pages/Misc/AddEditCategory";
import Supplier from "./pages/Supplier/Supplier";
import AddSupplier from "./pages/Supplier/AddSupplier";
import EditSupplier from "./pages/Supplier/EditSupplier";
import ViewSupplier from "./pages/Supplier/ViewSupplier";
import Accounts from "./pages/Account/Account";
import AddAccount from "./pages/Account/AddAccount";
import EditAccount from "./pages/Account/EditAccount";
import ViewAccount from "./pages/Account/ViewAccount";
import Sales from "./pages/Sale/Sales";
import Estimates from "./pages/Estimate/Estimates";
import AddSaleOrder from "./pages/Sale/AddSaleOrder";
import EditSaleOrder from "./pages/Sale/EditSaleOrder";
import ViewSaleOrder from "./pages/Sale/ViewSaleOrder";
import Shipment from "./pages/Shipment/Shipment";
import Purchase from "./pages/Purchase/Purchase";
import AddPurchaseOrder from "./pages/Purchase/AddPurchaseOrder";
import EditPurchaseOrder from "./pages/Purchase/EditPurchaseOrder";
import ViewPurchaseOrder from "./pages/Purchase/ViewPurchaseOrder";
import Receive_Log from "./pages/Receive Log/Receive_Log";
import AddEstimation from "./pages/Estimate/AddEstimation";
import EditEstimation from "./pages/Estimate/EditEstimation";
import ViewEstimation from "./pages/Estimate/ViewEstimation";
import ConvertEstimate from "./pages/Estimate/ConvertEstimate";
import Receipt from "./pages/Receipt/Receipt";
import AddReceipt from "./pages/Receipt/AddReceipt";
import EditReceipt from "./pages/Receipt/EditReceipt";
import Payment from "./pages/Payment/Payment";
import AddPayment from "./pages/Payment/AddPayment";
import EditPayment from "./pages/Payment/EditPayment";
import Journal from "./pages/Journal/Journal";
import AddJournal from "./pages/Journal/AddJournal";
import EditJournal from "./pages/Journal/EditJournal";
import ViewShipment from "./pages/Shipment/ViewShipment";
import ViewReceive_Log from "./pages/Receive Log/ViewReceiveLog";
import ProductAssign from "./pages/Supplier/ProductAssign";
import SpecialOrder from "./pages/Purchase/SpecialOrder";
import SpecialOrders from "./pages/Purchase/SpecialOrders";
import ViewSale from "./pages/Customer/ViewSale";
import ViewSO from "./pages/Customer/ViewSO";
import ViewPurchase from "./pages/Supplier/ViewPurchase.jsx";
import ViewPO from "./pages/Supplier/ViewPO";
// const Products = lazy(() => import("./pages/Product/Products"));
// const EditProduct = lazy(() => import("./pages/Product/EditProduct"));
// const Inventory = lazy(() => import("./pages/Inventory/Inventory"));
// const AddInventory = lazy(() => import("./pages/Inventory/AddOpeningBal"));
// const AddProduct = lazy(() => import("./pages/Product/AddProduct"));
// const Out_stock = lazy(() => import("./pages/Inventory/Out_stock"));
// const In_stock = lazy(() => import("./pages/Inventory/In_stock"));
// const Stores = lazy(() => import("./pages/Store/Stores"));
// const AddStore = lazy(() => import("./pages/Store/AddStore"));
// const EditStore = lazy(() => import("./pages/Store/EditStore"));
// const ViewInventory = lazy(() => import("./pages/Inventory/ViewInventory"));
// const ViewStore = lazy(() => import("./pages/Store/ViewStore"));
// const ViewProduct = lazy(() => import("./pages/Product/ViewProduct"));
// const Customers = lazy(() => import("./pages/Customer/Customers"));
// const AddCustomer = lazy(() => import("./pages/Customer/AddCustomer"));
// const EditCustomer = lazy(() => import("./pages/Customer/EditCustomer"));
// const ViewCustomer = lazy(() => import("./pages/Customer/ViewCustomer"));
// const Employee = lazy(() => import("./pages/Employee/Employee"));
// const AddEmployee = lazy(() => import("./pages/Employee/AddEmployee"));
// const EditEmployee = lazy(() => import("./pages/Employee/EditEmployee"));
// const ViewEmployee = lazy(() => import("./pages/Employee/ViewEmployee"));
// const AddEditUnit = lazy(() => import("./pages/Misc/AddEditUnit"));
// const AddEditBrand = lazy(() => import("./pages/Misc/AddEditBrand"));
// const AddEditCategory = lazy(() => import("./pages/Misc/AddEditCategory"));
// const Supplier = lazy(() => import("./pages/Supplier/Supplier"));
// const AddSupplier = lazy(() => import("./pages/Supplier/AddSupplier"));
// const EditSupplier = lazy(() => import("./pages/Supplier/EditSupplier"));
// const ViewSupplier = lazy(() => import("./pages/Supplier/ViewSupplier"));
// const Accounts = lazy(() => import("./pages/Account/Account"));
// const AddAccount = lazy(() => import("./pages/Account/AddAccount"));
// const EditAccount = lazy(() => import("./pages/Account/EditAccount"));
// const ViewAccount = lazy(() => import("./pages/Account/ViewAccount"));
// const Sales = lazy(() => import("./pages/Sale/Sales"));
// const Estimates = lazy(() => import("./pages/Estimate/Estimates"));
// const AddSaleOrder = lazy(() => import("./pages/Sale/AddSaleOrder"));
// const EditSaleOrder = lazy(() => import("./pages/Sale/EditSaleOrder"));
// const ViewSaleOrder = lazy(() => import("./pages/Sale/ViewSaleOrder"));
// const Shipment = lazy(() => import("./pages/Shipment/Shipment"));
// const Purchase = lazy(() => import("./pages/Purchase/Purchase"));
// const AddPurchaseOrder = lazy(() =>
//   import("./pages/Purchase/AddPurchaseOrder")
// );
// const EditPurchaseOrder = lazy(() =>
//   import("./pages/Purchase/EditPurchaseOrder")
// );
// const ViewPurchaseOrder = lazy(() =>
//   import("./pages/Purchase/ViewPurchaseOrder")
// );
// const Receive_Log = lazy(() => import("./pages/Receive Log/Receive_Log"));
// const AddEstimation = lazy(() => import("./pages/Estimate/AddEstimation"));
// const EditEstimation = lazy(() => import("./pages/Estimate/EditEstimation"));
// const ViewEstimation = lazy(() => import("./pages/Estimate/ViewEstimation"));
// const ConvertEstimate = lazy(() => import("./pages/Estimate/ConvertEstimate"));
// const Receipt = lazy(() => import("./pages/Receipt/Receipt"));
// const AddReceipt = lazy(() => import("./pages/Receipt/AddReceipt"));
// const EditReceipt = lazy(() => import("./pages/Receipt/EditReceipt"));
// const Payment = lazy(() => import("./pages/Payment/Payment"));
// const AddPayment = lazy(() => import("./pages/Payment/AddPayment"));
// const EditPayment = lazy(() => import("./pages/Payment/EditPayment"));
// const Journal = lazy(() => import("./pages/Journal/Journal"));
// const AddJournal = lazy(() => import("./pages/Journal/AddJournal"));
// const EditJournal = lazy(() => import("./pages/Journal/EditJournal"));
// const ViewShipment = lazy(() => import("./pages/Shipment/ViewShipment"));
// const ViewReceive_Log = lazy(() =>
//   import("./pages/Receive Log/ViewReceiveLog")
// );
// const ProductAssign = lazy(() => import("./pages/Supplier/ProductAssign"));
// const SpecialOrder = lazy(() => import("./pages/Purchase/SpecialOrder"));
// const SpecialOrders = lazy(() => import("./pages/Purchase/SpecialOrders"));

const App = () => {
  const {
    activeMenu,
    activeProdMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  const allowedRoutes = [
    "/",
    "/login",
    "/Overview",
    "/orders",
    "/customers",
    "/inventory",
    "/Inventory/Add",
    "/inventory/product",
    "/inventory/product/addproduct",
    "/inventory/product/editproduct/:p_id",
    "/inventory/instock",
    "/inventory/outstock",
    "/inventory/viewinventory/:p_id",
    "/stores",
    "/stores/add",
    "/stores/edit/:Store_id",
    "/stores/viewStore/:Store_id",
    "/inventory/product/viewproduct/:p_id",
    "/customer/addCustomer",
    "/customer/editCustomer/:Customer_id",
    "/customer/viewCustomer/:Customer_id",
    "/employee",
    "/employee/addEmployee",
    "/employee/editemployee/:Employee_id",
    "/employee/viewemployee/:Employee_id",
    "/inventory/product/AddEditCategory",
    "/inventory/product/AddEditBrand",
    "/inventory/product/AddEditUnit",
    "/supplier",
    "/supplier/addSupplier",
    "/supplier/editsupplier/:Supplier_id",
    "/supplier/viewsupplier/:Supplier_id",
    "/account",
    "/account/addaccount",
    "/account/editaccount/:Account_id",
    "/account/viewaccount/:Account_id",
    "/sales",
    "/estimates",
    "/sales/addSaleOrder/:store_id",
    "/sales/editSaleOrder/:so_ids",
    "/sales/viewSaleOrder/:so_id",
    "/sales/Shipment/:so_ids",
    "/Purchase",
    "/Purchase/addPurchaseOrder/:store_id",
    "/Purchase/editPurchaseOrder/:po_ids",
    "/Purchase/viewPurchaseOrder/:po_id",
    "/Purchase/Receive_log/:po_ids",
    "/estimates/addEstimation/:store_id",
    "/estimates/editEstimation/:so_ids",
    "/estimates/viewEstimation/:so_id",
    "/estimates/ConvertEstimate/:so_ids",
    "/receipt",
    "/receipt/AddReceipt",
    "/receipt/EditReceipt/:r_id",
    "/payment",
    "/payment/AddPayment",
    "/payment/EditPayment/:r_id",
    "/journal",
    "/journal/AddJournal",
    "/journal/EditJournal/:r_id",
  ];

  const routesWithoutSidebarAndNavbar = [];

  useEffect(() => {
    TimeoutUtility.attachEventListeners();
    TimeoutUtility.resetTimeout();
    return () => {
      TimeoutUtility.removeEventListeners();
    };
  }, []);
  return (
    <div>
      <BrowserRouter>
        {/* <Suspense fallback={<Preloader />}> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="*"
            element={
              // user_id1 ? (
              <>
                <div>
                  <div className={currentMode === "Dark" ? "dark" : ""}>
                    <div className="flex realative dark:bg-main-dark-bg">
                      <div
                        className="fixed right-4 bottom-4"
                        style={{ zIndex: "1000" }}
                      >
                        <TooltipComponent
                          content="Settings"
                          position="TopCenter"
                        >
                          <button
                            type="button"
                            className="text-2xl p-3 hover: drop-shadow-xl hover:bg-light-gray text-white"
                            onClick={() => setThemeSettings(true)}
                            style={{
                              background: currentColor,
                              borderRadius: "50%",
                            }}
                          >
                            <FiSettings />
                          </button>
                        </TooltipComponent>
                      </div>
                      {routesWithoutSidebarAndNavbar.includes(
                        window.location.pathname
                      ) ||
                      window.location.pathname.includes(
                        "/Sales/EditSaleOrder/"
                      ) ||
                      window.location.pathname.includes(
                        "/Sales/AddSaleOrder/"
                      ) ||
                      window.location.pathname.includes(
                        "/Purchase/AddPurchaseOrder/"
                      ) ||
                      window.location.pathname.includes(
                        "/Estimates/AddEstimation/"
                      ) ||
                      window.location.pathname.includes(
                        "/Estimates/EditEstimation/"
                      ) ||
                      window.location.pathname.includes(
                        "/Estimates/ConvertEstimate/"
                      ) ||
                      window.location.pathname.includes(
                        "/Purchase/EditPurchaseOrder/"
                      ) ? (
                        <div>
                          {activeProdMenu ? (
                            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                              <ViewOrderProduct />
                            </div>
                          ) : (
                            <div className="w-0 dark:bg-secondary-dark-bg">
                              <ViewOrderProduct />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {activeMenu ? (
                            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                              <Sidebar />
                            </div>
                          ) : (
                            <div className="w-0 dark:bg-secondary-dark-bg">
                              <Sidebar />
                            </div>
                          )}
                        </div>
                      )}

                      <div
                        className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
                          routesWithoutSidebarAndNavbar.includes(
                            window.location.pathname
                          ) ||
                          window.location.pathname.includes(
                            "/Sales/EditSaleOrder/"
                          ) ||
                          window.location.pathname.includes(
                            "/Estimates/AddEstimation/"
                          ) ||
                          window.location.pathname.includes(
                            "/Purchase/EditPurchaseOrder/"
                          ) ||
                          window.location.pathname.includes(
                            "/Purchase/AddPurchaseOrder/"
                          ) ||
                          window.location.pathname.includes(
                            "/Estimates/EditEstimation/"
                          ) ||
                          window.location.pathname.includes(
                            "/Estimates/ConvertEstimate/"
                          ) ||
                          window.location.pathname.includes(
                            "/Sales/AddSaleOrder/"
                          )
                            ? activeProdMenu
                              ? "md:ml-72 div-sidebar-custom"
                              : "flex-2"
                            : activeMenu
                            ? "md:ml-72 div-sidebar-custom"
                            : "flex-2"
                        }`}
                      >
                        {routesWithoutSidebarAndNavbar.includes(
                          window.location.pathname
                        ) ||
                        window.location.pathname.includes(
                          "/Sales/EditSaleOrder/"
                        ) ||
                        window.location.pathname.includes(
                          "/Estimates/AddEstimation/"
                        ) ||
                        window.location.pathname.includes(
                          "/Purchase/EditPurchaseOrder/"
                        ) ||
                        window.location.pathname.includes(
                          "/Purchase/AddPurchaseOrder/"
                        ) ||
                        window.location.pathname.includes(
                          "/Estimates/EditEstimation/"
                        ) ||
                        window.location.pathname.includes(
                          "/Estimates/ConvertEstimate/"
                        ) ||
                        window.location.pathname.includes(
                          "/Sales/AddSaleOrder/"
                        ) ? null : (
                          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                            <NavBar />
                          </div>
                        )}

                        <div>
                          {themeSettings && <ThemeSettings />}
                          <Routes>
                            <Route
                              path="/Overview"
                              element={
                                <ProtectedRoute>
                                  <Overview />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Orders"
                              element={
                                <ProtectedRoute>
                                  <Orders />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Customers"
                              element={
                                <ProtectedRoute>
                                  <Customers />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Inventory"
                              element={
                                <ProtectedRoute>
                                  <Inventory />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Inventory/Add"
                              element={
                                <ProtectedRoute>
                                  <AddInventory />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Product/AddProduct"
                              element={
                                <ProtectedRoute>
                                  <AddProduct />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Product/EditProduct/:p_id"
                              element={
                                <ProtectedRoute>
                                  <EditProduct />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/inventory/instock"
                              element={
                                <ProtectedRoute>
                                  <In_stock />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/inventory/outstock"
                              element={
                                <ProtectedRoute>
                                  <Out_stock />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/inventory/viewinventory/:p_id"
                              element={
                                <ProtectedRoute>
                                  <ViewInventory />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/stores"
                              element={
                                <ProtectedRoute>
                                  <Stores />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/stores/add"
                              element={
                                <ProtectedRoute>
                                  <AddStore />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/stores/edit/:Store_id"
                              element={
                                <ProtectedRoute>
                                  <EditStore />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/stores/viewStore/:Store_id"
                              element={
                                <ProtectedRoute>
                                  <ViewStore />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/product"
                              element={
                                <ProtectedRoute>
                                  <Products />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/product/viewproduct/:p_id"
                              element={
                                <ProtectedRoute>
                                  <ViewProduct />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/customer/addCustomer"
                              element={
                                <ProtectedRoute>
                                  <AddCustomer />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/customer/editCustomer/:Customer_id"
                              element={
                                <ProtectedRoute>
                                  <EditCustomer />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/customer/viewCustomer/:Customer_id"
                              element={
                                <ProtectedRoute>
                                  <ViewCustomer />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/customer/ViewSale/:Customer_id"
                              element={
                                <ProtectedRoute>
                                  <ViewSale />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Customer/ViewSale/ViewSO/:so_id"
                              element={
                                <ProtectedRoute>
                                  <ViewSO />
                                </ProtectedRoute>
                              }
                            />

                            <Route
                              path="/employee"
                              element={
                                <ProtectedRoute>
                                  <Employee />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/employee/addEmployee"
                              element={
                                <ProtectedRoute>
                                  <AddEmployee />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/employee/editemployee/:Employee_id"
                              element={
                                <ProtectedRoute>
                                  <EditEmployee />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/employee/viewemployee/:Employee_id"
                              element={
                                <ProtectedRoute>
                                  <ViewEmployee />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/product/AddEditCategory"
                              element={
                                <ProtectedRoute>
                                  <AddEditCategory />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/product/AddEditBrand"
                              element={
                                <ProtectedRoute>
                                  <AddEditBrand />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/product/AddEditUnit"
                              element={
                                <ProtectedRoute>
                                  <AddEditUnit />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/supplier"
                              element={
                                <ProtectedRoute>
                                  <Supplier />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/supplier/addSupplier"
                              element={
                                <ProtectedRoute>
                                  <AddSupplier />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/supplier/editsupplier/:Supplier_id"
                              element={
                                <ProtectedRoute>
                                  <EditSupplier />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/supplier/viewsupplier/:Supplier_id"
                              element={
                                <ProtectedRoute>
                                  <ViewSupplier />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/supplier/ViewPurchase/:Supplier_id"
                              element={
                                <ProtectedRoute>
                                  <ViewPurchase />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/supplier/ViewPurchase/ViewPO/:po_id"
                              element={
                                <ProtectedRoute>
                                  <ViewPO />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/supplier/ProductAssign/:Supplier_id"
                              element={
                                <ProtectedRoute>
                                  <ProductAssign />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/supplier/SpecialOrder"
                              element={
                                <ProtectedRoute>
                                  <SpecialOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Purchase/SpecialOrder"
                              element={
                                <ProtectedRoute>
                                  <SpecialOrders />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/account"
                              element={
                                <ProtectedRoute>
                                  <Accounts />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/account/addaccount"
                              element={
                                <ProtectedRoute>
                                  <AddAccount />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/account/editaccount/:Account_id"
                              element={
                                <ProtectedRoute>
                                  <EditAccount />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/account/viewaccount/:Account_id"
                              element={
                                <ProtectedRoute>
                                  <ViewAccount />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/sales"
                              element={
                                <ProtectedRoute>
                                  <Sales />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/estimates"
                              element={
                                <ProtectedRoute>
                                  <Estimates />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Sales/AddSaleOrder/:store_id"
                              element={
                                <ProtectedRoute>
                                  <AddSaleOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/sales/editSaleOrder/:so_ids"
                              element={
                                <ProtectedRoute>
                                  <EditSaleOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/sales/viewSaleOrder/:so_id"
                              element={
                                <ProtectedRoute>
                                  <ViewSaleOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/sales/Shipment/:so_ids"
                              element={
                                <ProtectedRoute>
                                  <Shipment />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/sales/viewShipment/:so_id"
                              element={
                                <ProtectedRoute>
                                  <ViewShipment />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Purchase"
                              element={
                                <ProtectedRoute>
                                  <Purchase />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Purchase/addPurchaseOrder/:store_id"
                              element={
                                <ProtectedRoute>
                                  <AddPurchaseOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Purchase/editPurchaseOrder/:po_ids"
                              element={
                                <ProtectedRoute>
                                  <EditPurchaseOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Purchase/viewPurchaseOrder/:po_id"
                              element={
                                <ProtectedRoute>
                                  <ViewPurchaseOrder />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Purchase/Receive_log/:po_ids"
                              element={
                                <ProtectedRoute>
                                  <Receive_Log />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/Purchase/viewReceiveLog/:po_id"
                              element={
                                <ProtectedRoute>
                                  <ViewReceive_Log />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/estimates/addEstimation/:store_id"
                              element={
                                <ProtectedRoute>
                                  <AddEstimation />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/estimates/editEstimation/:so_ids"
                              element={
                                <ProtectedRoute>
                                  <EditEstimation />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/estimates/viewEstimation/:so_id"
                              element={
                                <ProtectedRoute>
                                  <ViewEstimation />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/estimates/ConvertEstimate/:so_ids"
                              element={
                                <ProtectedRoute>
                                  <ConvertEstimate />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/receipt"
                              element={
                                <ProtectedRoute>
                                  <Receipt />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/receipt/AddReceipt"
                              element={
                                <ProtectedRoute>
                                  <AddReceipt />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/receipt/EditReceipt/:r_id"
                              element={
                                <ProtectedRoute>
                                  <EditReceipt />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/payment"
                              element={
                                <ProtectedRoute>
                                  <Payment />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/payment/AddPayment"
                              element={
                                <ProtectedRoute>
                                  <AddPayment />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/payment/EditPayment/:r_id"
                              element={
                                <ProtectedRoute>
                                  <EditPayment />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/journal"
                              element={
                                <ProtectedRoute>
                                  <Journal />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/journal/AddJournal"
                              element={
                                <ProtectedRoute>
                                  <AddJournal />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/journal/EditJournal/:r_id"
                              element={
                                <ProtectedRoute>
                                  <EditJournal />
                                </ProtectedRoute>
                              }
                            />
                            {/* Apps */}
                            {/* <Route path='/kanban' element={<Kanban />} /> */}
                            {/* <Route path='/editor' element={<Editor />} /> */}
                            {/* <Route path='/calendar' element={<Calendar />} /> */}
                            {/* <Route path='/color-picker' element={<ColorPicker />} /> */}
                            {/* Charts */}
                            {/* <Route path='/line' element={<Line />} /> */}
                            {/* <Route path='/area' element={<Area />} /> */}
                            {/* <Route path='/bar' element={<Bar />} /> */}
                            {/* <Route path='/pie' element={<Pie />} /> */}
                            {/* <Route path='/financial' element={<Financial />} /> */}
                            {/* <Route path='/color-mapping' element={<ColorMapping />} /> */}
                            {/* <Route path='/pyramid' element={<pyramid />} /> */}
                            {/* <Route path='/stacked' element={<Stacked />} /> */}
                          </Routes>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              // ) : (
              //   <Navigate to="/login" />
              // )
            }
          />
        </Routes>
        {/* </Suspense> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
