import React, { useEffect, useState } from "react";
import fikom from "../assets/Fikom Login.png";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../redux/AuthSlice/AuthSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import roleHook from "../hook/roleHook";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/API";
import { jwtDecode } from "jwt-decode";
import { CircularProgress } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  const navigate = useNavigate();
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
  return (
    <div className="flex items-center min-h-screen md:px-6">
      <div className="flex flex-row items-center border-2 m-auto shadow-md md:shadow-lg">
        <div className="flex flex-col m-auto justify-center font-poppins shadow-md rounded-sm px-6 py-14 md:flex-grow md:shadow-none md:px-12">
          <h1 className="font-semibold font-poppins text-[24px] text-center md:text-[26px] lg:text-[28px]">
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
            className="flex flex-col gap-5 mt-5 lg:px-4"
          >
            <div className="flex flex-col gap-[5px]">
              <label
                htmlFor="Email"
                className="text-[15px] md:text-[16px] lg:text-[18px]"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email Anda"
                className="border-[#989898] focus:outline-none border shadow-md text-[14px] px-2 py-2 rounded-md md:py-3 lg:px-4 lg:text-[16px]"
              />
            </div>
            <div className="flex flex-col gap-[5px]">
              <label
                htmlFor="Password"
                className="text-[15px] md:text-[16px] lg:text-[18px]"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                className="border-[#989898] focus:outline-none border shadow-md text-[14px] px-2 py-2 rounded-md md:py-3 lg:px-4 lg:text-[16px]"
              />
            </div>
            <div className="flex flex-col justify-center mt-5">
              <div className="m-auto">
                <button
                  type="submit"
                  className="bg-main-gray text-center text-white rounded-md px-8 py-[6px] flex items-center justify-center text-[14px] lg:text-[16px] md:py-[10px] md:px-12"
                >
                  {loading ? <CircularProgress size={21} /> : "Masuk"}
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
        <div className="hidden md:inline-block max-w-[45%] min-h-full w-auto h-full flex-grow">
          <img src={fikom} alt="" className=" h-full object-center flex-grow" />
        </div>
      </div>
    </div>
  );
}
