import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getRole } from "../utils/getRole";

export default function AdminRoute() {
  const navigate = useNavigate();
  try {
    const role = getRole();
    // console.log(role);
    if (role !== "Admin") {
      console.log(role !== "Admin");
      // navigate("/");
      return <Navigate to="/" />;
      // console.log(role);
    }

    return <Outlet />;
  } catch (error) {
    // alert(error);
    console.log(error);
    return error;
  }
}
