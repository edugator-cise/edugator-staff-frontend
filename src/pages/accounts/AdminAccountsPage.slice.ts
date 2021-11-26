import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType, IFeedback, IRequestMessage } from "../../shared/types";
import {
  IAccountManagerState,
  IAccount,
  INewAccount,
  IAccountDELETE,
} from "./types";

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
        title: "Getting accounts failed",
        message: action.payload.message,
      };
      state.loading = false;
    },

    /* POST Request Admin Accounts Manager */
    requestNewAccount: (state, action: PayloadAction<INewAccount>) => {
      state.loading = true;
    },
    requestNewAccountEnd: (state, action: PayloadAction<IAccount>) => {
      state.accounts = [...state.accounts, action.payload];
      state.feedback = {
        display: true,
        type: AlertType.success,
        message: "Added new account successfully",
      };
      state.loading = false;
    },
    requestNewAccountFail: (state, action: PayloadAction<IRequestMessage>) => {
      state.feedback = {
        display: true,
        type: AlertType.error,
        title: "Adding new account failed",
        message: action.payload.message,
      };
      state.loading = false;
    },

    /* PUT Request Admin Accounts Manager */
    requestModifyAccount: (state, action: PayloadAction<IAccount>) => {
      state.loading = true;
    },
    requestModifyAccountEnd: (state, action: PayloadAction<IAccount>) => {
      const updated = action.payload;
      const index = state.accounts.findIndex((acc) => acc._id === updated._id);

      state.accounts = state.accounts.fill(updated, index, index + 1);

      state.feedback = {
        display: true,
        type: AlertType.success,
        message: "Account updated successfully",
      };
      state.loading = false;
    },
    requestModifyAccountFail: (
      state,
      action: PayloadAction<IRequestMessage>
    ) => {
      state.feedback = {
        display: true,
        type: AlertType.error,
        title: "Updating account failed",
        message: action.payload.message,
      };
      state.loading = false;
    },

    /* DELETE Request Admin Accounts Manager */
    requestDeleteAccount: (state, action: PayloadAction<IAccount>) => {
      state.loading = true;
    },
    requestDeleteAccountEnd: (state, action: PayloadAction<IAccountDELETE>) => {
      const removed = action.payload.id;

      state.accounts = state.accounts.filter((acc) => acc._id !== removed);
      state.feedback = {
        display: true,
        type: AlertType.success,
        message: action.payload.message,
      };
      state.loading = false;
    },
    requestDeleteAccountFail: (
      state,
      action: PayloadAction<IRequestMessage>
    ) => {
      state.feedback = {
        display: true,
        type: AlertType.error,
        title: "Deleting account failed",
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
    /** Feddback Recucers*/
    setAlert: (state, action: PayloadAction<IFeedback>) => {
      state.feedback = action.payload;
    },
    closeAlert: (state) => {
      state.feedback.display = false;
    },
    /** Other Reducers*/
    resetState: () => {
      return getBaseManagerState();
    },
  },
});

export const {
  /* GET Request Admin Accounts Manager */
  requestAccounts,
  requestAccountsEnd,
  requestAccountsFail,
  /* POST Request Admin Accounts Manager */
  requestNewAccount,
  requestNewAccountEnd,
  requestNewAccountFail,
  /* PUT Request Admin Accounts Manager */
  requestModifyAccount,
  requestModifyAccountEnd,
  requestModifyAccountFail,
  /* DELETE Request Admin Accounts Manager */
  requestDeleteAccount,
  requestDeleteAccountEnd,
  requestDeleteAccountFail,
  /** Admin Accounts Dialog Reducers */
  setSelectedAccount,
  unsetSelectedAccount,
  setCurrentAccount,
  /** Ohter */
  setAlert,
  closeAlert,
  resetState,
} = managerSlice.actions;

export default managerSlice.reducer;
