import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INavigationItem, IResultSubmission, ICodeSubmission } from "./types";
import { IProblem } from "../../shared/types";
interface ICompilerOutput {
  compilerMessage: string;
  compilerBody: string;
}

interface ErrorObject {
  hasError: boolean;
  errorMessage: string;
}
export interface CodeEditorContainerState {
  currentProblem: IProblem | undefined;
  navStructure: INavigationItem[];
  isLoading: boolean;
  problems: IProblem[];
  codeBody: string;
  runningSubmission: boolean;
  stdin: string;
  isAcceptedOutput: boolean | undefined;
  compilerOutput: ICompilerOutput;
  submissionOutput: IResultSubmission[] | undefined;
  activeTab: number;
  runCodeError: ErrorObject;
}

const initialState: CodeEditorContainerState = {
  isLoading: true,
  currentProblem: undefined,
  navStructure: [],
  problems: [],
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
};

const resetinputOutputViewState = () => ({
  stdin: "",
  isAcceptedOutput: undefined,
  compilerOutput: {
    compilerMessage: "",
    compilerBody: "",
  },
  submissionOutput: undefined,
});

function filterProblemById(
  state: CodeEditorContainerState,
  id: string
): IProblem | undefined {
  if (!state.problems || state.problems.length === 0) {
    return undefined;
  }
  const problemValues: IProblem[] = state.problems.filter(
    (val: IProblem) => id === val._id
  );
  return problemValues.length === 0 ? undefined : problemValues[0];
}

export function getInitialCodeEditorState(): CodeEditorContainerState {
  return { ...initialState };
}

export const codeEditorSlice = createSlice({
  name: "CodeEditor",
  initialState: getInitialCodeEditorState(),
  reducers: {
    setCurrentProblem: (state, action: PayloadAction<string>) => {
      const currentProblem = filterProblemById(state, action.payload);
      if (!currentProblem) {
        return state;
      }
      return {
        ...state,
        ...resetinputOutputViewState(),
        currentProblem: { ...currentProblem },
        codeBody: currentProblem.code.body,
        runningSubmission: false,
      };
    },
    setNavStructure: (state, action: PayloadAction<INavigationItem[]>) => {
      state.navStructure = action.payload;
    },
    requestModulesAndProblems: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProblems: (state, action: PayloadAction<IProblem[]>) => {
      state.problems = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCodeBody: (state, action: PayloadAction<string>) => {
      state.codeBody = action.payload;
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
    submitCode: (
      state,
      action: PayloadAction<ICodeSubmission & { problemId: string }>
    ) => {
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
  setCodeBody,
  setNavStructure,
  requestModulesAndProblems,
  requestRunCode,
  submitCode,
  setStdin,
  setCompilerOutput,
  setActiveTab,
  setProblems,
  setIsLoading,
  setRunningSubmission,
  setIsAcceptedOutput,
  setResultSubmission,
  setRunCodeError,
} = codeEditorSlice.actions;
export default codeEditorSlice.reducer;
