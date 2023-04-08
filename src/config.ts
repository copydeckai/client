import packageInfo from "../package.json";
import axios from "axios";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

axios.defaults.baseURL = process.env.API_URI;
axios.defaults.withCredentials = true;

export const APP_MOUNT_URI = process.env.APP_MOUNT_URI;
export const APP_DEFAULT_URI = "/";
export const API_URI = process.env.API_URI;
export const API_URL = process.env.API_URL;

export const APP_VERSION = packageInfo.version;

export const GTM_ID = process.env.GTM_ID;

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL
});

// export const userRequest = axios.create({
//   baseURL: process.env.API_URL,
//   header: { token: `Bearer ${TOKEN}` },
// });
