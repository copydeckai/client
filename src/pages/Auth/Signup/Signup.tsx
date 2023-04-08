// import PasswordField from "@copydeck/components/PasswordField";
// import TextField from "@copydeck/components/TextField";
import SignupForm, { SignupFormData } from "./form";
import emailAnim from "@assets/animations/emailAnim.json";
import { WindowTitle } from "@copydeck/components/WindowTitle";
import { useAuth } from "@copydeck/contexts/authContext";
import { SubmitPromise } from "@copydeck/hooks/useForm";
import errorTracker from "@copydeck/services/errorTracking";
// import useNavigator from "@copydeck/hooks/useNavigator";
import { Button, message } from "antd";
// import axios from "axios";
import Lottie from "lottie-react";
import React from "react";
import { useLocation } from "react-router-dom";
// import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";

interface SignupCardProps {
  onSubmit?: (event: SignupFormData) => SubmitPromise;
}
const Signup: React.FC<SignupCardProps> = () => {
  const { signup, dispatch, error, loading, showConfirmation } = useAuth();

  //   const navigate = useNavigator();

  const validateForm = (data: SignupFormData) => {
    const errors: any = {};
    if (!data.firstName) {
      errors.firstName = "First name is required";
    }

    if (!data.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!data.email) {
      errors.email = "Email is required";
    }

    return errors;
  };

  const onSubmit = async (data: SignupFormData) => {
    dispatch({ type: "signupStart" });
    // validate form
    const payload = {
      aiUsage: {
        credits: 5,
        planType: "basic"
      },
      ...data
    };
    const errors = validateForm(data);
    if (errors.length > 0) {
      message.error(error?.message);
    } else {
      try {
        await signup(payload);
        dispatch({ type: "signupSuccess" });
      } catch (err) {
        errorTracker.captureException(err);
        dispatch({ type: "actionFailure", payload: err.response?.data });
        message.error(err.response?.data.message);
        return [];
      }
    }
    return [];
  };

  const location = useLocation();
  const params = new URLSearchParams(location?.search);
  const emailParam = params.get("email");

  const emailAddress = emailParam;

  return (
    <>
      <WindowTitle title="Create account" />
      {showConfirmation ? (
        <>
          <div
            className="mb-12 d-flex align-items-center justify-content-center hp-components-item-img"
            style={{ borderRadius: 17 + "px", minHeight: 140 + "px" }}
          >
            <Lottie
              animationData={emailAnim}
              className="animation-wrap"
              height="100"
              autoPlay
              loop
            />
          </div>
          <div className="text-center justify-content-center">
            <h3 className="mb-4">Account Created</h3>
            <p>Follow the link sent to your mailbox to verify email address.</p>
          </div>
        </>
      ) : (
        <div className="utilities-form-wrap">
          <h4 className="h4-title xs-margin">Sign Up To Copydeck.</h4>
          <p className="m-paragraph l-margin">
            Already have an account?{" "}
            <Link className="text-primary" to="/login">
              Sign In
            </Link>{" "}
          </p>
          <div className="utilities-form w-form">
            <SignupForm emailAddress={emailAddress} onSubmit={onSubmit}>
              {({
                change: handleChange,
                data,
                submit: handleSubmit,
                hasChanged,
                disabled: formDisabled
              }) => (
                <>
                  <div className="mb-16">
                    <input
                      autoComplete="firstName"
                      name="firstName"
                      className="form-control large-field w-input"
                      placeholder="First Name"
                      disabled={loading}
                      onChange={handleChange}
                      value={data.firstName}
                    />
                  </div>
                  <div className="mb-16">
                    <input
                      autoComplete="lastName"
                      name="lastName"
                      className="form-control large-field w-input"
                      placeholder="Last Name"
                      disabled={loading}
                      onChange={handleChange}
                      value={data.lastName}
                    />
                  </div>
                  <div className="mb-16">
                    <input
                      autoComplete="email"
                      type="email"
                      name="email"
                      className="form-control large-field email w-input"
                      placeholder="Your Email"
                      disabled={loading}
                      onChange={handleChange}
                      value={data.email}
                    />
                  </div>
                  <div className="mb-16">
                    <input
                      autoComplete="password"
                      name="password"
                      //   pattern="^.{8,20}$"
                      type="password"
                      className="form-control large-field password w-input"
                      placeholder="Create Password"
                      disabled={loading}
                      onChange={handleChange}
                      value={data.password}
                    />
                  </div>
                  <Button
                    disabled={loading || !hasChanged || formDisabled}
                    onClick={handleSubmit}
                    htmlType="submit"
                    loading={loading}
                    className={`btn utilities-button btn-primary w-100`}
                  >
                    Create account
                  </Button>
                  <div className="or-sign-up-with-wrap">
                    <div className="sign-up-divider"></div>
                    <div className="extra-small-text">or sign up with</div>
                    <div className="sign-up-divider"></div>
                  </div>
                  <a href="" className="social-sign-up w-inline-block">
                    <img
                      src="./assets/62851dcc1205d6034471f709_search.png"
                      loading="lazy"
                      width="24"
                      srcSet="
                    https://assets.website-files.com/62851dcc1205d63c8b71f57f/62851dcc1205d6034471f709_search-p-500.png 500w,
                    https://assets.website-files.com/62851dcc1205d63c8b71f57f/62851dcc1205d6034471f709_search.png       512w
                  "
                      sizes="23.993057250976562px"
                      alt=""
                      className="social-sign-up-icon"
                    />
                    <div className="social-sign-up-text">
                      Signup With Google
                    </div>
                  </a>
                </>
              )}
            </SignupForm>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
