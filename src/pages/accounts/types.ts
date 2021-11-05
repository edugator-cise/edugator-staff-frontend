import { IFeedback } from "../../shared/types";

export enum rolesEnum {
  TA = "TA",
  Professor = "Professor",
}

export interface IAccount {
  role: rolesEnum;
  username: string;
  // future values
  name?: string;
  //email?: string; // ?
  phone?: string;
}

export interface IAccountDashboardState {
  loading: boolean;
  feedback: IFeedback;
  accounts: IAccount[];
  currentAccount?: IAccount;
  selectedAccount?: IAccount;
}
