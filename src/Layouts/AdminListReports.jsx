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
  const [filter, setFilters] = useState({
    searchTerm: "",
  });

  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ["adminReports"],
    queryFn: async () => {
      try {
        const res = await api.get("/laporan/allReports", {
          params: { page: currentPage, searchTerm: filter.searchTerm  },
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
  const handleSubmit = (event) => {
    event.preventDefault();
    setFilters({
      ...filter,
      searchTerm: event.target.search.value, // Mengambil nilai dari input search
    });
    refetch();
  };
  return (
    <div className="border-2 flex-grow px-4">
      <div className="flex justify-between border-b-[3px] border-[#5C5F62] items-center gap-5 py-4 px-4">
        <div className="">
          <div className="flex flex-row items-center gap-2 min-w-[200px] ">
            <LayoutList color="#5C5F62" fill="#5C5F62" />
            <h1 className="font-semibold text-[20px] lg:text-[22px] xl:text-[20px]">
              Daftar Laporan
            </h1>
          </div>
        </div>
        <div className="flex flex-row gap-4 lg:mt-1 xl:min-w-[400px] xl:max-w-[350px] items-center">
          <div className="flex w-full border-[3px] border-black rounded-full px-4 items-center shadow-lg min-w-[300px] ">
            <input
              type="search"
              name=""
              id=""
              placeholder="Search"
              className="flex-grow py-1 border-none focus:ring-0 focus:outline-none text-black bg-transparent"
              onChange={(e) => setFilters({ ...filter, searchTerm: e.target.value })}
            />
            <button className="" type="button" onClick={handleSubmit}>
              <SearchIcon />
            </button>
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
