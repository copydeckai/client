// import logo from '@assets/images/logo.svg';
import "./auth.css";
import React, { useEffect } from "react";
// import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";

// interface AuthLayoutProps {
//   children?: React.ReactNode;
// }

const AuthLayout: React.FC = () => {
  useEffect(() => {
    document.body.classList.remove("dark");
  }, []);
  return (
  <div className="utilities-section">
    <div className="utilities-form-column">
      <Outlet />
    </div>
  </div>
);
}

AuthLayout.displayName = "AuthLayout";
export default AuthLayout;
