import { put, takeEvery } from "redux-saga/effects";
import { appSettings } from "../common/appSettings";
import { AuthActionTypes, IRequestLoginAction } from "./auth.actions";

function* requestLogin(action: IRequestLoginAction): any {
	try {
		const users = yield fetch(`${appSettings.API_URL}/user/login`, {
			method: "GET",
			headers: {},
		});
		yield put({ type: "GET_USERS_SUCCESS", users: users });
	} catch (e) {
		yield put({ type: "GET_USERS_FAILED", message: (e as Error)?.message });
	}
}

function* authSaga() {
	yield takeEvery(AuthActionTypes.REQUEST_LOGIN, requestLogin);
}

export default authSaga;
