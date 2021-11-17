import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  requestAccounts,
  requestAccountsEnd,
  requestAccountsFail,
} from "./AdminAccountsPage.slice";
import adminAPI from "../../app/common/apiClient";
import { IAccount } from "./types";

function* handleGetAccountsRequest(): any {
  // request to be functional next PR
  let accountsRequest = () => adminAPI.get<IAccount[]>("/v1/user/accounts");

  try {
    const response: AxiosResponse<IAccount[]> = yield call(accountsRequest);

    yield put(requestAccountsEnd(response.data));
  } catch (e) {
    yield put(requestAccountsFail(e as Error));
  }
}

function* accountManagerSaga() {
  yield takeEvery(requestAccounts.type, handleGetAccountsRequest);
}

export default accountManagerSaga;
