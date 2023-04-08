import NotFoundPage from "./components/NotFoundPage";
import useNavigator from "./hooks/useNavigator";
import React from "react";
import { useLocation } from "react-router-dom";

export const NotFound: React.FC = () => {
  const navigate = useNavigator();
  const location = useLocation();

  const path = location.pathname;
  // strip / from path
  const pathWithoutSlash = path.replace(/^\/+|\/+$/g, "");

  const authPaths = [
    "login",
    "register",
    "reset-password",
    "logout",
    "sign-up",
    "signup"
  ];

  // if the path is in the authPaths array, redirect to the home page
  if (authPaths.includes(pathWithoutSlash)) {
    window.location.href = "/";
    return null;
  } else {
    return <NotFoundPage onBack={() => navigate("/")} />;
  }
};
export default NotFound;
