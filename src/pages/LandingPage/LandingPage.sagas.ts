import { call, put, takeEvery } from "redux-saga/effects";

import { requestModules, setIsLoading, setModules } from "./LandingPageSlice";

import apiClient from "../../app/common/apiClient";
import { IModuleBase } from "../../shared/types";

function* handleRequestModules() {
  try {
    const { data }: { data: IModuleBase[] } = yield call(async () => {
      return apiClient.get("v1/module");
    });
    const sortedModules = data.sort(
      (valuaA, valubeB) => valuaA.number - valubeB.number
    );
    yield put(setModules(sortedModules.map((val) => val.name)));
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(setIsLoading(false));
  }
}

function* landingPageSaga() {
  yield takeEvery(requestModules.type, handleRequestModules);
}

export default landingPageSaga;
