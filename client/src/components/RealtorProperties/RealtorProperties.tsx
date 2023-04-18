import React from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import Realtor, { Image } from "../Realtors/Realtor";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRealtor, getRealtorProperties } from "../../api/realtors";
import defaultImg from "../../assets/images/254.png"

export default function RealtorProperties() {
  const { id } = useParams();

  const { data: realtor } = useQuery({
    queryKey: ["realtor-"+ id],
    queryFn: () => getRealtor(id!),
  });
  const { data: realtorProperties } = useQuery({
    queryKey: ["realtor_properties"],
    queryFn: () => getRealtorProperties(id!),
  });

  console.log(realtor, realtorProperties)
  return (
    <div className="grid divide-x grid-cols-5 h-screen">
      <div className="col-span-1">
        {realtor && (
          <div className="flex flex-col items-center pb-10">
          <Image src={realtor.profile_picture} fallbackSrc={defaultImg} />
          <h5 className="mb-1 text-xl font-medium text-gray-900">
            {realtor.company_name}
          </h5>
          <span className="text-sm text-gray-500">{realtor.description}</span>
        </div>
        )}
      </div>
      <div className="col-span-4 grid grid-cols-3 gap-6 h-full px-3 overflow-y-auto">
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </div>
    </div>
  );
}
