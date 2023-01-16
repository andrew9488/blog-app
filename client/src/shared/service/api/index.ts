import axios from "axios";
import { tokenActions } from "../../helpers";

const authHeader = () => {
  const token = tokenActions.getUserToken();
  if (token) {
    return "Bearer " + token;
  } else {
    return "";
  }
};

const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_HOST_URL || "http://localhost:8000/api",
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;
