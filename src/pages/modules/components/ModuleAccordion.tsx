import React from "react";
import {
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore, Add, Edit, AssignmentTurnedIn } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../../app/common/hooks";
import { IProblemBase } from "../../../shared/types";
import { IAdminModule } from "../types";
import { ModuleMenu } from "./";
import { Routes } from "../../../shared/Routes.constants";
import { Link } from "react-router-dom";

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
  setProblemToGrade: (problem: IProblemBase) => void;
}

export function Modules({ setModuleToDelete, setProblemToGrade }: moduleProps) {
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
                  <NewProblemButton
                    startIcon={<Add />}
                    variant="outlined"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Link
                      to={{
                        pathname:
                          Routes.ProblemCreatorBaseWithoutId + module._id,
                        state: { moduleName: module.name },
                      }}
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      Add Problem
                    </Link>
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
                        variant="outlined"
                        onClick={() => {
                          let toGrade: IProblemBase = {
                            _id: problem._id,
                            title: problem.title,
                          };
                          setProblemToGrade(toGrade);
                        }}
                      >
                        Grade
                      </ProblemAction>
                      <ProblemAction
                        startIcon={<Edit />}
                        size="small"
                        variant="outlined"
                      >
                        <Link
                          to={{
                            pathname:
                              Routes.ProblemEditorBaseWithoutId + problem._id,
                            state: { moduleName: module.name },
                          }}
                          style={{
                            color: "inherit",
                            textDecoration: "inherit",
                          }}
                        >
                          Edit
                        </Link>
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
