import React, { useEffect, useState } from "react";
import picture from "../assets/Picture.jpg";
import { Person2 } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { api } from "../lib/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "@mui/icons-material";

export default function Card(props) {
  const token = sessionStorage.getItem("token");
  const [errMsg, setErrMsg] = useState("");
  const [role, setRole] = useState("");
  // const decode = jwtDecode(token);
  const lostCase = props.case === "Kehilangan";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 12;
  const queryClient = useQueryClient();
  // console.log(props.id);

  const [decode, setDecode] = useState({});
  // console.log(decode.userId && props.userId === decode.userId);
  useEffect(() => {
    try {
      if (token) {
        setDecode(jwtDecode(token));
      }
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const postData = async () => {
    try {
      // console.log(id);
      const res = await api.delete(`/laporan/delete/${props.id}`);
      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
      setErrMsg(error.response.data.message);
      throw error;
    }
  };
  const mutation = useMutation({
    mutationFn: postData,
    onMutate: () => {
      Swal.fire({
        title: "Loading",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },
    onSuccess: () => {
      Swal.close();
      Swal.fire("Success", "Laporan telah dihapus", "success");
      queryClient.invalidateQueries(["getReports", "getDetailReports"]);
      console.log("berhasil");
    },
    onError: (error) => {
      console.log(error);
      Swal.close();
      Swal.fire("Error", error, "error");
    },
  });

  const handlePrompt = () => {
    Swal.fire({
      showCancelButton: true,
      cancelButtonColor: "red",
      text: "Apakah Anda akan Menghapus Laporan ini",
      icon: "question",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("mutate");
        mutation.mutate();
      }
    });
    // Swal.fire("Success", "Laporan telah dihapus", "success");
  };
  return (
    <div className="min-w-[270px] max-w-[320px] border-2 rounded-xl overflow-hidden px-3 py-5 pb-8 font-poppins h-[480px] m-auto">
      <div className="relative">
        <img
          src={props.urlImg[0] ? props.urlImg[0] : picture}
          loading="lazy"
          className="object-contain w-full aspect-3/4 bg-main-gray"
          alt=""
        />
        <p
          className={`absolute left-0 top-0 font-semibold text-white ${
            lostCase ? "bg-[#ED5656]" : "bg-[#5680ED]"
          }  px-4 py-1 rounded-md text-[14px] z-10`}
        >
          {props.case}
        </p>
        {props.statusLaporan && !props.isClear && (
          <p
            className={`absolute right-0 top-0 font-semibold text-white ${
              props.statusLaporan === "PENDING"
                ? "bg-[#57e908]"
                : props.statusLaporan === "DI TERIMA"
                  ? "bg-[#5680ED]"
                  : "bg-[#cb1111]"
            }  px-4 py-1 rounded-md text-[12px] z-10`}
          >
            {props.statusLaporan}
          </p>
        )}
        <div
          className={`${props.isClear ? "" : "hidden"}
          bg-[#adafc3a0] absolute top-0 bottom-0 left-0 right-0 text-center flex justify-center items-center`}
        >
          <h1 className="text-[70px] font-semibold text-[#666565]">Selesai</h1>
        </div>
      </div>
      {/* <DeletePrompt /> */}
      <div className=" px-3 relative">
        <div className="flex justify-between py-4 pr-4">
          <a
            href={`/laporan/detail/${props.id}`}
            className="underline font-semibold max-w-[70%]"
          >
            <h1 className="text-[18px]">{props.nameItem}</h1>
          </a>
          <p className="text-[13px] text-[#545458]">{props.date}</p>
          {((decode.userId && props.userId === decode.userId) ||
            (decode.role && decode.role === "Admin")) && (
              <div className="absolute -right-3 top-2">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  property={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "80px",
                      marginRight: "100px",
                    },
                  }}
                >
                  <MenuItem onClick={handlePrompt}>Delete</MenuItem>
                </Menu>
              </div>
            )}
        </div>
        <div className="">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <Person2 color="disabled" />
              <p className="text-[14px] capitalize">{props.user}</p>
            </div>

            <div className="flex gap-1 items-center">
              <Category color="disabled" fontSize="medium" />
              <p className="text-[14px]">{props.category}</p>
            </div>
          </div>
          <p className="text-[14px] mt-4 line-clamp-3 min-h-[65px]">
            {props.descr}
          </p>
        </div>
      </div>
    </div>
  );
}
