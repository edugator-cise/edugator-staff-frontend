import { call, put, select, takeEvery } from "redux-saga/effects";
import { RootState } from "lib/store/store";
import {
  requestDeleteContent,
  requestDeleteContentFailure,
  requestDeleteContentSuccess,
  requestUpdateContentSuccess,
} from "../../state/contentEditorPageSlice";
import apiClient from "lib/api/apiClient";
import { apiRoutes } from "constants/apiRoutes";

function* handleDeleteContentRequest(): any {
  const state: RootState = yield select();
  const contentState = state.contentEditorPage;

  const deleteContentRequest = () =>
    apiClient.delete(
      apiRoutes.admin.deleteLesson(contentState.contentId as string)
    );

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
