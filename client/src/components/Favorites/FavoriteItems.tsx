import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getUserFavorites } from "../../api/favorite";
import PropertyCard from "../PropertyCard/PropertyCard";
import { usePagination } from "../../hooks/usePagination";
import SpinnerLoader from "../Loaders/Spinner";
import { Pagination } from "flowbite-react";
import PropertyCardLoader from "../Loaders/PropertyCardLoader";

export default function FavoriteItems() {
  const { currentUser } = useAuth();
  const { currentPage, onPageChange } = usePagination();

  const { data: favoriteProperties, isLoading: loadingFavorites } = useQuery({
    queryKey: ["favorites", currentPage],
    enabled: currentUser !== null,
    queryFn: () =>
      getUserFavorites(currentUser.uid, currentUser.accessToken, currentPage),
  });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-20">
        {!loadingFavorites && favoriteProperties["properties"].length === 0 && (
          <h1>You have not added any favorites!</h1>
        )}

        {loadingFavorites &&
          Array(4)
            .fill(<PropertyCardLoader />)
            .map((el, idx) => <div key={idx}>{el}</div>)}
        {!loadingFavorites && Array.isArray(favoriteProperties["properties"]) &&
          favoriteProperties["properties"].map(
            (property: PropertyDetailsCard) => {
              return <PropertyCard key={property.id} {...property} />;
            }
          )}
      </div>
      <div className="flex items-center justify-center text-center py-10">
        {!loadingFavorites && favoriteProperties["pages"] > 1 && (
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
