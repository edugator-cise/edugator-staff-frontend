import { rolesEnum } from "components/Accounts/types";

export interface IAuthState {
  isLoading: boolean;
  errorMessage: string;
  loggedIn: boolean;
  role: rolesEnum;
}

export interface IRequestLoginAction {
  username: string;
  password: string;
}

export interface ILoginSuccess {
  token: string;
  role: rolesEnum;
}
