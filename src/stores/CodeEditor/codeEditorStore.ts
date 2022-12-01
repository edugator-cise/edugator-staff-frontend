import { AxiosResponse } from "axios";
import create from "zustand";
import apiClient from "../../app/common/apiClient";
import { ILesson, IProblem } from "../../shared/types";
import {
  filterForProblem,
  createNavStructure,
  transformPayload,
  poll,
  judge0Validator,
  evaluateCompilerBody,
} from "../../utils/codeEditor/editorUtils";
import { CodeEditorContainerState } from "../../utils/codeEditor/types";
import {
  ErrorObject,
  ICodeSubmission,
  ICompilerOutput,
  IJudge0Response,
  IModuleWithProblemsAndLessons,
  INavigationItem,
  IResultSubmission,
  IToken,
  ModuleProblemRequest,
} from "./types";

export const useCodeEditorStore = create<CodeEditorContainerState>(
  (set, get) => ({
    // initial static states
    isLoading: true,
    isLoadingLesson: true,
    currentProblem: undefined,
    currentLesson: undefined,
    navStructure: [],
    codeBody: "",
    runningSubmission: false,
    stdin: "",
    isAcceptedOutput: undefined,
    compilerOutput: {
      compilerMessage: "",
      compilerBody: "",
    },
    runCodeError: {
      hasError: false,
      errorMessage: "",
    },
    lessonLoadingError: {
      hasError: false,
      errorMessage: "",
    },
    submissionOutput: undefined,
    activeTab: 0, // stdin tab is active
    isLoadingProblem: false,
    // dynamic states
    requestProblem: (problemId: string, isAdmin: boolean) => {
      // reset problem state
      set({
        isLoadingProblem: true,
        stdin: "",
        isAcceptedOutput: undefined,
        compilerOutput: {
          compilerMessage: "",
          compilerBody: "",
        },
        submissionOutput: undefined,
        runningSubmission: false,
        activeTab: 0,
      });
      //get problem
      apiClient
        .get(
          isAdmin
            ? `v1/admin/problem/${problemId}`
            : `v1/student/problem/${problemId}`
        )
        .then((response: AxiosResponse<IProblem>) => {
          set({
            currentProblem: response.data,
          });
          if (response.data.testCases.length > 0) {
            set({
              stdin: response.data.testCases[0].input,
            });
          }
        })
        .catch((e) => {
          set({
            runCodeError: {
              hasError: true,
              errorMessage: e.message,
            },
            runningSubmission: false,
          });
        })
        .finally(() => {
          set({
            isLoadingProblem: false,
          });
        });
    },
    requestLesson: (lessonId: string) => {
      set({
        isLoadingLesson: true,
      });
      const id: string = lessonId;
      // get lesson
      apiClient
        .get(`v1/student/lesson/${id}`)
        .then((response: AxiosResponse<any>) => {
          const { data }: { data: ILesson } = response;
          set({ currentLesson: data });
        })
        .catch((e: any) => {
          set({
            lessonLoadingError: { hasError: true, errorMessage: e.message },
          });
        })
        .finally(() => {
          set({ isLoadingLesson: false });
        });
    },
    requestFirstProblemFromModule: (
      navigation: INavigationItem[],
      moduleName: string,
      isAdmin: boolean
    ) => {
      const problemId = filterForProblem(navigation, moduleName);
      if (problemId) {
        apiClient
          .get(
            isAdmin
              ? `v1/admin/problem/${problemId}`
              : `v1/student/problem/${problemId}`
          )
          .then((response: AxiosResponse<IProblem>) => {
            set({
              currentProblem: response.data,
            });
            if (response.data.testCases.length > 0) {
              set({
                stdin: response.data.testCases[0].input,
              });
            }
          })
          .catch((e) => {
            set({
              runCodeError: {
                hasError: true,
                errorMessage: e.message,
              },
              runningSubmission: false,
              currentProblem: undefined,
            });
          });
      } else {
        set({
          currentProblem: undefined,
        });
      }
    },
    setCurrentProblem: (currentProblem: IProblem | null) => {
      set({ runningSubmission: false, isLoadingProblem: false });
      if (currentProblem) {
        set({ currentProblem, codeBody: currentProblem.code.body });
      }
    },
    setCurrentLesson: (currentLesson: ILesson | null) => {
      set({ isLoadingLesson: false });
      if (currentLesson) {
        set({ currentLesson });
      }
    },
    setNavStructure: (navStructure: INavigationItem[]) => {
      set({ navStructure });
    },
    requestModulesAndProblems: (problemRequest: ModuleProblemRequest) => {
      set({ isLoading: true });
      apiClient
        .get(
          problemRequest.isAdmin
            ? "v1/module/WithProblems"
            : "v1/module/WithNonHiddenProblems"
        )
        .then((response: AxiosResponse<IModuleWithProblemsAndLessons[]>) => {
          set({
            navStructure: createNavStructure(response.data),
            isLoading: false,
          });
        })
        .catch((e) => {
          set({
            runCodeError: {
              hasError: true,
              errorMessage: e.message,
            },
            runningSubmission: false,
          });
        });
    },
    setIsLoading: (isLoading: boolean) => {
      set({ isLoading });
    },
    setIsLoadingLesson: (isLoadingLesson: boolean) => {
      set({ isLoadingLesson });
    },
    setRunningSubmission: (runningSubmission: boolean) => {
      set({ runningSubmission });
    },
    requestRunCode: (submission: ICodeSubmission) => {
      const getCodeRequest = ({
        runId,
        base_64,
      }: {
        runId: string;
        base_64: boolean;
      }) => {
        return apiClient.post("v1/code/run/submission", {
          base_64,
          runId,
        });
      };

      set({ runningSubmission: true });
      apiClient
        .post("v1/code/run", transformPayload(submission))
        .then(async (response: AxiosResponse<IToken>) => {
          const token = response.data.token;
          if (!token || token === "") {
            throw new Error("No token returned");
          }
          const result: any = await poll(
            getCodeRequest,
            { runId: token, base_64: true },
            judge0Validator,
            3000,
            4
          );
          const resultData: IJudge0Response = result.data;
          apiClient
            .delete("v1/code/run/submission", {
              params: {
                base64: true,
                token: token,
              },
            })
            .catch((e) => {
              console.log(e);
            });
          //check new problem hasn't been selected
          if (get().currentProblem?._id === submission.problemId) {
            set({
              runningSubmission: false,
              activeTab: 1,
              isAcceptedOutput: resultData.status.id === 3,
              compilerOutput: {
                compilerMessage:
                  resultData.status.id === 3
                    ? "Accepted"
                    : resultData.status.description,
                compilerBody: evaluateCompilerBody(resultData),
              },
            });
          }
        })
        .catch((e) => {
          set({
            runCodeError: {
              hasError: true,
              errorMessage: e.message,
            },
            runningSubmission: false,
          });
        })
        .finally(() => {
          set({
            runningSubmission: false,
          });
        });
    },
    submitCode: (submission: ICodeSubmission) => {
      set({ runningSubmission: true });
      apiClient
        .post("v1/code/run/evaluate", transformPayload(submission))
        .then((response: AxiosResponse<IResultSubmission[]>) => {
          set({
            runningSubmission: false,
            activeTab: 2,
            submissionOutput: response.data,
          });
        })
        .catch((e) => {
          set({
            runCodeError: {
              hasError: true,
              errorMessage: e.message,
            },
            runningSubmission: false,
          });
        })
        .finally(() => {
          set({
            runningSubmission: false,
          });
        });
    },
    setStdin: (stdin: string) => {
      set({ stdin });
    },
    setCompilerOutput: (compilerOutput: ICompilerOutput) => {
      set({ compilerOutput });
    },
    setResultSubmission: (submissionOutput: IResultSubmission[]) => {
      set({ submissionOutput });
    },
    setActiveTab: (activeTab: number) => {
      set({ activeTab });
    },
    setRunCodeError: (runCodeError: ErrorObject) => {
      set({ runCodeError });
    },
    setLessonLoadError: (lessonLoadingError: ErrorObject) => {
      set({ lessonLoadingError });
    },
  })
);
