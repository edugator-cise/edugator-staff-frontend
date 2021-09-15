export enum AuthActionTypes {
	REQUEST_LOGIN = "RequestLogin",
	RECEIVE_LOGIN_SUCCESS = "ReceiveLoginSuccess",
	RECEIVE_LOGIN_FAILURE = "ReceiveLoginFailure",
}

export interface IRequestLoginAction {
	type: AuthActionTypes.REQUEST_LOGIN;
	username: string;
	password: string;
}

export interface IReceiveLoginSuccessAction {
	type: AuthActionTypes.RECEIVE_LOGIN_SUCCESS;
	token: string;
}

export interface IReceiveLoginFailureAction {
	type: AuthActionTypes.RECEIVE_LOGIN_FAILURE;
	message: string;
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

export function receiveLoginSuccess(token: string): IReceiveLoginSuccessAction {
	return {
		type: AuthActionTypes.RECEIVE_LOGIN_SUCCESS,
		token,
	};
}

export function receiveLoginFailure(token: string): IReceiveLoginSuccessAction {
	return {
		type: AuthActionTypes.RECEIVE_LOGIN_SUCCESS,
		token,
	};
}
