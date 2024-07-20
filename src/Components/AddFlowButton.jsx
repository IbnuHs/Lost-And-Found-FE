import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";

export default function AddFlowButton({ setOnshow }) {
  const [open, setOpen] = useState(false);
  // function openButton() {
  //   setOnshow();
  //   setOpen(!open);
  // }
  return (
    <div className="sticky pr-4 lg:pr-0 right-0 bottom-10">
      <div className="flex justify-end z-10">
        <div className="flex justify-center flex-col">
          <div className="flex justify-center">
            <button
              onClick={setOnshow}
              className="border-[3px] border-[#919EAB] bg-[#444444] rounded-full px-1 py-1"
            >
              <Plus
                color="white"
                absoluteStrokeWidth={true}
                className="w-7 h-7 lg:w-10 lg:h-10"
              />
            </button>
          </div>
          <p className="hidden text-stroke font-bold lg:inline-block">
            Buat Laporan
          </p>
        </div>
      </div>
    </div>
  );
}
