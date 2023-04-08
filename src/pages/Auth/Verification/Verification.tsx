import Done from "@assets/animations/Done.json";
// import { API_URL } from "@copydeck/config";
import Loader from "@components/Loader";
// import NotFound from '@copydeck/NotFound';
import { WindowTitle } from "@copydeck/components/WindowTitle";
import { useAuth } from "@copydeck/contexts/authContext";
import useNavigator from "@copydeck/hooks/useNavigator";
// import axios from "axios";
import { Alert, Button } from "antd";
import axios from "axios";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// import SVG from "react-inlinesvg";
// import { Link } from "react-router-dom";

const Verification = () => {
  const { error, dispatch } = useAuth();
  const { id, token } = useParams();
  const navigate = useNavigator();
  const [loading, setLoading] = useState(false);
  // const [, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await axios.get(`/auth/verify/${id}/${token}`);
      //   navigate("/login");
    } catch (err) {
      setLoading(false);
      dispatch({ type: "actionFailure", payload: err.response.data });
    }
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [id]);

  return (
    <>
      <WindowTitle title="Account Verified" />
      {loading ? (
        <div className="utilities-form-wrap">
          <Loader />
        </div>
      ) : error ? (
        <>
          <Alert
            message={error?.message}
            description="This is an error message take the title seriously."
            type="error"
            showIcon
          />
        </>
      ) : (
        <>
          <div
            className="mb-12 d-flex align-items-center justify-content-center hp-components-item-img"
            style={{ borderRadius: 17 + "px", minHeight: 140 + "px" }}
          >
            <Lottie
              animationData={Done}
              className="animation-wrap"
              height="100px"
              autoPlay
              loop
            />
          </div>
          <div className="text-center justify-content-center">
            <h4 className="mb-4">Email Address Verfied</h4>
            <p style={{ marginBottom: 15 + "px" }}>
              You now have an AI writing super power.
            </p>
            <Button
              className="btn is-rounded btn-primary mt-36"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Verification;
