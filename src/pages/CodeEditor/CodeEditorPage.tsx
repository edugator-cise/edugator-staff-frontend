import React, { useEffect } from "react";
import { CodeLayoutContainer } from "../../shared/CodeLayoutContainer";
import { Sidenav } from "./SideNav";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { requestModulesAndProblems } from "./CodeEditorSlice";
import { Grid, Paper, CircularProgress, Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ProblemView } from "./CodeEditorContainer/ProblemView";
import { CodeEditorView } from "./CodeEditorContainer/CodeEditorView";
import { InputOutputView } from "./CodeEditorContainer/InputOutputView";
import { EmptyState } from "./CodeEditorContainer/EmptyState";
import { problemEditorContainerSlice } from "../ProblemEditor/ProblemEditorContainer/problemEditorContainerSlice";
export const CodeEditorPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.codeEditor.isLoading
  );
  const currentProblem = useSelector(
    (state: RootState) => state.codeEditor.currentProblem
  );
  useEffect(() => {
    console.log("Reload Code Editor");
    dispatch(requestModulesAndProblems(true));
  }, [dispatch]);
  if (isLoading) {
    return (
      <CodeLayoutContainer>
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          <Box minHeight="20vh" />
          <CircularProgress />
        </Grid>
      </CodeLayoutContainer>
    );
  } else {
    return (
      <CodeLayoutContainer>
        <Grid container spacing={0} sx={{ height: "calc(100vh - 64px)" }}>
          <Grid item xs={12} md={2}>
            <Sidenav />
          </Grid>

          <Grid container item xs={12} md={10} spacing={2}>
            {currentProblem === undefined ? (
              <EmptyState />
            ) : (
              <>
                <Grid item xs={12} md={4}>
                  <ProblemView
                    problemTitle={currentProblem.title}
                    problemStatement={currentProblem.statement}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Stack spacing={2} sx={{ margin: 2 }}>
                    <CodeEditorView
                      code={currentProblem.code.body}
                      templatePackage={currentProblem.templatePackage}
                    />
                    <InputOutputView />
                  </Stack>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </CodeLayoutContainer>
    );
  }
};
