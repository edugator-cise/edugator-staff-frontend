import { useDispatch } from "react-redux";
import apiClient from "src/app/common/apiClient";
import {
  evaluateCompilerBody,
  judge0Validator,
  poll,
  transformPayload,
} from "utils/CodeEditorUtils";
import { IToken } from "components/CodeEditor/types";
import {
  ICodeSubmission,
  IJudge0Response,
  IModuleWithProblemsAndLessons,
  INavigationItem,
} from "components/CodeEditor/types";
import { useEffect, useState } from "react";
import {
  setActiveTab,
  setRunCodeError,
} from "components/CodeEditor/CodeEditorSlice";

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
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

export const useRunCode = () => {
  const [isSubmissionRunning, setIsSubmissionRunning] = useState(false);
  const [isAcceptedOutput, setIsAcceptedOutput] = useState(false);
  const [compilerOutput, setCompilerOutput] = useState({
    compilerMessage: "",
    compilerBody: "",
  });

  const dispatch = useDispatch();

  const runCode = async ({
    code,
    stdin,
    problemId,
    timeLimit,
    memoryLimit,
    buildCommand,
  }: {
    code: string;
    stdin: string;
    problemId: string;
    timeLimit: number;
    memoryLimit: number;
    buildCommand: string;
  }) => {
    setIsSubmissionRunning(true);
    try {
      const { data }: { data: IToken } = await apiClient.post(
        "v1/code/run",
        transformPayload({
          code,
          stdin,
          problemId,
          timeLimit,
          memoryLimit,
          buildCommand,
        })
      );
      if (!data.token || data.token === "") {
        throw new Error("Token not present");
      }
      const result: any = await poll(
        getCodeRequest,
        { runId: data.token, base_64: true },
        judge0Validator,
        3000,
        4
      );
      const resultData: IJudge0Response = result.data;

      setIsSubmissionRunning(false);
      setIsAcceptedOutput(resultData.status.id === 3);
      setCompilerOutput({
        compilerMessage:
          resultData.status.id === 3
            ? "Accepted"
            : resultData.status.description,
        compilerBody: evaluateCompilerBody(resultData),
      });
      dispatch(setActiveTab(1));
      await apiClient.delete("v1/code/run/submission", {
        params: {
          base64: true,
          token: data.token,
        },
      });
    } catch (error: any) {
      setIsSubmissionRunning(false);
      dispatch(
        setRunCodeError({
          hasError: true,
          errorMessage: error.message || "Something went wrong",
        })
      );
    }
  };
  return {
    isSubmissionRunning,
    isAcceptedOutput,
    compilerOutput,
    runCode,
  };
};
/* 
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
 */
