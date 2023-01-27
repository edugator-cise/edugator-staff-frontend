import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { baseAPIURL } from "constants/config";
import { LocalStorage } from "../../../lib/auth/LocalStorage";
import {
  requestLogin,
  receiveLoginFailure,
  receiveLoginSuccess,
} from "./LoginPage.slice";
import apiClient from "../../../lib/api/apiClient";
import { IRequestLoginAction, ILoginSuccess } from "./types";
import { AxiosResponse } from "axios";

function* handleRequestLogin(action: PayloadAction<IRequestLoginAction>): any {
  try {
    const url = `${baseAPIURL}v1/auth/login`;
    const { data }: AxiosResponse<ILoginSuccess> = yield call(async () => {
      return apiClient.post(url, action.payload);
    });

    yield put(receiveLoginSuccess(data));
  } catch (e) {
    LocalStorage.checkUnauthorized(e);
    yield put(
      receiveLoginFailure(
        "The username or password is incorrect. Please try again."
      )
    );
  }
}

function* loginSaga() {
  yield takeEvery(requestLogin.type, handleRequestLogin);
}

export default loginSaga;
