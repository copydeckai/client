import "./style.scss";
import icon from "@assets/images/icon.svg";
import NotFoundPage from "@copydeck/components/NotFoundPage";
// import logoDark from "@assets/images/logo-light.svg";
import ThemeSwitch from "@copydeck/components/ThemeSwitch";
import { useFetch } from "@copydeck/hooks/makeRequest";
// import useNavigator from "@copydeck/hooks/useNavigator";
// import { Button } from "antd";
import React, { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import { Link, useParams } from "react-router-dom";

const WriteView = () => {
  // const navigate = useNavigator();
  const { id } = useParams();
  const { data, error, loading } = useFetch(`/story/read/${id}`);
  const [story, setStory] = useState(data[0]);
  useEffect(() => {
    setStory(data[0]);
  }, [data]);

  return (
    <div className="sc-iwjdpV rzjgo">
      <div className="sc-dlVxhl dYGOrL">
        <Link to="/">
          <SVG className="hp-logo sc-ieecCq bJuKmw hp-dark-block" src={icon} />
          <SVG className="hp-logo sc-ieecCq bJuKmw hp-dark-none" src={icon} />
        </Link>
        <div className="sc-kfPuZi ePnpsE">
          <div className="">
            <ThemeSwitch />
          </div>
          <div className="sc-fKVqWL eperKY ms-24">
            <Link
              to="/signup"
              className="btn btn-primary is-rounded"
            >
              Write with Copydeck
            </Link>
          </div>
        </div>
      </div>
      {error ? (
        "Something went wrong!"
      ) : !loading ? (
        story ? (
          <div className="sc-cxpSdN hhLwZn">
            <h2 className="sc-gsDKAQ sc-iJKOTD jmEcTz">{story?.title}</h2>
            <div className="sc-llYSUQ bbWDWG">
              <p className="sc-eCImPb sc-giYglK dNLAro">
                Written by<span>&nbsp;</span>
              </p>
              <p className="sc-jRQBWg dcPzrL">
                {`${story?.authorFname} ${story?.authorLname}`}
                <span>&nbsp;</span>
              </p>
              {/* <p className="sc-eCImPb sc-giYglK dNLAro">on Copydeck</p> */}
            </div>
            <div
              className="sc-eCImPb sc-ezbkAF ebKIPs A-dmbO"
              dangerouslySetInnerHTML={{ __html: story?.content }}
            ></div>
          </div>
        ) : (
          <NotFoundPage onBack={undefined} />
        )
      ) : (
        <div className="circular-loader">
          <div className={`has-loader is-fixed has-loader-active`}>
            <div className="h-loader-wrapper">
              <div className="loader is-large is-loading"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

WriteView.displayName = "WriteView";
export default WriteView;
