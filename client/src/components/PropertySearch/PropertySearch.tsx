import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProperties } from "../../api/properties";
import PropertyCard from "../PropertyCard/PropertyCard";
import SearchBar from "../SearchBar/SearchBar";
import { useSearch } from "../../contexts/SearchContext";

export default function PropertySearch() {
  const { search_query } = useParams();
  const { data } = useSearch();

  const { data: allProperties, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: getAllProperties,
  });
 

  if (isLoading) return <>...</>;

  //Search from properties
  const searchedProperties: [] = allProperties?.filter(
    (property: PropertyDetails) => {
      let searchTermProperties =
        property.address.toLowerCase().includes(search_query!.toLowerCase()) ||
        property.location.toLowerCase().includes(search_query!.toLowerCase()) ||
        property.category.toLowerCase().includes(search_query!.toLowerCase()) ||
        property.description
          .toLowerCase()
          .includes(search_query!.toLowerCase()) ||
        property.property_type
          .toLowerCase()
          .includes(search_query!.toLowerCase());
      let bathrooms =
        data.baths && Number(property.bathrooms) >= Number(data.baths);
      let bedrooms =
        data.beds && Number(property.bedrooms) >= Number(data?.beds ?? 0);
      let category =
        data.category &&
        property.category.toLowerCase() === data?.category?.toLowerCase();
      let minPrice =
        data.min_price &&
        Number(property.price) * 100 >= Number(data?.min_price ?? 0);
      let maxPrice =
        data.max_price &&
        Number(property.price) * 100 <=
          Number(data?.max_price ?? Number.MAX_VALUE);
      let propertyType =
        data.type &&
        property.property_type.toLowerCase() === data?.type?.toLowerCase();
      let size =
        data.area_max &&
        Number(property.size) <= Number(data?.area_max ?? Number.MAX_VALUE);
      let filtersProperties =
        bathrooms &&
        bedrooms &&
        category &&
        minPrice &&
        maxPrice &&
        propertyType &&
        size;

      return searchTermProperties && filtersProperties;
    }
  );

  return (
    <div className="">
      <SearchBar />
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
