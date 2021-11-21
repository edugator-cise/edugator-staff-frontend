import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  requestAccounts,
  requestAccountsEnd,
  requestAccountsFail,
  setCurrentAccount,
} from "./AdminAccountsPage.slice";
import adminAPI from "../../app/common/apiClient";
import { IAccountsGET, IAccount } from "./types";

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

function* accountManagerSaga() {
  yield takeEvery(requestAccounts.type, handleGetAccountsRequest);
}

export default accountManagerSaga;
