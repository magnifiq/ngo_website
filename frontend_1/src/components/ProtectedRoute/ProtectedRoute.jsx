import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
