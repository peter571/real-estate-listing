import React from "react";
import pic from "../../assets/images/house_1.jpg";

export default function Trending() {
  return (
    <section className="rounded-md py-20">
      <div className="flex flex-row justify-between py-5">
        <h1 className="text-3xl font-semibold">Trending</h1>
        <span role="button" className="text-blue-500 text-xl font-semibold">
          See all
        </span>
      </div>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row h-56 w-[584px] border border-[#DCDCEB] rounded-lg gap-4 cursor-pointer bg-white p-5 hover:border-[#1DAEFF]">
          <img src={pic} className="object-cover w-1/3 rounded-lg" alt="" />
          <div className="w-2/3 flex flex-col justify-between">
            <span className="font-semibold text-[#110229] text-lg">
              103/143 West Street, Crows Nest
            </span>
            <p className="flex flex-row justify-between font-semibold text-[#8F90A6] text-sm">
              <span>10 Bedroom</span>
              <span>150 M</span>
              <span>2 Bathroom</span>
            </p>
            <p className="flex flex-row justify-between align-middle items-center">
              <span className="font-semibold text-[#8F90A6] text-sm">
                Posted by Koecha Homes
              </span>
              <span className="bg-[#8F90A6] p-2 text-white rounded-lg text-sm font-semibold">
                KSH 900K
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
