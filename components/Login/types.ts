import { rolesEnum } from "components/Accounts/types";

export interface IAuthState {
  role: rolesEnum;
}

export interface IRequestLoginAction {
  email: string;
  password: string;
}

export interface IRequestSignupAction {
  email: string;
  password: string;
  role: string;
  organization: string | undefined;
  firstName: string;
  lastName: string;
}

export interface ILoginSuccess {
  token: string;
  role: rolesEnum;
}
