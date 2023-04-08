import ForgotPasswordForm, { ForgotPasswordFormData } from "./form";
import { WindowTitle } from "@copydeck/components/WindowTitle";
import { useAuth } from "@copydeck/contexts/authContext";
import { SubmitPromise } from "@copydeck/hooks/useForm";
import useNavigator from "@copydeck/hooks/useNavigator";
import errorTracker from "@copydeck/services/errorTracking";
// import axios from "axios";
import { Button, message } from "antd";
import React from "react";
// import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";

interface ForgotPasswordProps {
  onSubmit?: (event: ForgotPasswordFormData) => SubmitPromise;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const { checkForgot, dispatch, error, loading } = useAuth();

  const navigate = useNavigator();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const { email } = data;
    dispatch({ type: "loginStart" });
    // validate email and password
    if (!email) {
      const errors = [...(!email ? ["email"] : [])];
      message.error(error?.message);
      return errors;
    } else {
      try {
        const response = await checkForgot(data);
        navigate("/login");
        message.success(response.message);
        dispatch({ type: "loginSuccess" });
      } catch (err) {
        errorTracker.captureException(err);
        message.error(err.response?.data.message);
        dispatch({ type: "actionFailure", payload: err.response?.data });
        return [];
      }
    }
    return [];
  };

  return (
    <>
      <WindowTitle title="Forgot Password" />
      <div className="utilities-form-wrap">
        <h4 className="h4-title xs-margin">Forgot Password?</h4>
        <p className="m-paragraph l-margin">
          Enter your email we'll send you a link{" "}
        </p>
        <div className="utilities-form w-form">
          <ForgotPasswordForm onSubmit={onSubmit}>
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
                <Button
                  disabled={loading || !hasChanged || formDisabled}
                  onClick={handleSubmit}
                  htmlType="submit"
                  loading={loading}
                  className={`btn utilities-button btn-primary w-100`}
                >
                  Send me a link
                </Button>
              </>
            )}
          </ForgotPasswordForm>
          <div className="row mt-16">
            <div className="text-center col w-auto">
              <p>
                Return to&nbsp;
                <Link
                  className="hp-button text-black-80 hp-text-color-dark-40"
                  to="/login"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
