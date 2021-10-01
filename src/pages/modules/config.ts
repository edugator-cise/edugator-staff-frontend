import { AxiosRequestConfig } from "axios";

interface IApiConfig {
  [desc: string]: AxiosRequestConfig;
}

const noCache = { "Cache-Control": "no-cache" };
//const auth = { "Authorization": "Bearer " + token };

const adminURL = "https://edugator-admin.com"; // => base

const apiUrls: IApiConfig = {
  "get modules": {
    url: adminURL + "/v1/module",
    method: "GET",
    headers: {
      ...noCache,
    },
  },
  "get modules and problems": {
    url: "/v1/module/WithProblems",
    method: "GET",
    headers: {
      ...noCache,
    },
  },
  "add module": {
    url: "/v1/module",
    method: "POST",
    headers: {
      ...noCache,
    },
  },
  "modify module": {
    url: "/v1/module",
    method: "PUT",
    headers: {
      ...noCache,
    },
  },
};

export default apiUrls;
