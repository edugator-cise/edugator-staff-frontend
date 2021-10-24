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
import { GradingDialog } from "../grading/components/GradingDialog";
import { requestModules, openCreateDialog } from "./ModulesPage.slice";
import { IAdminModule, EmptyModule } from "./types";

export function ModulesPage() {
  const dispatch = useAppDispatch();
  const modulesState = useAppSelector((state) => state.modules);

  // Module to delete - hooks

  const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
  const onDeleteDialogClose = () => {
    setConfirmDelete(false);
  };

  const [toDelete, setToDelete] = React.useState<IAdminModule>(EmptyModule);
  const setModuleToDelete = (module: IAdminModule) => {
    setConfirmDelete(true);
    setToDelete(module);
  };

  // Problem to grade - hooks

  const [grading, setGrading] = React.useState<boolean>(false);
  const onGradingDialogClose = () => {
    setGrading(false);
  };

  const [toGrade, setToGrade] = React.useState<string>("");
  const setProblemToGrade = (problemID: string) => {
    setGrading(true);
    setToGrade(problemID);
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
          handleClose={onDeleteDialogClose}
          toDelete={toDelete}
        />
        <GradingDialog
          open={grading}
          problem_id={toGrade}
          handleClose={onGradingDialogClose}
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
            <Modules
              setModuleToDelete={setModuleToDelete}
              setProblemToGrade={setProblemToGrade}
            />
          )}
        </Grid>
      </>
    </LayoutContainer>
  );
}
