import React from "react";
import {
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore, Add, Edit, AssignmentTurnedIn } from "@mui/icons-material";
import { useHistory } from "react-router";
import { useAppSelector } from "../../../app/common/hooks";
import { ModuleMenu } from "./";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { IAdminModule } from "../types";

const Module = styled(Accordion)({
  width: "100%",
});

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

const ProblemTitle = styled(Typography)({
  marginTop: "auto",
  marginBottom: "auto",
});

const NewProblemButton = styled(Button)(({ theme }) => ({
  marginLeft: "auto",
  marginRight: theme.spacing(1),
  color: grey["A700"],
}));

const ButtonContainer = styled("div")({
  marginLeft: "auto",
});

const ProblemAction = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: grey["A700"],
}));

interface moduleProps {
  setModuleToDelete: (module: IAdminModule) => void;
}

export function Modules({ setModuleToDelete }: moduleProps) {
  const history = useHistory();
  const modulesState = useAppSelector((state) => state.modules);

  return (
    <>
      {modulesState.modules.length > 0 ? (
        <>
          {modulesState.modules.map((module, i) => {
            return (
              <Module key={module._id} disableGutters>
                <ModuleSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">
                    Module {module.number}: {module.name}
                  </Typography>
                  <ModuleMenu
                    module={module}
                    setModuleToDelete={setModuleToDelete}
                  />

                  <NewProblemButton startIcon={<Add />}>
                    Add Problem
                  </NewProblemButton>
                </ModuleSummary>

                {module.problems.map((problem, i) => (
                  <ModuleContent key={i}>
                    <ProblemTitle>
                      Problem {i + 1}: {problem.title}
                    </ProblemTitle>

                    <ButtonContainer>
                      <ProblemAction
                        startIcon={<AssignmentTurnedIn />}
                        size="small"
                      >
                        Grade
                      </ProblemAction>

                      <ProblemAction
                        startIcon={<Edit />}
                        size="small"
                        onClick={() => {
                          history.push("/problem/edit/" + problem._id);
                        }}
                      >
                        Edit
                      </ProblemAction>
                    </ButtonContainer>
                  </ModuleContent>
                ))}
              </Module>
            );
          })}
        </>
      ) : (
        // Needs to say something else when getting modules failed
        // and allow user to retry
        <Typography variant="h6">Click Add Modules to get started</Typography>
      )}
    </>
  );
}
