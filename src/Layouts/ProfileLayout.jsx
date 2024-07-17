import React, { useState } from "react";
import user from "../assets/user.png";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ChangePassword from "../Components/ChangePassword";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { api } from "../lib/API";

export default function ProfileLayout(props) {
  const [showForm, setShowForm] = useState(true);
  const [showFormPass, setShowFormPass] = useState(true);

  function show() {
    setShowForm(!showForm);
  }
  function showFormPassword() {
    setShowFormPass(!showFormPass);
  }
  console.log(props.userId);
  const queryClient = useQueryClient();
  const [data, setData] = useState({
    id: props.userId,
    userName: props.userName,
    noHp: props.noHp,
    noIdentity: props.numIdentity,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
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
      console.log("mutate");
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
      show();
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
    <div className="">
      {/* Left Side */}
      <div className=" py-6 max-w-[420px] md:m-auto lg:m-0 lg:flex-grow lg:max-w-[350px] lg:min-w-[300px] lg:pt-0 font-source-sans3 lg:px-4">
        <div className="hidden border-b-4 border-b-main-gray pb-3 md:flex justify-end">
          <h1 className="text-[24px] font-semibold text-end">Profile</h1>
        </div>
        <div className="lg:hidden">
          <h1 className="font-semibold text-center text-[22px]">
            Edit Profile
          </h1>
          <div className="flex flex-col items-center mt-4">
            <div className="bg-[#D9D9D9] px-1 py-1 max-w-[80px] rounded-full">
              <img src={user} alt="" className="" />
            </div>
            <div
              className={`text-center ${showForm ? "inline-block" : "hidden"}`}
            >
              <h1 className="font-semibold capitalize">{props.userName}</h1>
              <p className="font-semibold text-[14px]">{props.email}</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:inline">
          <div className=" px-6 py-1 flex justify-between bg-[#F0F0F0] lg:py-2">
            <h1 className="font-semibold lg:text-[17px]">Profile</h1>
            <Link
              to="/profile/"
              className="hidden md:flex items-center underline text-[14px]"
            >
              <ChevronRight size={18} />
            </Link>
          </div>
          <div className="px-6 mt-2 flex flex-col gap-2 lg:gap-4 mb-4">
            <div className="flex justify-between lg:flex-col">
              <h1 className="font-semibold">Profile Saya</h1>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className={`${showForm ? "" : "hidden"}`}>
            <div className=" px-6 py-1 flex justify-between bg-[#F0F0F0] lg:py-2">
              <h1 className="font-semibold lg:text-[17px]">Edit Profile</h1>
              <Link
                to="edit"
                className="hidden md:flex items-center underline text-[14px]"
              >
                <ChevronRight size={18} />
              </Link>
              <button
                onClick={show}
                className="flex items-center underline lg:hidden text-[14px]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="px-6 mt-2 flex flex-col gap-2 lg:gap-4">
              <div className="flex justify-between lg:flex-col">
                <h1 className="text-[15px]">Status</h1>
                <h1 className="font-semibold text-[14px]">{props.status}</h1>
              </div>
              <div className="flex justify-between lg:flex-col">
                <h1 className="text-[15px]">Nomor Identitas</h1>
                <h1 className="font-semibold text-[14px]">
                  {props.numIdentity}
                </h1>
              </div>
              <div className="flex justify-between lg:flex-col">
                <h1 className="text-[15px]">No Handphone</h1>
                <h1 className="font-semibold text-[14px]">{props.noHp}</h1>
              </div>
            </div>
          </div>
          {/* Form Edit Profile */}
          <form
            action=""
            className={`${
              showForm ? "hidden" : "flex"
            } px-6 mt-8 relative font-source-sans3 flex-col gap-5 `}
          >
            <div className="flex flex-col border-b-2 pb-2 border-black">
              <label htmlFor="nama" className="text-[14px] px-2">
                Nama
              </label>
              <input
                name="userName"
                type="text"
                onChange={handleChange}
                className="outline-none px-2 font-semibold capitalize"
                placeholder={props.userName}
              />
            </div>
            <div className="flex flex-col border-b-2 pb-2 border-black">
              <label htmlFor="noHp" className="text-[14px] px-2">
                No Handphone
              </label>
              <input
                name="noHp"
                type="text"
                onChange={handleChange}
                className="outline-none px-2 font-semibold capitalize"
                placeholder={props.noHp}
              />
            </div>

            <div className="flex flex-col border-b-2 pb-2 border-black">
              <label htmlFor="No Identitas" className="text-[14px] px-2">
                No Identitas
              </label>
              <input
                name="noIdentity"
                type="text"
                className="outline-none px-2 font-semibold capitalize"
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
              <button
                type="button"
                onClick={show}
                className="bg-lost-color text-center px-8 py-1 text-white rounded-md"
              >
                Cencel
              </button>
            </div>
          </form>
        </div>
        <div className="mt-6">
          <div className="px-6 py-1 flex justify-between bg-[#F0F0F0] lg:py-2">
            <h1 className="font-semibold lg:text-[17px]">Laporan</h1>
          </div>
          <div className="px-6 mt-2 flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="font-semibold">Laporan Saya</h1>
              <Link
                to="laporan"
                className="hidden items-center underline text-[14px] lg:flex"
              >
                <ChevronRight size={22} />
              </Link>
              <Link
                to="/laporan/laporan-user"
                className="flex items-center underline text-[14px] md:hidden"
              >
                <ChevronRight size={22} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 mb-16">
          <div className="px-6 py-1 flex justify-between bg-[#F0F0F0] lg:py-2">
            <h1 className="font-semibold lg:text-[17px]">Password</h1>
          </div>
          <div className="px-6 mt-2 flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="font-semibold">Ganti Passsword</h1>

              <button
                type="button"
                onClick={showFormPassword}
                className="flex items-center underline text-[14px]"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <div className={`${showFormPass ? "hidden" : ""}`}>
              <ChangePassword
                showFormPassword={setShowFormPass}
                userId={props.userId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
