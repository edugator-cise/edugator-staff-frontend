import { createSlice } from "@reduxjs/toolkit";

interface ProblemEditorContainerState {
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

const problemEditorContainerSlice = createSlice({
  name: "problemEditorContainer",
  initialState,
  reducers: {
    validateMetadata: (state) => {
      state.metadataIsValid = true;
    },
  },
});

export const { validateMetadata } = problemEditorContainerSlice.actions;
export default problemEditorContainerSlice.reducer;
