import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { appSettings } from "../common/appSettings";
import {
	requestLogin,
	receiveLoginFailure,
	receiveLoginSuccess,
	IRequestLoginAction,
} from "./Login.slice";

function* handleRequestLogin(action: PayloadAction<IRequestLoginAction>): any {
	try {
		const url = `${appSettings.API_URL}/health`; //`${appSettings.API_URL}/user/login?username=${action.payload.username}&password=${action.payload.password}`
		const token = yield fetch(url, {
			method: "GET",
			headers: {},
		});
		yield put(receiveLoginSuccess(token));
	} catch (e) {
		yield put(receiveLoginFailure((e as Error)?.message));
	}
}

function* loginSaga() {
	yield takeEvery(requestLogin.type, handleRequestLogin);
}

export default loginSaga;
