import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppDispatch, useAppSelector } from "../../app/common/hooks";
import { ModuleDialog, Modules, ModulesSnackbar } from "./components";
import { requestModules } from "./ModulesPage.slice";
import { DialogStatus } from "./types";

export function ModulesPage() {
  const dispatch = useAppDispatch();
  const modulesState = useAppSelector((state) => state.modules);

  const [dialogState, setDialogState] = React.useState(DialogStatus.CLOSED);
  const handleDialogClose = () => {
    setDialogState(DialogStatus.CLOSED);
  };

  const moduleHeaderButtons = [
    {
      label: "Add Module",
      onClick: () => {
        setDialogState(DialogStatus.CREATE);
      },
    },
  ];

  React.useEffect(() => {
    dispatch(requestModules());
  }, [dispatch]);

  return (
    <LayoutContainer pageTitle={"Modules"} actionButtons={moduleHeaderButtons}>
      <>
        <ModuleDialog
          dialogOperation={dialogState}
          handleClose={handleDialogClose}
          open={dialogState !== DialogStatus.CLOSED}
        />

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
