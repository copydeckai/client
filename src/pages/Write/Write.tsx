// import { Link } from "react-router-dom";
import WriteNewEditor from "./views/WriteNew";
import "./write.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";

interface WriteProps {
  toggleShowPlanType: () => void;
}

const Write: React.FC<WriteProps> = ({ toggleShowPlanType }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [storyContext, setStoryContext] = useState<string>("");

  const startWriting = context => {
    setStoryContext(context);
    setShowEditor(true);
  };

  return (
    <>
      {showEditor ? (
        <WriteNewEditor toggleShowPlanType={toggleShowPlanType} storyContext={storyContext} />
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
              <div className="mt-24 sc-lhMiDA hjfTdl">
                <div className="item hp-border-color-dark-80 p-12 mb-16 col-12 rounded-5">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="row align-items-center">
                      <div className="hp-flex-none w-auto pe-0 col">
                        <div className="hp-cursor-pointer me-16">
                          <div className="overflow-hidden d-flex hp-bg-danger-4 rounded-50">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 24 24"
                              role="presentation"
                            >
                              <g transform="translate(3.61 2.75)">
                                <path
                                  d="M7.22.5H0"
                                  transform="translate(4.766 12.446)"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeMiterlimit="10"
                                  strokeWidth="1.5px"
                                ></path>
                                <path
                                  d="M7.22.5H0"
                                  transform="translate(4.766 8.686)"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeMiterlimit="10"
                                  strokeWidth="1.5px"
                                ></path>
                                <path
                                  d="M2.755.5H0"
                                  transform="translate(4.766 4.927)"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeMiterlimit="10"
                                  strokeWidth="1.5px"
                                ></path>
                                <path
                                  d="M0,9.25c0,6.937,2.1,9.25,8.391,9.25s8.391-2.313,8.391-9.25S14.685,0,8.391,0,0,2.313,0,9.25Z"
                                  transform="translate(0)"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeMiterlimit="10"
                                  strokeWidth="1.5px"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="hp-flex-none w-auto ps-0 col">
                        <span className="d-block h4 m-0">Article/blog</span>
                        {/* <span className="d-block hp-p1-body mt-4">
                          if you are writing an article, a blog or anything
                          else non-fiction.
                        </span> */}
                      </div>
                    </div>

                    <div className="text-end">
                      <Button
                        className="btn btn-primary btn-sm is-rounded"
                        onClick={() => startWriting("ARTICLE_BLOG")}
                      >
                        <span>Start writing</span> 
                        <span className="icon"><ArrowRightOutlined /></span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="item hp-border-color-dark-80 p-12 mb-16 col-12 rounded-5">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="row align-items-center">
                      <div className="hp-flex-none w-auto pe-0 col">
                        <div className="hp-cursor-pointer me-16">
                          <div className="overflow-hidden d-flex hp-bg-success-4 rounded-50">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 24 24"
                              role="presentation"
                            >
                              <g transform="translate(3.5 3.5)">
                                <path
                                  d="M0,.5H6.377"
                                  transform="translate(9.835 15.508)"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeMiterlimit="10"
                                  strokeWidth="1.5px"
                                ></path>
                                <path
                                  d="M11.808.609h0a3.042,3.042,0,0,0-4.258.607l-6.752,9C-.941,12.529.7,15.4.7,15.4s3.244.746,4.958-1.539l6.752-8.995A3.042,3.042,0,0,0,11.808.609Z"
                                  transform="translate(0.75 0.75)"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeMiterlimit="10"
                                  strokeWidth="1.5px"
                                ></path>
                                <path
                                  d="M0,0,4.864,3.651"
                                  transform="translate(7.004 3.711)"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeMiterlimit="10"
                                  strokeWidth="1.5px"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="hp-flex-none w-auto ps-0 col">
                        <span className="d-block h4 m-0">Fictional story</span>
                      </div>
                    </div>

                    <div className="text-end">
                      <Button
                        className="btn btn-primary btn-sm is-rounded"
                        onClick={() => startWriting("FICTION_STORY")}
                      >
                        <span>Start writing</span> 
                        <span className="icon"><ArrowRightOutlined /></span>
                      </Button>
                    </div>
                  </div>
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
