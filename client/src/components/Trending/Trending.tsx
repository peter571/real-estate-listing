import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "api/properties";
import PropertyCard from "components/PropertyCard/PropertyCard";

export default function Trending() {
  const navigate = useNavigate();

  const { data: allProperties } = useQuery({
    queryKey: ["properties-trending"],
    queryFn: () => getAllProperties(1),
  });
  return (
    <section className="rounded-md py-20">
      <div className="flex flex-row justify-between py-5">
        <h1 className="text-lg sm:text-3xl font-semibold">Trending</h1>
        <span
          onClick={() => navigate("/all-properties")}
          role="button"
          className="text-blue-500 text-lg sm:text-xl font-semibold"
        >
          See all
        </span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {allProperties &&
          allProperties["properties"]
            .slice(0, 4)
            .map((property: PropertyDetailsCard) => (
              <PropertyCard key={property.id} {...property} />
            ))}
      </div>
    </section>
  );
}
