import apiClient from "lib/api/apiClient";
import {
  evaluateCompilerBody,
  judge0Validator,
  poll,
  transformPayload,
} from "utils/CodeEditorUtils";
import { IResultSubmission, IToken } from "components/CodeEditor/types";
import { IJudge0Response } from "components/CodeEditor/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CompilerOutput } from "./types";
import { apiRoutes } from "constants/apiRoutes";

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
  return apiClient.post(apiRoutes.student.runCodeSubmission, {
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
    setActiveTab(0);
  }, [locationState]);

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
    console.log("runCode");
    setIsSubmissionRunning(true);
    try {
      const { data }: { data: IToken } = await apiClient.post(
        apiRoutes.student.runCode,
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
      await apiClient.delete(apiRoutes.student.runCodeSubmission, {
        params: {
          base64: true,
          token: data.token,
        },
      });
    } catch (error: any) {
      setIsSubmissionRunning(false);
      toast.error(error.message || "Something went wrong");
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
        apiRoutes.student.runCodeEvaluation,
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
      setSubmissionOutput(data);
    } catch (error: any) {
      setIsSubmissionRunning(false);
      toast.error(error.message || "Something went wrong");
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
