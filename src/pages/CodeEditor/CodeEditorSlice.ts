import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
}

const initialState: CodeEditorContainerState = {
  hasReceivedProblems: false,
  isLoading: true,
  currentProblem: undefined,
  navStructure: [],
  problems: []

};

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
      console.log("this happened")
      console.log(state.problems)
      const currentProblem = filterProblemById(state, action.payload)
      if (!currentProblem) {
        return {
          ...state
        }
      } else {
        return {
          ...state,
          currentProblem: {...currentProblem}
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
    }
  },
});

export const {
  setReceivedProblems,
  setCurrentProblem,
  setNavStructure,
  requestModulesAndProblems,
  setProblems,
  setIsLoading
} = codeEditorSlice.actions;
export default codeEditorSlice.reducer;
