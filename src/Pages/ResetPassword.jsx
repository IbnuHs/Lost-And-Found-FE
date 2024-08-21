import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { CircularProgress } from "@mui/material";
import { api } from "../lib/API";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [email, setEmail] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const postData = async () => {
    try {
      const res = await api.post("/user/resetPassword", {
        email,
        recoveryCode,
        newPassword,
      });
      return res.data;
    } catch (error) {
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
        title: "Reset Password",
        icon: "success",
        text: "Password Berhasil Di Reset, Silahkan Masuk Menggunakan Password Baru Anda",
      });
    },
    onError: (error) => {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Gagal Mereset Password",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan saat mereset password.",
      });
    },
  });

  const handleSubmit = (i) => {
    i.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="min-w-[50vw]">
        <form
          onSubmit={handleSubmit}
          className="flex max-w-md flex-col gap-4 m-auto border px-12 pt-14 pb-16 shadow-md"
        >
          <h1 className=" text-center text-[18px] font-semibold mb-3">
            Reset Password
          </h1>
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="Email" className="text-[14px] md:text-[16px]">
              Email
            </label>
            <input
              type="email"
              //   value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email Anda"
              className="border-[#989898] focus:outline-none border shadow-md text-[12px] px-2 py-2 rounded-md md:py-3 lg:px-4 lg:text-[14px] "
              required
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="recovery" className="text-[14px] md:text-[16px]">
              Kode Pemulihan
            </label>
            <input
              id="recovery"
              type="text"
              //   value={email}
              onChange={(e) => setRecoveryCode(e.target.value)}
              placeholder="Masukkan Email Anda"
              className="border-[#989898] focus:outline-none border shadow-md text-[12px] px-2 py-2 rounded-md md:py-3 lg:px-4 lg:text-[14px] "
              required
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="Password" className="text-[14px] md:text-[16px]">
              Password Baru
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                // value={password}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan Password Baru"
                className="border-[#989898] w-full focus:outline-none border shadow-md text-[14px] px-2 py-2 rounded-md md:py-3 lg:px-4 lg:text-[14px]"
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

          <button
            type="submit"
            className="bg-main-gray text-center text-white rounded-md px-8 py-[6px] flex items-center justify-center text-[14px] lg:text-[14px] md:py-[10px] md:px-10 mt-3"
          >
            {loading ? <CircularProgress size={16} /> : "Submit"}
          </button>
          <Link to="/masuk">
            <p className="text-[14px] text-right text-red-500 pr-2">Masuk?</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
