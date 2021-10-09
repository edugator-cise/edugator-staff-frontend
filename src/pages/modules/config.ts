import { AxiosRequestConfig } from "axios";
import { LocalStorage } from "../../app/common/LocalStorage";

interface IApiConfig {
  [desc: string]: AxiosRequestConfig;
}

const adminAPI = "https://edugator-admin.com"; // => base
const token = LocalStorage.getToken()

const noCache = { "Cache-Control": "no-cache" };
const auth = { "Authorization": "Bearer " + token };

const apiUrls: IApiConfig = {
  "get modules and problems": {
    url: adminAPI + "/v1/module/WithProblems",
    method: "GET",
    headers: {
      ...noCache,
      ...auth, // because previous way is gone on refresh
    },
  },
  "add module": {
    url: adminAPI + "/v1/module",
    method: "POST",
    headers: {
      ...noCache,
      ...auth,
    },
  },
  "modify module": {
    url: adminAPI + "/v1/module",
    method: "PUT",
    headers: {
      ...noCache,
      ...auth,
    },
  },
  "delete module": {
    url: adminAPI + "/v1/module",
    method: "DELETE",
    headers: {
      ...noCache,
      ...auth,
    },
  },
};

interface ISnackBarConfig {
  [type: string]: string;
}

/* Needs to be the same as modules reducer
 * remember to update as necessary
 * format: reducerName/actionName
 * ex: modules/requestModulesSuccess
 * TODO:
 *  Take error code into consideration
 *  Take error message into consideration
 */

export const AlertMsg: ISnackBarConfig = {
  "modules/requestModulesSuccess": "Modules received successfully",
  "modules/requestModulesFailure": "Failed to get modules from database",
  "modules/requestNewModuleSuccess": "Module created successfully",
  "modules/requestNewModuleFailure": "Module creation failed",
};

export default apiUrls;
