import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getUserFavorites } from "../../api/favorite";
import PropertyCard from "../PropertyCard/PropertyCard";

export default function FavoriteItems() {
  const { currentUser } = useAuth();

  const { data: favoriteProperties } = useQuery({
    queryKey: ["favorites", currentUser.uid],
    enabled: currentUser !== null,
    queryFn: () => getUserFavorites(currentUser.uid, currentUser.accessToken),
  });

  return (
    <div className="grid grid-cols-4 gap-4">
      {Array.isArray(favoriteProperties) &&
        favoriteProperties.map((property: PropertyDetailsCard) => {
          return <PropertyCard key={property.id} {...property} />;
        })}
    </div>
  );
}
