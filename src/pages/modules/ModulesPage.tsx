import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppDispatch, useAppSelector } from "../../app/common/hooks";
import { requestModules } from "./ModulesPage.slice";
import { ModuleDialog, Modules, ModulesSnackbar } from "./components";
import { INewModule, DialogStatus } from "../../shared/types";

export function ModulesPage() {
  const [moduleDialog, setModuleDialog] = React.useState(DialogStatus.CLOSED);
  const [moduleInput, setModuleInput] = React.useState<INewModule>({
    numberInput: 0,
    nameInput: "",
  });

  const dispatch = useAppDispatch();
  const modulesState = useAppSelector((state) => state.modules);

  const handleDialogClose = () => {
    setModuleDialog(DialogStatus.CLOSED);
  };

  const moduleHeaderButtons = [
    {
      label: "Add Module",
      onClick: () => {
        setModuleDialog(DialogStatus.CREATE);
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
          moduleValues={moduleInput}
          dialogOperation={moduleDialog}
          handleClose={handleDialogClose}
          moduleValuesInput={setModuleInput}
          open={moduleDialog !== DialogStatus.CLOSED}
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
