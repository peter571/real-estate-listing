import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getAllProperties } from "../../api/properties";
import PropertyCard from "../PropertyCard/PropertyCard";

export default function PropertySearch() {
  const { search_query } = useParams();

  const { data: allProperties } = useQuery({
    queryKey: ["properties"],
    queryFn: getAllProperties,
  });

  //Search from properties
  const searchedProperties: [] = allProperties.filter(
    (property: PropertyDetails) =>
      property.address.toLowerCase().includes(search_query!.toLowerCase()) ||
      property.location.toLowerCase().includes(search_query!.toLowerCase()) ||
      property.category.toLowerCase().includes(search_query!.toLowerCase()) ||
      property.description
        .toLowerCase()
        .includes(search_query!.toLowerCase()) ||
      property.property_type.toLowerCase().includes(search_query!.toLowerCase())
  );

  return (
    <div className="">
      <div className="grid grid-cols-3 col-span-1 gap-4 py-10">
        {searchedProperties.length === 0 && (
          <h1>Unfortunately no properties found!</h1>
        )}
        {searchedProperties.length > 0 &&
          searchedProperties.map((property: PropertyDetails) => (
            <PropertyCard key={property.id} {...property} />
          ))}
      </div>
    </div>
  );
}
