import { IProblem, IModuleBase } from "../../shared/types";

/** Admin Module Interface */

export interface IAdminModule extends IModuleBase {
  problems: IProblem[];
}

export const EmptyModule: IAdminModule = {
  name: "",
  number: 0,
  problems: [],
};

/** Creating a New-Module dialog */

export enum DialogStatus {
  EDIT = "edit",
  CREATE = "create",
  CLOSED = "closed",
}

export interface IDialog {
  open: boolean;
  action: DialogStatus;
  module: IModuleBase;
}

/** Useful Structs */
/**
 * @property error
 * @property success
 */
export enum AlertType {
  info = "info",
  error = "error",
  success = "success",
}

export interface IFeedback {
  message?: string;
  display: boolean;
  type: AlertType;
}

/* Redux State - Modules */
export interface IModuleState {
  modules: IAdminModule[];
  isLoading: boolean;
  feedback: IFeedback;
  dialogState: IDialog;
}

/* Request Actions - Modules */
export interface IRequestMessage {
  message?: string;
}

/* PUT Request Actions - Modules */
export interface IModulesPUT {
  moduleName: string;
  moduleNum: number;
}

/* POST Request Actions - Modules */

/* DELETE Request Actions - Modules */
