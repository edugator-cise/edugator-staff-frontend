import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INavigationItem, IResultSubmission, ICodeSubmission } from "./types";
import { IProblem } from "../../shared/types";
import { ICompilerOutput, ErrorObject, ModuleProblemRequest } from "./types";
export interface CodeEditorContainerState {
  currentProblem: IProblem | undefined;
  navStructure: INavigationItem[];
  isLoading: boolean;
  codeBody: string;
  runningSubmission: boolean;
  stdin: string;
  isAcceptedOutput: boolean | undefined;
  compilerOutput: ICompilerOutput;
  submissionOutput: IResultSubmission[] | undefined;
  activeTab: number;
  runCodeError: ErrorObject;
  isLoadingProblem: boolean;
}

const initialState: CodeEditorContainerState = {
  isLoading: true,
  currentProblem: undefined,
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
    requestProblem: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        ...resetinputOutputViewState(),
        isLoadingProblem: true,
      };
    },
    requestFirstProblemFromModule: (
      state,
      action: PayloadAction<{
        navigation: INavigationItem[];
        moduleName: string | undefined;
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
  },
});

export const {
  setCurrentProblem,
  setNavStructure,
  requestModulesAndProblems,
  requestRunCode,
  requestProblem,
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
} = codeEditorSlice.actions;
export default codeEditorSlice.reducer;
