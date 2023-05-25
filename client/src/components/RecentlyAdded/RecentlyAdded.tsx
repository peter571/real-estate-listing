import React from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import PropertyCardLoader from "../PropertyCard/PropertyCardLoader";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getAllProperties,
  recentlyAddedProperties,
} from "../../api/properties";

export default function RecentlyAdded() {
  const navigate = useNavigate();

  const { data: recentProperties, isFetching } = useQuery({
    queryKey: ["recent-properties"],
    queryFn: () => recentlyAddedProperties(),
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
      <div className="grid place-items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
        {isFetching &&
          Array(4)
            .fill(<PropertyCardLoader />)
            .map((el) => el)}
        {recentProperties &&
          !isFetching &&
          recentProperties
            .slice(0, 4)
            .map((property: PropertyDetailsCard) => (
              <PropertyCard key={property.id} {...property} />
            ))}
      </div>
    </section>
  );
}
