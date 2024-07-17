import React from "react";
import { NotepadText } from "lucide-react";
import report from "../assets/Layer 2.svg";
import chekclist from "../assets/Checklist.svg";
import user from "../assets/u_users-alt.svg";
import CardsAdmin from "../Components/CardsAdmin";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/API";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";

export default function DashboardContent() {
  const data = useQuery({
    queryKey: ["adminReports"],
    queryFn: async () => {
      const res = await api.get("/laporan/toApprove");
      return res.data;
    },
  });
  return (
    <div className="flex flex-col flex-grow md:px-6 py-4 xl:px-12 xl:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 bg-white px-4 py-4 rounded-lg xl:gap-4">
        <div className="flex items-center border-2 rounded-lg border-[#C5C5C5] px-2 py-2 min-w-[250px] gap-2">
          <img src={report} alt="" className="w-8" />
          <div className="flex flex-col justify-center">
            <h1 className="text-[12px] font-semibold">Total Laporan</h1>
            <h1 className="text-[20px] font-semibold">29</h1>
          </div>
        </div>
        <div className="flex items-center border-2 rounded-lg border-[#C5C5C5] px-2 py-2 min-w-[250px] gap-2">
          <img src={chekclist} alt="" className="w-9" />
          <div className="flex flex-col justify-center ">
            <h1 className="text-[12px] font-semibold">Total Laporan</h1>
            <h1 className="text-[20px] font-semibold">29</h1>
          </div>
        </div>
        <div className="flex items-center border-2 rounded-lg border-[#C5C5C5] px-2 py-2 min-w-[250px] gap-2">
          <img src={user} alt="" className="w-9" />
          <div className="flex flex-col justify-center">
            <h1 className="text-[12px] font-semibold">Total Pengguna</h1>
            <h1 className="text-[20px] font-semibold">29</h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-5 max-h-[540px] overflow-scroll gap-3 bg-white px-6 py-6 rounded-lg lg:gap-5 min-h-[200px]">
        {/* <CardsAdmin /> */}
        {data.isLoading && (
          <div className="col-span-3 flex justify-center lg:col-span-2 xl:col-span-3">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        )}
        {data.isSuccess &&
          data.data.reports.map((i) => {
            return (
              <CardsAdmin
                key={i.id}
                id={i.id}
                nameItem={i.nameItem}
                case={i.case}
                date={i.createdAt}
                desc={i.description}
              />
            );
          })}
      </div>
    </div>
  );
}
