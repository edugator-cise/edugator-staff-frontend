import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IModuleState,
  IModulesGETSuccess,
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
      state.isLoading = true;
      return state;
    },
    requestModulesSuccess: (
      state,
      action: PayloadAction<IModulesGETSuccess>
    ) => {
      state.modules = action.payload.modules;
      state.isLoading = false;
      return state;
    },
    requestModulesFailure: (
      state,
      action: PayloadAction<IModulesGETFailure>
    ) => {
      console.log("getting modules reducer fail");
      console.log("error message: ", state.errorMessage);

      state.isLoading = true;
      state.errorMessage = action.payload.message;

      return state;
    },

    /* PUT Request Modules */

    requestNewModule: (state, action: PayloadAction<IModulesPUT>) => {
      state.isLoading = true;

      console.log("adding modules reducer");
      return state;
    },
    requestNewModuleSuccess: (state, action: PayloadAction<IModule>) => {
      console.log("adding modules reducer end");

      let newModule = action.payload;
      state.modules = [...state.modules, newModule];
      state.isLoading = false;

      return state;
    },
    requestNewModuleFailure: (
      state,
      action: PayloadAction<IModulesPUTFailure>
    ) => {
      console.log("adding modules reducer fail");
      console.log("error message: ", state.errorMessage);

      state.isLoading = false;
      state.errorMessage = action.payload.message;
      return state;
    },

    /* POST Request Modules */
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
  requestModules,
  requestModulesSuccess,
  requestModulesFailure,
  requestNewModule,
  requestNewModuleSuccess,
  requestNewModuleFailure,
} = moduleSlice.actions;

export default moduleSlice;
