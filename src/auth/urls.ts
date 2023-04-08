import { stringifyQs } from "@copydeck/utils/urls";

export const readWritingUrl = `/read/:id`;

export const passwordResetPath = "/forgot-password/";
export const passwordResetUrl = passwordResetPath;

export const passwordResetSuccessPath = "/reset-password/success/";
export const passwordResetSuccessUrl = passwordResetSuccessPath;

export const newPasswordPath = "/new-password/";

export const loginPath = "/login/";
export const signupPath = "/signup/";
export const logoutPath = "/logout/";

export const socialSignInPath = "/social-signin/";
export const socialSignInUrl = socialSignInPath;

export const socialSignInCallbackPath = "/social-signin/callback/";

export interface NewPasswordUrlQueryParams {
  id: string;
  token: string;
}
export const newPasswordUrl = (params?: NewPasswordUrlQueryParams) =>
  newPasswordPath + "?" + stringifyQs(params);
