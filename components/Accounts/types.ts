import { IFeedback } from "lib/shared/types";

export enum rolesEnum {
  TA = "TA",
  Professor = "Professor",
}

export interface IAccount {
  name: string;
  role: rolesEnum;
  username: string;
  // future values below
  // unused, but there for example on how to add/use aditional features
  phone?: string;
  _id?: string;
}

// only used when creating a new account
export interface INewAccount extends IAccount {
  password: string;
}

export interface IAccountManagerState {
  loading: boolean;
  feedback: IFeedback;
  accounts: IAccount[];
  currentAccount?: IAccount;
  selectedAccount?: IAccount;
}

// interfaces for API calls
export interface IAccountsGET {
  users: IAccount[];
  currentUser: string;
}

export interface IAccountPOST {
  id: string;
}

export interface IAccountDELETE {
  id: string;
  message: string;
}
