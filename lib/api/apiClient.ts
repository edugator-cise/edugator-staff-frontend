import axios from "axios";
import { baseAPIURL, unauthorizedErrorMessage } from "constants/config";
import { LocalStorage } from "lib/auth/LocalStorage";

const apiClient = axios.create({
  baseURL: baseAPIURL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

const authHeaderKey = "Authorization";

apiClient.interceptors.request.use(
  function (config) {
    const token = LocalStorage.getToken();
    if (token) {
      // Apply authorization token to every request if logged in
      const bearer = `Bearer ${token}`;
      apiClient.defaults.headers.common[authHeaderKey] = bearer;
      config.headers.common[authHeaderKey] = bearer;
    } else {
      // Delete auth header
      delete apiClient.defaults.headers.common[authHeaderKey];
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (LocalStorage.checkUnauthorized(error)) {
      LocalStorage.removeToken();
      (error as Error).message = unauthorizedErrorMessage;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
