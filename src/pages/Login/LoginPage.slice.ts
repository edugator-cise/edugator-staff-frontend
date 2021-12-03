import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorage } from "../../app/common/LocalStorage";
import { rolesEnum } from "../accounts/types";
import { IAuthState, IRequestLoginAction, ILoginSuccess } from "./types";

const initialAuthState: IAuthState = {
  isLoading: false,
  errorMessage: "",
  loggedIn: false,
  role: rolesEnum.TA,
};

/**
 * Gets a safe copy of the initial auth state
 */
export function getInitialAuthState(): IAuthState {
  return { ...initialAuthState };
}

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
    receiveLoginSuccess(state, action: PayloadAction<ILoginSuccess>) {
      LocalStorage.setToken(action.payload.token);
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        loggedIn: true,
        role: action.payload.role,
      };
    },
    receiveLoginFailure(state, action) {
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        errorMessage: action.payload,
      };
    },
    requestLogout(state) {
      LocalStorage.removeToken();
      return { ...state, isLoading: false, loggedIn: false };
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
