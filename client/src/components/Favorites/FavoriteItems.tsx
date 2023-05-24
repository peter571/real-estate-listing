import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getUserFavorites } from "../../api/favorite";
import PropertyCard from "../PropertyCard/PropertyCard";
import { usePagination } from "../../hooks/usePagination";
import SpinnerLoader from "../Loader/Spinner";
import { Pagination } from "flowbite-react";

export default function FavoriteItems() {
  const { currentUser } = useAuth();
  const { currentPage, onPageChange } = usePagination()

  const { data: favoriteProperties, isLoading } = useQuery({
    queryKey: ["favorites", currentPage],
    enabled: currentUser !== null,
    queryFn: () => getUserFavorites(currentUser.uid, currentUser.accessToken, currentPage),
  });

  if (isLoading) return <SpinnerLoader />

  return (
    <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-20">
      {favoriteProperties["properties"].length === 0 && <h1>You have not added any favorites!</h1>}
      {Array.isArray(favoriteProperties["properties"]) &&
        favoriteProperties["properties"].map((property: PropertyDetailsCard) => {
          return <PropertyCard key={property.id} {...property} />;
        })}
    </div>
    <div className="flex items-center justify-center text-center py-10">
    {favoriteProperties["pages"] > 1 && (
      <Pagination
        currentPage={currentPage}
        layout="pagination"
        onPageChange={onPageChange}
        showIcons={true}
        totalPages={favoriteProperties["pages"]}
        previousLabel="Go back"
        nextLabel="Go forward"
      />
    )}
  </div>
  </div>
  );
}
