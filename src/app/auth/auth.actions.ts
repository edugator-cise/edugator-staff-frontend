import { IGenericAction } from "../common/types";

export enum AuthActionTypes {
  REQUEST_LOGIN = "Request_Login",
}

export interface IRequestLoginAction extends IGenericAction {
  username: string;
  password: string;
}

export function requestLogin(
  username: string,
  password: string
): IRequestLoginAction {
  return {
    type: AuthActionTypes.REQUEST_LOGIN,
    username,
    password,
  };
}
