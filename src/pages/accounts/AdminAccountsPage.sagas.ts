import { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  requestAccounts,
  requestAccountsEnd,
  requestAccountsFail,
  requestModifyAccount,
  requestModifyAccountEnd,
  requestModifyAccountFail,
  requestNewAccount,
  requestNewAccountEnd,
  requestNewAccountFail,
  setCurrentAccount,
  setSelectedAccount,
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

function* handleModifyAccountRequest(action: PayloadAction<IAccount>): any {
  /**
   * Backend validation doesnt like
   * me sending _id property back to them
   */
  const body: IAccount = {
    name: action.payload.name,
    role: action.payload.role,
    username: action.payload.username,
  };

  let updateRequest = () => adminAPI.put("/v1/user/updateUser", body);

  try {
    const { data }: AxiosResponse<IAccount> = yield call(updateRequest);

    yield put(requestModifyAccountEnd(data));
    yield put(setSelectedAccount(data));
  } catch (e) {
    yield put(requestModifyAccountFail(e as Error));
  }
}

function* accountManagerSaga() {
  yield takeEvery(requestAccounts.type, handleGetAccountsRequest);
  yield takeEvery(requestNewAccount.type, handleNewAccountRequest);
  yield takeEvery(requestModifyAccount.type, handleModifyAccountRequest);
}

export default accountManagerSaga;
