import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { users } from "../constants";
import AppLayout from "../views/layout/Layout";

const PrivateRoute = ({ route, children }) => {
  const location = useLocation();
  const access_token = localStorage.getItem("access_token");
  // let userRoles = [];
  // users?.map((userObj) => {
  //   if (userObj.role === userType) {
  //     userRoles = userObj.routes;
  //   }
  // });
  // return userRoles?.includes(route?.meta?.compId) ? (
  //   <AppLayout>{children}</AppLayout>
  // ) : userType && !userRoles?.includes(route?.meta?.compId) ? (
  //   <Navigate to="/unauthorized" state={{ from: location }} replace />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
  return access_token?(<AppLayout>{children}</AppLayout>):<Navigate to="/login" state={{ from: location }} replace />
};

export default PrivateRoute;
