import React from "react";
import SidebarAdmin from "../Layouts/SidebarAdmin";
import { Routes, Route } from "react-router-dom";
import DashboardContent from "../Layouts/DashboardContent";
import AdminListReports from "../Layouts/AdminListReports";

export default function AdminPages() {
  return (
    <div className="flex bg-[#F5F5F5] min-h-screen">
      <SidebarAdmin />
      <Routes>
        <Route path="/admin/*" element={<AdminPages />} />
        <Route path="/dashboard" element={<DashboardContent />} />
        <Route path="/" element={<DashboardContent />} />
        <Route path="/laporan" element={<AdminListReports />} />
      </Routes>
    </div>
  );
}
