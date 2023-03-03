import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModuleBase, IRequestMessage } from "lib/shared/types";
import {
  IModuleState,
  IAdminModule,
  DialogStatus,
} from "components/Modules/types";

const baseModuleState: IModuleState = {
  modules: [],
  dialogState: {
    action: DialogStatus.CLOSED,
    open: false,
    module: {
      name: "",
      number: -1,
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
    requestNewModuleSuccess: (state, action: PayloadAction<IAdminModule>) => {
      return {
        ...state,
        modules: [...state.modules, action.payload].sort(
          (a, b) => a.number - b.number
        ),
      };
    },
    requestModifyModuleSuccess: (state, action: PayloadAction<IModuleBase>) => {
      // get modified element from array
      const modified = action.payload._id;
      const index = state.modules.findIndex(
        (module) => module._id === modified
      );

      // workaround since module from backend
      // doesnt have the "problems" property
      const new_module = {
        ...action.payload,
        problems: state.modules[index].problems,
        lessons: state.modules[index].lessons,
      };

      // replace old module with new module
      state.modules = state.modules.fill(new_module, index, index + 1);
      state.modules = state.modules.sort((a, b) => a.number - b.number);
    },
    requestDeleteModuleSuccess: (
      state,
      action: PayloadAction<{ response: IRequestMessage; id: string }>
    ) => {
      const removed = action.payload.id;
      const new_modules = state.modules.filter(
        (module) => module._id !== removed
      );
      console.log(removed, new_modules);
      return {
        ...state,
        modules: new_modules,
      };
    },
    changeProblemOrderSuccess: (
      state,
      action: PayloadAction<{
        moduleId: string;
        problemId: string;
        direction: string;
      }>
    ) => {
      const { moduleId, problemId } = action.payload;

      const index = state.modules.findIndex(
        (module) => module._id === moduleId
      );
      const problemIndex = state.modules[index].problems.findIndex(
        (problem) => problem._id === problemId
      );

      const problem = state.modules[index].problems[problemIndex];
      state.modules[index].problems = state.modules[index].problems.filter(
        (problem) => problem._id !== problemId
      );

      if (action.payload.direction === "up") {
        state.modules[index].problems.splice(problemIndex - 1, 0, problem);
      } else {
        state.modules[index].problems.splice(problemIndex + 1, 0, problem);
      }
    },

    /* Dialog Reducers  */
    openCreateDialog: (state) => {
      return {
        ...state,
        dialogState: {
          open: true,
          action: DialogStatus.CREATE,
          module: {
            name: "",
            number: 0,
            _id: undefined,
          },
        },
      };
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
          action: DialogStatus.CLOSED, // might remove after some testing
          module: {
            name: "",
            number: 0,
            _id: undefined,
          },
        },
      };
    },

    requestModulesSuccess: (state, action: PayloadAction<IAdminModule[]>) => {
      return {
        ...state,
        modules: action.payload,
      };
    },

    /* Other reducers */
    closeAlert: (state) => {},
    // good for testing purposes
    clearState: (state) => {
      return {
        ...state,
        modules: [],
      };
    },
  },
});

export const {
  requestModulesSuccess,
  requestNewModuleSuccess,
  requestModifyModuleSuccess,
  requestDeleteModuleSuccess,
  changeProblemOrderSuccess,
  openCreateDialog,
  openEditDialog,
  closeDialog,
  closeAlert,
  clearState,
} = moduleSlice.actions;

export default moduleSlice.reducer;
