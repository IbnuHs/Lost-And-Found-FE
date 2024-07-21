import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getRole } from "../utils/getRole";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function AdminRoute() {
  const token = sessionStorage.getItem("token");
  const [role, setRole] = useState("");
  useEffect(() => {
    if (token !== null) {
      const decode = jwtDecode(token);
      setRole(decode.role);
    }
  }, [token]);
  if (!token) {
    return <Navigate to="/" />;
  }
  if (role === "Admin") {
    console.log(role);
    return <Outlet />;
  }
  return <Navigate to="/" />;
}
