import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import AdminLayout from "components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { ModuleAccordian } from "components/Modules/ModuleAccordion";
import { ModuleDialog } from "components/Modules/ModuleDialog";
// import { DeleteDialog } from "src/pages/modules/components";
import { ModulesSnackbar } from "components/Modules/ModulesSnackbar";
// import { GradingDialog } from "../grading/components/GradingDialog";
import { requestModules, openCreateDialog } from "components/Modules/ModulesSlice";
import { Routes } from "constants/navigationRoutes";
import { IAdminModule, NullModule } from "components/Modules/types";
import { IProblemBase } from "src/shared/types";
import { rolesEnum } from "components/Accounts/types";
import { RootState } from "lib/store/store";
import { useRouter } from "next/router";

// const EmptyProblem: IProblemBase = { title: "" };

const ModulesPage = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const loginState = useSelector((state: RootState) => state.login);
  const modulesState = useSelector((state: RootState) => state.modules);

  // Module to delete - hooks

  const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
  const onDeleteDialogClose = () => setConfirmDelete(false);

  const [toDelete, setToDelete] = React.useState<IAdminModule>(NullModule);
  const setModuleToDelete = (module: IAdminModule) => {
    setConfirmDelete(true);
    setToDelete(module);
  };

  // Problem to grade - hooks

  // const [grading, setGrading] = React.useState<boolean>(false);
  // const onGradingDialogClose = () => setGrading(false);

  // const [toGrade, setToGrade] = React.useState<IProblemBase>(EmptyProblem);
  // const setProblemToGrade = (problem: IProblemBase) => {
  //   setGrading(true);
  //   setToGrade(problem);
  // };

  const ProfessorHeaderButtons = [
    {
      label: "Manage Accounts",
      onClick: () => router.push(Routes.Accounts),
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
    <AdminLayout pageTitle={"Modules"} actionButtons={HeaderButtons}>
      <>
        <ModuleDialog />

        {/* <DeleteDialog
          open={confirmDelete}
          handleClose={onDeleteDialogClose}
          toDelete={toDelete}
        /> */}
        {/* <GradingDialog
          open={grading}
          problem={toGrade}
          handleClose={onGradingDialogClose}
        /> */}

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
            <ModuleAccordian
              setModuleToDelete={setModuleToDelete}
              setProblemToGrade={() => {}}
            />
          )}
        </Grid>
      </>
    </AdminLayout>
  );
}

export default ModulesPage;