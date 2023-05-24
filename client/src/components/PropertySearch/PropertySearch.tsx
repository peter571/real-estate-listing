import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchProperties } from "../../api/properties";
import PropertyCard from "../PropertyCard/PropertyCard";
import SearchBar from "../SearchBar/SearchBar";
import { useSearch } from "../../contexts/SearchContext";
import SpinnerLoader from "../Loader/Spinner";
import { Pagination } from "flowbite-react";
import { usePagination } from "../../hooks/usePagination";

export default function PropertySearch() {
  const { search_query } = useParams();
  const { data, dispatch } = useSearch();
  const { currentPage, onPageChange } = usePagination()

  const { data: allProperties, isLoading, refetch } = useQuery({
    queryKey: ["search-properties", currentPage],
    queryFn: () => searchProperties(data, currentPage),
  });


  useEffect(() => {
    dispatch({ type: "SearchTerm", payload: search_query! });
  }, [])

  useEffect(() => {
    refetch()
  }, [data])

  if (isLoading) return <SpinnerLoader />;

  return (
    <div className="">
      <div className="w-full fixed z-10 top-16 left-0 bg-white -mt-2">
      <SearchBar />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10 mt-48 lg:mt-24">
        {allProperties["results"].length === 0 && (
          <h1>No matching properties!</h1>
        )}
        {allProperties &&
          allProperties["results"].map((property: PropertyDetails) => (
            <PropertyCard key={property.id} {...property} />
          ))}
      </div>
      <div className="flex items-center justify-center text-center py-10">
        {allProperties["pages"] > 1 && (
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
