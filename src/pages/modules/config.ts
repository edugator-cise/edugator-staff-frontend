import { AxiosRequestConfig } from "axios";

interface IApiConfig {
  [desc: string]: AxiosRequestConfig;
}

const noCache = { "Cache-Control": "no-cache" };
//const auth = { "Authorization": "Bearer " + token };

const adminAPI = "https://edugator-admin.com"; // => base

const apiUrls: IApiConfig = {
  "get modules": {
    url: adminAPI + "/v1/module",
    method: "GET",
    headers: {
      ...noCache,
    },
  },
  "get modules and problems": {
    url: adminAPI + "/v1/module/WithProblems",
    method: "GET",
    headers: {
      ...noCache,
    },
  },
  "add module": {
    url: adminAPI + "/v1/module",
    method: "POST",
    headers: {
      ...noCache,
    },
  },
  "modify module": {
    url: adminAPI + "/v1/module",
    method: "PUT",
    headers: {
      ...noCache,
    },
  },
};

export default apiUrls;
