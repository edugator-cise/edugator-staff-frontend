import {
  ErrorObject,
  ICodeSubmission,
  ICompilerOutput,
  INavigationItem,
  IResultSubmission,
  ModuleProblemRequest,
} from "../../pages/CodeEditor/types";
import { ILesson, IProblem } from "../../shared/types";

export interface CodeEditorContainer {
  currentProblem: IProblem | undefined;
  currentLesson: ILesson | undefined;
  navStructure: INavigationItem[];
  isLoading: boolean;
  isLoadingLesson: boolean;
  codeBody: string;
  runningSubmission: boolean;
  stdin: string;
  isAcceptedOutput: boolean | undefined;
  compilerOutput: ICompilerOutput;
  submissionOutput: IResultSubmission[] | undefined;
  activeTab: number;
  runCodeError: ErrorObject;
  lessonLoadingError: ErrorObject;
  isLoadingProblem: boolean;
}

export interface CodeEditorContainerState extends CodeEditorContainer {
  requestProblem: (problemId: string, isAdmin: boolean) => void;
  requestLesson: (lessonId: string) => void;
  requestFirstProblemFromModule: (
    navigation: INavigationItem[],
    moduleName: string,
    isAdmin: boolean
  ) => void;
  setCurrentProblem: (currentProblem: IProblem | null) => void;
  setCurrentLesson: (currentLesson: ILesson | null) => void;
  setNavStructure: (navStructure: INavigationItem[]) => void;
  requestModulesAndProblems: (problemRequest: ModuleProblemRequest) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsLoadingLesson: (isLoadingLesson: boolean) => void;
  setRunningSubmission: (runningSubmission: boolean) => void;
  requestRunCode: (submission: ICodeSubmission) => void;
  submitCode: (submission: ICodeSubmission) => void;
  setStdin: (stdin: string) => void;
  setCompilerOutput: (compilerOutput: ICompilerOutput) => void;
  setResultSubmission: (submissionOutput: IResultSubmission[]) => void;
  setActiveTab: (activeTab: number) => void;
  setRunCodeError: (runCodeError: ErrorObject) => void;
  setLessonLoadError: (lessonLoadingError: ErrorObject) => void;
}
