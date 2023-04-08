// import { Link } from "react-router-dom";
import "./topbar.css";
import ThemeSwitch from "@copydeck/components/ThemeSwitch";
// import { useAuth } from "@copydeck/contexts/authContext";
import { useSearch } from "@copydeck/contexts/searchContext";
import useNavigator from "@copydeck/hooks/useNavigator";
// import useOutsideClick from "@copydeck/hooks/useOutsideClick";
// import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

interface TopBarProps {
  currentUrl: any;
  fetchSearch: (any) => void;
}

const TopBar: React.FC<TopBarProps> = ({ fetchSearch, currentUrl }) => {
  const { setSearchResults, dispatch } = useSearch();
  const navigate = useNavigator();
  const [timer, setTimer] = useState(null);
  const [keyword, setKeyword] = useState("");
  const searchbarRef = useRef();
  const searchInputRef = useRef();
  const [onChange, setOnChange] = useState(false);

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
        <div className="row w-100 m-0">
          <div className="col px-0">
            <div className="row w-100 align-items-center justify-content-between position-relative">
              <div
                className="col w-auto hp-flex-none hp-mobile-sidebar-button me-24 px-0"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
              >
                <button type="button" className="btn btn-text btn-icon-only">
                  <i className="ri-menu-fill hp-text-color-black-80 hp-text-color-dark-30 lh-1"></i>
                </button>
              </div>

              <div className="hp-header-text-info col col-lg-14 col-xl-16 hp-header-start-text d-flex align-items-center hp-horizontal-none">
                <div className="hp-header-search col active">
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
                              autoComplete="off"
                              className="jss2737"
                              placeholder="Type '?' to search your writing."
                              aria-autocomplete="list"
                              aria-labelledby="downshift-33-label"
                              id="downshift-33-input"
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

              <div className="hp-horizontal-logo-menu d-flex align-items-center w-auto">
                <div className="col hp-flex-none w-auto hp-horizontal-block hp-horizontal-menu ps-24">
                  <ul className="d-flex flex-wrap align-items-center">
                    <li className="px-6">
                      <a
                        href=""
                        className="px-12 py-4"
                        data-bs-toggle="dropdown"
                      >
                        <span>Dashboards</span>
                        <i className="ri-arrow-down-s-line"></i>
                      </a>

                      <ul className="dropdown-menu">
                        <li className="dropend">
                          <a href="dashboard-analytics.html">
                            <span>
                              <span className="submenu-item-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M8.97 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7h-6c-5 0-7 2-7 7v6c0 5 2 7 7 7Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="m1.97 12.7 6-.02c.75 0 1.59.57 1.87 1.27l1.14 2.88c.26.65.67.65.93 0l2.29-5.81c.22-.56.63-.58.91-.05l1.04 1.97c.31.59 1.11 1.07 1.77 1.07h4.06"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </span>

                              <span>Analytics</span>
                            </span>
                          </a>
                        </li>

                        <li className="dropend">
                          <a href="dashboard-ecommerce.html">
                            <span>
                              <span className="submenu-item-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M3 9.11v5.77C3 17 3 17 5 18.35l5.5 3.18c.83.48 2.18.48 3 0l5.5-3.18c2-1.35 2-1.35 2-3.46V9.11C21 7 21 7 19 5.65l-5.5-3.18c-.82-.48-2.17-.48-3 0L5 5.65C3 7 3 7 3 9.11Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </span>

                              <span>E-Commerce</span>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col w-auto pe-0">
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

TopBar.displayName = "TopBar";
export default TopBar;
