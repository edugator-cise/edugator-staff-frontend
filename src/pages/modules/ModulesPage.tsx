import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppDispatch, useAppSelector } from "../../app/common/hooks";
import { requestModules, requestNewModule } from "./ModulesPage.slice";
import { NewModuleDialog, Modules } from "./components";

interface INewModule {
  nameInput: string;
  numberInput: number;
}

export function ModulesPage() {
  const dispatch = useAppDispatch();
  const modulesState = useAppSelector((state) => state.modules);

  const [newModuleDialog, setNewModuleDialog] = React.useState(false);
  const handleDialogClose = () => {
    setNewModuleDialog(false);
  };

  const handleNewModule = (moduleInput: INewModule) => {
    setNewModuleDialog(false);
    dispatch(
      requestNewModule({
        moduleName: moduleInput.nameInput,
        moduleNum: moduleInput.numberInput,
      })
    );
  };

  const moduleButtons = [
    {
      label: "Add Module",
      onClick: () => {
        setNewModuleDialog(true);
      },
    },
  ];

  React.useEffect(() => {
    dispatch(requestModules());
  }, [dispatch]);

  return (
    <LayoutContainer pageTitle={"Modules"} actionButtons={moduleButtons}>
      <>
        <NewModuleDialog
          open={newModuleDialog}
          handleSubmit={handleNewModule}
          handleClose={handleDialogClose}
        />

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
