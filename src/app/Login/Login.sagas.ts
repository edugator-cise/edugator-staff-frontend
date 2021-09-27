import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  requestLogin,
  receiveLoginFailure,
  receiveLoginSuccess,
  IRequestLoginAction,
} from "./Login.slice";

function* handleRequestLogin(action: PayloadAction<IRequestLoginAction>): any {
  try {
    //Dummy URL until we get the env
    const url = `/v1/health`; //user/login?username=${action.payload.username}&password=${action.payload.password}`;
    const token = yield call(async () => {
      return axios.get(url);
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
