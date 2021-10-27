import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LandingPageState {
  isLoading: boolean;
  modules: string[];
}
const initialState: LandingPageState = {
  isLoading: true,
  modules: [],
};

export function getInitialLandingPageState(): LandingPageState {
  return { ...initialState };
}

export const landingPageState = createSlice({
  name: "LandingPage",
  initialState: getInitialLandingPageState(),
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    requestModules: (state) => {
      state.isLoading = true;
    },
    setModules: (state, action: PayloadAction<string[]>) => {
      state.modules = action.payload;
    },
  },
});

export const { setIsLoading, requestModules, setModules } =
  landingPageState.actions;

export default landingPageState.reducer;
