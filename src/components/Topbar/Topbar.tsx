import { useAuth } from "../../contexts/authContext";
import "./topbar.css";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import chatIcon from "@assets/icons/Chat.svg";
import editIcon from "@assets/icons/Edit.svg";
import logoutIcon from "@assets/icons/Logout.svg";
import starIcon from "@assets/icons/Star.svg";
import userIcon from "@assets/icons/User.svg";
import defaultAvatar from "@assets/images/default.png";
import logoDark from "@assets/images/logo.svg";
import ThemeSwitch from "@copydeck/components/ThemeSwitch";
import { useSearch } from "@copydeck/contexts/searchContext";
import useNavigator from "@copydeck/hooks/useNavigator";
// import useOutsideClick from "@copydeck/hooks/useOutsideClick";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";
import { Link, NavLink } from "react-router-dom";

interface TopBarProps {
  currentUrl: any;
  fetchSearch: (any) => void;
}

const TopBar: React.FC<TopBarProps> = ({ fetchSearch, currentUrl }) => {
  const { user, setUser } = useAuth();
  const activeClassName = ({ isActive }) => (isActive ? "active" : "");
  const { setSearchResults, dispatch } = useSearch();
  const navigate = useNavigator();
  const [timer, setTimer] = useState(null);
  const [keyword, setKeyword] = useState("");
  const searchbarRef = useRef();
  const searchInputRef = useRef();
  const [onChange, setOnChange] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);

  const toggleMobileSearch = () => {
    setShowSearch(show => !show);
    setKeyword("");
    setSearchResults(null);
    navigate("/");
  };

  const toggleMobileNav = () => {
    setShowNavMenu(show => !show);
  };

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
  }

  const userAvatar = user?.avatar ? user?.avatar : defaultAvatar;

  // useOutsideClick(searchbarRef, () => {
  // if (searchInputToggle) {
  // setKeyword("");
  // setSearchResults(null);
  // setSearchInputToggle(false);
  // }
  // });

  // const handleSearchInputToggle = () => {
  //   searchInputRef.current.focus();
  //   setSearchInputToggle(!searchInputToggle);
  // };

  // const clearSearchInputToggle = () => {
  //   dispatch({ type: "resetSearch" });
  //   setKeyword("");
  //   setSearchResults(null);
  //   navigate("/");
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setKeyword(value);
    setOnChange(true);
  };

  // function handleReset() {
  //   searchInputRef.current.value = '';
  // }

  const handleSearch = () => {
    // navigate("/", { state: { keyword } });
    if (keyword.length > 0) {
      dispatch({ type: "newSearch", payload: { keyword } });
      dispatch(fetchSearch(keyword));
    } else {
      setSearchResults(null);
      navigate("/");
    }
  };

  const searchOnchage = () => {
    clearTimeout(timer);
    navigate(`/?search=${keyword}`);
    const newTimer = setTimeout(() => {
      handleSearch();
    }, 1000);
    setTimer(newTimer);
  };

  const handleKeyPress = e => {
    // searchInputRef.current.focus();
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (onChange) {
      searchOnchage();
    }
    // if (!) {
    //   navigate("/");
    // }
  }, [keyword, onChange]);

  return (
    <>
      <header>
        <div className="container_">
          <div
            className="col w-auto hp-flex-none hp-mobile-sidebar-button me-24 px-0"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
          >
            <button
              type="button"
              onClick={toggleMobileNav}
              className="btn btn-text btn-icon-only"
            >
              <MenuOutlined style={{ fontSize: 19 }} />
            </button>
          </div>

          <div
            className={`hp-header-search ${
              showSearch ? "active" : ""
            } d-flex align-items-center hp-horizontal-none`}
          >
            <div className="col">
              <div role="presentation" className="jss2578">
                {currentUrl !== "/write" && (
                  <div className="jss2580" tabIndex={-1} ref={searchbarRef}>
                    <div className="MuiPaper-root jss2579 MuiPaper-elevation1 MuiPaper-rounded">
                      <div className="jss2738">
                        <svg
                          className="MuiSvgIcon-root jss2535 jss2739"
                          focusable="false"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="none"
                        >
                          <circle
                            cx="14"
                            cy="14"
                            r="11.25"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          ></circle>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m22 22 7 7"
                          ></path>
                        </svg>
                        <input
                          ref={searchInputRef}
                          autoFocus
                          autoComplete="off"
                          className="jss2737"
                          placeholder="Type '?' to search your writing."
                          aria-autocomplete="list"
                          aria-labelledby="downshift-33-label"
                          id="downshift-33-input"
                          value={keyword}
                          // onFocus={handleSearchInputToggle}
                          // onBlur={clearSearchInputToggle}
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="col w-auto hp-flex-none hp-mobile-sidebar-button d-block me-24 px-0">
              <button
                type="button"
                onClick={toggleMobileSearch}
                className="btn btn-icon-only"
              >
                <svg
                  className="MuiSvgIcon-root"
                  focusable="false"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                >
                  <circle
                    cx="14"
                    cy="14"
                    r="11.25"
                    stroke="#ada9a9"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    stroke="#ada9a9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m22 22 7 7"
                  ></path>
                </svg>
              </button>
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </header>
      <div
        className={`offcanvas offcanvas-start hp-mobile-sidebar mobile-nav ${
          showNavMenu ? "show" : ""
        }`}
      >
        <div className="offcanvas-header justify-content-between align-items-center ms-16 me-8 mt-16 p-0">
          <div className="w-auto px-0">
            <div className="hp-header-logo d-flex align-items-center">
              <Link to="/" onClick={toggleMobileNav} className="position-relative">
                <img
                  className="hp-logo hp-sidebar-visible hp-dark-none"
                  src={logoDark}
                  alt="logo"
                />
                <img
                  className="hp-logo hp-sidebar-visible hp-dark-block"
                  src={logoDark}
                  alt="logo"
                />
              </Link>
            </div>
          </div>

          <div
            className="w-auto px-0 hp-sidebar-collapse-button hp-sidebar-hidden"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={toggleMobileNav}
          >
            <button
              type="button"
              className="btn btn-text btn-icon-only bg-transparent"
            >
              <CloseOutlined />
            </button>
          </div>
        </div>

        <div className="hp-sidebar border-end border-black-40 hp-border-color-dark-80">
          <div className="hp-sidebar-container">
            <div className="hp-sidebar-header-menu">
              <div className="row justify-content-between align-items-end mx-0">
                <div className="w-auto px-0">
                  <div className="hp-header-logo d-flex align-items-center">
                    <Link to="/" className="position-relative" onClick={toggleMobileNav}>
                      <img
                        className="hp-logo hp-sidebar-visible hp-dark-none"
                        src={logoDark}
                        alt="logo"
                      />
                      <img
                        className="hp-logo hp-sidebar-visible hp-dark-block"
                        src={logoDark}
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <ul>
                <li>
                  <ul>
                    <li>
                      <NavLink className={activeClassName} to="/" onClick={toggleMobileNav}>
                        <span>
                          <span className="submenu-item-icon">
                            <SVG src={editIcon} />
                          </span>

                          <span>My Writings</span>
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li>
                  <div className="menu-title">Account</div>
                  <ul>
                    <li>
                      <NavLink className={activeClassName} to="/account" onClick={toggleMobileNav}>
                        <span>
                          <span className="submenu-item-icon">
                            <SVG src={userIcon} />
                          </span>

                          <span>My Account</span>
                        </span>
                      </NavLink>
                    </li>

                    <li>
                      <a
                        target="_blank"
                        href="http://localhost:3000/pricing?ref=webapp&page=HomePageMenu"
                      >
                        <span>
                          <div className="submenu-item-icon">
                            <SVG src={starIcon} />
                          </div>

                          <span>Get Premium</span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li>
                  <div className="menu-title">Resources</div>

                  <ul>
                    <li>
                      <a href="">
                        <span>
                          <span className="submenu-item-icon">
                            <SVG src={chatIcon} />
                          </span>
                          <span>Help & Guides</span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="row justify-content-between align-items-center hp-sidebar-footer mx-0 hp-bg-color-dark-90">
              <div className="divider border-black-40 hp-border-color-dark-70 hp-sidebar-hidden mt-0 px-0"></div>

              <div className="col">
                <div className="row align-items-center">
                  <div className="w-auto px-0">
                    <div className="avatar-item bg-primary-4 d-flex align-items-center justify-content-center rounded-circle">
                      <img
                        src={userAvatar}
                        height="100%"
                        className="hp-img-cover"
                      />
                    </div>
                  </div>

                  <div className="w-auto ms-8 px-0 hp-sidebar-hidden mt-4">
                    <span className="d-block hp-text-color-dark-0 hp-p1-body lh-1">{`${user?.firstName} ${user?.lastName}`}</span>
                    <span className="user-email">{user?.email}</span>
                  </div>
                </div>
              </div>

              <div className="col hp-flex-none w-auto px-0 hp-sidebar-hidden">
                <a className="hp-cursor-pointer" onClick={logout}>
                  <SVG src={logoutIcon} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${showNavMenu ? "offcanvas-backdrop fade show" : ""}`}
      ></div>
    </>
  );
};

TopBar.displayName = "TopBar";
export default TopBar;
