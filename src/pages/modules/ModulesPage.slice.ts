import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdminModule } from "./types";
import { IModuleBase } from "../../shared/types";
import {
  IModuleState,
  IRequestMessage,
  DialogStatus,
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
  dialogState: {
    action: DialogStatus.CLOSED,
    open: false,
    module: {
      name: "",
      number: 0,
    },
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
    requestModules: (state) => {
      return { ...state, isLoading: true };
    },

    // action.type = "modules/requestModulesSuccess"
    requestModulesSuccess: (state, action: PayloadAction<IAdminModule[]>) => {
      return {
        ...state,
        modules: action.payload,
        isLoading: false,
      };
    },

    requestModulesFailure: (state, action: PayloadAction<IRequestMessage>) => {
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

    requestNewModule: (state, action: PayloadAction<IModuleBase>) => {
      return { ...state, isLoading: true };
    },

    requestNewModuleSuccess: (state, action: PayloadAction<IAdminModule>) => {
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
      action: PayloadAction<IRequestMessage>
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
    requestModifyModule: (state, action: PayloadAction<IModuleBase>) => {
      console.log("on edit module start:", action.payload);
      return { ...state, isLoading: true };
    },
    requestModifyModuleSuccess: (state, action: PayloadAction<IModuleBase>) => {
      // get modified element from array
      let modified = action.payload._id;
      let index = state.modules.findIndex((module) => module._id === modified);
      
      // weird workaround since module from backend
      // doesnt have the "problems" property
      let new_module = { ...action.payload, problems: [] };

      console.log("module after modification (reducer):", new_module);

      // TODO
      // Planning to add a title to the feedback message

      // replace old module with new module
      state.modules = state.modules.fill(new_module, index, index + 1);

      state.feedback.message = AlertMsg[action.type];
      state.feedback.type = AlertType.success;
      state.feedback.display = true;

      state.isLoading = false;
    },
    requestModifyModuleFailure: (
      state,
      action: PayloadAction<IRequestMessage>
    ) => {
      // Very similar to requestAddModuleFailure currently

      // TODO
      // Add title to feedback and default message
      // in case message property of response is undefined due to weird error
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
    /* DELETE Request Modules */
    requestDeleteModule: (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = true;
    },
    requestDeleteModuleSuccess: (
      state,
      action: PayloadAction<{ response: IRequestMessage; id: string }>
    ) => {
      let removed = action.payload.id;
      let new_modules = state.modules.filter(
        (module) => module._id !== removed
      );

      return {
        ...state,
        modules: new_modules,
        feedback: {
          message: action.payload.response.message,
          type: AlertType.success,
          display: true,
        },
        isLoading: false,
      };
    },
    requestDeleteModuleFailure: (
      state,
      action: PayloadAction<IRequestMessage>
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

    /* Dialog Reducers  */
    openCreateDialog: (state) => {
      state.dialogState.open = true;
      state.dialogState.action = DialogStatus.CREATE;
    },
    openEditDialog: (state, action: PayloadAction<IModuleBase>) => {
      console.log("On openEditDialog:", action.payload);
      return {
        ...state,
        dialogState: {
          open: true,
          action: DialogStatus.EDIT,
          module: action.payload,
        },
      };
    },
    closeDialog: (state) => {
      return {
        ...state,
        dialogState: {
          open: false,
          action: DialogStatus.CLOSED, // might remove after some testing
          module: {
            name: "",
            number: 0,
            _id: undefined,
          },
        },
      };
    },
    updateDialogModule: (state, action: PayloadAction<IModuleBase>) => {
      state.dialogState.module = action.payload;
    },

    /* Other reducers */
    closeAlert: (state) => {
      state.feedback.display = false;
    },
    // good for testing purposes
    clearState: (state) => {
      return {
        ...state,
        modules: [],
        isLoading: false,
        feedback: {
          message: "",
          display: false,
          type: AlertType.info,
        },
      };
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
  requestModifyModule,
  requestModifyModuleSuccess,
  requestModifyModuleFailure,
  /* DELETE Request Modules */
  requestDeleteModule,
  requestDeleteModuleSuccess,
  requestDeleteModuleFailure,
  /* Dialog Reducers */
  updateDialogModule,
  openCreateDialog,
  openEditDialog,
  closeDialog,
  /* Other Reducers */
  closeAlert,
  clearState,
} = moduleSlice.actions;

export default moduleSlice;
