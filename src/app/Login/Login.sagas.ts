import { put, takeEvery } from "redux-saga/effects";
import { appSettings } from "../common/appSettings";
import {
  LoginActionTypes,
  IRequestLoginAction,
  receiveLoginFailure,
  receiveLoginSuccess,
} from "./Login.actions";

function* requestLogin(action: IRequestLoginAction): any {
  try {
    const token = yield fetch(
      `${appSettings.API_URL}/user/login?username=${action.username}&password=${action.password}`,
      {
        method: "GET",
        headers: {},
      }
    );
    yield put(receiveLoginSuccess(token));
  } catch (e) {
    yield put(receiveLoginFailure((e as Error)?.message));
  }
}

function* authSaga() {
  yield takeEvery(LoginActionTypes.REQUEST_LOGIN, requestLogin);
}

export default authSaga;
