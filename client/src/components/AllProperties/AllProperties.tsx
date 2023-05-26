import React, { useState } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "../../api/properties";
import SpinnerLoader from "../Loaders/Spinner";
import { Pagination } from "flowbite-react";
import { useSearchParams } from "react-router-dom";
import PropertyCardLoader from "../Loaders/PropertyCardLoader";

export default function AllProperties() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageParam, setPageParam] = useSearchParams({ page: "1" });

  const { data: allProperties, isLoading } = useQuery({
    queryKey: ["properties", currentPage],
    queryFn: () => getAllProperties(currentPage),
  });

  function onPageChange(page: number) {
    setCurrentPage(page);
    setPageParam({ page: page.toString() });
  }


  return (
    <div className="min-h-screen mt-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {isLoading &&
          Array(8)
            .fill(<PropertyCardLoader />)
            .map((el, idx) => <div key={idx}>{el}</div>)}
        {!isLoading && allProperties &&
          allProperties["properties"].map((property: PropertyDetailsCard) => (
            <PropertyCard key={property.id} {...property} />
          ))}
      </div>
      <div className="flex items-center justify-center text-center py-10">
        {!isLoading && allProperties["pages"] > 1 && (
          <Pagination
            currentPage={currentPage}
            layout="pagination"
            onPageChange={onPageChange}
            showIcons={true}
            totalPages={allProperties["pages"]}
            previousLabel="Go back"
            nextLabel="Go forward"
          />
        )}
      </div>
    </div>
  );
}
