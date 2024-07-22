"use client";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  Textarea,
  TextInput,
} from "flowbite-react";
import { Edit2Icon, EditIcon } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/API";
import Swal from "sweetalert2";

export function ModalEdit(props) {
  const [openModal, setOpenModal] = useState(false);
  const [itemName, setItemName] = useState(props.nameItem);
  const [desc, setDesc] = useState(props.desc);

  function onCloseModal() {
    setOpenModal(false);
  }
  const queryClient = useQueryClient();
  const postData = async () => {
    try {
      const res = await api.patch("/laporan/update", {
        id: props.id,
        nameItem: itemName,
        desc: desc,
      });
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
      Swal.fire("Success", "Laporan Berhasil Diubah", "success");
      setOpenModal(false);
      queryClient.invalidateQueries(["getReports", "getDetailReports"]);
    },
    onError: (error) => {
      Swal.close();
      Swal.fire("Error", error, "error");
    },
  });
  const onSubmitForm = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)} className="absolute right-0 ">
        <Edit2Icon size={22} />
        <p className="text-[12px] font-semibold text-center">Edit</p>
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        className="pt-20"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <form action="" onSubmit={onSubmitForm}>
            <div className="space-y-6 ">
              <h3 className="text-xl font-medium text-gray-900 ">
                Edit Laporan
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="itemName" value="Nama Barang" />
                </div>
                <TextInput
                  id="nanmeItem"
                  placeholder={props.nameItem}
                  className="capitalize"
                  value={itemName}
                  onChange={(event) => setItemName(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Masukkan deskripsi barang" />
                </div>
                <Textarea
                  rows={4}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Masukkan deskripsi barang"
                />
              </div>

              <div className="w-full flex  justify-center">
                <button
                  type="submit"
                  className="bg-main-gray text-white rounded-md px-5 py-1"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
