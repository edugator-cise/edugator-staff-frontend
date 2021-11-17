import React from "react";
import { Fade, Stack, duration, Container } from "@mui/material";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppDispatch, useAppSelector } from "../../app/common/hooks";
import {
  requestAccounts,
  unsetSelectedAccount,
} from "./AdminAccountsPage.slice";
import {
  AccountsTable,
  AccountDialog,
  NewAccountDialog,
  DashboardProgress,
  AccountSnackbar,
} from "./components";

export function AdminAccountsPage() {
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.accountManager);

  // whether there is a selected account from the table
  const selectingAccount = dashboardState.selectedAccount ? true : false;

  // getting accounts or not
  const loading = dashboardState.loading;

  // whether we want start transitioning
  const [displayTable, setDisplayTable] = React.useState<boolean>(false);

  // whether we want to add a new account (dialog)
  const [newUserDialog, setNewUserDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(requestAccounts());
  }, [dispatch]);

  // for a smooth transition
  React.useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setDisplayTable(true);
      }, duration.leavingScreen * 2);
    } else {
      setDisplayTable(false);
    }
  }, [loading]);

  const accountsHeaderButtons = [
    {
      label: "Add Admin User",
      onClick: () => setNewUserDialog(true),
      variant: "contained",
    },
  ];

  return (
    <LayoutContainer
      pageTitle={"Sample Admin Accounts"}
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
          {displayTable ? (
            <AccountsTable />
          ) : (
            <Fade
              in={loading}
              appear={false}
              timeout={{ exit: duration.leavingScreen * 2 }}
            >
              <Container>
                <DashboardProgress />
              </Container>
            </Fade>
          )}
        </Stack>
      </>
    </LayoutContainer>
  );
}
