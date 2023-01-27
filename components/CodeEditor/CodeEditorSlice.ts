import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  INavigationItem,
  IResultSubmission,
  ICodeSubmission,
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
  activeTab: 0,
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
    resetInputOutput: (state) => {
      return {
        ...state,
        ...resetinputOutputViewState(),
      };
    },
    cancelSubmission: (state) => {
      return {
        ...state,
        triggerCancelSubmission: true,
      };
    },
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
  },
});

export const {
  requestRunCode,
  requestProblem,
  resetInputOutput,
  submitCode,
  setCompilerOutput,
  setActiveTab,
  setRunningSubmission,
  setIsAcceptedOutput,
  setResultSubmission,
  setRunCodeError,
} = codeEditorSlice.actions;
export default codeEditorSlice.reducer;
