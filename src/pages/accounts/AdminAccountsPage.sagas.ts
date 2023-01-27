import { AxiosRequestConfig, AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  requestAccounts,
  requestAccountsEnd,
  requestAccountsFail,
  requestNewAccount,
  requestNewAccountEnd,
  requestNewAccountFail,
  requestDeleteAccount,
  requestDeleteAccountEnd,
  requestDeleteAccountFail,
  requestModifyAccount,
  requestModifyAccountEnd,
  requestModifyAccountFail,
  setCurrentAccount,
  setSelectedAccount,
  unsetSelectedAccount,
} from "./AdminAccountsPage.slice";
import adminAPI from "../../../lib/api/apiClient";
import {
  INewAccount,
  IAccount,
  IAccountsGET,
  IAccountPOST,
  IAccountDELETE,
} from "./types";
import { IRequestMessage } from "../../shared/types";

function* handleGetAccountsRequest(): any {
  const accountsRequest = () => adminAPI.get("/v1/user/getUsers");

  try {
    const { data }: AxiosResponse<IAccountsGET> = yield call(accountsRequest);

    const { users, currentUser } = data;

    const currentAccount = users.find((acc) => acc.username === currentUser);

    yield put(requestAccountsEnd(users));
    yield put(setCurrentAccount(currentAccount as IAccount));
  } catch (e: any) {
    const data: IRequestMessage = e.response.data;
    const feedback: IRequestMessage = data.message ? data : e;
    yield put(requestAccountsFail(feedback));
  }
}

function* handleNewAccountRequest(action: PayloadAction<INewAccount>): any {
  const accountsRequest = () =>
    adminAPI.post("/v1/user/create", action.payload);

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
  } catch (e: any) {
    const data: IRequestMessage = e.response.data;
    const feedback: IRequestMessage = data.message ? data : e;
    yield put(requestNewAccountFail(feedback));
  }
}

function* handleModifyAccountRequest(action: PayloadAction<IAccount>): any {
  const body: IAccount = {
    name: action.payload.name,
    role: action.payload.role,
    username: action.payload.username,
    _id: action.payload._id,
  };

  const updateRequest = () => adminAPI.put("/v1/user/updateUser", body);

  try {
    const { data }: AxiosResponse<IAccount> = yield call(updateRequest);

    yield put(requestModifyAccountEnd(data));
    yield put(setSelectedAccount(data));
  } catch (e: any) {
    const data: IRequestMessage = e.response.data;
    const feedback: IRequestMessage = data.message ? data : e;
    yield put(requestModifyAccountFail(feedback));
  }
}

function* handleDeleteAccountRequest(action: PayloadAction<IAccount>): any {
  // backend wants username in the body
  // below is how to set the body in axios.delete
  const config: AxiosRequestConfig = {
    data: {
      username: action.payload.username,
    },
  };
  const deleteRequest = () => adminAPI.delete("/v1/user/deleteUser", config);

  try {
    const { data }: AxiosResponse<IRequestMessage> = yield call(deleteRequest);

    const payload: IAccountDELETE = {
      id: action.payload._id as string,
      message: data.message as string,
    };

    yield put(requestDeleteAccountEnd(payload));
    yield put(unsetSelectedAccount());
  } catch (e: any) {
    const data: IRequestMessage = e.response.data;
    const feedback: IRequestMessage = data.message ? data : e;
    yield put(requestDeleteAccountFail(feedback));
  }
}

function* accountManagerSaga() {
  yield takeEvery(requestAccounts.type, handleGetAccountsRequest);
  yield takeEvery(requestNewAccount.type, handleNewAccountRequest);
  yield takeEvery(requestModifyAccount.type, handleModifyAccountRequest);
  yield takeEvery(requestDeleteAccount.type, handleDeleteAccountRequest);
}

export default accountManagerSaga;
