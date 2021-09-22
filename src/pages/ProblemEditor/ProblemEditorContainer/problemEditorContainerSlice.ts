import { createSlice } from "@reduxjs/toolkit";

export interface ProblemEditorContainerState {
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
