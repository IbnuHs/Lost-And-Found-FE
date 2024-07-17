import React, { useState } from "react";
import { api } from "../lib/API";
import { useMutation } from "@tanstack/react-query";
import { Password } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function ChangePassword(props) {
  const [password, setOldPass] = useState("");
  const userId = props.userId;
  const [errorMsg, setErrorMsg] = useState("");
  const [newPassword, setNewPass] = useState("");
  //   console.log(props.userId);

  const postData = async () => {
    try {
      const res = await api.post("/user/changepassword", {
        userId,
        password,
        newPassword,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      setErrorMsg(error.response.data.message);
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
      Swal.fire("Success", "password Telah Diubah", "success");
    },
    onError: () => {
      Swal.close();
      Swal.fire("Error", errorMsg, "error");
    },
  });

  function onChangePass(e) {
    e.preventDefault();
    Swal.fire({
      text: "Ubah Password",
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
    // mutation.mutate();
    // console.log(oldPass, newPass);
  }
  return (
    <>
      <form className={`flex flex-col gap-2`}>
        <input
          type="password"
          onChange={(e) => setOldPass(e.target.value)}
          placeholder="Masukkan Password Lama"
          required
          className="border-b-2 border-black flex-grow outline-none font-semibold px-1 pb-2"
        />
        <input
          type="password"
          required
          onChange={(e) => setNewPass(e.target.value)}
          placeholder="Masukkan Password Baru"
          className="border-b-2 border-black flex-grow outline-none font-semibold px-1 pb-2"
        />
        <div className="flex mt-4 gap-3 justify-end">
          <button
            type="submit"
            onClick={onChangePass}
            className="bg-main-gray text-white text-[13px] font-semibold py-1 px-8 rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-lost-color text-white text-[13px] font-semibold py-1 px-7 rounded-md"
            onClick={props.showFormPassword}
          >
            Cencel
          </button>
        </div>
      </form>
    </>
  );
}
