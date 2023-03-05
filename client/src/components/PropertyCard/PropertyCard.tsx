import React from "react";
import { Card } from "flowbite-react";
import sample from "../../assets/images/home_1.jpg";
import { FaBed, FaBath, FaHeart } from "react-icons/fa";
import { FcRuler } from "react-icons/fc";

export default function PropertyCard() {
  return (
    <div className="max-w-sm">
      <Card className="relative" imgAlt="Property Image" imgSrc={sample}>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
          KSH 22,000
        </h5>
        <p className="font-normal text-gray-700">
          24, AVENUE KILETON, RUAKA
        </p>
        <p className="flex justify-between">
          <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
            <FaBed color="#966919" />
            <span className="text-sm font-semibold">2</span>
          </span>
          <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
            <FaBath color="#468fd1" />
            <span className="text-sm font-semibold">4</span>
          </span>
          <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
            <FcRuler />
            <span className="text-sm font-semibold">72</span>
          </span>
        </p>
        <span
          role="button"
          className="absolute top-4 right-4 rounded-md bg-white p-1"
        >
          <FaHeart color="red" />
        </span>
      </Card>
    </div>
  );
}
