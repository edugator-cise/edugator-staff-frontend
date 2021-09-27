import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProblemEditorContainerState {
  /* 
    Each of these represents a stage of the problem editor Stepper component.
    The validity of each subform will be used to control/limit the navigation
    of the stepper. Each form can perform it's own validation then set these 
    fields accordingly 
  */
  metadataIsValid: boolean;
  problemIsValid: boolean;
  codeIsValid: boolean;
  serverConfigIsValid: boolean;
  testEditorIsValid: boolean;
}

const initialState: ProblemEditorContainerState = {
  metadataIsValid: false,
  problemIsValid: false,
  codeIsValid: false,
  serverConfigIsValid: false,
  testEditorIsValid: false,
};

export const problemEditorContainerSlice = createSlice({
  name: "problemEditorContainer",
  initialState,
  reducers: {
    validateMetadata: (state, action: PayloadAction<boolean>) => {
      state.metadataIsValid = action.payload;
    },
    validateProblem: (state, action: PayloadAction<boolean>) => {
      state.problemIsValid = action.payload;
    },
    validateCode: (state, action: PayloadAction<boolean>) => {
      state.codeIsValid = action.payload;
    },
    validateServerConfig: (state, action: PayloadAction<boolean>) => {
      state.serverConfigIsValid = action.payload;
    },
    validateTestEditor: (state, action: PayloadAction<boolean>) => {
      state.testEditorIsValid = action.payload;
    },
  },
});

export const {
  validateMetadata,
  validateProblem,
  validateCode,
  validateServerConfig,
  validateTestEditor,
} = problemEditorContainerSlice.actions;
export default problemEditorContainerSlice.reducer;
