import React from "react";
import { MessageCircleMoreIcon, CheckCheckIcon } from "lucide-react";
import Swal from "sweetalert2";
import { api } from "../lib/API";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ChatButton } from "./ChatButton";

export const FinishedLostButton = ({ id, email }) => {
  const queryClient = useQueryClient();

  const postData = async () => {
    try {
      const res = await api.post("/laporan/claimlost", {
        id: id,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
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
    onSuccess: () => {
      Swal.close();
      Swal.fire("Success", "Laporan telah diselesaikan", "success");
      queryClient.invalidateQueries(["getReports", "getDetailReports"]);
    },
    onError: () => {
      Swal.close();
      Swal.fire("Error", error.message, "error");
    },
  });

  const onConfirm = () => {
    Swal.fire({
      text: "Apkah Anda Ingin Menyelesaikan Laporan ini",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      cancelButtonText: "Tidak",
      confirmButtonText: "Iya",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate();
      }
    });
  };
  return (
    <div className="flex flex-col justify-center">
      <ChatButton email={email} />
      <button onClick={onConfirm} className="flex flex-col items-center">
        <CheckCheckIcon size={30} />
        <h1 className="font-semibold">Selesaikan</h1>
      </button>
    </div>
  );
};
