import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRealtor } from "api/realtors";

export default function TrendingPropertyCard(props: PropertyDetailsCard) {
  const { data: realtor } = useQuery({
    queryKey: ["properties", props.owner_id],
    queryFn: () => getRealtor(props.owner_id),
  });

  return (
    <div className="flex flex-row h-56 w-[584px] border border-[#DCDCEB] rounded-lg gap-4 cursor-pointer bg-white p-5 hover:border-[#1DAEFF]">
      <img
        src={props.property_images[0]}
        className="object-cover w-1/3 rounded-lg"
        alt=""
      />
      <div className="w-2/3 flex flex-col justify-between">
        <span className="font-semibold text-[#110229] text-lg">
          {props.address}
        </span>
        <p className="flex flex-row justify-between font-semibold text-[#8F90A6] text-sm">
          <span>{props.bedrooms} Bedrooms</span>
          <span>{props.size} Sq Metres</span>
          <span>{props.bathrooms} Bathrooms</span>
        </p>
        <p className="flex flex-row justify-between align-middle items-center">
          <span className="font-semibold text-[#8F90A6] text-sm">
            Posted by {realtor?.company_name}
          </span>
          <span className="bg-[#8F90A6] p-2 text-white rounded-lg text-sm font-semibold">
            KSH {props.price}
          </span>
        </p>
      </div>
    </div>
  );
}
