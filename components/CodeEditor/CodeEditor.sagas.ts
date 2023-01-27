import {
  call,
  cancelled,
  put,
  takeEvery,
  race,
  take,
  fork,
} from "redux-saga/effects";
import { Buffer } from "buffer";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  requestModulesAndProblems,
  requestFirstProblemFromModule,
  setNavStructure,
  requestProblem,
  requestLesson,
  setCurrentProblem,
  setIsLoading,
  setRunningSubmission,
  requestRunCode,
  setCompilerOutput,
  setActiveTab,
  setIsAcceptedOutput,
  submitCode,
  setResultSubmission,
  setRunCodeError,
  setStdin,
  setLessonLoadError,
  setIsLoadingLesson,
  setCurrentLesson,
} from "./CodeEditorSlice";
import apiClient from "src/app/common/apiClient";
import {
  INavigationItem,
  IResultSubmission,
  IToken,
  ICodeSubmission,
  IJudge0Response,
  ModuleProblemRequest,
  IModuleWithProblemsAndLessons,
} from "./types";
import { ILesson, IProblem } from "src/shared/types";
import {
  createNavStructure,
  evaluateCompilerBody,
  filterForProblem,
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

function* handleRequestModulesAndProblems(
  action: PayloadAction<ModuleProblemRequest>
) {
  try {
    const { data }: { data: IModuleWithProblemsAndLessons[] } = yield call(
      async () => {
        if (action.payload.isAdmin) {
          return apiClient.get("v1/module/WithProblems");
        }
        return apiClient.get("v1/module/WithNonHiddenProblems");
      }
    );
    yield put(setNavStructure(createNavStructure(data)));
    yield put(setIsLoading(false));
  } catch (e: any) {
    yield put(setRunCodeError({ hasError: true, errorMessage: e.message }));
    yield put(setRunningSubmission(false));
  }
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

function* requestLessonSaga(
  action: PayloadAction<{ lessonId: string; isAdmin: boolean }>
) {
  const id: string = action.payload.lessonId;
  try {
    const { data }: { data: ILesson } = yield call(async () => {
      return apiClient.get(`v1/student/lesson/${id}`);
    });
    console.log(data);
    yield put(setCurrentLesson(data));
    yield put(setIsLoadingLesson(false));
  } catch (e: any) {
    yield put(setLessonLoadError({ hasError: true, errorMessage: e.message }));
    yield put(setIsLoadingLesson(false));
  }
}

function* requestProblemSaga(
  action: PayloadAction<{ problemId: string; isAdmin: boolean }>
) {
  const id: string = action.payload.problemId;
  try {
    const { data }: { data: IProblem } = yield call(async () => {
      if (action.payload.isAdmin) {
        return apiClient.get(`v1/admin/problem/${id}`);
      }
      return apiClient.get(`v1/student/problem/${id}`);
    });
    yield put(setCurrentProblem(data));
    if (data.testCases.length > 0) {
      yield put(setStdin(data.testCases[0].input));
    }
  } catch (e: any) {
    yield put(setRunCodeError({ hasError: true, errorMessage: e.message }));
    yield put(setRunningSubmission(false));
  }
}

function* requestFirstProblem(
  action: PayloadAction<{
    navigation: INavigationItem[];
    moduleName: string;
    isAdmin: boolean;
  }>
) {
  try {
    const problemId: string | undefined = filterForProblem(
      action.payload.navigation,
      action.payload.moduleName
    );
    if (problemId) {
      const { data }: { data: IProblem } = yield call(async () => {
        if (action.payload.isAdmin) {
          return apiClient.get(`v1/admin/problem/${problemId}`);
        }
        return apiClient.get(`v1/student/problem/${problemId}`);
      });
      yield put(setCurrentProblem(data));
      if (data.testCases.length > 0) {
        yield put(setStdin(data.testCases[0].input));
      }
    } else {
      yield put(setCurrentProblem(undefined));
    }
  } catch (e: any) {
    yield put(setRunCodeError({ hasError: true, errorMessage: e.message }));
    yield put(setRunningSubmission(false));
    yield put(setCurrentProblem(undefined));
  }
}

function* codeEditorSaga() {
  yield takeEvery(
    requestModulesAndProblems.type,
    handleRequestModulesAndProblems
  );
  yield takeEvery(requestRunCode.type, runCodeRequest);
  yield takeEvery(submitCode.type, submissionRace);
  yield takeEvery(requestProblem.type, requestProblemSaga);
  yield takeEvery(requestLesson.type, requestLessonSaga);
  yield takeEvery(requestFirstProblemFromModule.type, requestFirstProblem);
}

export default codeEditorSaga;
