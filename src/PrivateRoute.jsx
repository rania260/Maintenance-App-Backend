import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { useCookies } from "react-cookie";

const PrivateRoute = ({ roles, ...rest }) => {
  const { auth } = useContext(AuthContext);
  const [cookies] = useCookies(["jwt"]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the auth object is available and has the necessary properties
    if (auth && auth.accessToken) {
      setLoading(false);
    }
  }, [auth]);

  if (loading) {
    navigate("/login", { replace: true });
  }

  // Check if the user is authenticated (either by auth.accessToken or cookies.jwt)
  const isAuthenticated = auth.accessToken || cookies.jwt;

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  // Check if the user's role is included in the allowed roles array
  const isAuthorized = roles.includes(auth.role);

  return isAuthorized ? <Outlet {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
