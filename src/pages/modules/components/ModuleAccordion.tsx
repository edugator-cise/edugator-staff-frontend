import React from "react";
import {
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ExpandMore, Add, Edit, AssignmentTurnedIn } from "@mui/icons-material";
import { useHistory } from "react-router";
import { useAppSelector } from "../../../app/common/hooks";
import { IAdminModule } from "../types";
import { ModuleMenu } from "./";

const ModuleContent = styled(AccordionDetails)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginTop: "auto",
  marginBottom: "auto",
  padding: theme.spacing(0.5),
}));

const NewProblemButton = styled(Button)(({ theme }) => ({
  marginLeft: "auto",
  marginRight: theme.spacing(1),
  color: "black",
  backgroundColor: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ButtonContainer = styled("div")({
  marginLeft: "auto",
});

const ProblemAction = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: "black",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

interface moduleProps {
  setModuleToDelete: (module: IAdminModule) => void;
  setProblemToGrade: (problem_ID: string) => void;
}

export function Modules({ setModuleToDelete, setProblemToGrade }: moduleProps) {
  const history = useHistory();
  const modulesState = useAppSelector((state) => state.modules);

  return (
    <>
      {modulesState.modules.length > 0 ? (
        <>
          {modulesState.modules.map((module) => {
            return (
              <Accordion key={module._id} disableGutters>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Title variant="h6">
                    Module {module.number}: {module.name}
                  </Title>

                  <ModuleMenu
                    module={module}
                    setModuleToDelete={setModuleToDelete}
                  />

                  <NewProblemButton startIcon={<Add />} variant="outlined">
                    Add Problem
                  </NewProblemButton>
                </AccordionSummary>

                {module.problems.map((problem, i) => (
                  <ModuleContent key={i}>
                    <Title>
                      <b>
                        Problem {module.number}.{i + 1}:
                      </b>
                      {` ${problem.title}`}
                    </Title>

                    <ButtonContainer>
                      <ProblemAction
                        startIcon={<AssignmentTurnedIn />}
                        size="small"
                        onClick={() => {
                          setProblemToGrade(problem._id ?? "Error: no ID");
                        }}
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
              </Accordion>
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
