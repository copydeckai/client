import "./plantype.css";
import pricingArrow from "@assets/images/app/6145e7f1b0d13ea2a90a5243_R_Pricing_Arrow.svg";
import { Button } from "antd";
import React from "react";

interface PlanTypeProps {
  toggleShowPlanType: () => void;
}

const PlanType: React.FC<PlanTypeProps> = ({ toggleShowPlanType }) => {
  React.useEffect(() => {
    document.body.classList.remove("collapsed-active");
  }, []);

  return (
    <>
      <div className="hp-main-layout-content">
        <button
          className="planType-modal_close ml-auto"
          aria-label="close"
          onClick={toggleShowPlanType}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

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
                  <a
                    href="/"
                    className="primary-button btn-primary w-inline-block"
                  >
                    <div className="button-text-wrap">
                      <div className="button-text">Get Credits</div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="pricing-top">
                <div className="plan-name s-margin">Basic</div>
                <div className="pricing-top-wrap">
                  <div className="m-number">5 Free</div>
                  <div className="pricing-small-text">Credits</div>
                  <a
                    href="/"
                    className="primary-button btn-primary w-inline-block is-disabled"
                  >
                    <div className="button-text-wrap">
                      <div className="button-text">Subscribed</div>
                    </div>
                  </a>
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
                    <Button className="btn btn-lg primary-button btn-primary w-inline-block">
                      Subscribed
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
    </>
  );
};

PlanType.displayName = "PlanType";
export default PlanType;
