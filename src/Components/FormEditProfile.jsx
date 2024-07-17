import React from "react";

export default function FormEditProfile({ showForm, show }) {
  return (
    <form
      action=""
      className={`${
        showForm ? "hidden" : "flex"
      } px-6 mt-8 relative font-source-sans3 flex-col gap-5 `}
    >
      <div className="flex flex-col border-b-2 pb-2 border-black">
        <label htmlFor="nama" className="text-[14px] px-2">
          Nama
        </label>
        <input
          type="text"
          className="outline-none px-2 font-semibold capitalize"
          placeholder="John Doe"
        />
      </div>
      <div className="flex flex-col border-b-2 pb-2 border-black">
        <label htmlFor="noHp" className="text-[14px] px-2">
          No Handphone
        </label>
        <input
          type="text"
          className="outline-none px-2 font-semibold capitalize"
          placeholder="0812 0000 0000"
        />
      </div>
      <div className="flex flex-col border-b-2 pb-2 border-black">
        <label htmlFor="email" className="text-[14px] px-2">
          Email
        </label>
        <input
          type="email"
          className="outline-none px-2 font-semibold capitalize"
          placeholder="JohnDoe@Gmail.com"
        />
      </div>
      <div className="flex flex-col border-b-2 pb-2 border-black">
        <label htmlFor="No Identitas" className="text-[14px] px-2">
          No Identitas
        </label>
        <input
          type="text"
          className="outline-none px-2 font-semibold capitalize"
          placeholder="130XXXXXXX"
        />
      </div>
      <div className="m-auto flex gap-4 my-4">
        <button className="bg-main-gray text-center px-8 py-1 text-white rounded-md">
          Save
        </button>
        <button
          type="button"
          onClick={show}
          className="bg-lost-color text-center px-8 py-1 text-white rounded-md"
        >
          Cencel
        </button>
      </div>
    </form>
  );
}
