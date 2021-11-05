import React from "react";
import { Stack } from "@mui/material";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppDispatch, useAppSelector } from "../../app/common/hooks";
import {
  requestAccounts,
  requestAccountsEnd,
  unsetSelectedAccount,
} from ".//AdminAccountsPage.slice";
import {
  AccountsTable,
  AccountDialog,
  NewAccountDialog,
  DashboardProgress,
  AccountSnackbar,
} from "./components";

export function AdminAccountsPage() {
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.adminDashboard);

  // whether we want to add a new account
  const [newUserDialog, setNewUserDialog] = React.useState<boolean>(false);

  // whether there is a selected account from the table
  const selectingAccount = dashboardState.selectedAccount ? true : false;

  React.useEffect(() => {
    dispatch(requestAccounts());
  }, [dispatch]);

  const accountsHeaderButtons = [
    {
      label: "Add Admin User",
      onClick: () => dispatch(requestAccountsEnd([])),
      //onClick: () => setNewUserDialog(true),
      variant: "contained",
    },
  ]; //

  return (
    <LayoutContainer
      pageTitle={"Admin Accounts Information"}
      actionButtons={accountsHeaderButtons}
    >
      <>
        <AccountSnackbar />

        <NewAccountDialog
          open={newUserDialog}
          handleClose={() => setNewUserDialog(false)}
        />

        <AccountDialog
          open={selectingAccount}
          handleClose={() => dispatch(unsetSelectedAccount())}
        />

        <Stack alignItems="center">
          {dashboardState.loading ? <DashboardProgress /> : <AccountsTable />}
        </Stack>
      </>
    </LayoutContainer>
  );
}
