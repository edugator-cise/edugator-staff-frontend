import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  INavigationItem,
  IResultSubmission,
  ICodeSubmission,
  ModuleProblemRequest,
  ICompilerOutput,
  ErrorObject,
} from "./types";
import { ILesson, IProblem } from "src/shared/types";
export interface CodeEditorContainerState {
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

const initialState: CodeEditorContainerState = {
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
};

export const resetinputOutputViewState = () => ({
  stdin: "",
  isAcceptedOutput: undefined,
  compilerOutput: {
    compilerMessage: "",
    compilerBody: "",
  },
  submissionOutput: undefined,
});

export function getInitialCodeEditorState(): CodeEditorContainerState {
  return { ...initialState };
}

export const codeEditorSlice = createSlice({
  name: "CodeEditor",
  initialState: getInitialCodeEditorState(),
  reducers: {
    requestProblem: (
      state,
      action: PayloadAction<{ problemId: string; isAdmin: boolean }>
    ) => {
      return {
        ...state,
        ...resetinputOutputViewState(),
        isLoadingProblem: true,
      };
    },
    requestLesson: (state, action: PayloadAction<{ lessonId: string }>) => {
      return {
        ...state,
        isLoadingLesson: true,
      };
    },
    requestFirstProblemFromModule: (
      state,
      action: PayloadAction<{
        navigation: INavigationItem[];
        moduleName: string | undefined;
        isAdmin: boolean;
      }>
    ) => {
      return {
        ...state,
        ...resetinputOutputViewState(),
        isLoadingProblem: true,
      };
    },
    setCurrentProblem: (state, action: PayloadAction<IProblem | undefined>) => {
      state.currentProblem = action.payload ? { ...action.payload } : undefined;
      state.runningSubmission = false;
      state.isLoadingProblem = false;
      if (action.payload) {
        state.codeBody = action.payload.code.body;
      }
    },
    setCurrentLesson: (state, action: PayloadAction<ILesson | undefined>) => {
      state.currentLesson = action.payload ? { ...action.payload } : undefined;
      state.isLoadingLesson = false;
    },
    setNavStructure: (state, action: PayloadAction<INavigationItem[]>) => {
      state.navStructure = action.payload;
    },
    requestModulesAndProblems: (
      state,
      action: PayloadAction<ModuleProblemRequest>
    ) => {
      state.isLoading = true;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsLoadingLesson: (state, action: PayloadAction<boolean>) => {
      state.isLoadingLesson = action.payload;
    },
    setRunningSubmission: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        runningSubmission: action.payload,
      };
    },
    requestRunCode: (state, action: PayloadAction<ICodeSubmission>) => {
      state.runningSubmission = true;
    },
    submitCode: (state, action: PayloadAction<ICodeSubmission>) => {
      state.runningSubmission = true;
    },
    setStdin: (state, action: PayloadAction<string>) => {
      state.stdin = action.payload;
    },
    setCompilerOutput: (state, action: PayloadAction<ICompilerOutput>) => {
      state.compilerOutput = action.payload;
    },
    setResultSubmission: (
      state,
      action: PayloadAction<IResultSubmission[]>
    ) => {
      state.submissionOutput = action.payload;
    },
    setIsAcceptedOutput: (state, action: PayloadAction<boolean>) => {
      state.isAcceptedOutput = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    setRunCodeError: (state, action: PayloadAction<ErrorObject>) => {
      state.runCodeError = { ...action.payload };
    },
    setLessonLoadError: (state, action: PayloadAction<ErrorObject>) => {
      state.lessonLoadingError = { ...action.payload };
    },
  },
});

export const {
  setCurrentProblem,
  setCurrentLesson,
  setNavStructure,
  requestModulesAndProblems,
  requestRunCode,
  requestProblem,
  requestLesson,
  requestFirstProblemFromModule,
  submitCode,
  setStdin,
  setCompilerOutput,
  setActiveTab,
  setIsLoading,
  setRunningSubmission,
  setIsAcceptedOutput,
  setResultSubmission,
  setRunCodeError,
  setLessonLoadError,
  setIsLoadingLesson,
} = codeEditorSlice.actions;
export default codeEditorSlice.reducer;
