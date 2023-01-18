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
const judge0Validator = ({ data }: { data: IJudge0Response }): boolean => {
  return data.status.id >= 3;
};

const poll = async (
  fn: (value: any) => any,
  payload: any,
  validate: (value: any) => boolean,
  interval: number,
  maxAttempts: number
) => {
  let attempts = 0;

  const executePoll = async (resolve: any, reject: any) => {
    const result = await fn(payload);
    attempts++;
    if (validate(result)) {
      return resolve(result);
    } else if (maxAttempts && attempts === maxAttempts) {
      return reject(new Error("Exceeded max Attempts"));
    } else {
      setTimeout(executePoll, interval, resolve, reject);
    }
  };

  return new Promise(executePoll);
};

function filterForProblem(
  moduleProblemStructure: INavigationItem[],
  moduleName: string
): string | undefined {
  const module: INavigationItem[] = moduleProblemStructure.filter(
    (moduleWithProblem: INavigationItem) =>
      moduleWithProblem.name === moduleName
  );
  if (module.length !== 0 && module[0].problems.length !== 0) {
    return module[0].problems[0]._id;
  }
  return undefined;
}
function createNavStructure(
  moduleProblemStructure: IModuleWithProblemsAndLessons[]
) {
  const moduleItems: INavigationItem[] = [];
  moduleProblemStructure.forEach((element) => {
    const payload = {
      _id: element._id as string,
      name: element.name,
      number: element.number,
      problems: element.problems.map((el) => ({
        problemName: el.title,
        _id: el._id,
      })),
      lessons: element.lessons?.map((el) => ({
        lessonName: el.title,
        _id: el._id,
      })),
    };
    moduleItems.push(payload);
  });
  return moduleItems;
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
  } catch (e) {
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

function transformPayload(payload: ICodeSubmission) {
  const base64EncodedCode = Buffer.from(payload.code || "", "utf-8").toString(
    "base64"
  );
  const base64EncodedStdin = Buffer.from(payload.stdin || "", "utf-8").toString(
    "base64"
  );
  const body = {
    source_code: base64EncodedCode,
    language_id: 54, //C++
    base_64: true,
    stdin: base64EncodedStdin,
    problemId: payload.problemId,
    cpu_time_limit: payload.timeLimit === 0 ? undefined : payload.timeLimit,
    memory_limit: payload.memoryLimit === 0 ? undefined : payload.memoryLimit,
    compiler_options:
      payload.buildCommand === "" ? undefined : payload.buildCommand,
  };
  return body;
}

function evaluateCompilerBody(resultData: IJudge0Response) {
  if (resultData.status.id === 3 && resultData.stdout) {
    return Buffer.from(resultData.stdout || "", "base64").toString();
  } else if (resultData.status.id === 6) {
    return Buffer.from(resultData.compile_output || "", "base64").toString();
  } else if (resultData.status.id === 5) {
    return Buffer.from(resultData.message || "", "base64").toString();
  } else if (resultData.status.id >= 7 && resultData.status.id <= 12) {
    let message = Buffer.from(resultData.stderr || "", "base64").toString();
    message += "\n";
    message += Buffer.from(resultData.message || "", "base64").toString();
    return message;
  } else {
    return "";
  }
}

function* runCodeRequest(action: PayloadAction<ICodeSubmission>) {
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
    const result = yield call(async () => {
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
  } catch (e) {
    yield put(setRunCodeError({ hasError: true, errorMessage: e.message }));
    yield put(setRunningSubmission(false));
  } finally {
    if (yield cancelled()) {
      //TODO notifiy user
      yield put(setRunningSubmission(false));
    }
  }
}

function* runCodeSubmission(action: PayloadAction<ICodeSubmission>) {
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
  } catch (e) {
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
  } catch (e) {
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
  } catch (e) {
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
  } catch (e) {
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
