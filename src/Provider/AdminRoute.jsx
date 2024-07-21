import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getRole } from "../utils/getRole";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function AdminRoute() {
  const token = sessionStorage.getItem("token");
  const [role, setRole] = useState("");
  try {
    useEffect(() => {});
    if (token) {
      const decode = jwtDecode(token);
      setRole(jwtDecode(decode));
    }

    if (role && role === "Admin") {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  } catch (error) {
    // alert(error);
    console.log(error);
    return error;
  }
}
