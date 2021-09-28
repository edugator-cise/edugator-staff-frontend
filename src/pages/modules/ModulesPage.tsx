import React from "react";
import {
  Button,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { ExpandMore, Edit, AssignmentTurnedIn } from "@mui/icons-material";
import { NewModuleDialog, ModuleMenu /*ProblemButtons*/ } from "./components";
import { LayoutContainer } from "../../shared/LayoutContainer";
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

const ButtonContainer = styled("div")(({ theme }) => ({
  marginLeft: "auto",
}));

const ProblemAction = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: grey["A700"],
}));

interface INewModule {
  nameInput: string;
  numberInput: number;
}

export default function Modules() {
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
      <div>
        <NewModuleDialog
          open={newModuleDialog}
          handleSubmit={handleNewModule}
          handleClose={handleDialogClose}
        />

        {modulesState.modules.length > 0 ? (
          modulesState.modules.map((module, i) => {
            return (
              <Accordion key={i}>
                <ModuleSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">
                    Module {module.number}: {module.name}
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
          <Typography variant="h6">Click Add Modules to get started</Typography>
        )}
      </div>
    </LayoutContainer>
  );
}
