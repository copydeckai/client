// import SVG from "react-inlinesvg";
// import { Link } from "react-router-dom";
import ResetPasswordForm, { type ResetPasswordFormData } from "./form";
import Loader from "@components/Loader";
import { WindowTitle } from "@copydeck/components/WindowTitle";
import { useAuth } from "@copydeck/contexts/authContext";
import { type SubmitPromise } from "@copydeck/hooks/useForm";
import useNavigator from "@copydeck/hooks/useNavigator";
import errorTracker from "@copydeck/services/errorTracking";
import { type IUser } from "@copydeck/types/user";
import { Button, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

interface ResetPasswordProps {
  onSubmit?: (event: ResetPasswordFormData) => SubmitPromise;
}

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const { id, token } = useParams();
  const [userData, setUserData] = useState<IUser>();
  // const [errors, setErrors] = useState<{}>({});
  const [loading, setLoading] = useState(true);

  const { dispatch } = useAuth();

  const navigate = useNavigator();

  const getUserData = async () => {
    setLoading(true);
    const result = await axios.get(`/users/${id}`);
    setLoading(false);
    if (result.data) {
      return result.data;
    }
    return false;
  };

  const handleReset = async (data: ResetPasswordFormData) => {
    setLoading(true);
    try {
      await axios.post(`/auth/reset-password/${id}/${token}`, {
        password: data.password,
        email: userData.email
      });
      //   dispatch({ type: "loginSuccess" });
      setLoading(false);
      message.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      errorTracker.captureException(err);
      setLoading(false);
      message.error(err.response?.data.message);
      dispatch({ type: "actionFailure", payload: err.response?.data });
      return [];
    }
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    const { password, passwordConfirm } = data;
    // validate passwords
    if (password !== passwordConfirm) {
      message.error("Password and confirm password do not match");
    } else {
      return handleReset(data);
    }
  };

  useEffect(() => {
    getUserData().then(userData => {
      setUserData(userData);
    });
  }, [id]);

  return (
    <>
      <WindowTitle title="Reset Password" />

      {loading ? (
        <Loader />
      ) : (
        <div className="utilities-form-wrap">
          <h4 className="h4-title xs-margin">Create New Password.</h4>
          <div className="utilities-form w-form">
            <ResetPasswordForm onSubmit={onSubmit}>
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
                      className="form-control large-field email w-input"
                      placeholder="Your Email"
                      disabled
                      defaultValue={userData?.email}
                    />
                  </div>

                  <div className="mb-16">
                    <input
                      autoComplete="password"
                      type="password"
                      name="password"
                      className="form-control large-field password w-input"
                      placeholder="New Password"
                      disabled={loading}
                      onChange={handleChange}
                      value={data.password}
                    />
                  </div>

                  <div className="mb-16">
                    <input
                      type="password"
                      name="passwordConfirm"
                      className="form-control large-field password w-input"
                      placeholder="Confirm New Password"
                      disabled={loading}
                      onChange={handleChange}
                      value={data.passwordConfirm}
                    />
                  </div>

                  <Button
                    disabled={loading || !hasChanged || formDisabled}
                    onClick={handleSubmit}
                    htmlType="submit"
                    loading={loading}
                    className={`btn utilities-button btn-primary w-100`}
                  >
                    Reset Password
                  </Button>
                </>
              )}
            </ResetPasswordForm>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
