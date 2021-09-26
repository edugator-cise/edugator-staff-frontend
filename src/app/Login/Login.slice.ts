import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtToken } from "../../shared/constants";
import setAuthToken from "../common/setAuthToken";

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

export interface IRequestLoginAction {
	username: string;
	password: string;
}

//const requestLogin = createAction('requestLogin', withPayloadType<IRequestLoginAction>() );

export const loginSlice = createSlice({
	name: "login",
	initialState: getInitialAuthState(),
	reducers: {
		requestLogin(state, action: PayloadAction<IRequestLoginAction>) {
			state.isLoading = true;
			return state;
		},
		receiveLoginSuccess(state, action) {
			return {
				...state,
				isLoading: false,
				authorizationToken: action.payload,
				errorMessage: "",
			};
		},
		receiveLoginFailure(state, action) {
			return {
				...state,
				isLoading: false,
				authorizationToken: "",
				errorMessage: action.payload,
			};
		},
		requestLogout(state) {
			localStorage.removeItem(jwtToken);
			setAuthToken(false);
			return { ...state, isLoading: false, authorizationToken: "" };
		},
	},
});

export const {
	requestLogin,
	receiveLoginSuccess,
	receiveLoginFailure,
	requestLogout,
} = loginSlice.actions;

export default loginSlice.reducer;
