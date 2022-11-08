import { call, put, select, takeEvery } from "redux-saga/effects";
import { RootState } from "../../app/common/store";
import { INewLesson, ILesson } from "../../shared/types";
import {
  requestAddContent,
  requestAddContentFailure,
  requestAddContentSuccess,
  requestDeleteContent,
  requestDeleteContentFailure,
  requestDeleteContentSuccess,
  requestGetContent,
  requestGetContentFailure,
  requestGetContentSuccess,
  requestUpdateContent,
  requestUpdateContentFailure,
  requestUpdateContentSuccess,
} from "./contentEditorPageSlice";
import apiClient from "../../app/common/apiClient";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

function* handleGetContentRequest(action: PayloadAction<string>): any {
  const getContentRequest = () =>
    apiClient.get(`/v1/admin/lesson/${action.payload}`);

  try {
    const response: AxiosResponse<ILesson> = yield call(getContentRequest);
    yield put(requestGetContentSuccess(response.data));
  } catch (e) {
    yield put(requestGetContentFailure(e));
  }
}

function* handleUpdateContentRequest(): any {
  const state: RootState = yield select();
  const contentState = state.contentEditorPage;

  const updatedContent: ILesson = {
    ...contentState.metadata,
    ...contentState.contentEditor,
  };

  const updateContentRequest = () =>
    apiClient.put(`/v1/admin/lesson/${contentState.contentId}`, updatedContent);

  try {
    yield call(updateContentRequest);
    yield put(requestUpdateContentSuccess());
  } catch (e) {
    yield put(requestUpdateContentFailure(e));
  }
}

function* handleAddContentRequest(): any {
  const state: RootState = yield select();
  const problemState = state.contentEditorPage;

  const newContent: INewLesson = {
    moduleId: problemState.moduleId,
    ...problemState.metadata,
    ...problemState.contentEditor,
  };

  const newContentRequest = () =>
    apiClient.post("/v1/admin/lesson/", newContent);

  try {
    yield call(newContentRequest);
    yield put(requestAddContentSuccess());
  } catch (e) {
    yield put(requestAddContentFailure());
  }
}

function* handleDeleteContentRequest(): any {
  const state: RootState = yield select();
  const contentState = state.contentEditorPage;

  const deleteContentRequest = () =>
    apiClient.delete(`/v1/admin/content/${contentState.contentId}`);

  try {
    yield call(deleteContentRequest);
    yield put(requestDeleteContentSuccess());
  } catch (e) {
    yield put(requestDeleteContentFailure(e));
  }
}

function* contentSaga() {
  yield takeEvery(requestAddContent.type, handleAddContentRequest);
  yield takeEvery(requestGetContent.type, handleGetContentRequest);
  yield takeEvery(requestUpdateContent.type, handleUpdateContentRequest);
  yield takeEvery(requestDeleteContent.type, handleDeleteContentRequest);
}

export default contentSaga;
