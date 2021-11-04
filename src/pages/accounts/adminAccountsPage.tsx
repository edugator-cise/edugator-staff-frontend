import React from "react";
import { Stack } from "@mui/material";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppDispatch, useAppSelector } from "../../app/common/hooks";
import {
  requestAccounts,
  requestAccountsEnd,
} from ".//AdminAccountsPage.slice";
import {
  NewAccountDialog,
  AccountsTable,
  DashboardProgress,
} from "./components";

export function AdminAccountsPage() {
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.adminDashboard);

  const [newUserDialog, setNewUserDialog] = React.useState<boolean>(false);

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
  ]; // <ModulesSnackbar />

  return (
    <LayoutContainer
      pageTitle={"Admin Accounts"}
      actionButtons={accountsHeaderButtons}
    >
      <>
        <NewAccountDialog
          open={newUserDialog}
          handleClose={() => setNewUserDialog(false)}
        />

        <Stack alignItems="center">
          {dashboardState.loading ? <DashboardProgress /> : <AccountsTable />}
        </Stack>
      </>
    </LayoutContainer>
  );
}
