import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGradingState, IGradeRequest } from "./types";
import { AlertType, IFeedback } from "../../shared/types";

const baseGradingState: IGradingState = {
  uploading: false,
  uploadState: {
    display: false,
    progress: 0,
  },
  feedback: {
    message: "",
    display: false,
    type: AlertType.info,
  },
};

export function getBaseGradingState(): IGradingState {
  return { ...baseGradingState };
}

export const gradingSlice = createSlice({
  name: "grading",
  initialState: getBaseGradingState(),
  reducers: {
    /** Grade Solutions */
    requestGrading: (state, action: PayloadAction<IGradeRequest>) => {
      state.uploading = true;
      state.uploadState.display = true;
      state.uploadState.progress = 0;
    },
    requestGradingEnd: (state, action) => {
      state.uploading = false;

      state.feedback = {
        display: true,
        type: AlertType.success,
        message: `File received successfully. \n 
          Check your email for the results in approximately 40 minutes`,
      };
    },
    requestGradingFail: (state, action) => {
      state.uploading = false;
      // add feedback
      state.feedback = {
        display: true,
        type: AlertType.error,
        message: `There was an error during the upload`,
      };
    },
    /** Upload Progress */
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadState.progress = action.payload;
    },
    /** Feedback Reducers */
    setFeedback: (state, action: PayloadAction<IFeedback>) => {
      state.feedback = action.payload;
    },
    /** Other Reducers */
    resetGradingState: () => {
      return getBaseGradingState();
    },
  },
});

export const {
  /* Upload Solutions Reducers */
  requestGrading,
  requestGradingEnd,
  requestGradingFail,
  /* Upload Progress Reducers */
  setUploadProgress,
  /* Feddback Reducers */
  setFeedback,
  /* Other Reducers */
  resetGradingState,
} = gradingSlice.actions;

export default gradingSlice.reducer;
