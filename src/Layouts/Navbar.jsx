import React, { useEffect, useState } from "react";
import { AlignJustify, LogInIcon, LogOutIcon } from "lucide-react";
import profile from "../assets/user.png";
import { Link, useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { userInfo } from "../utils/getUserInfo";

export default function Navbar() {
  const [navToggle, setNavToggle] = useState(false);
  const [userName, setUserName] = useState("");
  const token = sessionStorage.getItem("token");
  console.log(token !== null);
  useEffect(() => {
    if (token !== null) {
      const decode = jwtDecode(token);
      userInfo(decode.userId).then((user) => {
        setUserName(user.data.userName);
      });
    }
  });
  function setToggle() {
    setNavToggle(!navToggle);
  }

  const navigate = useNavigate();
  const Logout = () => {
    try {
      sessionStorage.removeItem("token");
      navigate("/masuk");
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const login = () => {
    navigate("/masuk");
  };
  return (
    <div className="bg-main-gray w-screen z-50 text-white px-6 py-4 flex justify-between items-center xl:px-16">
      <div className="w-[30px] md:hidden">
        <Link to="/profile">
          <img src={profile} alt="" className="w-full rounded-full bg-white" />
        </Link>
      </div>
      <h1 className="text-[24px] font-semibold xl:text-[25px]">
        Lost And Found
      </h1>
      <button onClick={setToggle} className="md:hidden inline-block">
        <AlignJustify width={27} height={27} />
      </button>
      <div
        className={`${
          navToggle ? "top-14" : "-top-full"
        } font-semibold text-[14px] flex flex-col justify-center absolute right-0 left-0 items-center bg-main-gray gap-4 py-6 md:static md:flex-row md:py-0 md:text-[18px]`}
      >
        <Link to="/">Home</Link>
        <Link to="/listreport">All Reports</Link>
        <Link to="/about">About</Link>
        {token ? (
          <button
            type="button"
            onClick={Logout}
            className="flex gap-2 items-center md:hidden"
          >
            Logout <LogOutIcon className="h-[16px] w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={login}
            className="flex flex-col items-center text-[14px] md:hidden"
          >
            {/* <LogInIcon height={32} /> */}
            Login
          </button>
        )}
      </div>
      <div className="flex-row justify-center items-center gap-3 border-l-2 pl-5 hidden md:flex">
        <div className="w-[36px]">
          <Link to="/profile">
            <img
              src={profile}
              alt=""
              className="w-full rounded-full bg-white"
            />
          </Link>
        </div>
        <div className="text-[12px] font-semibold text-center">
          <h1>Hello,</h1>
          <h1>{userName || "Guest"}</h1>
        </div>
        {token ? (
          <button
            type="button"
            onClick={Logout}
            className="flex flex-col items-center text-[16px]"
          >
            {/* <LogOutIcon height={32} /> */}
            LogOut
          </button>
        ) : (
          <button
            type="button"
            onClick={login}
            className="flex flex-col items-center font-semibold text-[16px]"
          >
            {/* <LogInIcon height={32} /> */}
            Login
          </button>
        )}
      </div>
    </div>
  );
}
