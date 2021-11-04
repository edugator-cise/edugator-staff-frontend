import React from "react";
import { Stack, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/common/hooks";
import { LayoutContainer } from "../../shared/LayoutContainer";

export function adminAccountsPage() {
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.modules);

  const accountsHeaderButtons = [
    {
      label: "Add Admin User",
      onClick: () => {
        //dispatch(openCreateDialog());
      },
      variant: "contained",
    },
  ];

  React.useEffect(() => {
    //dispatch(requestModules());
  }, [dispatch]);

  // <ModulesSnackbar />

  return (
    <LayoutContainer
      pageTitle={"Admin Accounts"}
      actionButtons={accountsHeaderButtons}
    >
      <Stack alignItems="center">
        {dashboardState.isLoading ? <CircularProgress /> : <p>a</p>}
      </Stack>
    </LayoutContainer>
  );
}
