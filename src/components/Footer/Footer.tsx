import logo from "@assets/images/logo.svg";
import useNavigator from "@copydeck/hooks/useNavigator";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigator();
  return (
    <div className="section">
      <div className="container">
        <div className="grid l-margin">
          <div
            id="w-node-d65bbcea-6814-d9db-bffb-df2e964851c6-1275d46c"
            className="nav-logo"
          >
            <img width={170} height={50} src={logo} />
          </div>
          <div
            id="w-node-_9f59a8c9-6f71-dc5d-4e9a-401b46694036-1275d46c"
            className="space-between-hor align-left-justify-center-hor"
          >
            <h4
              id="w-node-ecdb920d-29ca-7a2b-5ed4-b0ce1275d472-1275d46c"
              className="h4-title"
            >
              Get started <span>now</span>
            </h4>
            <Link to="/" className="primary-button w-inline-block invert">
              <div className="button-text-wrap">
                <div className="button-text">Create Account</div>
                <div className="button-text">Start free trial</div>
              </div>
              <div className="button-hover-effect"></div>
            </Link>
          </div>
        </div>
        <div className="grid">
          <div
            id="w-node-ecdb920d-29ca-7a2b-5ed4-b0ce1275d479-1275d46c"
            className="align-left-and-vertical"
          >
            <h5 className="h5-title m-margin">Write more, faster!</h5>
          </div>
          <div
            id="w-node-ecdb920d-29ca-7a2b-5ed4-b0ce1275d49a-1275d46c"
            className="align-left-and-vertical"
          >
            <p className="m-subtitle m-margin">Product</p>
            <Link to="/pricing" onClick={() => navigate("/pricing")}>
              Pricing
            </Link>
          </div>
          <div
            id="w-node-e1e31929-5347-93d0-86c2-6550937553b6-1275d46c"
            className="align-left-and-vertical"
          >
            <p className="m-subtitle m-margin">Support</p>
            <Link to="/" className="s-margin">
              Help & Guides
            </Link>
            <Link
              to="/pricing/#faq"
              onClick={() => navigate("/pricing/#faq")}
              className="s-margin"
            >
              FAQ
            </Link>
          </div>
          <div
            id="w-node-_1ba40cca-e3ac-bbde-290e-b257efc1860f-1275d46c"
            className="align-left-and-vertical"
          >
            <p className="m-subtitle m-margin">Company</p>
            <Link
              to="/terms-of-service"
              onClick={() => navigate("/terms-of-service")}
              className="s-margin"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy-policy"
              onClick={() => navigate("/privacy-policy")}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        {/* <div className="footer-credits">© 2022 Copydeck Inc.</div> */}
      </div>
    </div>
  );
};

Footer.displayName = "Footer";
export default Footer;
