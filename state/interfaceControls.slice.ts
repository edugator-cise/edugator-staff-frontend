import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InterfaceControlsState {
  mainSidebarHidden: boolean;
  contentSidebarHidden: boolean;
  aiChatHidden: boolean;
}

const initialState: InterfaceControlsState = {
  mainSidebarHidden: false,
  contentSidebarHidden: false,
  aiChatHidden: false,
};

export const getInterfaceControlsInitialState = (): InterfaceControlsState => {
  return { ...initialState };
};

export const interfaceControlsSlice = createSlice({
  name: "interfaceControls",
  initialState,
  reducers: {
    setMainSidebarHidden: (state, action: PayloadAction<boolean>) => {
      state.mainSidebarHidden = action.payload;
    },
    setContentSidebarHidden: (state, action: PayloadAction<boolean>) => {
      state.contentSidebarHidden = action.payload;
    },
    toggleAiChat: (state, action: PayloadAction<boolean>) => {
      state.aiChatHidden = action.payload;
    },
  },
});

export const { setMainSidebarHidden, setContentSidebarHidden } =
  interfaceControlsSlice.actions;
export default interfaceControlsSlice.reducer;
