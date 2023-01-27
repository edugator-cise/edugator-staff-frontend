import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks";
import {
  Modules,
  ModuleDialog,
  DeleteDialog,
  ModulesSnackbar,
} from "./components";
import { GradingDialog } from "../grading/components/GradingDialog";
import { requestModules, openCreateDialog } from "./ModulesPage.slice";
import { Routes } from "constants/navigationRoutes";
import { IAdminModule, NullModule } from "./types";
import { IProblemBase } from "../../shared/types";
import { rolesEnum } from "../accounts/types";
import { useHistory } from "react-router-dom";

const EmptyProblem: IProblemBase = { title: "" };

export function ModulesPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const loginState = useAppSelector((state) => state.login);
  const modulesState = useAppSelector((state) => state.modules);

  // Module to delete - hooks

  const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
  const onDeleteDialogClose = () => setConfirmDelete(false);

  const [toDelete, setToDelete] = React.useState<IAdminModule>(NullModule);
  const setModuleToDelete = (module: IAdminModule) => {
    setConfirmDelete(true);
    setToDelete(module);
  };

  // Problem to grade - hooks

  const [grading, setGrading] = React.useState<boolean>(false);
  const onGradingDialogClose = () => setGrading(false);

  const [toGrade, setToGrade] = React.useState<IProblemBase>(EmptyProblem);
  const setProblemToGrade = (problem: IProblemBase) => {
    setGrading(true);
    setToGrade(problem);
  };

  const ProfessorHeaderButtons = [
    {
      label: "Manage Accounts",
      onClick: () => history.push(Routes.Accounts),
      variant: "outlined",
    },
    {
      label: "Add Module",
      onClick: () => dispatch(openCreateDialog()),
      variant: "contained",
    },
  ];

  const moduleHeaderButtons = [
    {
      label: "Add Module",
      onClick: () => dispatch(openCreateDialog()),
      variant: "contained",
    },
  ];

  const HeaderButtons =
    loginState.role === rolesEnum.Professor && loginState.loggedIn
      ? ProfessorHeaderButtons
      : moduleHeaderButtons;

  React.useEffect(() => {
    dispatch(requestModules());
  }, [dispatch]);

  return (
    <LayoutContainer pageTitle={"Modules"} actionButtons={HeaderButtons}>
      <>
        <ModuleDialog />

        <DeleteDialog
          open={confirmDelete}
          handleClose={onDeleteDialogClose}
          toDelete={toDelete}
        />
        <GradingDialog
          open={grading}
          problem={toGrade}
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
