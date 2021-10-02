import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IModuleState,
  /*IModulesGETSuccess,*/
  IModulesGETFailure,
  IModulesPUT,
  /*IModulesPUTEnd,*/
  IModulesPUTFailure,
  IModule,
} from "./types";

const initialModuleState: IModuleState = {
  modules: [],
  isLoading: true,
  errorMessage: null,
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

    requestModulesSuccess: (state, action: PayloadAction<IModule[]>) => {
      return {
        ...state,
        modules: action.payload,
        isLoading: true,
      };
    },

    requestModulesFailure: (
      state,
      action: PayloadAction<IModulesGETFailure>
    ) => {
      console.log("getting modules reducer fail");
      console.log("error message: ", state.errorMessage);

      return {
        ...state,
        isLoading: true, // needs to retry
        errorMessage: action.payload.message,
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
        isLoading: false,
      };
    },

    requestNewModuleFailure: (
      state,
      action: PayloadAction<IModulesPUTFailure>
    ) => {
      console.log("adding modules reducer fail");
      console.log("error message: ", state.errorMessage);

      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
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
} = moduleSlice.actions;

export default moduleSlice;
