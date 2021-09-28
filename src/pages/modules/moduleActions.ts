import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import {
  IModuleState,
  IModulesGETEnd,
  IModulesGETFail,
  IModulesPUT,
  /*IModulesPUTEnd,*/ IModulesPUTFail,
  IModule,
} from "./types";

/* GET Request Modules */

export const getModules = (
  state: WritableDraft<IModuleState>,
  action: PayloadAction<void>
) => {
  console.log("getting modules reducer");
  state.isLoading = true;
  return state;
};

export const getModulesEnd = (
  state: WritableDraft<IModuleState>,
  action: PayloadAction<IModulesGETEnd>
) => {
  state.isLoading = false;
  console.log("getting modules reducer end");
  state.modules = action.payload.modules;
  return state;
};

export const getModulesFail = (
  state: WritableDraft<IModuleState>,
  action: PayloadAction<IModulesGETFail>
) => {
  state.isLoading = false;
  console.log("getting modules reducer fail");
  state.errorMessage = action.payload.message;
  return state;
};

/* PUT Request Modules */
export const addModule = (
  state: WritableDraft<IModuleState>,
  action: PayloadAction<IModulesPUT>
) => {
  state.isLoading = true;
  // TODO: Add to sagas
  console.log("adding modules reducer");
  return state;
};

export const addModuleEnd = (
  state: WritableDraft<IModuleState>,
  action: PayloadAction<IModule>
) => {
  state.isLoading = false;
  // TODO: Add to sagas
  let newModule = action.payload;
  state.modules = [...state.modules, newModule];
  console.log("adding modules reducer end");
  return state;
};

export const addModuleFail = (
  state: WritableDraft<IModuleState>,
  action: PayloadAction<IModulesPUTFail>
) => {
  state.isLoading = false;
  // TODO: Add to sagas
  console.log("adding modules reducer fail");
  state.errorMessage = action.payload.message;
  return state;
};

/* POST Request Modules */

/* DELETE Request Modules */
