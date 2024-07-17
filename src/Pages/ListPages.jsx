import { React, useState } from "react";
import ListReports from "../Layouts/ListReports";
import FormReports from "../Components/FormReports";
import Swal from "sweetalert2";

export default function ListPages() {
  const [showForm, setShowForm] = useState(true);
  const token = sessionStorage.getItem("token");
  function onShow() {
    if (!token) {
      Swal.fire({
        text: "Harus Login Terlebih Dahulu",
        icon: "warning",
      });
      return;
    }
    setShowForm(!showForm);
    // console.log(showForm);
  }
  return (
    <div className="">
      <ListReports onShow={onShow} />
      <FormReports
        funcOnShow={onShow}
        showform={showForm}
        setShowForm={setShowForm}
      />
    </div>
  );
}
