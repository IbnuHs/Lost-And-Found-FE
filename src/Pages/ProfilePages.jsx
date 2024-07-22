import React from "react";
import ProfileLayout from "../Layouts/ProfileLayout";
import ContentProfile from "../Layouts/ContentProfile";
import { Routes, Route } from "react-router-dom";
import UserReports from "../Components/UserReports";
import UserInfo from "../Layouts/UserInfo";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/API";
import { jwtDecode } from "jwt-decode";
import { Box, CircularProgress } from "@mui/material";

export default function ProfilePages() {
  const token = sessionStorage.getItem("token");
  const decode = jwtDecode(token);
  // console.log(decode.userId);
  const getData = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const res = await api.get(`/user/info/${decode.userId}`);
      // console.log(res.data.data);
      return res.data;
    },
  });

  if (getData.isLoading) {
    return (
      <div className="min-h-screen">
        <div className="col-span-1 mt-20 flex justify-center lg:col-span-2 xl:col-span-3">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      </div>
    );
  }
  if (getData.isSuccess && getData.data) {
    const user = getData.data.data;
    const props = {
      userName: user.userName,
      email: user.email,
      status: user.statusUser,
      numIdentity: user.numIdentity,
      noHp: user.noHp,
    };
    return (
      <div className="font-source-sans3 lg:flex  lg:px-4 lg:pt-5 gap-4 xl:px-32 xl:py-10">
        <ProfileLayout {...props} userId={decode.userId} />
        <Routes>
          <Route path="/" element={<UserInfo {...props} />} />
          <Route path="/edit" element={<ContentProfile {...props} />} />
          <Route path="/laporan" element={<UserReports />} />
        </Routes>
      </div>
    );
  }
}
