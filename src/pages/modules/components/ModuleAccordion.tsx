import React from "react";
import {
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore, Add } from "@mui/icons-material";
import { useAppSelector } from "../../../app/common/hooks";
import { ModuleMenu, ProblemButtons } from "./";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

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

export function Modules() {
  const modulesState = useAppSelector((state) => state.modules);

  return (
    <>
      {modulesState.modules.length > 0 ? (
        <>
          {modulesState.modules.map((module, i) => {
            return (
              <Module key={i} disableGutters>
                <ModuleSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">
                    Module {module.number}: {module.name}
                  </Typography>
                  <ModuleMenu />

                  <NewProblemButton startIcon={<Add />}>
                    Add Problem
                  </NewProblemButton>
                </ModuleSummary>

                {module.problems.map((problem, i) => (
                  <ModuleContent key={i}>
                    <ProblemTitle>
                      Problem {i + 1}: {problem.title}
                    </ProblemTitle>

                    <ProblemButtons />
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
