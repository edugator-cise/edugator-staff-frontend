import { call, put, select, takeEvery } from "redux-saga/effects";
import { RootState } from "../../../app/common/store";
import { INewProblem, IProblem } from "../../../shared/types";
import {
  requestAddProblem,
  requestAddProblemFailure,
  requestAddProblemSuccess,
  requestDeleteProblem,
  requestGetProblem,
  requestGetProblemFailure,
  requestGetProblemSuccess,
  requestUpdateProblem,
  requestUpdateProblemFailure,
  requestUpdateProblemSuccess,
} from "./problemEditorContainerSlice";
import apiClient from "../../../app/common/apiClient";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

function* handleGetProblemRequest(action: PayloadAction<string>): any {
  const getProblemRequest = () =>
    apiClient.get(`/v1/admin/problem/${action.payload}`);

  try {
    const response: AxiosResponse<IProblem> = yield call(getProblemRequest);
    yield put(requestGetProblemSuccess(response.data));
  } catch (e) {
    yield put(requestGetProblemFailure(e));
  }
}

function* handleUpdateProblemRequest(): any {
  const state: RootState = yield select();
  const problemState = state.problemEditorContainer;

  const language = "C++";

  const updatedProblem: IProblem = {
    ...problemState.metadata,
    language,
    dueDate: problemState.metadata.dueDate.toISOString(),
    templatePackage: problemState.problem.templatePackage,
    statement: problemState.problem.problemStatement,
    ...problemState.codeEditor,
    testCases: problemState.testCases,
    ...problemState.serverConfig,
  };

  const updateProblemRequest = () =>
    apiClient.put(
      `/v1/admin/problem/${problemState.problemId}`,
      updatedProblem
    );

  try {
    yield call(updateProblemRequest);
    yield put(requestUpdateProblemSuccess());
  } catch (e) {
    yield put(requestUpdateProblemFailure(e));
  }
}

function* handleAddProblemRequest(): any {
  const state: RootState = yield select();
  const problemState = state.problemEditorContainer;

  // preparing the payload
  const language = "C++";

  const newProblem: INewProblem = {
    moduleId: problemState.moduleId,
    ...problemState.metadata,
    language,
    dueDate: problemState.metadata.dueDate.toISOString(),
    templatePackage: problemState.problem.templatePackage,
    statement: problemState.problem.problemStatement,
    ...problemState.codeEditor,
    testCases: problemState.testCases,
    ...problemState.serverConfig,
  };

  const newProblemRequest = () =>
    apiClient.post("/v1/admin/problem/", newProblem);

  try {
    yield call(newProblemRequest);
    yield put(requestAddProblemSuccess());
  } catch (e) {
    yield put(requestAddProblemFailure());
  }
}

function* handleDeleteProblemRequest(): any {}

function* problemSaga() {
  yield takeEvery(requestAddProblem.type, handleAddProblemRequest);
  yield takeEvery(requestGetProblem.type, handleGetProblemRequest);
  yield takeEvery(requestUpdateProblem.type, handleUpdateProblemRequest);
  yield takeEvery(requestDeleteProblem.type, handleDeleteProblemRequest);
}

export default problemSaga;
