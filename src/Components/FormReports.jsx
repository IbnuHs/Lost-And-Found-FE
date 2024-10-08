import React, { useEffect, useRef, useState } from "react";
import image from "../assets/missing.png";
import { Play, Upload } from "lucide-react";
import { api } from "../lib/API";
import defaultImage from "../assets/Picture.jpg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { userInfo } from "../utils/getUserInfo";

export default function FormReports({ setShowForm, showform, funcOnShow }) {
  const queryClient = useQueryClient();
  const [userId, setUserID] = useState("");
  const token = sessionStorage.getItem("token");
  const inputRef = useRef(null);
  const [nameItem, setNameItem] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [desc, setDesc] = useState("");
  // const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [cases, setCases] = useState("");
  const [images, setImage] = useState(defaultImage);
  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      userInfo(decode.userId).then((user) => {
        // console.log(user.data.id);
        setUserID(user.data.id);
      });
    }
  });
  const postData = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await api.post("/laporan/create", formData, config);
      console.log(res);
      console.log("run run");
      return res.data;
    } catch (error) {
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
      const successMessage =
        cases === "Kehilangan"
          ? "Laporan Akan Dicek Admin, Pantau Terus Laporan Anda Di Halaman Profile, Kamu Akan Dihubungi Admin Jika Barangmu Ditemukan"
          : "Laporan Akan Dicek Admin, Pantau Terus Laporan Anda Di Halaman Profile Anda";
      Swal.fire("Success", successMessage, "success");
      queryClient.invalidateQueries(["getReports"]);
      setShowForm(true);
    },
    onError: (error) => {
      console.log(error);
      Swal.close();
      Swal.fire("Error", error, "error");
    },
  });

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // const urlImage = URL.createObjectURL(file);
      setImage(file);
    }
  };
  // const handleClickImg = () => {
  //   if (inputRef.current) {
  //     inputRef.current.click();
  //   }
  // };

  function onSubmit(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("nameItem", nameItem);
      // data.append("",date);
      data.append("case", cases);
      data.append("category", category);
      data.append("desc", desc);
      data.append("lokasi", lokasi);
      data.append("items", images);
      data.append("userId", userId);
      mutation.mutate(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className={`${
        showform ? "hidden" : "inline-block"
      } fixed left-0 min-h-[400px] right-0 top-0 bottom-0 z-50 px-4 backdrop-blur flex items-center  overflow-auto`}
    >
      <div className="flex border-2 border-black max-w-[750px] bg-white m-auto font-source-sans3 rounded-xl overflow-hidden">
        <div className="hidden md:flex max-w-[45%] bg-[#8C8C8C] px-6 flex-col py-24">
          <div className="flex flex-col gap-4">
            <img src={image} alt="" className="max-w-[300px] m-auto" />
            <p className="text-white text-[15px]">
              Bantu Kami Menemukan Barang Anda Jelaskan barang yang hilang dan
              kronologi kejadiannya sedetail mungkin. Semakin detail informasi
              yang Anda berikan, semakin besar kemungkinan barang Anda
              ditemukan. <br /> Bantu Kami Menyatukan Barang dengan Pemiliknya
              Jelaskan barang yang Anda temukan dan detail ciri-cirinya. Jika
              memungkinkan, cantumkan lokasi tempat Anda menemukan barang
              tersebut.
            </p>
          </div>
        </div>
        <form
          action=""
          onSubmit={onSubmit}
          className="flex-grow px-6 py-10 flex flex-col gap-3 "
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="namaItem" className="font-semibold">
              Nama Barang
            </label>
            <input
              // value={}
              type="text"
              onChange={(e) => setNameItem(e.target.value)}
              placeholder="Nama Barang"
              className="border-[#808080] border-[2px] rounded-md px-3 py-[5px] focus:outline-none text-[14px]"
            />
          </div>
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="tanggal" className="font-semibold">
              Tanggal
            </label>
            <input
              required
              type="date"
              onChange={(e) => setDate(e.target.value)}
              className="border-[#808080] text-[#808080] border-[2px] rounded-md px-3 py-[5px] focus:outline-none text-[14px]"
            />
          </div> */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="jenis laporan" className="font-semibold">
              Jenis Laporan
            </label>
            <select
              name="jenis laporan"
              id=""
              defaultValue=""
              onChange={(e) => setCases(e.target.value)}
              className="px-3 py-[5px] border-[#989898] border-[2px] rounded-md text-[#939393] text-[14px] bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer lg:px-4 md:text-[16px] lg:text-[14px] font-semibold"
            >
              <option value="" disabled>
                Jenis Laporan
              </option>
              <option value="Kehilangan">Kehilangan</option>
              <option value="Penemuan">Penemuan</option>
            </select>
            <Play
              color="black"
              fill="black"
              size="12px"
              className="rotate-90 absolute right-4 bottom-[14px]"
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="kategori barang" className="font-semibold">
              Kategori Barang
            </label>
            <select
              name="kategori barang"
              id=""
              defaultValue=""
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-[5px] border-[#989898] border-[2px] rounded-md text-[#939393] text-[14px] bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer lg:px-4 md:text-[16px] lg:text-[14px] font-semibold"
            >
              <option value="" disabled>
                Jenis Barang
              </option>
              <option value="Kartu Identitas">Kartu Identitas</option>
              <option value="Jam Tangan">Jam Tangan</option>
              <option value="Buku">Buku</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            <Play
              color="black"
              fill="black"
              size="12px"
              className="rotate-90 absolute right-4 bottom-[14px]"
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="lokasi" className="font-semibold">
              Lokasi
            </label>
            <select
              name="lokasi"
              id=""
              defaultValue=""
              onChange={(e) => setLokasi(e.target.value)}
              className="px-3 py-[5px] border-[#989898] border-[2px] rounded-md text-[#939393] text-[14px] bg-transparent flex items-center shadow-lg appearance-none w-full z-20 cursor-pointer lg:px-4 md:text-[16px] lg:text-[14px] font-semibold"
            >
              <option value="" disabled>
                Lokasi Kehilangan/Penemuan
              </option>
              <option value="Lantai 1">Lantai 1</option>
              <option value="Lantai 2">Lantai 2</option>
              <option value="Lantai 3">Lantai 3</option>
              <option value="Lantai 4">Lantai 4</option>
              <option value="Luar Fakultas">Luar Fakultas</option>
            </select>
            <Play
              color="black"
              fill="black"
              size="12px"
              className="rotate-90 absolute right-4 bottom-[14px]"
            />
          </div>
          <div className="flex flex-col gap-2 relative ">
            <label htmlFor="Deskripsi" className="font-semibold">
              Deskripsi
            </label>
            <textarea
              required
              name="deskripsi"
              placeholder="Deskripsikan Barang dan Kronologi Anda..."
              id=""
              cols={5}
              rows={4}
              onChange={(e) => setDesc(e.target.value)}
              className="border-[#989898] border-[2px] rounded-md text-[#939393] font-semibold text-[14px] focus:outline-none px-4 py-4"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Input Gambar" className="font-semibold">
              Gambar Barang
            </label>
            <div className="">
              <input
                onChange={onChange}
                ref={inputRef}
                className="block w-full mb-2 text-xs font-semibold text-gray-900 border-[#989898] border-[2px]  rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
                id="small_size"
                // multiple="multiple"
                type="file"
              />

              {/* <div className="border-2 border-[#989898] text-main-gray hover:bg-[#d1d0d0] text-sm rounded-lg h-28 w-full  flex relative">
                <input
                  type="file"
                  id="Name"
                  className="m-auto border-2 px-4 py-4 hidden"
                  ref={inputRef}
                  onChange={onChange}
                  multiple="multiple"
                  placeholder="input"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 px-3 py-3 -z-0">
                  <h1>tes</h1>
                </div>
                <button
                  type="button"
                  className="flex flex-col m-auto w-full h-full rounded-lg border-2 bg-[#fffbfba6] hover:bg-transparent transition justify-center items-center z-10"
                  onClick={handleClickImg}
                >
                  <Upload className="" />
                
                  <span className="font-semibold">Upload</span>
                </button>
              </div> */}
              <p className="text-[10px] text-red-600 font-semibold">
                *Jika anda memiliki gambar barang anda yang hilang bisa
                dimasukkan atau bisa mengambil referensi dari internet (boleh
                dikosongkan)
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="border text-[13px] px-8 py-1 rounded-md bg-main-gray text-white font-semibold"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={funcOnShow}
              className="border text-[13px] px-8 py-1 rounded-md bg-lost-color text-white font-semibold"
            >
              Cencel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
