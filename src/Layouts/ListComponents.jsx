import React from "react";
import Card from "../Components/Card";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/API";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ListComponents() {
  const getData = useQuery({
    queryKey: ["get"],
    queryFn: async () => {
      const res = await api.get("/laporan/");
      return res.data;
    },
  });

  const limitedData = getData.isSuccess
    ? getData.data.laporan.slice(0, 10)
    : [];
  console.log(getData.data);

  return (
    <div className="py-10">
      <h1 className="text-center text-[28px] pb-20 font-semibold">
        Daftar Laporan
      </h1>

      <div className="w-4/5 m-auto md:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
          modules={[Pagination]}
        >
          {limitedData &&
            limitedData.map((i) => {
              return (
                <SwiperSlide>
                  <Card
                    key={i.id}
                    id={i.id}
                    nameItem={i.nameItem}
                    case={i.case}
                    category={i.category}
                    descr={i.description}
                    urlImg={i.urlImg}
                    isClear={i.statusClear}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <div className="w-[90%] m-auto hidden md:block">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
          modules={[Pagination]}
        >
          {limitedData &&
            limitedData.map((i) => {
              return (
                <SwiperSlide>
                  <Card
                    key={i.id}
                    id={i.id}
                    nameItem={i.nameItem}
                    case={i.case}
                    category={i.category}
                    descr={i.description}
                    urlImg={i.urlImg}
                    isClear={i.statusClear}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <div className="hidden w-4/5 m-auto xl:block">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
          modules={[Pagination]}
        >
          {limitedData &&
            limitedData.map((i) => {
              return (
                <SwiperSlide>
                  <Card
                    key={i.id}
                    id={i.id}
                    nameItem={i.nameItem}
                    case={i.case}
                    category={i.category}
                    descr={i.description}
                    urlImg={i.urlImg}
                    isClear={i.statusClear}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>

      <a
        href="/listreport"
        className="text-center underline mt-12 block font-semibold3 text-[20px]"
      >
        <h1>Semua Laporan ...</h1>
      </a>
    </div>
  );
}
