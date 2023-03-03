import { useEffect, useState } from "react";
import AdminLayout from "components/AdminLayout";
import { Fade, Stack, duration, Container } from "@mui/material";
import { useRouter } from "next/router";
import { unsetSelectedAccount } from "state/AdminAccountsPage.slice";
import { AccountsTable } from "components/Accounts/AccountsTable";
import { AccountDialog } from "components/Accounts/accountDialog/AccountDialog";
import { NewAccountDialog } from "components/Accounts/accountDialog/NewAccountDialog";
import { DashboardProgress } from "components/Accounts/DashboardProgress";
import { Routes } from "constants/navigationRoutes";
import { useFetchAccount } from "hooks/useFetchAccount";
import { FetchStatus } from "hooks/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store/store";

export function AdminAccountsPage() {
  const history = useRouter();
  const dispatch = useDispatch();
  const dashboardState = useSelector(
    (state: RootState) => state.accountManager
  );

  // whether there is a selected account from the table
  const selectingAccount = dashboardState.selectedAccount ? true : false;

  // getting accounts or not
  const loading = dashboardState.loading;

  // whether we want start transitioning
  const [displayTable, setDisplayTable] = useState<boolean>(false);

  // whether we want to add a new account (dialog)
  const [newUserDialog, setNewUserDialog] = useState<boolean>(false);

  const { status } = useFetchAccount();

  // for a smooth transition
  useEffect(() => {
    if (status === FetchStatus.succeed) {
      setTimeout(() => {
        setDisplayTable(true);
      }, duration.leavingScreen * 2);
    } else {
      setDisplayTable(false);
    }
  }, [status]);

  const accountsHeaderButtons = [
    {
      label: "Manage Course Content",
      onClick: () => history.push(Routes.Modules),
      variant: "outlined",
    },
    {
      label: "Add Admin User",
      onClick: () => setNewUserDialog(true),
      variant: "contained",
    },
  ];

  return (
    <AdminLayout
      pageTitle={"Admin Accounts"}
      actionButtons={accountsHeaderButtons}
    >
      <>
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
    </AdminLayout>
  );
}

export default AdminAccountsPage;
