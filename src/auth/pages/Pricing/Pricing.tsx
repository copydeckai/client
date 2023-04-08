// import { Link } from "react-router-dom";
// import useNavigator from '@copydeck/hooks/useNavigator';
import pricingArrow from "@assets/images/app/6145e7f1b0d13ea2a90a5243_R_Pricing_Arrow.svg";
import { WindowTitle } from "@copydeck/components/WindowTitle";
import useNavigator from "@copydeck/hooks/useNavigator";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Pricing: React.FC = () => {
  const navigate = useNavigator();
  return (
    <>
      <WindowTitle title={`Pricing`} />
      <div className="section">
        <div className="text-container center _37-5rem xl-margin">
          <h1 className="h1-title s-margin">Write 10x faster</h1>
          <p className="l-paragraph">
            Imagine having one of the greatest writers in the world helping you
            write, at the click of a button.
          </p>
        </div>
        <div className="container">
          <div>
            <div className="pricing-grid">
              <div className="pricing-top hide-on-phone">
                <img
                  src={pricingArrow}
                  loading="eager"
                  alt=""
                  className="pricing-arrow-2"
                />
              </div>
              <div className="pricing-top bg-gray-4">
                <div className="recommended-banner">
                  <div>PAY&nbsp;AS&nbsp;YOU&nbsp;USE</div>
                </div>
                <div className="pricing-top-wrap">
                  <h4 className="h4-title s-margin">Premium</h4>
                  <div className="m-number">$60 for 1000</div>
                  <div className="pricing-small-text">Credits</div>
                  <Link
                    to="/signup"
                    className="primary-button btn-primary w-inline-block"
                  >
                    <div className="button-text-wrap">
                      <div className="button-text">Get Credits</div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="pricing-top">
                <div className="plan-name s-margin">Basic</div>
                <div className="pricing-top-wrap">
                  <div className="m-number">5 Free</div>
                  <div className="pricing-small-text">Credits</div>
                  <Link
                    to="/signup"
                    className="primary-button btn-primary w-inline-block invert"
                  >
                    <div
                      className="button-text-wrap"
                      onClick={() => navigate("/signup")}
                    >
                      <div className="button-text">Create Account</div>
                      <div className="button-text">Create Account</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="phone-pricing-grid">
              <div className="mobile-plan-wrap featured">
                <div className="pricing-top recommended">
                  <div className="recommended-banner">
                    <div>PAY&nbsp;AS&nbsp;YOU&nbsp;USE</div>
                  </div>
                  <div className="pricing-top-wrap">
                    <div className="plan-name">Premium</div>
                    <div className="m-number">$60</div>
                    <div className="pricing-small-text">per month</div>
                    <Button className="btn btn-lg primary-button btn-primary w-inline-block">
                      Get Plan
                    </Button>
                  </div>
                  <div className="pricing-divider"></div>
                  <div className="plan-description-text">
                    The best of the best for large enterprises
                  </div>
                </div>
              </div>
              <div className="mobile-plan-wrap featured">
                <div className="pricing-top">
                  <div className="pricing-top-wrap">
                    <div className="plan-name">Basic</div>
                    <div className="m-number">Free</div>
                    <div className="pricing-small-text">Forever</div>
                    <Button
                      className="btn btn-lg primary-button btn-primary w-inline-block invert"
                      onClick={() => navigate("/signup")}
                    >
                      Create Account
                    </Button>
                  </div>
                  <div className="pricing-divider"></div>
                  <div className="plan-description-text">
                    Free for life plan.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="faq" className="section">
        <div className="container">
          <div className="grid align-start _4x-gutter">
            <div
              id="w-node-a4cf4b93-21ab-4d71-8ff7-c066f7c6f2fc-f7c6f2f9"
              className="align-left vertically sticky-1"
            >
              <h4 className="h5-title xs-margin">
                Frequently Asked
                <br />
                Questions.
              </h4>
              <p className="m-paragraph faq-margin">
                Find answers to the most commonly asked questions.
              </p>
            </div>
            <div id="w-node-a4cf4b93-21ab-4d71-8ff7-c066f7c6f306-f7c6f2f9">
              <div className="l-margin">
                <p className="l-subtitle xs-margin">How does it work?</p>
                <p className="m-paragraph">
                  We are using OpenAI's GPT-3, one of the world's biggest
                  neural-network powered language models to write with you.
                  GPT-3 has been trained on a lot of text (nearly half a
                  trillion words) in order for it to 'learn' how to write.
                  <br />‍<br />
                  As part of our contract with OpenAI, using Copydeck for
                  'backdoor' access into GPT-3 (instead of using it as a writing
                  assistant) is prohibited.
                </p>
              </div>
              <div className="l-margin">
                <p className="l-subtitle xs-margin">What is it and why?</p>
                <p className="m-paragraph">
                  We are using advanced AI in a way that no one else ever has -
                  to extend your creativity, to write for you. Just click the
                  button and the AI will continue writing for you.
                  <br />‍<br />
                  Imagine having one of the greatest writers in the world
                  helping you write, at the click of a button. That is what we
                  are working towards and you can help support us on this
                  mission.
                </p>
              </div>
              <div className="l-margin">
                <p className="l-subtitle xs-margin">
                  How much can I write with the monthly/annual plan?
                </p>
                <p className="m-paragraph">
                  As much as you like :) We don't have a credit system and we
                  don't plan to introduce one. Spread your wings and write!
                  <br />‍<br />
                  The only limit we have is a daily limit that should not be
                  reached under normal use. This is only intended to prevent bot
                  abuse.
                </p>
              </div>
              <div className="l-margin">
                <p className="l-subtitle xs-margin">
                  Is the AI output original?
                </p>
                <p className="m-paragraph">
                  Yep, output generated by our AI is completely original and
                  passes all common plagiarism checkers.
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Pricing.displayName = "Pricing";
export default Pricing;
