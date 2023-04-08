import { useAuth } from "../contexts/authContext";

// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuth();
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    // window.location.href = "/login";
    dispatch({ type: "logout" });
  };
  return { logout };
};
