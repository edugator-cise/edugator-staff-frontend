import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdminModule } from "./types";
import { IModuleBase } from "../../shared/types";
import {
  IModuleState,
  IRequestFailure,
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
        feedback: {
          message: AlertMsg[action.type],
          type: AlertType.success,
          display: true,
        },
        isLoading: false,
      };
    },

    requestModulesFailure: (state, action: PayloadAction<IRequestFailure>) => {
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
      action: PayloadAction<IRequestFailure>
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
      return { ...state, isLoading: true };
    },
    requestModifyModuleSuccess: (state, action) => {
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
    requestModifyModuleFailure: (state, action) => {},
    /* DELETE Request Modules */
    requestDeleteModule: (state, action) => {},
    requestDeleteModuleSuccess: (state, action) => {},
    requestDeleteModuleFailure: (state, action) => {},

    /* Dialog Reducers  */
    openCreateDialog: (state) => {
      state.dialogState.open = true;
      state.dialogState.action = DialogStatus.CREATE;
    },
    openEditDialog: (state, action: PayloadAction<IModuleBase>) => {
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
          action: DialogStatus.CLOSED, // will remove after some testing
          module: {
            name: "",
            number: 0,
          },
        },
      };
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
  /* DELETE Request Modules */
  /* Dialog Reducers */
  openCreateDialog,
  openEditDialog,
  closeDialog,
  /* Other Reducers */
  closeAlert,
  clearState,
} = moduleSlice.actions;

export default moduleSlice;
