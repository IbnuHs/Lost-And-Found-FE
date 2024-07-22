import React from "react";
import lost from "../assets/find.jpg";
import find from "../assets/lost.jpg";

export default function Problem() {
  return (
    <div className="py-16 font-source-sans3 xl:py-20 ">
      <h1 className="font-semibold mb-10 text-center text-[26px] xl:text-[34px]">
        Apa Masalah Anda?
      </h1>
      <div className="px-8 md:px-10 lg:px-16 xl:px-44 flex flex-col gap-10">
        <div className="mt-8 flex flex-col justify-center items-center md:flex-row md:gap-4 lg:gap-10">
          <img
            src={lost}
            loading="lazy"
            alt=""
            className=" m-auto md:max-w-[350px] lg:max-w-[450px] xl:max-w-[550px]"
          />
          <div className="mt-4 md:px-5 flex flex-col gap-5 lg:px-4 xl:mt-0">
            <h1 className="text-[24px] font-semibold md:text-[22px] lg:text-[28px] xl:text-[32px]">
              Kehilangan Barang
            </h1>
            <p className="text-[16px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              Apakah Anda kehilangan barang di area kampus? Gunakan platform
              kami untuk melaporkan barang yang hilang. Dengan melaporkan
              kehilangan Anda, Anda akan membantu kami dalam proses pencarian
              barang Anda. Kami akan memproses laporan Anda dan menginformasikan
              jika barang Anda ditemukan.
            </p>
            <div className="mt-4">
              <a
                href="/listreport"
                className="border-2 border-black rounded-lg px-4 py-2 mt-10 font-semibold md:px-3 md:text-[14px] md:py-1 lg:text-[16px] lg:px-3 lg:py-2 xl:text-[18px] xl:px-5 xl:py-3 hover:text-white hover:bg-black transition"
              >
                Buat Laporan
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-center items-center md:flex-row-reverse md:gap-4 lg:gap-16">
          <img
            src={find}
            loading="lazy"
            alt=""
            className=" m-auto md:max-w-[300px] lg:max-w-[400px] xl:max-w-[500px]"
          />
          <div className="mt-4 md:px-5 flex flex-col gap-5 lg:px-4 xl:mt-0">
            <h1 className="text-[24px] font-semibold md:text-[22px] lg:text-[28px] xl:text-[32px]">
              Menemukan Barang
            </h1>
            <p className="text-[16px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              Jika Anda menemukan barang di area kampus, laporkan temuan Anda
              melalui platform kami. Dengan melaporkan barang yang ditemukan,
              Anda membantu agar barang tersebut dapat dikembalikan kepada
              pemiliknya dengan mudah dan cepat.
            </p>
            <div className="mt-4">
              <a
                href="/listreport"
                className="border-2 border-black rounded-lg px-4 py-2 mt-10 font-semibold md:px-3 md:text-[14px] md:py-1 lg:text-[16px] lg:px-3 lg:py-2 xl:text-[18px] xl:px-5 xl:py-3 hover:text-white hover:bg-black transition"
              >
                Buat Laporan
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
