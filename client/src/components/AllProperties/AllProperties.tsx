import React from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "../../api/properties";

export default function AllProperties() {
  const { data: allProperties } = useQuery({
    queryKey: ["properties"],
    queryFn: getAllProperties,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {allProperties &&
        allProperties.map((property: PropertyDetailsCard) => (
          <PropertyCard key={property.id} {...property} />
        ))}
    </div>
  );
}
