import NotFound from "../NotFound";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import ResetPassword from "../pages/Auth/ResetPassword";
import SocialAuth from "../pages/Auth/SocialAuth";
import Signup from "../pages/Auth/Signup";
import Verification from "../pages/Auth/Verification";
import WriteView from "../pages/Write/views/WriteView";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import {
  loginPath,
  readWritingUrl,
  passwordResetPath,
  signupPath //   socialSignInCallbackPath
} from "./urls";
import Layout from "@components/AuthLayout";
import FrontLayout from "@components/FrontLayout";
import React from "react";
import { Route, Routes } from "react-router-dom";

// import AuthRoute from "@components/AuthRoute";

const AuthRouter: React.FC = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path={loginPath} element={<Login />} />
      <Route path={signupPath} element={<Signup />} />
      <Route path={passwordResetPath} element={<ForgotPassword />} />
      <Route path="/auth/:token" element={<SocialAuth />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      <Route path="/verify-identity/:id/:token" element={<Verification />} />
    </Route>
    <Route path={readWritingUrl} element={<WriteView />} />
    <Route element={<FrontLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/terms-of-service" element={<Terms />} />
      <Route path="/privacy-policy" element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

AuthRouter.displayName = "AuthRouter";
export default AuthRouter;
