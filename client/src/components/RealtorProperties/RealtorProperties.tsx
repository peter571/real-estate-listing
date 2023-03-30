import React from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import Realtor from "../Realtors/Realtor";

export default function RealtorProperties() {
  return (
    <div className="grid divide-x grid-cols-5 h-screen">
      <div className="col-span-1">
        <div className="flex flex-col items-center pb-10">
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900">
            Bonnie Green
          </h5>
          <span className="text-sm text-gray-500">Visual Designer</span>
        </div>
      </div>
      <div className="col-span-4 grid grid-cols-3 gap-6 h-full px-3 overflow-y-auto">
        <PropertyCard/>
        <PropertyCard/>
        <PropertyCard/>
        <PropertyCard/>
        <PropertyCard/>
        <PropertyCard/>
      </div>
    </div>
  );
}
