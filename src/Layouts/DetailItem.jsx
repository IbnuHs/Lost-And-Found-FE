import { React, useState, useEffect } from "react";
import picture from "../assets/Picture.jpg";
import {
  Person2,
  CalendarMonthRounded,
  PermContactCalendar,
  Category,
  ContactPhone,
  PinDrop,
  Mail,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { api } from "../lib/API";
import { useQuery } from "@tanstack/react-query";
import { FinishedLostButton } from "../Components/FinishedLostButton";
import FinishedFoundButton from "../Components/FinishedFoundButton";
import "swiper/css";
import "swiper/css/navigation";
import { jwtDecode } from "jwt-decode";
import { Box, CircularProgress } from "@mui/material";
import { ModalEdit } from "../Components/ModalEdit";
import contactcenter from "../assets/support_1067566.png";

export default function DetailItem() {
  const { id } = useParams();
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const token = sessionStorage.getItem("token");
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
  console.log(role === "Admin");

  useEffect(() => {
    if (token !== null) {
      const decode = jwtDecode(token);
      setUserEmail(decode.email);
      setRole(decode.role);
      setUserId(decode.userId);
    }
  }, [token]);
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="col-span-1 mt-20 flex justify-center lg:col-span-2 xl:col-span-3">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      </div>
    );
  }
  if (isSuccess && data) {
    return (
      <div className="min-h-[50%] mt-8 px-5 md:px-10 relative overflow-x-hidden pb-24">
        {/* <a href="/listreport" className="mt-4 -ml-2 block">
          <ArrowBackIosNew />
        </a> */}
        {/* <button className="mt-4 -ml-2">
         <ArrowBackIosNew />
       </button> */}
        <h1 className="text-center font-semibold text-[22px] pb-6 lg:text-[26px] lg:pb-12 lg:mt-10">
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
              <h1 className="text-[70px] font-semibold text-[#444]">Selesai</h1>
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

            <div className="flex flex-col gap-4 my-6 relative">
              <h1 className="font-semibold text-[20px] lg:text-[22px] xl:text-[24px]">
                {data.data.nameItem}
              </h1>
              {userEmail && userEmail === data.data.email && (
                <ModalEdit
                  nameItem={data.data.nameItem}
                  id={id}
                  desc={data.data.description}
                />
              )}

              <div className="flex gap-2 items-center">
                <Person2 color="disabled" />
                <p className="text-main-gray text-[14px] lg:text-[16px] xl:text-[18px]">
                  {data.data.userName}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <CalendarMonthRounded color="disabled" />
                <p className="text-main-gray text-[14px] lg:text-[16px] xl:text-[18px]">
                  {data.data.createdAt.slice(0, 10)}
                </p>
              </div>

              {data.data && role === "Admin" && (
                <div className="flex gap-2 items-center">
                  <ContactPhone color="disabled" />
                  <p className="text-main-gray text-[14px] lg:text-[16px] xl:text-[18px]">
                    {data.data.noHp}
                  </p>
                </div>
              )}
              {(data.data && userEmail && role === "Admin") ||
                (userEmail === data.data.email && (
                  <div className="flex gap-2 items-center">
                    <PinDrop color="disabled" />
                    <p className="text-main-gray text-[14px] lg:text-[16px] xl:text-[18px]">
                      {data.data.lokasi}
                    </p>
                  </div>
                ))}

              <div className="flex gap-2 items-center">
                <Category color="disabled" />
                <p className="text-main-gray text-[14px] lg:text-[16px] xl:text-[18px]">
                  {data.data.category}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <Mail color="disabled" />
                <p className="text-main-gray text-[14px] lg:text-[16px] xl:text-[18px]">
                  {data.data.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[350px] m-auto  md:max-w-none px-4 md:px-9 lg:px-20 xl:w-[80%] xl:px-32">
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

        <div className="flex flex-col items-end px-4 xl:px-10 sticky ">
          {/* Button If Case Barang Ditemukan */}
          {!data.data.statusClear &&
            data.data.statusLaporan !== "PENDING" &&
            role === "Admin" &&
            data.data.case === "Penemuan" && (
              <div className="">
                <FinishedFoundButton id={id} />
              </div>
            )}
          {/* Button If Case Barang Hilang */}
          {!data.data.statusClear &&
            data.data.statusLaporan !== "PENDING" &&
            role === "Admin" &&
            data.data.case === "Kehilangan" && (
              <div className="">
                <FinishedLostButton email={data.data.email} id={id} />
              </div>
            )}

          {role !== "Admin" && (
            <a
              target="_blank"
              href="https://wa.me/+6285156546388?text=Halo%20Admin"
              className="px-1 py-1 text-sm text-center font-semibold"
            >
              <img
                src={contactcenter}
                alt=""
                className="w-10 border-2 border-black rounded-full xl:w-12"
              />
              Admin
            </a>
          )}
        </div>
        <p className="text-[14px] lg:text-[16px] lg:px-32 text-red-500">
          {data &&
            data.data.case === "Penemuan" &&
            "*Harap Melapor Ke admin jika barang yang terlapor adalah milik anda"}
          {data &&
            data.data.case === "Kehilangan" &&
            "*Harap Melapor Ke admin jika anda menemukan barang ini"}
        </p>
      </div>
    );
  }
}
