import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, ILoginSuccess, rolesEnum } from "pages/admin/login";

const initialAuthState: IAuthState = {
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
    receiveLoginSuccess(state, action: PayloadAction<ILoginSuccess>) {
      return {
        ...state,
        role: action.payload.role,
      };
    },
  },
});

export const { receiveLoginSuccess } = loginSlice.actions;

export default loginSlice.reducer;
