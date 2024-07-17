import React, { useState } from "react";
import { CheckCheckIcon } from "lucide-react";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/API";

export default function FinishedFoundButton({ id }) {
  // const mySwal = withRea
  const [name, setName] = useState("");
  const [noIdentity, setNoIdentitas] = useState("");
  const queryClient = useQueryClient();
  const postData = async () => {
    try {
      console.log(id);
      const res = await api.post("/laporan/claimfound", {
        id: id,
        name: name,
        noIdentitas: noIdentity,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      //   console.log(error);
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
      Swal.fire("Success", "Laporan telah diselesaikan", "success");
      queryClient.invalidateQueries(["getReports", "getDetailReports"]);
    },
    onError: () => {
      Swal.close();
      Swal.fire("Error", error.message, "error");
    },
  });

  const showInputDialog = () => {
    Swal.fire({
      title: "Masukkan Data Pemilik",
      showCancelButton: true,
      cancelButtonColor: "red",
      cancelButtonText: "Batal",
      html:
        '<input id="nama-pemilik" class="swal2-input m-auto mb-4 w-[400px]" placeholder="Nama Pemilik">' +
        '<input id="identitas-pemilik" class="swal2-input m-auto w-[400px]" placeholder="Identitas Pemilik">',
      focusConfirm: false,
      preConfirm: () => {
        const nama = Swal.getPopup().querySelector("#nama-pemilik").value;
        const noIdentitas =
          Swal.getPopup().querySelector("#identitas-pemilik").value;
        if (!nama || !noIdentitas) {
          Swal.showValidationMessage("Tolong isi semua field");
        }
        return { nama, noIdentitas };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { nama, noIdentitas } = result.value;
        setName(nama);
        setNoIdentitas(noIdentitas);
        mutation.mutate();
        // console.log(name);
      }
    });
  };
  const onConfirm = () => {
    Swal.fire({
      text: "Apkah Anda Ingin Menyelesaikan Laporan ini",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      cancelButtonText: "Tidak",
      confirmButtonText: "Iya",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Is Confirmed");
        showInputDialog();
      }
    });
  };
  return (
    <div>
      <button onClick={onConfirm} className="flex flex-col items-center">
        <CheckCheckIcon size={30} />
        <h1 className="font-semibold">Selesaikan</h1>
      </button>
    </div>
  );
}
