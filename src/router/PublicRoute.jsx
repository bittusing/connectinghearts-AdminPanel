// ** React Imports
import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../views/layout/AuthLayout";

const PublicRoute = ({ children, route }) => {
  const user = sessionStorage.getItem("userType");
  const access_token = localStorage.getItem("access_token");

  if (route) {
    const restrictedRoute = route.meta.restricted;

    if (user && restrictedRoute && access_token) {
      return <Navigate to="/" />;
    }
  }

  return (
    <Suspense fallback={null}>
      <AuthLayout>{children}</AuthLayout>
    </Suspense>
  );
};

export default PublicRoute;
