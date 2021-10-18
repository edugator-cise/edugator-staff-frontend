import axios from "axios";
import { useHistory } from "react-router";
import { baseAPIURL } from "../../shared/constants";
import { Routes } from "../../shared/Routes.constants";
import { LocalStorage } from "./LocalStorage";

const apiClient = axios.create({
  baseURL: baseAPIURL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

apiClient.interceptors.request.use(
  function (config) {
    console.log("here");
    const token = LocalStorage.getToken();
    console.log(token);
    if (token) {
      // Apply authorization token to every request if logged in
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // Delete auth header
      delete apiClient.defaults.headers.common["Authorization"];
    }
    return config;
  },
  function (error) {
    console.log("error");
    console.log(error);
    if (LocalStorage.checkUnauthorized(error)) {
      const history = useHistory();
      history.push(Routes.Login);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
