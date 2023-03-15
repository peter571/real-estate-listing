import React from "react";
import PropertyCard from "../PropertyCard/PropertyCard";

export default function RecentlyAdded() {
  return (
    <section className="py-20">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-semibold">Recently added</h1>
        <span role="button" className="text-blue-500 text-xl font-semibold">
          See all
        </span>
      </div>
      <div className="flex flex-row mt-7">
    <PropertyCard />
      </div>
    </section>
  );
}
