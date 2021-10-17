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
import { IModuleBase } from "../../shared/types";
import { IAdminModule } from "./types";

function* handleGetModulesRequest(): any {
  // request
  let modulesRequest = () =>
    axios.request<IAdminModule[]>({ ...apiUrls["get modules and problems"] });
  try {
    const response: AxiosResponse<IAdminModule[]> = yield call(modulesRequest);
    yield put(requestModulesSuccess(response.data));
  } catch (e) {
    yield put(requestModulesFailure(e as Error));
  }
}

function* handleAddModulesRequest(action: PayloadAction<IModuleBase>): any {
  // request
  let moduleAddRequest = () =>
    axios.request<string>({
      ...apiUrls["add module"],
      data: {
        name: action.payload.name,
        number: action.payload.number,
      },
    });

  try {
    // Add response content to sagas
    const response: AxiosResponse<string> = yield call(moduleAddRequest);

    let new_module: IAdminModule = {
      name: action.payload.name,
      number: action.payload.number,
      problems: [],
      _id: response.data,
    };
    yield put(requestNewModuleSuccess(new_module));
  } catch (e) {
    yield put(requestNewModuleFailure(e as Error));
  }
}

function* modulesSaga() {
  yield takeEvery(requestModules.type, handleGetModulesRequest);
  yield takeEvery(requestNewModule.type, handleAddModulesRequest);
}

export default modulesSaga;
