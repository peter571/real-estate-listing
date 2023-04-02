import React from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import { useNavigate } from "react-router-dom";

export default function RecentlyAdded() {
  const navigate = useNavigate();

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
      <div className="flex flex-row mt-7">
        <PropertyCard />
      </div>
    </section>
  );
}
