import axios from "axios";

const URL = "http://localhost:5000";
const newURL = "https://ca12-77-78-235-66.eu.ngrok.io";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const mainUrl = axios.create({
  baseURL: newURL,
});

export const setupInterceptors = (store) => {
  mainUrl.interceptors.request.use(
    (req) => {
      const token = getToken();
      if (token) {
        req.headers["Authorization"] = `Bearer ${token}`;
      }
      return req;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  //this can also be user for refresh tokens...
  //link https://www.bezkoder.com/redux-refresh-token-axios/
};
