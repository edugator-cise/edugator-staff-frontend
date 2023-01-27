import {
  call,
  cancelled,
  put,
  takeEvery,
  race,
  take,
  fork,
} from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  requestProblem,
  setRunningSubmission,
  requestRunCode,
  setCompilerOutput,
  setActiveTab,
  setIsAcceptedOutput,
  submitCode,
  setResultSubmission,
  setRunCodeError,
} from "./CodeEditorSlice";
import apiClient from "src/app/common/apiClient";
import {
  IResultSubmission,
  IToken,
  ICodeSubmission,
  IJudge0Response,
} from "./types";
import { ILesson } from "src/shared/types";
import {
  evaluateCompilerBody,
  judge0Validator,
  poll,
  transformPayload,
} from "utils/CodeEditorUtils";

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* deleteCodeRequest(token: string) {
  try {
    // axios delete request with two query params
    yield call(async () => {
      return apiClient.delete("v1/code/run/submission", {
        params: {
          base64: true,
          token,
        },
      });
    });
  } catch (e) {
    // do nothing
  }
}

function* runCodeRequest(action: PayloadAction<ICodeSubmission>): any {
  try {
    const { data }: { data: IToken } = yield call(async () => {
      return apiClient.post("v1/code/run", transformPayload(action.payload));
    });
    if (!data.token || data.token === "") {
      throw new Error("Token not pressent");
    }

    const getCodeRequest = ({
      runId,
      base_64,
    }: {
      runId: string;
      base_64: string;
    }) => {
      return apiClient.post("v1/code/run/submission", {
        base_64,
        runId,
      });
    };
    const result: ResponseGenerator = yield call(async () => {
      return poll(
        getCodeRequest,
        { runId: data.token, base_64: true },
        judge0Validator,
        3000,
        4
      );
    });
    const resultData: IJudge0Response = result.data;
    yield fork(deleteCodeRequest, data.token);
    yield put(setRunningSubmission(false));
    yield put(setActiveTab(1));
    yield put(setIsAcceptedOutput(resultData.status.id === 3));
    yield put(
      setCompilerOutput({
        compilerMessage:
          resultData.status.id === 3
            ? "Accepted"
            : resultData.status.description,
        compilerBody: evaluateCompilerBody(resultData),
      })
    );
  } catch (e: any) {
    yield put(setRunCodeError({ hasError: true, errorMessage: e.message }));
    yield put(setRunningSubmission(false));
  } finally {
    if (yield cancelled()) {
      //TODO notifiy user
      yield put(setRunningSubmission(false));
    }
  }
}

function* runCodeSubmission(action: PayloadAction<ICodeSubmission>): any {
  try {
    const { data }: { data: IResultSubmission[] } = yield call(async () => {
      return apiClient.post(
        "v1/code/run/evaluate",
        transformPayload(action.payload)
      );
    });
    yield put(setActiveTab(2));
    yield put(setRunningSubmission(false));
    yield put(setResultSubmission(data));
  } catch (e: any) {
    yield put(setRunCodeError({ hasError: true, errorMessage: e.message }));
    yield put(setRunningSubmission(false));
  } finally {
    if (yield cancelled()) {
      yield put(setRunningSubmission(false));
    }
  }
}

function* submissionRace(
  action: PayloadAction<ICodeSubmission & { problemId: string }>
) {
  yield race({
    task: call(runCodeSubmission, action),
    cancel: take(requestProblem.type),
  });
}

function* codeEditorSaga() {
  yield takeEvery(requestRunCode.type, runCodeRequest);
  yield takeEvery(submitCode.type, submissionRace);
}

export default codeEditorSaga;
