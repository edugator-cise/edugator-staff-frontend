import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  requestGrading,
  requestGradingEnd,
  requestGradingFail,
  setUploadProgress,
} from "./GradingDialog.slice";
import { IGradeRequest } from "./types";
import adminAPI from "../../app/common/apiClient";
import { AxiosRequestConfig } from "axios";

const handleProgress = (progress: any) => {
  const { loaded, total } = progress;
  const percent_progress = Math.floor((loaded / total) * 100);

  console.log(percent_progress);

  put(setUploadProgress(percent_progress));
};

const new_headers: AxiosRequestConfig = {
  headers: { "Content-Type": "multipart/form-data" },
  onUploadProgress: (progress) => handleProgress(progress),
};

function* handleGradingRequest(action: PayloadAction<IGradeRequest>): any {
  const file = {
    content: action.payload.toGrade,
    filename: action.payload.toGrade.name,
  };
  const query_payload = {
    problemID: action.payload.problemID,
    email: action.payload.email,
  };
  const params = new URLSearchParams(query_payload).toString();
  const route = "v1/submission/upload?" + params;

  let fileData = new FormData();
  fileData.append("submissions", file.content, file.filename);

  // request
  const gradingRequest = () => adminAPI.post(route, fileData, new_headers);

  try {
    const response: AxiosResponse<IGradeRequest> = yield call(gradingRequest);
    yield put(requestGradingEnd(response.data));
  } catch (e) {
    yield put(requestGradingFail(e as Error));
  }
}

function* gradingSaga() {
  yield takeEvery(requestGrading.type, handleGradingRequest);
}

export default gradingSaga;
