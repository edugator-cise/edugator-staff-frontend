import { call, put, select, takeEvery } from "redux-saga/effects";
import { RootState } from "lib/store/store";
import {
  requestDeleteContent,
  requestDeleteContentFailure,
  requestDeleteContentSuccess,
  requestUpdateContentSuccess,
} from "./contentEditorPageSlice";
import apiClient from "lib/api/apiClient";

function* handleDeleteContentRequest(): any {
  const state: RootState = yield select();
  const contentState = state.contentEditorPage;

  const deleteContentRequest = () =>
    apiClient.delete(`/v1/admin/lesson/${contentState.contentId}`);

  try {
    yield call(deleteContentRequest);
    yield put(requestDeleteContentSuccess());
  } catch (e) {
    yield put(requestDeleteContentFailure(e));
  }
}

function* contentSaga() {
  yield takeEvery(requestDeleteContent.type, handleDeleteContentRequest);
}

export default contentSaga;
