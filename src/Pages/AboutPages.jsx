import React from "react";
import fikom from "../assets/pixelcut-export 1.svg";
import lnf from "../assets/box-l&f 1.svg";

export default function AboutPages() {
  return (
    <div className="min-h-svh px-8">
      <h1 className="mt-8 text-xl font-semibold  text-center lg:text-[22px] xl:text-[26px] xl:mt-12">
        Tentang Kami
      </h1>
      <div className="flex flex-col gap-10 mb-14  my-8 md:mt-11 md:gap-28 xl:my-20 xl:mb-28 xl:gap-32">
        <div className="m-auto flex flex-col items-center gap-5 xl:flex-row md:w-3/4  lg:w-[90%] xl:w-4/5 ">
          <img
            src={fikom}
            alt="fikom Umi pict"
            className="flex-grow md:w-full lg:w-[60%] xl:w-2/4"
            loading="lazy"
          />
          <div className="lg:max-w-[60%] xl:w-2/4">
            <h1 className="font-semibold text-[18px] lg:text-[20px] xl:text-[22px]">
              Fakultas Ilmu Komputer
            </h1>
            <p className="text-sm mt-3 lg:text-[14px] xl:text-[16px]">
              Fakultas Ilmu Komputer merupakan salah satu dari 12 (dua belas)
              Fakultas yang dibina oleh Universitas Muslim Indonesia yang berada
              di bawah naungan Yayasan Badan Wakaf UMI. Berawal pada pemikiran
              pimpinan Universitas Muslim Indonesia dalam rangka melihat betapa
              berkembang pesatnya Sistem Informasi di dunia global dewasa ini,
              fakultas ini didirikan dengan tujuan untuk menghasilkan sumber
              daya manusia yang kompeten dan berdaya saing tinggi di bidang
              Teknologi Informasi.Melalui berbagai program studi, penelitian,
              dan kerjasama dengan berbagai pihak, fakultas ini terus berupaya
              untuk menjawab tantangan dan kebutuhan industri teknologi
              informasi yang semakin kompleks dan dinamis.
            </p>
          </div>
        </div>
        <div className="m-auto flex flex-col-reverse items-center gap-5 xl:flex-row md:w-3/4 lg:w-[90%] xl:w-4/5">
          <div className="lg:max-w-[60%] xl:w-2/4">
            <h1 className="font-semibold text-[18px] lg:text-[20px] xl:text-[22px]">
              Lost And Found
            </h1>
            <p className="text-sm mt-3 lg:text-[14px] xl:text-[16px]">
              Lost and Found adalah platform inovatif yang dirancang khusus
              untuk memfasilitasi proses pelaporan kehilangan dan penemuan
              barang di area Fakultas Ilmu Komputer (FIKOM). Aplikasi ini hadir
              untuk memberikan solusi yang efektif dan efisien bagi mahasiswa
              dan staf kampus yang mengalami kehilangan atau menemukan barang di
              lingkungan fakultas. Dengan fitur pelaporan kehilangan dan
              penemuan barang, pencarian cepat, Lost and Found membantu proses
              pemulihan barang dan meningkatkan keamanan kampus.Lost and Found
              adalah solusi menciptakan lingkungan kampus yang lebih aman dan
              terorganisir, membantu mahasiswa dan staf mengatasi masalah
              kehilangan dan penemuan barang dengan lebih mudah dan cepat.
            </p>
          </div>

          <img
            src={lnf}
            alt="fikom Umi pict"
            className="aspect-video w-full object-cover lg:w-[60%] xl:w-[50%]"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
