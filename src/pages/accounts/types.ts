import { IFeedback } from "../../shared/types";

export interface IAccount {
  role: string;
  username: string;
  // future values
  name?: string;
  //email?: string;
  phone?: string;
}

export interface IAccountDashboardState {
  loading: boolean;
  accounts: IAccount[];
  feedback: IFeedback;
}
