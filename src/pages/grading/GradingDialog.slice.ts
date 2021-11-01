import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGradingState, IGradeRequest } from "./types";

const baseGradingState: IGradingState = {
  uploading: false,
  progress: 0,
};

export function getBaseGradingState(): IGradingState {
  return { ...baseGradingState };
}

export const gradingSlice = createSlice({
  name: "grading",
  initialState: getBaseGradingState(),
  reducers: {
    /* Grade Solutions */
    requestGrading: (state, action: PayloadAction<IGradeRequest>) => {
      state.uploading = true;
      state.progress = 0;
    },
    requestGradingEnd: (state, action) => {
      state.uploading = false;
      //state.progress = 100;
    },
    requestGradingFail: (state, action) => {
      state.uploading = false;
      //state.progress = 0;
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
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
  /* Other Reducers */
} = gradingSlice.actions;
