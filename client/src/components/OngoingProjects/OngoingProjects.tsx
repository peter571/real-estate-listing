import React from "react";
import {
  HiOutlineArrowSmLeft,
  HiOutlineArrowSmRight,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import pic from "../../assets/images/home_1.jpg";

export default function OngoingProjects() {
  return (
    <section className="py-20">
      <div className="flex flex-row items-center justify-between">
        <span className="text-3xl font-semibold">Ongoing projects</span>
        <p className="flex flex-row justify-between text-xl font-semibold text-blue-500">
          <span>
            <HiOutlineArrowSmLeft size={35} />
          </span>
          <span>
            <HiOutlineArrowSmRight size={35} />
          </span>
        </p>
      </div>
      <div className="flex flex-row gap-4 my-5">
        {/* Item */}
        <div className="w-64 h-72 bg-slate-200 relative">
          <img className="object-cover w-full h-full" src={pic} alt="" />
          <div className="flex flex-col px-2 bg-white absolute w-48 -bottom-2 h-12 left-[32px] text-[#1E3240]">
            <span className="text-sm font-semibold truncate">
              Pent houses
            </span>
            <p className="flex flex-row flex-nowrap items-center mb-1">
              <HiOutlineLocationMarker color="black" size={16} />{" "}
              <span className="text-xs font-semibold truncate items-center text-center">
                1901 Thornridge Cir. Shiloh 81063
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
