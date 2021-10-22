import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppDispatch, useAppSelector } from "../../app/common/hooks";
import { ModuleDialog, Modules, ModulesSnackbar } from "./components";
import { requestModules, openCreateDialog } from "./ModulesPage.slice";

export function ModulesPage() {
  const dispatch = useAppDispatch();
  const modulesState = useAppSelector((state) => state.modules);

  const moduleHeaderButtons = [
    {
      label: "Add Module",
      onClick: () => {
        dispatch(openCreateDialog());
      },
    },
  ];

  React.useEffect(() => {
    dispatch(requestModules());
  }, [dispatch]);

  return (
    <LayoutContainer pageTitle={"Modules"} actionButtons={moduleHeaderButtons}>
      <>
        <ModuleDialog />
        <ModulesSnackbar />

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {modulesState.isLoading ? <CircularProgress /> : <Modules />}
        </Grid>
      </>
    </LayoutContainer>
  );
}
