// import logo from '@assets/images/logo.svg';'
import Footer from "../Footer";
import Header from "../Header";
import React from "react";
// import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";

// interface AuthLayoutProps {
//   children?: React.ReactNode;
// }

const FrontLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

FrontLayout.displayName = "FrontLayout";
export default FrontLayout;
