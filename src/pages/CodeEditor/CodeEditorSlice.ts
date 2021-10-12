import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICompilerOutput {
  compilerMessage: string,
  compilerBody: string
}
export interface CodeEditorContainerState {
  /* 
    Each of these represents a stage of the problem editor Stepper component.
    The validity of each subform will be used to control/limit the navigation
    of the stepper. Each form can perform it's own validation then set these 
    fields accordingly 
  */
  hasReceivedProblems: boolean
  currentProblem: IProblem | undefined,
  navStructure: INavigationItem[],
  isLoading: boolean,
  problems: IProblem[],
  codeBody: string,
  runningSubmission: boolean,
  stdin: string,
  isAcceptedOutput: boolean | undefined,
  compilerOutput: ICompilerOutput,
  submissionOutput: ISubmissionOutput | undefined,
  activeTab: number
}

const initialState: CodeEditorContainerState = {
  hasReceivedProblems: false,
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
    compilerBody: ""
  },
  submissionOutput: undefined,
  activeTab: 0, // stdin tab is active
};

const resetinputOutputViewState = () => ({
  stdin: "",
  isAcceptedOutput: undefined,
  compilerOutput: {
    compilerMessage: "",
    compilerBody: ""
  },
  submissionOutput: undefined
})

function filterProblemById(state: CodeEditorContainerState, id: string): IProblem | undefined {
  console.log(state.problems)
  if (!state.problems || state.problems.length === 0) {
    return undefined
  }
  const problemValues: IProblem[] = state.problems.filter((val: IProblem) => id === val._id)
  return (problemValues.length === 0) ? undefined : problemValues[0]
}

export function getInitialCodeEditorState(): CodeEditorContainerState {
  return {...initialState};
}

export const codeEditorSlice = createSlice({
  name: "CodeEditor",
  initialState: getInitialCodeEditorState(),
  reducers: {
    setReceivedProblems: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasReceivedProblems: action.payload,
      }
    },
    setCurrentProblem: (state, action: PayloadAction<string>) => {
      const currentProblem = filterProblemById(state, action.payload)
      if (!currentProblem) {
        return {
          ...state
        }
      } else {
        return {
          ...state,
          currentProblem: {...currentProblem},
          codeBody: currentProblem.code.body,

        }
      }
    },
    setNavStructure: (state, action: PayloadAction<INavigationItem[]>) => {
      return {
        ...state,
        navStructure: action.payload
      }
    },
    requestModulesAndProblems: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload
      }
    },
    setProblems: (state, action: PayloadAction<IProblem[]>) => {
      return {
        ...state,
        problems: action.payload
      }
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload
      }
    },
    setCodeBody: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        codeBody: action.payload
      }
    },
    setRunningSubmission: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        runningSubmission: action.payload
      }
    },
    requestRunCode: (state, action: PayloadAction<ICodeSubmission>) => {
      return {
        ...state,
        runningSubmission: true
      }
    },
    submitCode: (state, action: PayloadAction<ICodeSubmission & {problemId: string}>) => {
      return {
        ...state,
        runningSubmission: true
      }
    },
    setStdin: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        stdin: action.payload
      }
    },
    setCompilerOutput: (state,action: PayloadAction<ICompilerOutput>) => {
      return {
        ...state,
        compilerOutput: action.payload
      }
    },
    setIsAcceptedOutput: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAcceptedOutput: action.payload
      }
    },
    setActiveTab: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        activeTab: action.payload
      }
    }
  },
});

export const {
  setReceivedProblems,
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
  setIsAcceptedOutput
} = codeEditorSlice.actions;
export default codeEditorSlice.reducer;
