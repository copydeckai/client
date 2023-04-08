import logo from "@assets/images/logo.svg";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const toggleNavMenu = () => {
    setShowNavMenu(showNavMenu => !showNavMenu);
  };

  return (
    <div
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className="navigation w-nav"
    >
      <div className="nav-container">
        <div className="menu-left">
          <Link to="/" className="brand w-nav-brand" aria-label="home">
            <div className="nav-logo">
              <img width={150} height={50} src={logo} />
            </div>
          </Link>
        </div>
        <nav role="navigation" className="menu-right w-nav-menu">
          <NavLink to="/" className="nav-link w-nav-link">
            Overview
          </NavLink>
          <NavLink to="/pricing" className="nav-link w-nav-link">
            Pricing
          </NavLink>
          <NavLink to="/login" className="nav-link w-nav-link">
            Login
          </NavLink>
          <Link
            to="/signup"
            className="primary-button invert nav w-inline-block"
          >
            <div className="button-text-wrap">
              <div className="button-text">Get Started</div>
              <div className="button-text">Get Started</div>
            </div>
            <div className="button-hover-effect invert"></div>
          </Link>
        </nav>
        <div
          className={`menu-button w-nav-button${showNavMenu ? " w--open" : ""}`}
          aria-label="menu"
          role="button"
          tabIndex={0}
          aria-controls="w-nav-overlay-0"
          aria-haspopup="menu"
          aria-expanded="false"
        >
          <div className="w-icon-nav-menu" onClick={toggleNavMenu}></div>
        </div>
      </div>
      {showNavMenu ? (
        <div
          className="w-nav-overlay"
          data-nav-menu-open=""
          id="w-nav-overlay-0"
          onClick={toggleNavMenu}
        >
          <nav
            role="navigation"
            className="menu-right w-nav-menu"
            style={{
              transform: "translateY(0px) translateX(0px)",
              transition: "transform 400ms ease 0s"
            }}
            data-nav-menu-open=""
          >
            <div className="nav_inner">
              <NavLink to="/" className="nav-link w-nav-link">
                Overview
              </NavLink>
              <NavLink
                to="/pricing"
                aria-current="page"
                className="nav-link w-nav-link "
              >
                Pricing
              </NavLink>
              <NavLink
                to="/login"
                aria-current="page"
                className="nav-link w-nav-link "
              >
                Log In
              </NavLink>
              <Link to="/signup" className="primary-button nav w-inline-block">
                <div className="button-text-wrap">
                  <div className="button-text">Get Started</div>
                  <div className="button-text">Get Started</div>
                </div>
                <div className="button-hover-effect"></div>
              </Link>
            </div>
          </nav>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

Header.displayName = "Header";
export default Header;
