import React, { useEffect } from "react";

import { Navigate, useLocation } from "react-router-dom";


export const ProtectedRoute = ({ children }) => {

  let location = useLocation();
  if (location.state ===null) {
    return <Navigate to="/register" state={{ from: location }} replace ></Navigate>
  }
  return children;
};
