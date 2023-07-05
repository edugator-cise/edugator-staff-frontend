import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InterfaceControlsState {
  mainSidebarHidden: boolean;
  contentSidebarHidden: boolean;
  adminMainSidebarHidden: boolean;
  adminContentSidebarHidden: boolean;
  aiChatHidden: boolean;
}

const initialState: InterfaceControlsState = {
  mainSidebarHidden: true,
  contentSidebarHidden: false,
  adminMainSidebarHidden: true,
  adminContentSidebarHidden: false,
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
    setAdminMainSidebarHidden: (state, action: PayloadAction<boolean>) => {
      state.adminMainSidebarHidden = action.payload;
    },
    setAdminContentSidebarHidden: (state, action: PayloadAction<boolean>) => {
      state.adminContentSidebarHidden = action.payload;
    },
    toggleAiChat: (state, action: PayloadAction<boolean>) => {
      state.aiChatHidden = action.payload;
    },
  },
});

export const {
  setMainSidebarHidden,
  setContentSidebarHidden,
  setAdminMainSidebarHidden,
  setAdminContentSidebarHidden,
} = interfaceControlsSlice.actions;
export default interfaceControlsSlice.reducer;
