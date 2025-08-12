import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ IsAuthenticated, user, children }) {
  const location = useLocation();

  if(location.pathname === "/"){
    if(!IsAuthenticated){
      return <Navigate to="/auth/login" />
    }else{
      if(user?.role === "admin"){
        return <Navigate to="/admin/dashboard" />
      }else{
        return <Navigate to="/shop/home" />;
      }
    }
  }
  if (
    !IsAuthenticated &&
    !(
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    IsAuthenticated &&
    (location.pathname.includes("login") ||
      location.pathname.includes("register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (user?.role === "user") {
      if (location.pathname !== "/shop/home") {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  if (
    IsAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/notauthraized" />;
  } else if (
    IsAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
  return <>{children}</>;
}
export default CheckAuth;
