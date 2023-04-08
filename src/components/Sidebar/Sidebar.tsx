// import externalLinkIcon from "@assets/icons/externalLink.svg"
// import { Avatar } from "@mantine/core";;
import { useAuth } from "../../contexts/authContext";
import "./sidebar.css";
import chatIcon from "@assets/icons/Chat.svg";
import editIcon from "@assets/icons/Edit.svg";
import logoutIcon from "@assets/icons/Logout.svg";
import starIcon from "@assets/icons/Star.svg";
import userIcon from "@assets/icons/User.svg";
import icon from "@assets/images/icon.svg";
import logoLight from "@assets/images/logo-light.svg";
import useNavigator from "@copydeck/hooks/useNavigator";
import axios from "axios";
import React from "react";
// import Gravatar from "react-gravatar";
import SVG from "react-inlinesvg";
import { Link, NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigator();
  const activeClassName = ({ isActive }) => (isActive ? "active" : "");

  // React.useEffect(() => {
  //   document.body.classList.remove('collapsed-active');
  // }, []);

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
  }
  //   const userAvatar = user?.details.avatar
  const userAvatar = user?.avatar
    ? user?.avatar
    : "https://avatars.githubusercontent.com/u/29050206?s=120&v=4";

  return (
    <div className="hp-sidebar hp-bg-color-black-20">
      <div className="hp-sidebar-container">
        <div className="hp-sidebar-header-menu">
          <div className="row justify-content-between align-items-end mx-0">
            <div className="w-auto px-0 hp-sidebar-collapse-button hp-sidebar-visible">
              <Link to="/" className="hp-cursor-pointer">
                <SVG src={icon} className="hp-logo" />
              </Link>
            </div>

            <div className="w-auto px-0">
              <div className="hp-header-logo d-flex align-items-center">
                <Link to="/" className="position-relative">
                  <SVG
                    className="hp-logo hp-sidebar-hidden hp-dir-none"
                    src={logoLight}
                  />
                </Link>
              </div>
            </div>
          </div>

          <ul>
            <li>
              <ul>
                <li>
                  <NavLink className={activeClassName} to="/">
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
                  <NavLink className={activeClassName} to="/account">
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
                <span className="d-block hp-text-color-black-100 hp-text-color-dark-0 hp-p1-body lh-1">{`${user?.firstName} ${user?.lastName}`}</span>
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
  );
};

SideBar.displayName = "SideBar";
export default SideBar;
