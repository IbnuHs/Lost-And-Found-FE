import { React, useState } from "react";
import picture from "../assets/Picture.jpg";
import {
  Person2,
  CalendarMonthRounded,
  PermContactCalendar,
  ArrowBackIosNew,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { api } from "../lib/API";
import { useQuery } from "@tanstack/react-query";
import { getRole } from "../utils/getRole";
import { FinishedLostButton } from "../Components/FinishedLostButton";
import FinishedFoundButton from "../Components/FinishedFoundButton";

export default function DetailItem() {
  const { id } = useParams();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["getDetailReports"],
    queryFn: async () => {
      if (id) {
        const res = await api.get(`/laporan/${id}`);
        return res.data;
      }
      throw new Error("Id is Undefined");
    },
  });
  const role = getRole();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isSuccess && data) {
    return (
      <div className="px-5 md:px-10 relative">
        <a href="/listreport" className="mt-4 -ml-2 block">
          <ArrowBackIosNew />
        </a>
        {/* <button className="mt-4 -ml-2">
         <ArrowBackIosNew />
       </button> */}
        <h1 className="text-center font-semibold text-[22px] pb-6 lg:text-[26px] lg:pb-12">
          Detail Item
        </h1>
        <div className="px-4 md:flex flex-row md:px-0 lg:justify-center lg:px-20  lg:gap-14 xl:gap-20">
          <div className="border border-black relative md:min-w-[450px] max-w-[350px] m-auto lg:max-w-[450px] xl:max-w-[600px]">
            <img
              src={data.data.urlImg[0] ? data.data.urlImg[0] : picture}
              alt=""
              className="object-center w-full max-w-[350px] m-auto lg:mx-0 lg:max-w-[450px] xl:max-w-[600px] aspect-video object-contain"
            />
            <div
              className={`${
                data.data.statusClear ? "" : "hidden"
              } bg-[#8d8e9fa0] lg:max-w-[450px] xl:max-w-[600px] absolute top-0 bottom-0 left-0 right-0 text-center flex justify-center items-center`}
            >
              <h1 className="text-[70px] font-semibold text-[#444]">Clear</h1>
            </div>
          </div>
          <div className="max-w-[350px] m-auto my-7 md:max-w-[400px] md:w-[250px] lg:m-0 lg:min-w-[350px] lg:max-w-[450px] xl:min-w-[450px] xl:max-w-[550px]">
            <h1
              className={`${
                data && data.data.case === "Kehilangan"
                  ? "bg-lost-color"
                  : "bg-[#5680ED]"
              } text-white text-center py-2 rounded-sm lg:text-[20px] xl:text-[24px]`}
            >
              {data && data.data.case}
            </h1>
            <div className="flex flex-col gap-4 my-6 ">
              <h1 className="font-semibold text-[20px] lg:text-[22px] xl:text-[24px]">
                {data.data.nameItem}
              </h1>
              <div className="flex gap-2 items-center">
                <Person2 color="disabled" />
                <p className="text-main-gray text-[14px] lg:text-[16px] xl:text-[18px]">
                  John Doe
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <CalendarMonthRounded color="disabled" />
                <p className="text-main-gray text-[14px] lg:text-[16px] xl:text-[18px]">
                  14 April 2024
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <PermContactCalendar color="disabled" />
                <p className="text-main-gray text-[14px] lg:text-[16px] xl:text-[18px]">
                  user@emailExample.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[350px] m-auto mb-16 md:max-w-none md:px-9 lg:px-20 xl:w-[80%] xl:px-5">
          <div className="">
            <h1 className="font-semibold my-4 lg:text-[22px] lg:mt-8 xl:text-[24px]">
              Detail :
            </h1>
            <p className="text-[14px] min-h-40 lg:text-[16px] xl:text-[18px] ">
              {data.data.description}
            </p>
          </div>
          {data.data.statusClear &&
            role === "Admin" &&
            data.data.case === "Penemuan" && (
              <div className={``}>
                <h1 className="font-semibold lg:text-[22px] xl:text-[24px]">
                  Kepemilikan
                </h1>
                <div className="mt-2">
                  <p className="text-[14px] lg:text-[16px] xl:text-[18px] xl:w-[80%]">
                    Nama &emsp;&emsp; &emsp; : {data.data.claimedBy}
                  </p>
                  <p>No Identitas &ensp; : {data.data.idPemilik}</p>
                </div>
              </div>
            )}
        </div>

        {/* Button If Case Barang Ditemukan */}
        {!data.data.statusClear &&
          role === "Admin" &&
          data.data.case === "Penemuan" && (
            <div className="flex flex-col items-center absolute bottom-5 right-14">
              <FinishedFoundButton id={id} />
            </div>
          )}
        {/* Button If Case Barang Hilang */}
        {!data.data.statusClear &&
          role === "Admin" &&
          data.data.case === "Kehilangan" && (
            <div className="flex flex-col items-center absolute bottom-5 right-14">
              <FinishedLostButton id={id} />
            </div>
          )}
      </div>
    );
  }
}
