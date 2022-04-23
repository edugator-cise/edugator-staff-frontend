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
import { useAppSelector } from "../../../app/common/hooks";
import { Routes } from "../../../shared/Routes.constants";
import { IProblemBase } from "../../../shared/types";
import { IAdminModule } from "../types";
import { useHistory } from "react-router-dom";
import { ModuleMenu } from "./";

const Module = styled(Accordion)(({ theme }) => ({
  position: "inherit",
  borderRadius: theme.spacing(0.5),
  "& .Mui-expanded": {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

const ModuleTitle = styled(AccordionSummary)({
  borderRadius: "inherit",
});

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
  marginRight: "none",
  color: "black",
  backgroundColor: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const NewContentButton = styled(Button)(({ theme }) => ({
  marginLeft: 10,
  marginRight: "none",
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
  const history = useHistory();
  const modulesState = useAppSelector((state) => state.modules);

  return (
    <>
      {modulesState.modules.length > 0 ? (
        <>
          {modulesState.modules.map((module) => {
            return (
              <Module key={module._id} disableGutters>
                <ModuleTitle expandIcon={<ExpandMore />}>
                  <ModuleMenu
                    module={module}
                    setModuleToDelete={setModuleToDelete}
                  />

                  <Title variant="h6">
                    Module {module.number}: {module.name}
                  </Title>

                  <NewProblemButton
                    startIcon={<Add />}
                    variant="outlined"
                    onClick={(event) => {
                      event.stopPropagation();
                      history.push(
                        Routes.ProblemCreatorBaseWithoutId + module._id,
                        { moduleName: module.name }
                      );
                    }}
                  >
                    Add Problem
                  </NewProblemButton>

                  <NewContentButton
                    startIcon={<Add />}
                    variant="outlined"
                    onClick={(event) => {
                      event.stopPropagation();
                      history.push(
                        Routes.ContentCreatorBaseWithoutId + module._id,
                        { moduleName: module.name }
                      );
                    }}
                  >
                    Add Content
                  </NewContentButton>
                </ModuleTitle>

                {module.problems.length > 0 ? (
                  <>
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
                            onClick={() => {
                              history.push(
                                Routes.ProblemEditorBaseWithoutId + problem._id,
                                { moduleName: module.name }
                              );
                            }}
                          >
                            Edit
                          </ProblemAction>
                        </ButtonContainer>
                      </ModuleContent>
                    ))}
                  </>
                ) : (
                  <ModuleContent>
                    <Title>
                      There are no problems for this module. Click add problem
                      to begin.
                    </Title>
                  </ModuleContent>
                )}
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
