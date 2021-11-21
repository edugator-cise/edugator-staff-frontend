import { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  requestAccounts,
  requestAccountsEnd,
  requestAccountsFail,
  requestNewAccount,
  requestNewAccountEnd,
  requestNewAccountFail,
  setCurrentAccount,
} from "./AdminAccountsPage.slice";
import adminAPI from "../../app/common/apiClient";
import { INewAccount, IAccount, IAccountsGET, IAccountPOST } from "./types";

function* handleGetAccountsRequest(): any {
  let accountsRequest = () => adminAPI.get("/v1/user/getUsers");

  try {
    const { data }: AxiosResponse<IAccountsGET> = yield call(accountsRequest);

    const { users, currentUser } = data;

    const currentAccount = users.find((acc) => acc.username === currentUser);

    yield put(requestAccountsEnd(users));
    yield put(setCurrentAccount(currentAccount as IAccount));
  } catch (e) {
    yield put(requestAccountsFail(e as Error));
  }
}

function* handleNewAccountRequest(action: PayloadAction<INewAccount>): any {
  let accountsRequest = () => adminAPI.post("/v1/user/create", action.payload);

  try {
    const { data }: AxiosResponse<IAccountPOST> = yield call(accountsRequest);

    const newAccount: IAccount = {
      name: action.payload.name,
      role: action.payload.role,
      username: action.payload.username,
      phone: action.payload.phone,
      _id: data.id,
    };

    yield put(requestNewAccountEnd(newAccount));
  } catch (e) {
    yield put(requestNewAccountFail(e as Error));
  }
}

function* accountManagerSaga() {
  yield takeEvery(requestAccounts.type, handleGetAccountsRequest);
  yield takeEvery(requestNewAccount.type, handleNewAccountRequest);
}

export default accountManagerSaga;
