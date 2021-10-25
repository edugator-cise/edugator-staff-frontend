import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorage } from "../../app/common/LocalStorage";

export interface IAuthState {
  isLoading: boolean;
  errorMessage: string;
}

const initialAuthState: IAuthState = {
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
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    },
    receiveLoginSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
      };
    },
    receiveLoginFailure(state, action) {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    },
    requestLogout(state) {
      LocalStorage.removeToken();
      return { ...state, isLoading: false, authorizationToken: "" };
    },
    resetErrorMessage(state) {
      return {
        ...state,
        errorMessage: "",
      };
    },
  },
});

export const {
  requestLogin,
  receiveLoginSuccess,
  receiveLoginFailure,
  requestLogout,
  resetErrorMessage,
} = loginSlice.actions;

export default loginSlice.reducer;
