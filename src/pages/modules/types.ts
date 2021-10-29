import { IProblemBase, IModuleBase, IFeedback } from "../../shared/types";

/** Admin Module Interface */

export interface IAdminModule extends IModuleBase {
  problems: IProblemBase[];
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
