import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	requestModules,
	requestModulesSuccess,
	requestModulesFailure,
	IRequestModulesAction,
} from "./ModulesPage.slice";

import Config from "./config";
import { GetModuleResponse } from "./responseTypes";

const moduleRequests = () => axios.request<GetModuleResponse>(Config.apiUrls["get modules"]);


function* handleRequestModules(action: PayloadAction<IRequestModulesAction>): any {
	try {
		const response = yield call(moduleRequests);
		yield put(
			requestModulesSuccess(response.data)
		);
	} catch (e) {
		yield put(requestModulesFailure((e as Error)?.message));
	}
}

function* modulesSaga() {
	yield takeEvery(requestModules.type, handleRequestModules);
}

export default modulesSaga;
