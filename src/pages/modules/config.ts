import { AxiosRequestConfig } from "axios";

interface IApiConfig {
  [desc: string]: AxiosRequestConfig;
}

const noCache = { "Cache-Control": "no-cache" };
//const auth = { "Authorization": `Bearer ${data.token}` };

// url = https://edugator-admin.com/v1/module => base

const apiUrls: IApiConfig = {
  "get modules": {
    url: "/v1/module",
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
