import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppDispatch, useAppSelector } from "../../app/common/hooks";
import {
  Modules,
  ModuleDialog,
  DeleteDialog,
  ModulesSnackbar,
} from "./components";
import { requestModules, openCreateDialog } from "./ModulesPage.slice";
import { IAdminModule, EmptyModule } from "./types";

export function ModulesPage() {
  const dispatch = useAppDispatch();
  const modulesState = useAppSelector((state) => state.modules);

  const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
  const onDialogClose = () => {
    setConfirmDelete(false);
  };

  const [toDelete, setToDelete] = React.useState<IAdminModule>(EmptyModule);
  const setModuleToDelete = (module: IAdminModule) => {
    setConfirmDelete(true);
    setToDelete(module);
  };

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
        <DeleteDialog
          open={confirmDelete}
          handleClose={onDialogClose}
          toDelete={toDelete}
        />
        <ModulesSnackbar />

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {modulesState.isLoading ? (
            <CircularProgress />
          ) : (
            <Modules setModuleToDelete={setModuleToDelete} />
          )}
        </Grid>
      </>
    </LayoutContainer>
  );
}
