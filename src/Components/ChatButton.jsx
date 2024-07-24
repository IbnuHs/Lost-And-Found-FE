import React from "react";
import { MessageCircleMoreIcon } from "lucide-react";
import Swal from "sweetalert2";
import { api } from "../lib/API";
import { useMutation } from "@tanstack/react-query";

export const ChatButton = ({ email }) => {
  const postData = async () => {
    try {
      const res = await api.post("/user/sendEmail", {
        email: email,
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
      Swal.fire("Success", "Email Telah Dikirim", "success");
    },
    onError: () => {
      Swal.close();
      Swal.fire("Error", error.message, "error");
    },
  });

  const onChat = () => {
    Swal.fire({
      text: `Apkah Anda Ingin email ke ${email}`,
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
    <>
      <button onClick={onChat} className="flex flex-col items-center">
        <MessageCircleMoreIcon size={30} />
        <h1 className="font-semibold">Chat</h1>
      </button>
    </>
  );
};
