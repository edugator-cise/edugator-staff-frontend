import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  requestModules,
  requestModulesSuccess,
  requestModulesFailure,
  requestNewModule,
  requestNewModuleSuccess,
  requestNewModuleFailure,
} from "./ModulesPage.slice";

import apiUrls from "./config";
import {
  IModule,
  //IModulesGETSuccess,
  IModulesPUT,
  IModulesPUTSuccess,
} from "./types";

const moduleRequests = () =>
  axios.request<IModule[]>({ ...apiUrls["get modules"] });

/*
const moduleRequests = () =>
  axios.request<GetModuleResponse>({ ...apiUrls["get modules and problems"] });
 */

function* handleGetModulesRequest(action: PayloadAction<void>): any {
  console.log("sagas for GET Modules");
  try {
    //const response = yield call(moduleRequests); // response: any???????????
    const response: AxiosResponse<IModule[]> = yield call(moduleRequests);
    console.log("stuff:", response);
    console.log("data:", response.data);

    yield put(requestModulesSuccess({ modules: response.data }));
  } catch (e) {
    yield put(requestModulesFailure(e as Error));
  }
}

const moduleAddRequest = () =>
  axios.request<IModulesPUTSuccess>({ ...apiUrls["get modules"] });

function* handleAddModulesRequest(action: PayloadAction<IModulesPUT>): any {
  try {
    // Add response content to sagas
    //const response = yield call(moduleAddRequest);
    let new_module: IModule = {
      name: action.payload.moduleName,
      number: action.payload.moduleNum,
      problemList: [],
    };
    yield put(
      //requestNewModuleSuccess(response.data)
      requestNewModuleSuccess(new_module)
    );
  } catch (e) {
    yield put(requestNewModuleFailure(e as Error));
  }
}

function* modulesSaga() {
  yield takeEvery(requestModules.type, handleGetModulesRequest);
  yield takeEvery(requestNewModule.type, handleAddModulesRequest);
}

export default modulesSaga;
