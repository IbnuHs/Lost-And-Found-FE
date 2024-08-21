import React, { useEffect, useState } from "react";
import fikom from "../assets/Fikom.png";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/API";
import { jwtDecode } from "jwt-decode";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const toastMixin = Swal.mixin({
    toast: true,
    icon: "success",
    title: "General Title",
    animation: false,
    position: "top-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  useEffect(() => {
    if (role === "Admin") navigate("/admin");
    if (role === "User") navigate("/");
  }, [role, navigate]);
  const postData = async () => {
    try {
      const res = await api.post("/user/login", { email, password });
      sessionStorage.setItem("token", res.data.token);
      const decode = jwtDecode(res.data.token);
      setRole(decode.role);
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
      console.log("on Mutate");
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toastMixin.fire({
        animation: true,
        title: "Berhasil Login",
      });
      console.log("on Success");
    },
    onError: () => {
      setLoading(false);
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
    // dispatch(login({ email, password }));
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [loadingReset, setLoadingReset] = useState(false);
  const sendRecoveryCode = async (email) => {
    try {
      setLoadingReset(true);
      const response = await api.post("/user/recoverycode", { email });
      Swal.fire({
        icon: "success",
        title: "Kode Pemulihan Dikirim",
        text: `Kami telah mengirim kode pemulihan ke ${email} untuk digunakan membuat password baru`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Mengirim Kode",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan saat mengirim kode pemulihan.",
      });
    } finally {
      setLoadingReset(false);
    }
  };
  const resetPass = async () => {
    const { value: email } = await Swal.fire({
      title: "Masukkan Email Anda",
      input: "email",
      inputPlaceholder: "Masukkan Email Anda",
      showLoaderOnConfirm: true,
      preConfirm: async (email) => {
        if (loadingReset) {
          Swal.showLoading();
        }
        return sendRecoveryCode(email);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (email) {
      // Sudah ditangani di dalam preConfirm
    }
  };

  // const resetPass = async () => {
  //   const { value: email } = await Swal.fire({
  //     title: "Masukkan Email Anda",
  //     input: "email",
  //     inputPlaceholder: "Masukkan Email Anda",
  //   });
  //   if (email) {
  //     console.log(email);
  //     // Swal.fire(`Kode Pemulihan Anda Telah dikirim ke: ${email}`);
  //     Swal.fire({
  //       title: "Kode Pemulihan Telah Dikirim",
  //       text: `Kami telah mengirim kode pemulihan ke ${email} untuk digunakan membuat password baru`,
  //     });
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen md:px-8">
      <div className="flex flex-row max-w-[800px] items-center  border-2 box-content">
        <div className="m-auto font-poppins min-w-80 px-6 shadow-md rounded-sm py-16 md:shadow-none flex-grow">
          <h1 className="font-semibold font-poppins text-[24px] text-center md:text-[20px] lg:text-[24px]">
            Masuk
          </h1>
          {error && (
            <p className="text-center text-red-600 text-[12px]  lg:text-[16px]">
              {message}
            </p>
          )}

          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full mt-5 max-w-80 px-2 m-auto"
          >
            <div className="flex flex-col gap-[5px]">
              <label htmlFor="Email" className="text-[14px] md:text-[16px]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email Anda"
                className="border-[#989898] focus:outline-none border shadow-md text-[12px] px-2 py-2 rounded-md md:py-3 lg:px-4 lg:text-[14px] "
                required
              />
            </div>
            <div className="flex flex-col gap-[5px]">
              <label htmlFor="Password" className="text-[14px] md:text-[16px]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password"
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
              <div className="flex justify-end">
                <button type="button" className="w-28" onClick={resetPass}>
                  <p className="text-[12px] text-red-500">Lupa Password?</p>
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center mt-5">
              <div className="m-auto">
                <button
                  type="submit"
                  className="bg-main-gray text-center text-white rounded-md px-8 py-[6px] flex items-center justify-center text-[14px] lg:text-[14px] md:py-[10px] md:px-10"
                >
                  {loading ? <CircularProgress size={16} /> : "Masuk"}
                </button>
              </div>
              <p className="text-[10px] text-center mt-2 md:text-[12px]">
                Belum Punya Akun?
                <Link to="/daftar" className="text-green-800">
                  Daftar
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden md:inline-block max-w-[48%] min-h-full w-auto h-full flex-grow">
          <img src={fikom} alt="" className=" w-full flex-grow" />
        </div>
      </div>
    </div>
  );
}
