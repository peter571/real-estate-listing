import React from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "../../api/properties";

export default function RecentlyAdded() {
  const navigate = useNavigate();

  const { data: allProperties } = useQuery({
    queryKey: ["properties"],
    queryFn: getAllProperties,
  });
  
  return (
    <section className="py-20">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg sm:text-3xl font-semibold">Recently added</h1>
        <span
          onClick={() => navigate("/all-properties")}
          role="button"
          className="text-blue-500 text-lg sm:text-xl font-semibold"
        >
          See all
        </span>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-7">
        {allProperties &&
          allProperties.map((property: PropertyDetailsCard) => (
            <PropertyCard key={property.id} {...property} />
          ))}
      </div>
    </section>
  );
}
