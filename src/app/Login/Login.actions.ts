export enum LoginActionTypes {
	REQUEST_LOGIN = "RequestLogin",
	RECEIVE_LOGIN_SUCCESS = "ReceiveLoginSuccess",
	RECEIVE_LOGIN_FAILURE = "ReceiveLoginFailure",
}

export interface IRequestLoginAction {
	type: LoginActionTypes.REQUEST_LOGIN;
	username: string;
	password: string;
}

export interface IReceiveLoginSuccessAction {
	type: LoginActionTypes.RECEIVE_LOGIN_SUCCESS;
	token: string;
}

export interface IReceiveLoginFailureAction {
	type: LoginActionTypes.RECEIVE_LOGIN_FAILURE;
	message: string;
}

export function requestLogin(
	username: string,
	password: string
): IRequestLoginAction {
	return {
		type: LoginActionTypes.REQUEST_LOGIN,
		username,
		password,
	};
}

export function receiveLoginSuccess(token: string): IReceiveLoginSuccessAction {
	return {
		type: LoginActionTypes.RECEIVE_LOGIN_SUCCESS,
		token,
	};
}

export function receiveLoginFailure(
	message: string
): IReceiveLoginFailureAction {
	return {
		type: LoginActionTypes.RECEIVE_LOGIN_FAILURE,
		message,
	};
}
