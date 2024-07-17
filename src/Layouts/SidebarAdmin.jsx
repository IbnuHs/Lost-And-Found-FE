import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

export default function SidebarAdmin() {
  const location = useLocation();
  //   const adminPath = "/admin/";
  const path = location.pathname;
  // console.log(path);
  return (
    <div className="min-w-[260px] bg-[#737373] min-h-screen">
      <ol className="font-semibold">
        {/* bg-[#F5F5F5] */}
        <li
          className={`py-4 border-b ${
            path === "/admin/dashboard" || path === "/admin/"
              ? "bg-[#F5F5F5]"
              : ""
          } border-b-[#171717]`}
        >
          <Link
            to="dashboard"
            className={`${
              path === "/admin/dashboard" || path === "/admin/"
                ? "text-[#515151]"
                : "text-white"
            } px-6 flex gap-3 items-center text-[17px]`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
        </li>
        <li
          className={`${
            path === "/admin/laporan" ? "bg-[#F5F5F5]" : ""
          } py-4 border-b border-b-[#171717]`}
        >
          <Link
            to="laporan"
            className={`${
              path === "/admin/laporan" ? "text-[#515151]" : "text-white"
            } px-6 flex gap-3 items-center text-[17px]`}
            // text-[#515151]
          >
            <LayoutDashboard size={20} /> Semua Laporan
          </Link>
        </li>
        {/* <li
          className={`${
            path === "/admin/" ? "bg-[#F5F5F5]" : ""
          } py-4 border-b border-b-[#171717]`}
        >
          <Link
            to="dashboard"
            className="px-6 flex gap-3 items-center  text-white text-[17px]"
            // text-[#515151]
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
        </li> */}
      </ol>
    </div>
  );
}
