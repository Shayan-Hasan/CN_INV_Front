import React from "react";
import { Navigate } from "react-router-dom";
//import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log(children.type.name);
  // console.log(userData);
  if (!userData["user_id"] && !userData["role"]) {
    return <Navigate to="/login" />;
  }
  // else if (
  //   userData["role"] === "admin" &&
  //   (children.type.name === "Employee" ||
  //     children.type.name === "Customers" ||
  //     children.type.name === "Inventory" ||
  //     children.type.name === "AddInventory" ||
  //     children.type.name === "AddProduct" ||
  //     children.type.name === "EditProduct" ||
  //     children.type.name === "In_Stock" ||
  //     children.type.name === "Out_Stock" ||
  //     children.type.name === "Inventory")
  // ) {
  //   return <Navigate to="/ecommerce" />;
  // }
  // else if (
  //   userData["role"] === "manager" &&
  //   (children.type.name === "Employee" ||
  //   children.type.name === "Customers" ||
  //   children.type.name === "Inventory" ||
  //   children.type.name === "AddInventory" ||
  //   children.type.name === "AddProduct" ||
  //   children.type.name === "EditProduct" ||
  //   children.type.name === "In_Stock" ||
  //   children.type.name === "Out_Stock" ||
  //   children.type.name === "ViewInventory")
  // ) {
  //   return <Navigate to="/ecommerce" />;
  // }

  return children;
};

export default ProtectedRoute;
