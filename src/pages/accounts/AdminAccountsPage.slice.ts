import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType, IRequestMessage } from "../../shared/types";
import { IAccountManagerState, IAccount /*rolesEnum*/ } from "./types";

const baseManagerState: IAccountManagerState = {
  accounts: [],
  loading: true,
  feedback: {
    display: false,
    type: AlertType.info,
  },
};

export function getBaseManagerState(): IAccountManagerState {
  return { ...baseManagerState };
}

export const managerSlice = createSlice({
  name: "accountsManager",
  initialState: getBaseManagerState(),
  reducers: {
    /* GET Request Admin Accounts Manager */
    requestAccounts: (state) => {
      state.loading = true;
    },
    requestAccountsEnd: (state, action: PayloadAction<IAccount[]>) => {
      state.accounts = action.payload;
      state.loading = false;
    },
    requestAccountsFail: (state, action: PayloadAction<IRequestMessage>) => {
      state.feedback = {
        display: true,
        type: AlertType.error,
        title: "Getting accounts failed (expected)",
        message: action.payload.message,
      };
      state.loading = false;
    },
    /** Admin Accounts Dialog Reducers */
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
  /* GET Request Admin Accounts Manager */
  requestAccounts,
  requestAccountsEnd,
  requestAccountsFail,
  /** Admin Accounts Dialog Reducers */
  setSelectedAccount,
  unsetSelectedAccount,
  setCurrentAccount,
  /** Ohter */
  closeAlert,
} = managerSlice.actions;

export default managerSlice.reducer;
