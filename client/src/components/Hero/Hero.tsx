import React from "react";
import estate_picture from "../../assets/images/estate.jpg";

export default function Hero() {
  return (
    <div className="flex flex-row gap-6 h-screen">
      <div className="basis-1/2 flex flex-col align-middle justify-center items-center h-full gap-6">
        <blockquote className="text-6xl font-bold leading-[69px]">
          {" "}
          Easiest way to find your dream place
        </blockquote>
        <div className="flex gap-4">
          <span className="h-16 w-52 font-bold bg-[#F85A47] flex justify-center items-center text-white">
            For Sale
          </span>
          <span className="h-16 w-52 font-bold bg-[#Fff] flex justify-center items-center">
            For Rent
          </span>
        </div>
      </div>
      <div className="basis-1/2 flex items-center justify-center align-middle h-full">
        <img
          className="object-cover rounded-bl-3xl h-[70%]"
          src={estate_picture}
          alt=""
        />
      </div>
    </div>
  );
}
