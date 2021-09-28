import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { baseAPIURL } from "../../shared/constants";
import { LocalStorage } from "../common/LocalStorage";
import {
	requestLogin,
	receiveLoginFailure,
	receiveLoginSuccess,
	IRequestLoginAction,
} from "./Login.slice";

interface ServiceSideToken {
	token: string;
}

function* handleRequestLogin(action: PayloadAction<IRequestLoginAction>): any {
	try {
		const url = `${baseAPIURL}v1/user/login?userName=${action.payload.username}&passWord=${action.payload.password}`;
		const token = yield call(async () => {
			return axios.get(url);
		});
		const tokenVal = (token as ServiceSideToken)?.token;
		LocalStorage.setToken(tokenVal);
		yield put(receiveLoginSuccess(tokenVal));
	} catch (e) {
		yield put(receiveLoginFailure((e as Error)?.message));
	}
}

function* loginSaga() {
	yield takeEvery(requestLogin.type, handleRequestLogin);
}

export default loginSaga;
