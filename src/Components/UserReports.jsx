import React, { useEffect, useState } from "react";
import Card from "./Card";
import { LayoutList } from "lucide-react";
import { api } from "../lib/API";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { DeletePrompt } from "../features/DeletePrompt";

export default function UserReports() {
  const [open, setOpen] = useState(false);
  const token = sessionStorage.getItem("token");
  const decode = jwtDecode(token);
  const id = decode.userId;
  const getData = useQuery({
    queryKey: ["getReports"],
    queryFn: async () => {
      const res = await api.get(`/laporan/user/${id}`);
      // console.log(res.data.data);
      return res.data;
    },
  });
  const handleOpen = () => {
    setOpen(true);
  };
  // const reports = api.get(`/laporan/user/${id}`);
  // console.log(reports);
  return (
    <div className="mt-5 px-2 pb-6 lg:mt-0 relativeflex flex-col flex-grow lg:inline">
      <div className="">
        <div className="flex flex-row items-center gap-2  border-b-4 border-b-main-gray pb-[13px]">
          <LayoutList color="#5C5F62" fill="#5C5F62" />
          <h1 className="font-semibold text-[20px] lg:text-[22px] xl:text-[26px]">
            Laporan Saya
          </h1>
        </div>
        {/* <hr className="h-1 bg-[#5C5F62] m-auto mt-1" /> */}
      </div>
      {/* <DeletePrompt /> */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6 justify-items-center overflow-scroll xl:justify-items-start m-auto xl:m-4">
        {getData.isLoading && <div className="">Loading .... </div>}
        {getData.isSuccess &&
          getData.data.data.map((i) => {
            // console.log(i);
            return (
              <Card
                key={i.id}
                id={i.id}
                nameItem={i.nameItem}
                case={i.case}
                category={i.category}
                descr={i.description}
                urlImg={i.urlImg}
                isClear={i.statusClear}
                statusLaporan={i.statusLaporan}
                setOpen={handleOpen}
                userId={i.userId}
                user={i.userName}
              />
            );
          })}
      </div>
    </div>
  );
}
