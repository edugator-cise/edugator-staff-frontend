import {
  call,
  cancelled,
  put,
  takeEvery,
  race,
  take,
} from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  requestModulesAndProblems,
  setNavStructure,
  requestProblem,
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
} from "./CodeEditorSlice";
import apiClient from "../../app/common/apiClient";
import {
  INavigationItem,
  IResultSubmission,
  IToken,
  ICodeSubmission,
  IJudge0Response,
  IModuleWithProblems,
  ModuleProblemRequest,
} from "./types";
import { IProblem } from "../../shared/types";
const judge0Validator = ({ data }: { data: IJudge0Response }): boolean => {
  return data.status.id >= 3;
};

const poll = async (
  fn: Function,
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
  moduleProblemStructure: IModuleWithProblems[],
  moduleName: string
): string | undefined {
  let module: IModuleWithProblems[] = moduleProblemStructure.filter(
    (moduleWithProblem: IModuleWithProblems) =>
      moduleWithProblem.name === moduleName
  );
  if (module.length !== 0 && module[0].problems.length !== 0) {
    return module[0].problems[0]._id;
  }
  return undefined;
}
function createNavStructure(moduleProblemStructure: IModuleWithProblems[]) {
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
    };
    moduleItems.push(payload);
  });
  return moduleItems;
}
function* handleRequestModulesAndProblems(
  action: PayloadAction<ModuleProblemRequest>
) {
  try {
    const { data }: { data: IModuleWithProblems[] } = yield call(async () => {
      return apiClient.get("v1/module/WithNonHiddenProblems");
    });
    yield put(setNavStructure(createNavStructure(data)));
    if (action.payload.problemId) {
      const responseObject: { data: IProblem } = yield call(async () => {
        return apiClient.get(`v1/student/problem/${action.payload.problemId}`);
      });
      yield put(setCurrentProblem(responseObject.data));
    } else if (action.payload.moduleName) {
      const problemId: string | undefined = filterForProblem(
        data,
        action.payload.moduleName
      );
      if (problemId) {
        const responseObject: { data: IProblem } = yield call(async () => {
          return apiClient.get(`v1/student/problem/${problemId}`);
        });
        yield put(setCurrentProblem(responseObject.data));
      } else {
        yield put(setCurrentProblem(undefined));
      }
    }
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(setRunCodeError({ hasError: true, errorMessage: e.message }));
    yield put(setRunningSubmission(false));
  }
}

function* runCodeRequest(action: PayloadAction<ICodeSubmission>) {
  try {
    const { code, header, footer, stdin } = action.payload;
    const fullCodePayload = header + code + footer;
    const payloadBuffer = Buffer.from(fullCodePayload || "", "utf-8");
    const stdinPayload = Buffer.from(stdin || "", "utf-8");
    const { data }: { data: IToken } = yield call(async () => {
      return apiClient.post("v1/code/run", {
        source_code: payloadBuffer.toString("base64"),
        language_id: 54,
        base_64: true,
        stdin: stdinPayload.toString("base64"),
      });
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
    yield put(setRunningSubmission(false));
    yield put(setActiveTab(1));
    yield put(setIsAcceptedOutput(resultData.status.id === 3));
    yield put(
      setCompilerOutput({
        compilerMessage:
          resultData.status.id === 3
            ? "Accepted"
            : resultData.status.description,
        compilerBody:
          resultData.status.id === 3 && resultData.stdout
            ? Buffer.from(resultData.stdout || "", "base64").toString()
            : Buffer.from(resultData.compile_output || "", "base64").toString(),
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

function* runCodeSubmission(
  action: PayloadAction<ICodeSubmission & { problemId: string }>
) {
  try {
    const { code, header, footer, stdin, problemId } = action.payload;
    const fullCodePayload = header + code + footer;
    const paylodBuffer = Buffer.from(fullCodePayload, "utf-8");
    const stdinPayload = Buffer.from(stdin, "utf-8");
    const { data }: { data: IResultSubmission[] } = yield call(async () => {
      return apiClient.post("v1/code/run/evaluate", {
        source_code: paylodBuffer.toString("base64"),
        language_id: 54,
        base_64: true,
        stdin: stdinPayload.toString("base64"),
        problemId,
      });
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

function* requestProblemSaga(action: PayloadAction<string>) {
  const id: string = action.payload;
  try {
    const { data }: { data: IProblem } = yield call(async () => {
      return apiClient.get(`v1/student/problem/${id}`);
    });
    yield put(setCurrentProblem(data));
  } catch (e) {
    yield put(setRunCodeError({ hasError: true, errorMessage: e.message }));
    yield put(setRunningSubmission(false));
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
}

export default codeEditorSaga;
