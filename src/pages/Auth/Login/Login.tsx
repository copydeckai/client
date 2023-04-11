// import PasswordField from "@copydeck/components/PasswordField";
// import TextField from "@copydeck/components/TextField";
import LoginForm, { LoginFormData } from "./form";
import { WindowTitle } from "@copydeck/components/WindowTitle";
import { useAuth } from "@copydeck/contexts/authContext";
import { SubmitPromise } from "@copydeck/hooks/useForm";
import errorTracker from "@copydeck/services/errorTracking";
import { API_URL } from "../../../config";
// import axios from "axios";
import { Button, message } from "antd";
import React from "react";
// import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";

interface LoginCardProps {
  onSubmit?: (event: LoginFormData) => SubmitPromise;
}

const Login: React.FC<LoginCardProps> = () => {
  const { login, resendConfirm, dispatch, error, loading, isActive } =
    useAuth();

  // const navigate = useNavigator();

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
    dispatch({ type: "loginStart" });
    // validate email and password
    if (!email || !password) {
      const errors = [
        ...(!email ? ["email"] : []),
        ...(!password ? ["password"] : [])
      ];
      message.error(error?.message);
      return errors;
    } else {
      try {
        await login(data);
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

  const resendConfirmClick = async () => {
    try {
      await resendConfirm();
      message.success("Confirmation email sent");
    } catch (err) {
      message.error(err.response?.data.message);
      return [];
    }
    return [];
  };

  const ssoGoogle = () => {
    window.open(`${API_URL}/auth/google`, "_self");
  };

  return (
    <>
      <WindowTitle title="Log in" />
      {!isActive ? (
        <>
          <div
            className="mb-12 d-flex align-items-center justify-content-center hp-components-item-img"
            style={{ borderRadius: 17 + "px", minHeight: 140 + "px" }}
          >
            <div className="animation-wrap w-auto">
              <svg
                stroke="#f5f5f5"
                fill="#f5f5f5"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="7em"
                width="7em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zM11 16v2h2v-2h-2zm0-7v5h2V9h-2z"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className="text-center justify-content-center">
            <h3 className="mb-4">Unconfirmed Account!</h3>
            <p>Verify your email by following the link in your mailbox.</p>
            <Button
              disabled={loading}
              onClick={resendConfirmClick}
              htmlType="button"
              className="btn is-rounded btn-primary mt-36"
              loading={loading}
            >
              Resend verification link
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="utilities-form-wrap">
            <h4 className="h4-title xs-margin">Login to Copydeck.</h4>
            <p className="m-paragraph l-margin">
              Not a member yet?{" "}
              <Link className="text-primary" to="/signup">
                Sign Up
              </Link>{" "}
            </p>
            <div className="utilities-form w-form">
              <LoginForm onSubmit={onSubmit}>
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

                    <div className="mb-16">
                      <input
                        autoComplete="password"
                        type="password"
                        name="password"
                        className="form-control large-field password w-input"
                        placeholder="Your Password"
                        disabled={loading}
                        onChange={handleChange}
                        value={data.password}
                      />
                    </div>

                    <div className="row align-items-center justify-content-between mb-16">
                      <div className="col hp-flex-none w-auto"></div>

                      <div className="col hp-flex-none w-auto">
                        <Link
                          className="hp-button text-black-80 hp-text-color-dark-40"
                          to="/forgot-password"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>

                    <Button
                      disabled={loading || !hasChanged || formDisabled}
                      onClick={handleSubmit}
                      htmlType="submit"
                      className="btn utilities-button btn-primary w-100"
                      loading={loading}
                    >
                      Login to your account
                    </Button>
                    <div className="or-sign-up-with-wrap">
                      <div className="sign-up-divider"></div>
                      <div className="extra-small-text">or log in with</div>
                      <div className="sign-up-divider"></div>
                    </div>
                    <button
                      className="social-sign-up w-inline-block"
                      type="button"
                      onClick={ssoGoogle}
                    >
                      <img
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
                        Login With Google
                      </div>
                    </button>
                  </>
                )}
              </LoginForm>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
