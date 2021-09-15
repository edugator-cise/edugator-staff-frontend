import {
	AuthActionTypes,
	IReceiveLoginFailureAction,
	IReceiveLoginSuccessAction,
	IRequestLoginAction,
} from "./auth.actions";

export interface IAuthState {
	authorizationToken: string;
	isLoading: boolean;
	errorMessage: string;
}

const initialAuthState: IAuthState = {
	authorizationToken: "",
	isLoading: false,
	errorMessage: "",
};

/**
 * Gets a safe copy of the initial auth state
 */
export function getInitialAuthState(): IAuthState {
	return { ...initialAuthState };
}

export default function authReducer(
	state = getInitialAuthState(),
	action:
		| IReceiveLoginSuccessAction
		| IReceiveLoginFailureAction
		| IRequestLoginAction
): IAuthState {
	switch (action.type) {
		case AuthActionTypes.REQUEST_LOGIN:
			return {
				...state,
				isLoading: true,
				authorizationToken: "",
				errorMessage: "",
			};
		case AuthActionTypes.RECEIVE_LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				authorizationToken: action.token,
				errorMessage: "",
			};
		case AuthActionTypes.RECEIVE_LOGIN_FAILURE:
			return {
				...state,
				isLoading: false,
				errorMessage: action.message,
			};
		default:
			return { ...state };
	}
}
