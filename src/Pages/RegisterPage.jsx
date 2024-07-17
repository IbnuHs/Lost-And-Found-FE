import React, { useState } from "react";
import fikom from "../assets/Register Fikom.png";
import { Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/API";
import { useMutation } from "@tanstack/react-query";

export default function RegisterPage() {
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
      console.log(res.data);
      return res.data;
    } catch (error) {
      setError(true);
      setMessage(error.response.data.message);
      console.log(error.response.data.message);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: postData,
    onMutate: () => {
      console.log("loading");
    },
    onSuccess: () => {
      console.log("Success");
      navigate("/masuk");
    },
    onError: () => {
      console.log("Error");
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
  return (
    <div className="my-10">
      <div className="flex items-center min-h-screen md:px-4 lg:px-6">
        <div className="flex flex-row items-center border-2 m-auto shadow-md md:shadow-lg">
          <img
            src={fikom}
            alt=""
            className="hidden w-auto max-h-[744px] object-center flex-grow md:inline-block md:max-w-[360px] lg:max-w-none lg:max-h-[790px]"
          />
          <div className="flex flex-col m-auto justify-center font-poppins shadow-md rounded-sm px-6 py-14 md:py-5 md:flex-grow md:shadow-none md:px-12 lg:py-14">
            <h1 className="font-semibold font-poppins text-[24px] text-center md:text-[26px] lg:text-[28px]">
              Daftar
            </h1>
            <form action="" className="flex flex-col gap-3 mt-5 lg:px-4">
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="Name"
                  className="text-[15px] md:text-[16px] lg:text-[17px]"
                >
                  Name
                </label>
                <input
                  name="userName"
                  onChange={handleChange}
                  type="text"
                  placeholder="John Doe"
                  className="border-[#989898] focus:outline-none border shadow-md text-[14px] px-2 py-2 rounded-md lg:px-4 lg:text-[15px]"
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="Email"
                  className="text-[15px] md:text-[16px] lg:text-[17px]"
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="Masukkan Email Anda"
                  className="border-[#989898] focus:outline-none border shadow-md text-[14px] px-2 py-2 rounded-md lg:px-4 lg:text-[15px]"
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="Password"
                  className="text-[15px] md:text-[16px] lg:text-[17px]"
                >
                  Password
                </label>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Masukkan Password"
                  className="border-[#989898] focus:outline-none border shadow-md text-[14px] px-2 py-2 rounded-md lg:px-4 lg:text-[15px]"
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="NoHp"
                  className="text-[15px] md:text-[16px] lg:text-[17px]"
                >
                  NoHp
                </label>
                <input
                  name="noHp"
                  type="text"
                  onChange={handleChange}
                  placeholder="+62000000000"
                  className="border-[#989898] focus:outline-none border shadow-md text-[14px] px-2 py-2 rounded-md lg:px-4 lg:text-[15px]"
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="Status"
                  className="text-[15px] md:text-[16px] lg:text-[17px]"
                >
                  Status
                </label>
                <div className="flex items-center relative">
                  <select
                    name="statusUser"
                    id=""
                    onChange={handleChange}
                    className="px-2 py-2 border-[#989898] border rounded-md text-[#939393] text-[14px] bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer lg:px-4 md:text-[16px] lg:text-[17px]"
                  >
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Dosen">Dosen</option>
                    <option value="Tamu">Tamu</option>
                  </select>
                  <Play
                    color="black"
                    fill="black"
                    size="12px"
                    className="rotate-90 absolute right-2"
                  />
                </div>

                <div className="flex flex-col gap-[5px] mt-3 relative">
                  <label
                    htmlFor="Nomor Identitas"
                    className="text-[15px] md:text-[16px] lg:text-[17px]"
                  >
                    Nomor Identitas
                  </label>
                  <input
                    name="numIdentity"
                    onChange={handleChange}
                    type="text"
                    placeholder="NIM / NIDN"
                    className="border-[#989898] focus:outline-none border shadow-md text-[14px] px-2 py-2 rounded-md lg:px-4 lg:text-[15px]"
                  />
                  <p className="text-red-600 absolute text-[10px] -bottom-5 right-0">
                    *Tamu bisa memasukkan NIK atau dikosongkan
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center mt-5 lg:mt-10">
                <div className="m-auto">
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className="bg-main-gray text-center text-white rounded-md px-8 py-[6px] inline-block text-[14px] lg:text-[15px] md:py-[10px] md:px-12"
                  >
                    Buat Akun
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
    </div>
  );
}
