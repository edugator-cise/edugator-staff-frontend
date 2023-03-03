import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType } from "lib/shared/types";
import {
  IAccountManagerState,
  IAccount,
  IAccountDELETE,
} from "../components/Accounts/types";

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
    requestAccountsEnd: (state, action: PayloadAction<IAccount[]>) => {
      state.accounts = action.payload;
    },
    requestNewAccountEnd: (state, action: PayloadAction<IAccount>) => {
      state.accounts = [...state.accounts, action.payload];
    },
    requestModifyAccountEnd: (state, action: PayloadAction<IAccount>) => {
      const updated = action.payload;
      const index = state.accounts.findIndex((acc) => acc._id === updated._id);
      state.accounts = state.accounts.fill(updated, index, index + 1);
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
    /** Other Reducers*/
    resetState: () => {
      return getBaseManagerState();
    },
  },
});

export const {
  /* GET Request Admin Accounts Manager */
  requestAccountsEnd,
  /* POST Request Admin Accounts Manager */
  requestNewAccountEnd,
  /* PUT Request Admin Accounts Manager */
  requestModifyAccountEnd,
  /* DELETE Request Admin Accounts Manager */
  requestDeleteAccountEnd,
  /** Admin Accounts Dialog Reducers */
  setSelectedAccount,
  unsetSelectedAccount,
  setCurrentAccount,
  /** Other */
  resetState,
} = managerSlice.actions;

export default managerSlice.reducer;
