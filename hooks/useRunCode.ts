import { useDispatch } from "react-redux";
import apiClient from "src/app/common/apiClient";
import {
  evaluateCompilerBody,
  judge0Validator,
  poll,
  transformPayload,
} from "utils/CodeEditorUtils";
import { IResultSubmission, IToken } from "components/CodeEditor/types";
import { IJudge0Response } from "components/CodeEditor/types";
import { useEffect, useState } from "react";
import { setRunCodeError } from "components/CodeEditor/CodeEditorSlice";
import { CompilerOutput } from "./types";

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

export const useRunCode = (locationState: string) => {
  const [isSubmissionRunning, setIsSubmissionRunning] =
    useState<boolean>(false);
  const [isAcceptedOutput, setIsAcceptedOutput] = useState<boolean | undefined>(
    undefined
  );
  const [compilerOutput, setCompilerOutput] = useState<CompilerOutput>({
    compilerMessage: "",
    compilerBody: "",
  });
  const [submissionOutput, setSubmissionOutput] = useState<
    IResultSubmission[] | undefined
  >(undefined);
  const [activeTab, setActiveTab] = useState<number>(0);

  // reset the state when the locationState changes
  useEffect(() => {
    setIsSubmissionRunning(false);
    setIsAcceptedOutput(undefined);
    setCompilerOutput({
      compilerMessage: "",
      compilerBody: "",
    });
    setSubmissionOutput(undefined);
  }, [locationState]);

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
      setActiveTab(1);
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

  const submitCode = async ({
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
      const { data }: { data: IResultSubmission[] } = await apiClient.post(
        "v1/code/run/evaluate",
        transformPayload({
          code,
          stdin,
          problemId,
          timeLimit,
          memoryLimit,
          buildCommand,
        })
      );
      setActiveTab(2);
      setIsSubmissionRunning(false);
      dispatch(setSubmissionOutput(data));
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
    submitCode,
    submissionOutput,
    activeTab,
    setActiveTab,
  };
};
