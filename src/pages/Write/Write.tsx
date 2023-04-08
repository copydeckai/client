// import { Link } from "react-router-dom";
import WriteNewEditor from "./views/WriteNew";
import "./write.css";
import { Button, Card } from "antd";
import React, { useState } from "react";

interface WriteProps {
  toggleShowPlanType: () => void;
}

const Write: React.FC<WriteProps> = ({ toggleShowPlanType }) => {
  const [showEditor, setShowEditor] = useState(false);

  const startWriting = () => {
    setShowEditor(true);
  };
  return (
    <>
      {showEditor ? (
        <WriteNewEditor toggleShowPlanType={toggleShowPlanType} />
      ) : (
        <div className="hp-main-layout-content">
          <div className="row mb-32 gy-32">
            <div className="col-12">
              <div className="row align-items-center text-center">
                <div className="col-12 col-md-12">
                  <h2>What are you writing?</h2>
                  <p className="mb-0">We'll set up your AI accordingly 🧙🏽‍♂️</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row g-32 sc-lhMiDA hjfTdl">
                <div className="col-12 col-md-6 col-xl-4">
                  <Card>
                    <div className="text-center">
                      <div className="card-body">
                        <h6 className="mb-32 fw-medium hp-text-color-dark-0">
                          I'm writing an article/blog
                        </h6>
                        <svg
                          viewBox="0 0 24 24"
                          height="30"
                          width="30"
                          aria-hidden="true"
                          focusable="false"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          color="#888888"
                          className="StyledIconBase-ea9ulj-0 hfwuWe"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M20 22H4a1 1 0 01-1-1V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z"></path>
                        </svg>
                        <p className="sc-iCfMLu">
                          Select this if you are writing an article, a blog or
                          anything else non-fiction.
                        </p>
                        <Button
                          className="btn btn-primary is-rounded"
                          onClick={startWriting}
                        >
                          Start writing
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <Card>
                    <div className="text-center">
                      <div className="card-body">
                        <h6 className="mb-32 fw-medium hp-text-color-dark-0">
                          I'm writing a story
                        </h6>
                        <svg
                          viewBox="0 0 24 24"
                          height="30"
                          width="30"
                          aria-hidden="true"
                          focusable="false"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          color="#888888"
                          className="StyledIconBase-ea9ulj-0 hfwuWe"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M3 18.5V5a3 3 0 013-3h14a1 1 0 011 1v18a1 1 0 01-1 1H6.5A3.5 3.5 0 013 18.5zM19 20v-3H6.5a1.5 1.5 0 000 3H19zM5 15.337A3.486 3.486 0 016.5 15H19V4H6a1 1 0 00-1 1v10.337z"></path>
                        </svg>
                        <p className="sc-iCfMLu mb-4">
                          Select this if you are writing a story or any other
                          creative piece.
                        </p>
                        <Button
                          className="btn btn-primary is-rounded"
                          onClick={startWriting}
                        >
                          Start writing
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Write.displayName = "Write";
export default Write;
