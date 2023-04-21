import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getUserFavorites } from "../../api/favorite";

export default function FavoriteItem() {
  const { currentUser } = useAuth();

  const { data } = useQuery({
    queryKey: ["favorites", currentUser.uid],
    enabled: currentUser !== null,
    queryFn: () => getUserFavorites(currentUser.uid),
  });
  
  return <div>FavoriteItem</div>;
}
