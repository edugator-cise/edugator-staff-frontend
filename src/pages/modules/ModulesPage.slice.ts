import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IModuleState,
  IModulesGETFailure,
  IModulesPUT,
  IModulesPUTFailure,
  IModule,
  AlertType,
} from "./types";
import { AlertMsg } from "./config";

const baseModuleState: IModuleState = {
  modules: [],
  isLoading: false,
  feedback: {
    message: "",
    display: false,
    type: AlertType.info,
  },
};

export function getBaseModuleState(): IModuleState {
  return { ...baseModuleState };
}

export const moduleSlice = createSlice({
  name: "modules",
  initialState: getBaseModuleState(),
  reducers: {
    /* GET Request Modules */
    requestModules: (state, action: PayloadAction<void>) => {
      return { ...state, isLoading: true };
    },

    // action.type = "modules/requestModulesSuccess"
    requestModulesSuccess: (state, action: PayloadAction<IModule[]>) => {
      return {
        ...state,
        modules: action.payload,
        feedback: {
          message: AlertMsg[action.type],
          type: AlertType.success,
          display: true,
        },
        isLoading: false,
      };
    },

    requestModulesFailure: (
      state,
      action: PayloadAction<IModulesGETFailure>
    ) => {
      return {
        ...state,
        feedback: {
          message: action.payload.message,
          type: AlertType.error,
          display: true,
        },
        isLoading: false, // needs to retry
      };
    },

    /* POST Request Modules */

    requestNewModule: (state, action: PayloadAction<IModulesPUT>) => {
      return { ...state, isLoading: true };
    },

    requestNewModuleSuccess: (state, action: PayloadAction<IModule>) => {
      return {
        ...state,
        modules: [...state.modules, action.payload],
        feedback: {
          message: AlertMsg[action.type],
          type: AlertType.success,
          display: true,
        },
        isLoading: false,
      };
    },

    requestNewModuleFailure: (
      state,
      action: PayloadAction<IModulesPUTFailure>
    ) => {
      return {
        ...state,
        feedback: {
          message: action.payload.message,
          type: AlertType.error,
          display: true,
        },
        isLoading: false,
      };
    },

    /* PUT Request Modules */
    requestModifyModule: (state, action) => {},
    requestModifyModuleSuccess: (state, action) => {},
    requestModifyModuleFailure: (state, action) => {},
    /* DELETE Request Modules */
    requestDeleteModule: (state, action) => {},
    requestDeleteModuleSuccess: (state, action) => {},
    requestDeleteModuleFailure: (state, action) => {},

    /* Other reducers */
    closeAlert: (state) => {
      state.feedback.display = false;
    },
    clearState: (state) => {
      state.modules = [];
      state.isLoading = false;
      state.feedback.message = "";
      state.feedback.display = false;
      state.feedback.type = AlertType.info;
    },
  },
});

export const {
  /* GET Request Modules */
  requestModules,
  requestModulesSuccess,
  requestModulesFailure,
  /* POST Request Modules */
  requestNewModule,
  requestNewModuleSuccess,
  requestNewModuleFailure,
  /* PUT Request Modules */
  /* DELETE Request Modules */
  /* Other Reducers */
  closeAlert,
  clearState,
} = moduleSlice.actions;

export default moduleSlice;
