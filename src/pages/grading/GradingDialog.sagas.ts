import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeEvery, take, fork } from "redux-saga/effects";
import {
  requestGrading,
  requestGradingEnd,
  requestGradingFail,
  setUploadProgress,
} from "./GradingDialog.slice";
import {
  IGradeRequest,
  //IProgressUpdate,
  //GRADING_REQUEST_PROGRESS,
} from "./types";
import { AxiosRequestConfig } from "axios";
import adminAPI from "../../app/common/apiClient";
import { eventChannel, END, EventChannel } from "redux-saga";

// dispatching my own stuff for progress handling
interface IUploadProgress {
  loaded: number;
  total: number;
}

function* handleGradingRequest(action: PayloadAction<IGradeRequest>): any {
  const query_payload = {
    problemID: action.payload.problemID,
    email: action.payload.email,
  };
  console.log("on grading sagas");
  const params = new URLSearchParams(query_payload).toString();
  const route = "v1/submission/upload?" + params;

  const file = {
    content: action.payload.toGrade,
    filename: action.payload.toGrade.name,
  };
  let fileData = new FormData();
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
    console.log("response", response);
    yield put(requestGradingEnd(response.data));
  } catch (e) {
    yield put(requestGradingFail(e as Error));
  }
}

// to emit when there is progress

let progressEmitter: (loaded: unknown) => void;

const progressChannel = eventChannel((emitter) => {
  progressEmitter = emitter;
  return () => {};
});

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
  console.log("bruhhhhhhhhh");
  while (true) {
    const loaded = yield take(progressChannel);
    yield put(setUploadProgress(loaded));
  }
}

function* gradingSaga() {
  yield takeEvery(requestGrading.type, handleGradingRequest);
}

export default gradingSaga;
