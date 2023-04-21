import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, realtorUser } = useAuth();

  if (!currentUser) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export function ProtectedRouteAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, realtorUser } = useAuth();
  if (!currentUser || !realtorUser) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}
