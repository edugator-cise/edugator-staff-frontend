import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import { call, put, takeEvery, take, fork } from "redux-saga/effects";
import {
  requestGrading,
  requestGradingEnd,
  requestGradingFail,
  setUploadProgress,
} from "./GradingDialog.slice";
import { IGradeRequest, IUploadProgress } from "./types";
import adminAPI from "../../app/common/apiClient";
import { eventChannel, END, EventChannel } from "redux-saga";

function* handleGradingRequest(action: PayloadAction<IGradeRequest>): any {
  const query_payload = {
    problemID: action.payload.problemID,
    email: action.payload.email,
  };
  const params = new URLSearchParams(query_payload).toString();
  const route = "v1/submission/upload?" + params;

  const file = {
    content: action.payload.toGrade,
    filename: action.payload.toGrade.name,
  };
  const fileData = new FormData();
  fileData.append("submission_file", file.content, file.filename);

  const new_headers: AxiosRequestConfig = {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progress) => emitProgress(progress),
  };

  // request
  const gradingRequest = () => adminAPI.post(route, fileData, new_headers);
  // for getting progress from request
  yield fork(watchUploadProgress, progressChannel);

  try {
    const response: AxiosResponse<IGradeRequest> = yield call(gradingRequest);
    yield put(requestGradingEnd(response.data));
  } catch (e) {
    yield put(requestGradingFail(e as Error));
  }
}

// to emit when there is progress
let progressEmitter: (loaded: unknown) => void;

// channel to check the emissions
const progressChannel = eventChannel((emitter) => {
  progressEmitter = emitter;
  return () => {};
});

// called onUploadProgress
const emitProgress = ({ loaded, total }: IUploadProgress) => {
  const progress_amount = Math.floor((loaded * 100) / total);

  progressEmitter(progress_amount);
  if (progress_amount === 100) {
    progressEmitter(END);
  }
};

// then take that emit's value and use
// wrapper for dispatching updates of progress
function* watchUploadProgress(progressChannel: EventChannel<unknown>): any {
  while (true) {
    const loaded = yield take(progressChannel);
    yield put(setUploadProgress(loaded));
  }
}

function* gradingSaga() {
  yield takeEvery(requestGrading.type, handleGradingRequest);
}

export default gradingSaga;
