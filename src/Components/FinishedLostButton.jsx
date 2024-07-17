import React from "react";
import { MessageCircleMoreIcon, CheckCheckIcon } from "lucide-react";
import Swal from "sweetalert2";
import { api } from "../lib/API";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const FinishedLostButton = ({ id }) => {
  const queryClient = useQueryClient();

  const postData = async () => {
    try {
      console.log("Post");
      const res = await api.post("/laporan/claimlost", {
        id: id,
      });
      console.log("After Post");
      console.log(res);
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
      console.log(error);
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
        console.log("Is Confirmed");
        mutation.mutate();
      }
    });
  };
  return (
    <>
      <button className="flex flex-col items-center">
        <MessageCircleMoreIcon size={30} />
        <h1 className="font-semibold">Chat</h1>
      </button>
      <button onClick={onConfirm} className="flex flex-col items-center">
        <CheckCheckIcon size={30} />
        <h1 className="font-semibold">Selesaikan</h1>
      </button>
    </>
  );
};
