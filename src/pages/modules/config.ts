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
  "delete module": {
    url: adminAPI + "/v1/module",
    method: "DELETE",
    headers: {
      ...noCache,
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

export enum ModulesAlertEnum {
  requestModulesSuccess = "modules/requestModulesSuccess",
  requestModulesFailure = "modules/requestModulesFailure",
  requestNewModuleSuccess = "modules/requestNewModuleSuccess",
  requestNewModuleFailure = "modules/requestNewModuleFailure",
}

export const AlertMsg: ISnackBarConfig = {
  "modules/requestModulesSuccess": "Modules received successfully",
  "modules/requestModulesFailure": "Failed to get modules from database",
  "modules/requestNewModuleSuccess": "Module created successfully",
  "modules/requestNewModuleFailure": "Module creation failed",
};

export default apiUrls;
