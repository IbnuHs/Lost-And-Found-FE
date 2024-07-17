import React, { useState } from "react";
import user from "../assets/user.png";
import { api } from "../lib/API";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function ContentProfile(props) {
  const token = sessionStorage.getItem("token");
  const decode = jwtDecode(token);
  const queryClient = useQueryClient();
  const [data, setData] = useState({
    id: decode.userId,
    userName: props.userName,
    noHp: props.noHp,
    noIdentity: props.numIdentity,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value === "" ? props[name] : value,
    }));
  };

  const postData = async () => {
    try {
      const res = await api.post("/user/update", { ...data });
      return res;
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
      Swal.fire("Success", "Profil Telah Diubah", "success");
      queryClient.invalidateQueries(["userInfo"]);
    },

    onError: (error) => {
      Swal.close();
      Swal.fire("Error", error, "error");
    },
  });

  const onUpdate = (e) => {
    e.preventDefault();
    Swal.fire({
      text: "Ubah Profile",
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
    <div className="hidden md:flex flex-col flex-grow px-4">
      <div className="border-b-4 border-b-main-gray pb-3">
        <h1 className="text-[24px] font-semibold text-center">Edit Profile</h1>
      </div>

      <div className="mt-8">
        <div className="bg-[#D9D9D9] px-1 py-1 max-w-[100px] rounded-full m-auto">
          <img src={user} alt="" className="" />
        </div>
        <form
          action=""
          className="flex px-6 mt-8 relative font-source-sans3 flex-col gap-5 max-w-[80%] m-auto"
        >
          <div className="flex flex-col border-b-2 pb-2 border-black">
            <label htmlFor="nama" className="text-[15px] px-2">
              Nama
            </label>
            <input
              name="userName"
              onChange={handleChange}
              type="text"
              className="outline-none px-2 font-semibold text-[16px] capitalize"
              placeholder={props.userName}
            />
          </div>
          <div className="flex flex-col border-b-2 pb-2 border-black">
            <label htmlFor="noHp" className="text-[15px] px-2">
              No Handphone
            </label>
            <input
              name="noHp"
              onChange={handleChange}
              type="text"
              className="outline-none px-2 font-semibold text-[16px] capitalize"
              placeholder={props.noHp}
            />
          </div>

          <div className="flex flex-col border-b-2 pb-2 border-black">
            <label htmlFor="No Identitas" className="text-[15px] px-2">
              No Identitas
            </label>
            <input
              name="noIdentity"
              onChange={handleChange}
              type="text"
              className="outline-none px-2 font-semibold text-[16px] capitalize"
              placeholder={props.numIdentity}
            />
          </div>
          <div className="m-auto flex gap-4 my-4">
            <button
              type="submit"
              onClick={onUpdate}
              className="bg-main-gray text-center px-8 py-1 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
