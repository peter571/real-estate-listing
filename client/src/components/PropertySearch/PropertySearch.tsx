import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getAllProperties } from "../../api/properties";
import PropertyCard from "../PropertyCard/PropertyCard";
import SearchBar from "../SearchBar/SearchBar";
import { useSearch } from "../../contexts/SearchContext";
import {
  checkIfAllKeysTrue,
  checkIfAnySearchFilterIsTrue,
  getTrueKeys,
} from "../../utils";

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
      //Search properties based on the search input text query
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

      //Search property based on specific filter selected inputs
      let bathrooms =
        Number(data.baths) > 0 &&
        Number(property.bathrooms) >= Number(data.baths);
      let bedrooms =
        Number(data.beds) > 0 &&
        Number(property.bedrooms) >= Number(data?.beds ?? 0);
      let category =
        data.category &&
        property.category.toLowerCase() === data?.category?.toLowerCase();
      let minPrice =
        Number(data.min_price) > 0 &&
        Number(property.price) * 100 >= Number(data?.min_price ?? 0);
      let maxPrice =
        Number(data.max_price) > 0 &&
        Number(property.price) * 100 <=
          Number(data?.max_price ?? Number.MAX_VALUE);
      let propertyType =
        data.type &&
        property.property_type.toLowerCase() === data?.type?.toLowerCase();
      let size =
        Number(data.area_max) > 0 &&
        Number(property.size) <= Number(data?.area_max ?? Number.MAX_VALUE);

      //Combine all the specific filter select input
      let allFiltersProperties =
        bathrooms &&
        bedrooms &&
        category &&
        minPrice &&
        maxPrice &&
        propertyType &&
        size;

      if (checkIfAllKeysTrue(data)) {
        //If all filters are true search
        return searchTermProperties && allFiltersProperties;
      } else if (checkIfAnySearchFilterIsTrue(data)) {
        let filters = getTrueKeys(data);

        let filter = "searchTermProperties";
       
        //Only search for selected inputs
    
        for (let prop in filters) {
          if (filters[prop] === "type") {
            filter += " && " + "propertyType";
          } else if (filters[prop] === "category") {
            filter += " && " + "category";
          } else if (filters[prop] === "baths") {
            filter += " && " + "bathrooms";
          } else if (filters[prop] === "beds") {
            filter += " && " + "bedrooms";
          } else if (filters[prop] === "min_price") {
            filter += " && " + "minPrice";
          } else if (filters[prop] === "max_price") {
            filter += " && " + "maxPrice";
          } else if (filters[prop] === "area_max") {
            filter += " && " + "size";
          }
        }

        return eval(filter)

      } else {
        return searchTermProperties;
      }
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
