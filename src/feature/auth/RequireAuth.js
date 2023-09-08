import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import React from "react";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();

  const { username, isAdmin, isAbo, isInscrit, role } = useAuth();

  const content = allowedRoles.includes(role) ? (
    <Outlet />
  ) : isAbo || isInscrit || isAdmin ? (
    <Navigate
      to="/PrivateRoute/HomeListeRecettesProtect"
      state={{ from: location }}
      replace
    />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
