import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProfileProvider() {
  try {
    const token = sessionStorage.getItem("token");
    if (token) {
      return <Outlet />;
    }
    alert("Anda Perlu Login Terlebih dahulu");
    return <Navigate to="/" />;
  } catch (error) {
    console.log(error);
    return error;
  }
}
