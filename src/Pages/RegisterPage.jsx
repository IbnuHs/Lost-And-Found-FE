import React, { useState } from "react";
import fikom from "../assets/register-page.png";
import { Play, EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/API";
import { useMutation } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    statusUser: "",
    noHp: "",
    numIdentity: "",
  });
  const navigate = useNavigate();
  const postData = async () => {
    try {
      const res = await api.post("/user/register", { ...data });
      return res.data;
    } catch (error) {
      setErrorMsg(error.response.data.message);
      console.log(errorMsg);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: postData,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      Swal.fire({
        text: "Daftar Berhasil, Silahkan Masukkan Akun",
        icon: "success",
        confirmButtonText: "Iya",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/masuk");
        }
      });
    },
    onError: (error) => {
      setErrorMsg(error.response.data.message);
      setLoading(false);
      Swal.fire("Error", errorMsg, "error");
    },
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
    // console.log(data);
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen md:px-4 lg:px-6">
        <div className="flex flex-row max-w-[800px] items-center border-2 m-auto shadow-md md:shadow-lg ">
          <div className="flex-grow min-w-[350px] h-full max-w-[51%] w-auto border hidden md:inline-block ">
            <img
              src={fikom}
              alt=""
              className="w-full flex-grow-1 h-full  object-contain border "
            />
          </div>
          <div className="flex flex-col m-auto justify-center font-poppins rounded-sm px-6 py-10  md:py-5 md:flex-grow lg:px-14">
            <h1 className="font-semibold font-poppins text-[22px] text-center md:text-[22px]">
              Daftar
            </h1>
            <form
              onSubmit={onSubmit}
              className="flex m-auto flex-col gap-2 mt-5 min-w-64 w-full max-w-80 px-3 md:px-0 md:gap-1"
            >
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="Name" className="text-[13px] md:text-[14px] ">
                  Nama
                </label>
                <input
                  name="userName"
                  onChange={handleChange}
                  type="text"
                  min="8"
                  max="25"
                  placeholder="John Doe"
                  className="border-[#989898] focus:outline-none border shadow-md text-[12px] px-2 py-2 rounded-md lg:px-3"
                  required
                />
                <p className="text-[10px] text-red-500">
                  * Disarankan gunakan email aktif anda
                </p>
              </div>
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="Email" className="text-[13px] md:text-[14px] ">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="Masukkan Email Anda"
                  className="border-[#989898] focus:outline-none border shadow-md text-[12px] px-2 py-2 rounded-md lg:px-3"
                  required
                />
              </div>
              <div className="flex flex-col gap-[5px] ">
                <label
                  htmlFor="Password"
                  className="text-[13px] md:text-[14px] "
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan Password"
                    className="border-[#989898] w-full focus:outline-none border shadow-md text-[12px] px-2 py-2 rounded-md lg:px-3"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-0 bottom-0"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5" />
                    ) : (
                      <EyeIcon className="w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="NoHp" className="text-[13px] md:text-[14px] ">
                  NoHp
                </label>
                <input
                  required
                  name="noHp"
                  type="text"
                  onChange={handleChange}
                  placeholder="+62000000000"
                  className="border-[#989898] focus:outline-none border shadow-md text-[12px] px-2 py-2 rounded-md lg:px-3"
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label htmlFor="Status" className="text-[13px] md:text-[14px] ">
                  Status
                </label>
                <div className="flex items-center relative">
                  <select
                    required
                    name="statusUser"
                    id=""
                    onChange={handleChange}
                    className="px-2 py-2 border-[#989898] border rounded-md text-[#939393] text-[12px] bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer lg:px-3 "
                  >
                    <option disabled selected>
                      Status
                    </option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Dosen">Staf Kampus / Dosen</option>
                    <option value="Tamu">Tamu</option>
                  </select>
                  <Play
                    color="black"
                    fill="black"
                    size="12px"
                    className="rotate-90 absolute right-2"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px] relative">
                <label
                  htmlFor="Nomor Identitas"
                  className="text-[13px] md:text-[14px] "
                >
                  Nomor Identitas
                </label>
                <input
                  name="numIdentity"
                  onChange={handleChange}
                  type="text"
                  placeholder="NIM / NIDN"
                  className="border-[#989898] focus:outline-none border shadow-md text-[12px] px-2 py-2 rounded-md lg:px-3"
                />
                <p className="text-red-600 text-[8px] md:text-[10px]">
                  *Tamu bisa memasukkan NIK atau dikosongkan
                </p>
              </div>
              <div className="flex flex-col justify-center mt-5 lg:mt-6">
                <div className="m-auto">
                  <button
                    type="submit"
                    className="bg-main-gray text-center text-white rounded-md px-8 py-2 text-[12px] md:py-[4px] flex items-center"
                  >
                    {loading ? <CircularProgress size={16} /> : "Daftar"}
                  </button>
                </div>
                <p className="text-[10px] text-center mt-2 md:text-[12px]">
                  Sudah Punya Akun?
                  <Link to="/masuk" className="text-green-800">
                    Masuk
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
