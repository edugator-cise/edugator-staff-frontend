/* eslint-disable @typescript-eslint/no-unused-vars */
// for now

import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
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
import { GetModuleResponse } from "./responseTypes";
import { IModule, IModulesGET, IModulesPUT } from "./types";

const moduleRequests =
	() => axios.request<GetModuleResponse>({ ...apiUrls["get modules"] },);

function* handleGetModulesRequest(action: PayloadAction<void>): any {
	console.log("sagas for GET Modules")
	try {
		//const response = yield call(moduleRequests);
		yield put(
			//requestModulesSuccess(response.data)
			requestModulesSuccess({modules: []})
		);
	} catch (e) {
		yield put(
			requestModulesFailure((e as Error))
		);
	}
}

const moduleAddRequest =
	() => axios.request<GetModuleResponse>({ ...apiUrls["get modules"] },);

function* handleAddModulesRequest(action: PayloadAction<IModulesPUT>): any {
	try {
		// Add response content to sagas
		//const response = yield call(moduleAddRequest);
		let new_module : IModule = {
				name: action.payload.moduleName,
				number: action.payload.moduleNum,
				problemList: [],
			}
		yield put(
			//requestNewModuleSuccess(response.data)
			requestNewModuleSuccess(new_module)
			
		);
	} catch (e) {
		yield put(
			requestNewModuleFailure((e as Error))
		);
	}
}

function* modulesSaga() {
	yield takeEvery(requestModules.type, handleGetModulesRequest);
	yield takeEvery(requestNewModule.type, handleAddModulesRequest);
}

export default modulesSaga;
