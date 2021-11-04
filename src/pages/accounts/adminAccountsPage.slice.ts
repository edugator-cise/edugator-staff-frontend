import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType, IRequestMessage } from "../../shared/types";
import { IAccountDashboardState, IAccount } from "./types";

const baseDashboardState: IAccountDashboardState = {
  accounts: [],
  loading: false,
  feedback: {
    display: false,
    type: AlertType.info,
  },
};

export function getBaseDashboardState(): IAccountDashboardState {
  return { ...baseDashboardState };
}

export const dashboardSlice = createSlice({
  name: "adminAccounts",
  initialState: getBaseDashboardState(),
  reducers: {
    /* GET Request Admin Accounts Dashboard */
    requestAccounts: (state) => {
      state.loading = true;
    },
    requestAccountsEnd: (state, action: PayloadAction<IAccount[]>) => {
      console.log("end?");
      //state.accounts = action.payload;
      state.loading = false;
    },
    requestAccountsFail: (state, action: PayloadAction<IRequestMessage>) => {
      state.feedback = {
        display: true,
        type: AlertType.error,
        message: action.payload.message,
      };
      state.loading = false;
    },
  },
});

export const {
  /* GET Request Admin Accounts */
  requestAccounts,
  requestAccountsEnd,
  requestAccountsFail,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
