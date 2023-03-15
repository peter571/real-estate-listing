import React from "react";
import { Card } from "flowbite-react";
import sample from "../../assets/images/home_1.jpg";
import { FaBed, FaBath, FaHeart, FaRuler } from "react-icons/fa";

export default function PropertyCard() {
  return (
    <div className="max-w-sm cursor-pointer">
      <Card className="relative" imgAlt="Property Image" imgSrc={sample}>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
          KSH 22,000
        </h5>
        <p className="font-normal text-gray-700">24, AVENUE KILETON, RUAKA</p>
        <p className="flex justify-between">
          <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
            <FaBed color="#1E3240" />
            <span className="text-sm font-semibold">2</span>
          </span>
          <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
            <FaBath color="#1E3240" />
            <span className="text-sm font-semibold">4</span>
          </span>
          <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
            <FaRuler color="#1E3240" />
            <span className="text-sm font-semibold">72</span>
          </span>
        </p>
        <span
          role="button"
          className="absolute top-4 right-4 rounded-md bg-white p-1"
        >
          <FaHeart color="red" />
        </span>
        <span className="absolute top-4 left-4 rounded-md text-sm font-semibold bg-[#F85A47] p-1 text-white">
          For sale
        </span>
      </Card>
    </div>
  );
}
