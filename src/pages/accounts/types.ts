import { IFeedback } from "../../shared/types";

export enum rolesEnum {
  TA = "TA",
  Professor = "Professor",
}

export interface IAccount {
  name?: string;
  role: rolesEnum;
  username: string;
  // future values
  // unused, but there for example on how to add/use aditional features
  phone?: string;
}

export interface IAccountManagerState {
  loading: boolean;
  feedback: IFeedback;
  accounts: IAccount[];
  currentAccount?: IAccount;
  selectedAccount?: IAccount;
}
