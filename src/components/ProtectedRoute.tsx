import Loader from "@components/Loader";
import { useAuth } from "@copydeck/contexts/authContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  // If authorized, return an outlet that will render child elements
  return user ? <Outlet /> : <Navigate to="/login" />;
};

ProtectedRoute.displayName = "ProtectedRoute";
export default ProtectedRoute;
