// import { Link } from "react-router-dom";
import Writings from "./components/WritingCard";
import "./home.css";
import { useSearch } from "@copydeck/contexts/searchContext";
import useNavigator from "@copydeck/hooks/useNavigator";
import { Button } from "antd";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const navigate = useNavigator();
  const { setSearchResults, searchResults, keyword } = useSearch();

  useEffect(() => {
    if (keyword.length < 1) {
      setSearchResults(null);
    }
  }, [keyword, setSearchResults]);

  return (
    <div className="hp-main-layout-content">
      <div className="row mb-32 gy-32">
        <div className="col-12">
          <div className="row align-items-center justify-content-between g-24">
            <div className="col-12 col-md-6">
              {searchResults ? (
                <h3>Results for : {keyword}</h3>
              ) : (
                <h3>Your Writings</h3>
              )}
            </div>
            <div className="col hp-flex-none w-auto">
              <Button
                onClick={() => navigate("/write")}
                className="btn btn-primary is-rounded"
              >
                Write New
              </Button>
            </div>
          </div>
        </div>
        <Writings />
      </div>
    </div>
  );
};

Home.displayName = "Home";
export default Home;
