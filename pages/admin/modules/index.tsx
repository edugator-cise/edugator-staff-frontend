import { useState, useEffect } from "react";
import { CircularProgress, Grid } from "@mui/material";
import AdminLayout from "components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { ModuleAccordian } from "components/Modules/ModuleAccordion";
import { ModuleDialog } from "components/Modules/ModuleDialog";
import { DeleteDialog } from "components/Modules/DeleteDialog";
import { openCreateDialog, requestModulesSuccess } from "state/ModulesSlice";
import { Routes } from "constants/navigationRoutes";
import { IAdminModule, NullModule } from "components/Modules/types";
import { rolesEnum } from "components/Accounts/types";
import { RootState } from "lib/store/store";
import { useRouter } from "next/router";
import { FetchStatus } from "hooks/types";
import apiClient from "lib/api/apiClient";
import { apiRoutes } from "constants/apiRoutes";
import toast from "react-hot-toast";
import { LocalStorage } from "lib/auth/LocalStorage";

const ModulesPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.login);
  // Module to delete - hooks

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const onDeleteDialogClose = () => setConfirmDelete(false);

  const [toDelete, setToDelete] = useState<IAdminModule>(NullModule);
  const setModuleToDelete = (module: IAdminModule) => {
    setConfirmDelete(true);
    setToDelete(module);
  };

  const [status, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  // Problem to grade - hooks

  const ProfessorHeaderButtons = [
    {
      label: "Go To Code Editor",
      onClick: () => router.push(Routes.Code),
      variant: "outlined",
    },
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
      label: "Go To Code Editor",
      onClick: () => router.push(Routes.Code),
      variant: "outlined",
    },
    {
      label: "Add Module",
      onClick: () => dispatch(openCreateDialog()),
      variant: "contained",
    },
  ];

  const HeaderButtons =
    loginState.role === rolesEnum.Professor && LocalStorage.getToken()
      ? ProfessorHeaderButtons
      : moduleHeaderButtons;

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: IAdminModule[] } = await apiClient.get(
        apiRoutes.admin.getNavigation
      );
      return data;
    };

    fetchData()
      .then((values) => {
        dispatch(requestModulesSuccess(values));
        setStatus(FetchStatus.succeed);
      })
      .catch((e) => {
        toast.error(e.message);
        //dispatch(setRunningSubmission(false));
        setStatus(FetchStatus.failed);
      });
  }, []);

  return (
    <AdminLayout pageTitle={"Modules"} actionButtons={HeaderButtons}>
      <>
        <ModuleDialog />

        <DeleteDialog
          open={confirmDelete}
          handleClose={onDeleteDialogClose}
          toDelete={toDelete}
        />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {status === FetchStatus.loading ? (
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
};

export default ModulesPage;
