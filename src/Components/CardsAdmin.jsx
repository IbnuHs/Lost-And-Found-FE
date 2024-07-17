import React from "react";
import { EllipsisVertical } from "lucide-react";
import pict from "../assets/Picture.jpg";
import { api } from "../lib/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CardsAdmin(props) {
  const queryClient = useQueryClient();

  const postData = async (status) => {
    const data = {
      id: props.id,
      status: status,
    };
    console.log(props.id);
    const res = await api.post("/laporan/edit/changereportstatus", data);
    console.log(res.data);
    return res.data;
  };
  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries(["adminReports", "getReports"]);
      console.log("Berhasil");
    },
  });

  function onAccept() {
    mutation.mutate("DI TERIMA");
    mutation.isSuccess(alert("berhasil diterima"));
  }
  function onReject() {
    mutation.mutate("DI TOLAK");
    mutation.isSuccess(alert("berhasil ditolak"));
  }
  function getDateOnly(dateTimeString) {
    return new Date(dateTimeString).toISOString().split("T")[0];
  }
  return (
    <div className="rounded-lg border-2 px-[14px] py-[10px] font-poppins flex flex-col gap-4 xl:px-5 xl:py-4">
      <div className="flex justify-between">
        <h1 className="bg-lost-color text-white px-3 rounded text-[11px] py-1">
          {props.case}
        </h1>
        <button type="button">
          <EllipsisVertical size={20} />
        </button>
      </div>
      {/* <div className="">
        <img
          src={pict}
          alt=""
          className="object-contain w-full aspect-video border"
        />
      </div> */}
      <div className="">
        <a href="" className="font-bold text-[16px] underline">
          {props.nameItem}
        </a>
        <p className="line-clamp-3 text-[11px]">{props.desc} </p>
      </div>
      <hr className="border-gray-300" />
      <div className="flex justify-between items-center">
        <p className="text-[11px] text-[#545458]">{getDateOnly(props.date)}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onAccept}
            className="bg-[#22C83D] text-white text-[11px] px-2 py-[3px] rounded"
          >
            Terima
          </button>
          <button
            type="button"
            onClick={onReject}
            className="bg-[#C53232] text-white text-[11px] px-3 py-[3px] rounded"
          >
            Tolak
          </button>
        </div>
      </div>
    </div>
  );
}
