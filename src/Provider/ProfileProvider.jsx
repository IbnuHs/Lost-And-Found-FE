import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProfileProvider() {
  try {
    const token = sessionStorage.getItem("token");
    if (token) {
      return <Outlet />;
    }
    Swal.fire({
      text: "Harus Login Terlebih Dahulu",
      icon: "warning",
    });
    // return;
    return <Navigate to="/" />;
  } catch (error) {
    console.log(error);
    return error;
  }
}
