import Loader from "@components/Loader";
import React, { useEffect } from "react";
import { WindowTitle } from "@copydeck/components/WindowTitle";
import { useAuth } from "@copydeck/contexts/authContext";
// import { Navigate } from "react-router-dom";
import useNavigator from "@copydeck/hooks/useNavigator";
// import axios from "axios";
import { useParams } from "react-router";

// import SVG from "react-inlinesvg";
// import { Link } from "react-router-dom";

const SocialAuth = () => {
  const { user } = useAuth();
  const { token } = useParams();
  const navigate = useNavigator();
  // const [loading, setLoading] = useState(false);
  // const [, setError] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <WindowTitle title="Authentication" />
        <div className="utilities-form-wrap">
          <Loader />
        </div>
    </>
  );
};

export default SocialAuth;
