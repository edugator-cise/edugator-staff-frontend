import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IModuleState,
  IModulesGETFailure,
  IModulesPUT,
  IModulesPUTFailure,
  IModule,
  AlertType,
} from "../../shared/types";
import { AlertMsg } from "./config";

const initialModuleState: IModuleState = {
  modules: [],
  isLoading: true,
  feedback: {
    message: "",
    display: false,
    type: AlertType.info,
  },
};

export function getInitialModuleState(): IModuleState {
  return { ...initialModuleState };
}

export const moduleSlice = createSlice({
  name: "modules",
  initialState: getInitialModuleState(),
  reducers: {
    /* GET Request Modules */
    requestModules: (state, action: PayloadAction<void>) => {
      return { ...state, isLoading: true };
    },

    // action.type = "modules/requestModulesSuccess"
    requestModulesSuccess: (state, action: PayloadAction<IModule[]>) => {
      console.log("getting modules success");
      console.log(action);
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
      console.log("getting modules reducer fail");

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
      console.log("adding modules reducer");
      return { ...state, isLoading: true };
    },

    requestNewModuleSuccess: (state, action: PayloadAction<IModule>) => {
      console.log("adding modules reducer end");

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
      console.log("adding modules reducer fail");

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
    closeAlert: (state, action: PayloadAction<void>) => {
      state.feedback.display = false;
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
} = moduleSlice.actions;

export default moduleSlice;
