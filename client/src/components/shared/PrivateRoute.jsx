import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const currentUserData = currentUser?.user;

  return currentUserData ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
