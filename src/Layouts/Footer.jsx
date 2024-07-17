import React from "react";
import logo from "../assets/LogoFikom_Putih-1030x296.png";
import { YouTube, Instagram, Facebook } from "@mui/icons-material";

export default function Footer() {
  return (
    <div className="bg-main-gray px-10 py-10 text-white xl:px-36">
      <div className="flex flex-col md:flex-row md:justify-between ">
        <div className="">
          <img
            src={logo}
            alt=""
            className="max-w-[180px] lg:max-w-[200px] xl:max-w-[240px]"
          />
          <p className="text-[14px] mt-3 xl:text-[16px]">
            Jln. Urip Sumoharjo KM.5, <br /> Makassar, Sulawesi Selatan
          </p>
        </div>
        <div className="mt-5 md:mt-0">
          <h1 className="font-semibold lg:text-[22px]">Social Media</h1>
          <div className="flex gap-2 mt-2 md:justify-center items-center m-auto">
            <a href="" target="_blank">
              <Instagram sx={{ fontSize: 30 }} />
            </a>
            <a href="" target="_blank">
              <Facebook sx={{ fontSize: 30 }} />
            </a>
            <a href="" target="_blank">
              <YouTube sx={{ fontSize: 30 }} />
            </a>
          </div>
        </div>
      </div>
      <hr className="my-3 xl:my-4" />
      <p className="text-[14px] text-center font-semibold xl:text-[16px]">
        © 2024 Fakultas Ilmu Komputer
      </p>
    </div>
  );
}
