import React from "react";
import {
  Button,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { ExpandMore, Edit, AssignmentTurnedIn } from "@mui/icons-material";
import { NewModuleDialog, ModuleMenu /*ProblemButtons*/ } from "./components";
//import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppDispatch, useAppSelector } from "../../app/common/hooks";
import { requestModules, requestNewModule } from "./ModulesPage.slice";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const ModuleSummary = styled(AccordionSummary)({
  backgroundColor: "rgba(0, 0, 0, .1)", // background of module
  borderBottom: "1px solid rgba(0, 0, 0, .125)", // bottom line of module
});

const ModuleContent = styled(AccordionDetails)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  backgroundColor: "rgba(0, 0, 0, .02)",
  borderBottom: "1px solid rgba(0, 0, 0, .125)",
}));

const ProblemTitle = styled(Typography)(({ theme }) => ({
  marginTop: "auto",
  marginBottom: "auto",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
}));

const ProblemAction = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: grey["A700"],
}));

export default function Modules() {
  const dispatch = useAppDispatch();
  const modulesState = useAppSelector((state) => state.modules);

  const [newModuleDialog, setNewModuleDialog] = React.useState(false);
  const handleDialogClose = () => {
    setNewModuleDialog(false);
  };
  const handleNewModule = (nameInput: string) => {
    setNewModuleDialog(false);
    dispatch(requestNewModule({ moduleName: nameInput, moduleNum: 0 }));
  };
  /*
  const moduleButtons = [
    {
      label: "Add Module",
      onClick: () => {
        setNewModuleDialog(true);
      },
    },
  ];*/

  React.useEffect(() => {
    dispatch(requestModules());
  }, [dispatch]);

  return (
    <div>
      <NewModuleDialog
        open={newModuleDialog}
        handleSubmit={handleNewModule}
        handleClose={handleDialogClose}
      />

      <Button
        onClick={() => {
          setNewModuleDialog(true);
        }}
      >
        Add Module
      </Button>

      {modulesState.modules.length > 0 ? (
        modulesState.modules.map((module, i) => {
          return (
            <Accordion key={i}>
              <ModuleSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">
                  Module {i}: {module.name}
                </Typography>
                <ModuleMenu />
              </ModuleSummary>

              {[0, 1].map((value) => (
                <ModuleContent key={value}>
                  <ProblemTitle>Problem {value}</ProblemTitle>

                  <ButtonContainer>
                    <ProblemAction
                      //variant="contained"
                      startIcon={<AssignmentTurnedIn />}
                      size="small"
                    >
                      Grade
                    </ProblemAction>

                    <ProblemAction
                      //variant="contained"
                      startIcon={<Edit />}
                      size="small"
                    >
                      Edit
                    </ProblemAction>
                  </ButtonContainer>
                </ModuleContent>
              ))}
            </Accordion>
          );
        })
      ) : (
        <Typography variant="h6"> Click Add Modules to get started </Typography>
      )}
    </div>
  );
  /*
  return (
    <LayoutContainer pageTitle={"Modules"} actionButtons={moduleButtons}>
      content
    </LayoutContainer>
    
  );
  */
}
