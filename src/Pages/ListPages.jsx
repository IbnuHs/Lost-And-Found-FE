import { React, useState } from "react";
import ListReports from "../Layouts/ListReports";
import FormReports from "../Components/FormReports";

export default function ListPages() {
  const [showForm, setShowForm] = useState(true);
  const token = sessionStorage.getItem("token");
  function onShow() {
    if (!token) {
      alert("Perlu Login Untuk Membuat Laporan");
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
