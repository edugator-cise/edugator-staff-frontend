import React from "react";
import { Typography, CircularProgress } from "@mui/material";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppDispatch, useAppSelector } from "../../app/common/hooks";
import { requestModules, requestNewModule } from "./ModulesPage.slice";
import { styled } from "@mui/material/styles";
import { NewModuleDialog, Modules } from "./components";

const Centered = styled("div")({
  display: "flex",
  marginLeft: "auto",
  marginRight: "auto",
});

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

        {modulesState.isLoading ? (
          <Centered>
            <CircularProgress />
          </Centered>
        ) : modulesState.modules.length > 0 ? (
          <Modules></Modules>
        ) : (
          <Centered>
            <Typography variant="h6">
              Click Add Modules to get started
            </Typography>
          </Centered>
        )}
      </>
    </LayoutContainer>
  );
}
