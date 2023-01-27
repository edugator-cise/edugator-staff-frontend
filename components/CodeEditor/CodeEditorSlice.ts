import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  INavigationItem,
  IResultSubmission,
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

export function getInitialCodeEditorState(): CodeEditorContainerState {
  return { ...initialState };
}

export const codeEditorSlice = createSlice({
  name: "CodeEditor",
  initialState: getInitialCodeEditorState(),
  reducers: {
    setRunCodeError: (state, action: PayloadAction<ErrorObject>) => {
      state.runCodeError = { ...action.payload };
    },
  },
});

export const { setRunCodeError } = codeEditorSlice.actions;
export default codeEditorSlice.reducer;
