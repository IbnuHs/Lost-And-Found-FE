import React from "react";
import panic from "../assets/panic.jpg";

export default function Jumbotron() {
  return (
    <div className="flex flex-col px-8 justify-center py-14 md:gap-8 md:flex-row-reverse md:items-center xl:px-36 xl:gap-20 border-b-2">
      <img
        src={panic}
        alt=""
        className=" m-auto md:max-w-[350px] lg:max-w-[450px] xl:max-w-[580px]"
      />
      <div className="px-2 mt-4 md:flex md:justify-center md:flex-col md:mb-5">
        <h1 className="text-[28px] md:text-[28px] lg:text-[32px] font-bold xl:text-[48px]">
          Kehilangan atau Menemukan Barang Diarea Fikom
        </h1>
        <p className="text-[16px] md:text-[14px] lg:text-[16px] font-source-sans3 mt-5 xl:text-[20px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.Lorem Ipsum has been the industry's standard dummy
          text ever since the 1500s
        </p>
      </div>
    </div>
  );
}
