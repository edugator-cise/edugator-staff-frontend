import { createSlice } from "@reduxjs/toolkit";

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
    validateMetadata: (state) => {
      state.metadataIsValid = true;
    },
    validateProblem: (state) => {
      state.problemIsValid = true;
    },
    validateCode: (state) => {
      state.codeIsValid = true;
    },
    validateServerConfig: (state) => {
      state.serverConfigIsValid = true;
    },
    validateTestEditor: (state) => {
      state.testEditorIsValid = true;
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
