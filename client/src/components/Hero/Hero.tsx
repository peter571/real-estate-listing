import React from "react";
import estate_picture from "../../assets/images/estate.jpg";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="flex md:flex-row gap-6 sm:h-screen py-5 sm:py-1">
      <div className="md:basis-1/2 flex flex-col align-middle justify-center items-center md:h-full gap-6">
        <blockquote className="text-5xl sm:text-6xl font-bold leading-[69px]">
          {" "}
          Easiest way to find your dream place
        </blockquote>
        <div className="flex gap-4">
          <span
            onClick={() => navigate("/all-properties")}
            role="button"
            className="h-16 px-8 font-bold bg-[#F85A47] flex justify-center items-center text-white cursor-pointer hover:bg-[#fa7668]"
          >
            For Sale
          </span>
          <span
            onClick={() => navigate("/all-properties")}
            role="button"
            className="h-16 px-8 font-bold bg-[#Fff] flex justify-center items-center cursor-pointer hover:bg-[#f2f1f1]"
          >
            For Rent
          </span>
        </div>
      </div>
      <div className="hidden basis-1/2 md:flex items-center justify-center align-middle h-full">
        <img
          className="object-cover rounded-bl-3xl h-[70%]"
          src={estate_picture}
          alt=""
        />
      </div>
    </div>
  );
}
