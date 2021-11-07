import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType, IRequestMessage } from "../../shared/types";
import { IAccountDashboardState, IAccount /*rolesEnum*/ } from "./types";

const baseDashboardState: IAccountDashboardState = {
  accounts: [],
  loading: true,
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
    /** Accounts Dashboard Reducers */
    setSelectedAccount: (state, action: PayloadAction<IAccount>) => {
      state.selectedAccount = action.payload;
    },
    unsetSelectedAccount: (state) => {
      state.selectedAccount = undefined;
    },
    setCurrentAccount: (state, action: PayloadAction<IAccount>) => {
      state.currentAccount = action.payload;
    },

    /** Other */
    closeAlert: (state) => {
      state.feedback.display = false;
    },
  },
});

export const {
  /* GET Request Admin Accounts */
  requestAccounts,
  requestAccountsEnd,
  requestAccountsFail,
  /** Accounts Dashboard Reducers */
  setSelectedAccount,
  unsetSelectedAccount,
  setCurrentAccount,
  /** Ohter */
  closeAlert,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
