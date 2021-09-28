import { AxiosRequestConfig } from "axios";

interface IApiConfig {
  [desc: string]: AxiosRequestConfig;
}

const noCache = { "Cache-Control": "no-cache" };

const apiUrls: IApiConfig = {
  "get modules": {
    url: "/v1/admin/modules",
    method: "GET",
    headers: {
      ...noCache,
    },
  },
  "add modules": {
    url: "/v1/admin/modules",
    method: "PUT",
    headers: {
      ...noCache,
    },
  },
};

export default apiUrls;
