import {
	AuthActionTypes,
	IReceiveLoginFailureAction,
	IReceiveLoginSuccessAction,
	IRequestLoginAction,
} from "./auth.actions";

export interface IAuthState {
	authorizationToken: string;
	isLoading: boolean;
}

const initialAuthState: IAuthState = {
	authorizationToken: "",
	isLoading: false,
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
			};
		case AuthActionTypes.RECEIVE_LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				authorizationToken: action.token,
			};
		default:
			return { ...state };
	}
}
