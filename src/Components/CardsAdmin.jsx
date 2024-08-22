import React from "react";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { api } from "../lib/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
    onMutate: () => {
      Swal.fire({
        title: "Loading",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },
    onSuccess: (data, variables) => {
      console.log(data);
      console.log(variables);
      queryClient.invalidateQueries(["adminReports", "getReports"]);
      Swal.fire({
        title: "Laporan",
        text: `Laporan Berhasil ${variables}`,
        icon: "success",
      });
    },
  });

  function onAccept() {
    mutation.mutate("DI TERIMA");
  }
  function onReject() {
    mutation.mutate("DI TOLAK");
  }
  function getDateOnly(dateTimeString) {
    return new Date(dateTimeString).toISOString().split("T")[0];
  }
  const deleteReports = useMutation({
    mutationFn : async ()=>{
      const res = await api.delete(`/laporan/delete/${props.id}`)
      return res.data
    },
    onMutate: () => {
      Swal.fire({
        title: "Menghapus",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminReports", "getReports"]);
      Swal.fire({
        title: "Laporan Dihapus",
        text: "Laporan berhasil dihapus",
        icon: "success",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat menghapus laporan",
        icon: "error",
      });
    },
  })
  function onAccept() {
    mutation.mutate("DI TERIMA");
  }

  function onReject() {
    mutation.mutate("DI TOLAK");
  }

  function onDelete() {
    Swal.fire({
      title: "Anda yakin?",
      text: "Laporan yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReports.mutate();
      }
    });
  }
  return (
    <div className="rounded-lg border-2 px-[14px] py-[10px] font-poppins flex flex-col gap-4 xl:px-5 xl:py-4">
      <div className="flex justify-between">
        <h1 className={`${props.case === "Kehilangan" ? "bg-lost-color" : "bg-[#5680ED]"}  text-white px-3 rounded text-[11px] py-1`}>
          {props.case}
        </h1>
        <button type="button" onClick={onDelete}>
          <Trash2 size={20} />
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
        <Link
          to={`/laporan/detail/${props.id}`}
          className="font-bold text-[16px] underline"
        >
          {props.nameItem}
        </Link>
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
