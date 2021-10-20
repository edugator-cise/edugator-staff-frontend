import React, { useEffect } from "react";
import { CodeLayoutContainer } from "./CodeLayoutContainer";
import { Sidenav } from "./SideNav";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { requestModulesAndProblems } from "./CodeEditorSlice";
import { Grid, CircularProgress, Box, Container } from "@mui/material";
import { ProblemView } from "./CodeEditorContainer/ProblemView";
import { CodeEditorView } from "./CodeEditorContainer/CodeEditorView";
import { InputOutputView } from "./CodeEditorContainer/InputOutputView";
import { EmptyState } from "./CodeEditorContainer/EmptyState";
export const CodeEditorPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.codeEditor.isLoading
  );
  const currentProblem = useSelector(
    (state: RootState) => state.codeEditor.currentProblem
  );
  useEffect(() => {
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
          sx={{ height: "calc(100vh-64px)" }}
        >
          <Box>
            <CircularProgress />
          </Box>
        </Grid>
      </CodeLayoutContainer>
    );
  } else {
    return (
      <CodeLayoutContainer>
        <Box
          sx={{
            height: "calc(100vh - 64px)",
            m: 0,
            display: "flex",
            flex: "1 1 auto",
          }}
        >
          <Box sx={{ height: "100%", width: 56, backgroundColor: "#2340a5" }} />
          <Box sx={{ height: "100%", width: 216, backgroundColor: "#ffffff" }}>
            <Sidenav />
          </Box>
          <Grid
            container
            xs={12}
            md={10}
            spacing={2}
            sx={{ margin: 0, padding: 0, height: "100%", maxWidth: "100%" }}
          >
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
                  <Container
                    disableGutters
                    sx={{ flexDirection: "column", pt: 2 }}
                  >
                    <CodeEditorView
                      code={currentProblem.code.body}
                      templatePackage={currentProblem.templatePackage}
                    />
                    <InputOutputView />
                  </Container>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </CodeLayoutContainer>
    );
  }
};
