import React from "react";
import user from "../assets/user.png";

export default function UserInfo(props) {
  return (
    <div className="hidden md:flex flex-col flex-grow px-4">
      <div className="border-b-4 border-b-main-gray pb-3">
        <h1 className="text-[24px] font-semibold text-center"> Profile</h1>
      </div>

      <div className="mt-8">
        <div className="bg-[#D9D9D9] px-1 py-1 max-w-[100px] rounded-full m-auto">
          <img src={user} alt="" className="" />
        </div>
        <div className="flex px-6 mt-8 relative font-source-sans3 flex-col gap-5 max-w-[80%] m-auto">
          <div className="flex flex-col border-b-2 pb-2 border-black">
            <h1 className="text-[15px] px-2">Nama</h1>

            <h1 className="outline-none px-2 font-semibold text-[16px] capitalize">
              {props.userName}
            </h1>
          </div>
          <div className="flex flex-col border-b-2 pb-2 border-black">
            <h1 className="text-[15px] px-2">No Handphone</h1>

            <h1 className="outline-none px-2 font-semibold text-[16px] capitalize">
              {props.noHp}
            </h1>
          </div>
          <div className="flex flex-col border-b-2 pb-2 border-black">
            <h1 className="text-[15px] px-2">Email</h1>

            <h1 className="outline-none px-2 font-semibold text-[16px] capitalize">
              {props.email}
            </h1>
          </div>
          <div className="flex flex-col border-b-2 pb-2 border-black">
            <h1 className="text-[15px] px-2">No Identitas</h1>

            <h1 className="outline-none px-2 font-semibold text-[16px] capitalize">
              {props.numIdentity}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
