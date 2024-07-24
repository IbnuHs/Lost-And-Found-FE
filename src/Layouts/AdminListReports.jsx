import React, { useEffect } from "react";
import { SearchIcon, FilterIcon, Play, LayoutList } from "lucide-react";
import { useState } from "react";
import Card from "../Components/Card";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/API";
import { CircularProgress, Box, Stack, Pagination } from "@mui/material";

export default function AdminListReports() {
  const [filterDrop, setFilterDrop] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  function dropDown() {
    setFilterDrop(!filterDrop);
  }

  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ["adminReports"],
    queryFn: async () => {
      try {
        const res = await api.get("/laporan/allReports", {
          params: { page: currentPage },
        });
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    console.log(currentPage);
    refetch();
    console.log(data);
  }, [currentPage, data]);
  const handlePageChange = async (event, value) => {
    setCurrentPage(value);
  };
  return (
    <div className="border-2 border-pink-900 flex-grow px-4">
      <div className="flex justify-center border-b-[3px] border-[#5C5F62] items-center gap-5 py-4">
        {/* <div className="">
          <div className="flex flex-row items-center gap-2 min-w-[200px] border">
            <LayoutList color="#5C5F62" fill="#5C5F62" />
            <h1 className="font-semibold text-[20px] lg:text-[22px] xl:text-[20px]">
              Daftar Laporan
            </h1>
          </div>
        </div> */}
        <div className="flex flex-row gap-4 lg:mt-1 xl:min-w-[400px] xl:max-w-[350px] items-center">
          <div className="flex w-full border-[3px] border-black rounded-full px-4 items-center shadow-lg min-w-[300px] ">
            <input
              type="search"
              name=""
              id=""
              placeholder="Search"
              className="flex-grow py-1 border-none focus:ring-0 focus:outline-none text-black bg-transparent"
            />
            <button className="">
              <SearchIcon />
            </button>
          </div>
          <div className="min-w-[300px] relative">
            <div className="">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-1">
                  <FilterIcon fill="#000000" />
                  <h1 className="font-semibold text-[20px]">Filter</h1>
                </div>
                <button type="button" onClick={dropDown}>
                  <Play
                    color="#5C5F62"
                    fill="#5C5F62"
                    className={`transition-all duration-100 ${
                      filterDrop ? "rotate-90" : "-rotate-90"
                    }`}
                  />
                </button>
              </div>

              <hr className="h-1 bg-[#5C5F62] w-[95%] m-auto mt-1" />
            </div>
            <div
              className={`px-4 mt-4 w-full ${
                filterDrop ? "hidden" : "block"
              } absolute backdrop-blur z-40 flex-grow`}
            >
              <form action="" className="flex flex-col gap-3 ">
                {/* Jenis Laporan */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-semibold text-[18px]">
                    Jenis Laporan
                  </label>
                  <div className="flex items-center relative">
                    <select
                      name=""
                      id=""
                      className="px-4 py-[6px] border-[3px] border-black rounded-md font-semibold bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer"
                    >
                      <option value="Semua">Semua</option>
                      <option value="Kehilagan">Kehilangan</option>
                      <option value="Penemuan">Penemuan</option>
                    </select>
                    <Play
                      color="black"
                      fill="black"
                      size="18px"
                      className="rotate-90 absolute right-2"
                    />
                  </div>
                </div>

                {/* Kategori Barang */}
                <div className="flex flex-col gap-1 z-40">
                  <label htmlFor="" className="font-semibold text-[18px]">
                    Kategori Barang
                  </label>
                  <div className="flex items-center relative">
                    <select
                      name=""
                      id=""
                      className="px-4 py-[6px] border-[3px] border-black rounded-md font-semibold bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer"
                    >
                      <option value="Semua">Semua</option>
                      <option value="Kehilagan">Kartu Identitas</option>
                      <option value="Penemuan">Kunci</option>
                      <option value="Penemuan">Buku</option>
                      <option value="Penemuan">Jam Tangan</option>
                    </select>
                    <Play
                      color="black"
                      fill="black"
                      size="18px"
                      className="rotate-90 absolute right-2"
                    />
                  </div>
                </div>

                {/* Status Laporan */}
                <div className="flex flex-col gap-1 z-20">
                  <label htmlFor="" className="font-semibold text-[18px]">
                    Status Laporan
                  </label>
                  <div className="flex items-center relative">
                    <select
                      name=""
                      id=""
                      className="px-4 py-[6px] border-[3px] border-black rounded-md font-semibold bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer"
                    >
                      <option value="Semua">Semua</option>
                      <option value="Kehilagan">Selesai</option>
                      <option value="Penemuan">Belum Selesai</option>
                    </select>
                    <Play
                      color="black"
                      fill="black"
                      size="18px"
                      className="rotate-90 absolute right-2"
                    />
                  </div>
                </div>

                {/* Tanggal Laporan */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-semibold text-[18px]">
                    Tanggal Laporan
                  </label>
                  <div className="flex items-center relative">
                    <select
                      name=""
                      id=""
                      className="px-4 py-[6px] border-[3px] border-black rounded-md font-semibold bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer"
                    >
                      <option value="Kehilagan">Terbaru</option>
                      <option value="Penemuan">Terlama</option>
                    </select>
                    <Play
                      color="black"
                      fill="black"
                      size="18px"
                      className="rotate-90 absolute right-2"
                    />
                  </div>
                </div>
                <div className="flex justify-end mb-6 lg:mt-4">
                  <button
                    type="submit"
                    className="font-semibold border-2 px-6 py-1 rounded-lg text-white bg-main-gray text-[15px] xl:px-7 xl:py-[6px] xl:text-[17px]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6 justify-items-center xl:justify-items-start m-auto xl:m-4">
          {isLoading && (
            <div className="col-span-1 flex justify-center lg:col-span-2 xl:col-span-3 w-full mt-44">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          )}
          {isSuccess &&
            data.data &&
            data.data.map((i) => {
              const date = i.createdAt.slice(0, 10);
              // console.log(date);
              return (
                <Card
                  key={i.id}
                  id={i.id}
                  nameItem={i.nameItem}
                  case={i.case}
                  category={i.category}
                  descr={i.description}
                  isClear={i.statusClear}
                  urlImg={i.urlImg}
                  user={i.user.userName}
                  date={date}
                />
              );
            })}
        </div>
        {data?.data && (
          <div className="m-auto flex items-center justify-center my-12">
            <Stack>
              <Pagination
                onChange={handlePageChange}
                count={Math.ceil(data.pagination.total / data.pagination.limit)}
                page={currentPage}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
}
