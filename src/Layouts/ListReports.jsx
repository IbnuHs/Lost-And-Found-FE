import React, { useEffect, useState } from "react";
import { SearchIcon, FilterIcon, Play, LayoutList } from "lucide-react";
import Card from "../Components/Card";
import AddFlowButton from "../Components/AddFlowButton";
import { api } from "../lib/API";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Pagination, Stack } from "@mui/material";

export default function ListReports({ onShow }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDrop, setFilterDrop] = useState(true);
  const [tempFilter, setTempFilter] = useState({
    jenisLaporan: "",
    Category: "",
    statusClear: "",
    sortDirection: "",
  });
  const [filter, setFilters] = useState({
    jenisLaporan: "",
    Category: "",
    statusClear: "",
    sortDirection: "",
  });

  const getData = useQuery({
    queryKey: ["getReports"],
    queryFn: async () => {
      const res = await api.get("/laporan", {
        params: { ...filter, page: currentPage },
      });
      // console.log(currentPage);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    // console.log(currentPage);
    getData.refetch();
    // console.log(getData.data);
  }, [currentPage, getData]);
  const handlePageChange = async (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setTempFilter((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setFilters(tempFilter);
    getData.refetch();
    setFilterDrop(true);
  };

  function dropDown() {
    setFilterDrop(!filterDrop);
  }
  return (
    <div className="px-4 pt-4-6 pb-10 lg:flex lg:gap-10 lg:justify-center lg:mt-8 ">
      <div className="flex flex-col-reverse gap-4 lg:inline-block lg:mt-1 xl:min-w-[300px] xl:max-w-[350px]">
        {/* Button */}
        <div className="flex w-full border-[2px] border-black mt-auto rounded-full px-4 items-center shadow-lg xl:mb-8">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search"
            className="flex-grow py-1 border-none focus:outline-none  text-black"
          />
          <button className="">
            <SearchIcon />
          </button>
        </div>
        <div className="">
          <div className="">
            <div className="flex items-center justify-between mt-4 px-2">
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
                  } lg:hidden`}
                />
              </button>
              <button className="hidden lg:block">
                <Play
                  color="#5C5F62"
                  fill="#5C5F62"
                  className=" rotate-90 lg:block "
                />
              </button>
            </div>

            <hr className="h-1 bg-[#5C5F62] w-[95%] m-auto mt-1" />
          </div>
          <div
            className={`px-4 mt-4 w-full ${
              filterDrop ? "hidden" : "block"
            } lg:block`}
          >
            <form action="" className="flex flex-col gap-3">
              {/* Jenis Laporan */}
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="font-semibold text-[18px]">
                  Jenis Laporan
                </label>
                <div className="flex items-center relative">
                  <select
                    name="jenisLaporan"
                    id=""
                    defaultValue=""
                    onChange={handleFilterChange}
                    className="px-4 py-[6px] border-[2px] border-black rounded-md font-semibold bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer"
                  >
                    <option value="">Semua</option>
                    <option value="Kehilangan">Kehilangan</option>
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
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="font-semibold text-[18px]">
                  Kategori Barang
                </label>
                <div className="flex items-center relative">
                  <select
                    name="Category"
                    id=""
                    defaultValue=""
                    onChange={handleFilterChange}
                    className="px-4 py-[6px] border-[2px] border-black rounded-md font-semibold bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer"
                  >
                    <option value="">Semua</option>
                    <option value="Kartu Identitas">Kartu Identitas</option>
                    <option value="Kunci">Kunci</option>
                    <option value="Buku">Buku</option>
                    <option value="Jam Tangan">Jam Tangan</option>
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
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="font-semibold text-[18px]">
                  Status Laporan
                </label>
                <div className="flex items-center relative">
                  <select
                    name="statusClear"
                    id=""
                    onChange={handleFilterChange}
                    className="px-4 py-[6px] border-[2px] border-black rounded-md font-semibold bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer"
                  >
                    <option value="">Semua</option>
                    <option value="1">Selesai</option>
                    <option value="0">Belum Selesai</option>
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
                  Urutan Laporan
                </label>
                <div className="flex items-center relative">
                  <select
                    name="sortDirection"
                    id=""
                    onChange={handleFilterChange}
                    className="px-4 py-[6px] border-[2px] border-black rounded-md font-semibold bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer"
                  >
                    <option value="DESC">Terbaru</option>
                    <option value="ASC">Terlama</option>
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
                  onClick={handleSubmit}
                  className="font-semibold border-2 px-6 py-1 rounded-lg text-white bg-main-gray text-[15px] xl:px-7 xl:py-[6px] xl:text-[17px]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Card List */}
      <div className="mt-5 px-2 lg:mt-0  relative">
        <div className="">
          <div className="flex flex-row items-center gap-2">
            <LayoutList color="#5C5F62" fill="#5C5F62" />
            <h1 className="font-semibold text-[20px] lg:text-[22px] xl:text-[26px]">
              Daftar Laporan
            </h1>
          </div>
          <hr className="h-1 bg-[#5C5F62] m-auto mt-1" />
        </div>
        <div className="grid min-h-[200px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:min-w-[600px] xl:min-w-[900px] xl:grid-cols-3 gap-4 mt-6 justify-items-center xl:justify-items-start m-auto xl:m-4">
          {getData.isLoading && (
            <div className="col-span-1 flex justify-center lg:col-span-2 xl:col-span-3">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          )}
          {getData.isSuccess &&
            getData.data.laporan &&
            getData.data.laporan.length === 0 && (
              <div className="col-span-1 flex justify-center lg:col-span-2 xl:col-span-3 xl:row-span-5 lg:min-h-[400px]">
                <h1 className="text-lg font-semibold">Kosong</h1>
              </div>
            )}
          {getData.isSuccess &&
            getData.data.laporan &&
            getData.data.laporan.length !== 0 &&
            getData.data.laporan.map((i) => {
              const date = i.createdAt.slice(0, 10);
              // console.log(i);
              return (
                <Card
                  key={i.id}
                  id={i.id}
                  nameItem={i.nameItem}
                  case={i.case}
                  category={i.category}
                  descr={i.description}
                  urlImg={i.urlImg}
                  isClear={i.statusClear}
                  user={i.user}
                  date={date}
                />
              );
            })}
        </div>
        {getData.isSuccess && getData.data && getData.data.pagination && (
          <div className="m-auto flex items-center justify-center mt-10">
            <Stack>
              <Pagination
                onChange={handlePageChange}
                count={Math.ceil(
                  getData.data.pagination.total / getData.data.pagination.limit
                )}
                page={currentPage}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        )}
        <AddFlowButton setOnshow={onShow} />
      </div>
    </div>
  );
}
