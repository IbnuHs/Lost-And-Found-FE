import React from "react";
import NotFound from "../assets/404.jpg";

export default function NotFoundPages() {
  return (
    <div className="flex flex-col justify-center items-center py-16 md:py-0 md:min-h-screen ">
      <div className="flex flex-col gap-6 ">
        <img
          src={NotFound}
          alt=""
          className="max-w-[80%] m-auto md:max-w-[400px] lg:max-w-[600px]"
        />
        <div className="flex justify-center">
          <a
            href="/"
            className="text-white bg-main-gray px-8 py-[6px] rounded-lg m-auto xl:px-12 xlpy-2 xl:text-[18px]"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}
