import React, { useEffect } from "react";
import { Sidenav } from "./SideNav";
import {
  requestFirstProblemFromModule,
  requestProblem,
  setRunCodeError,
} from "./CodeEditorSlice";
import VerticalNavigation from "../../shared/VerticalNavigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { requestModulesAndProblems } from "./CodeEditorSlice";
import {
  Grid,
  CircularProgress,
  Box,
  Container,
  Alert,
  Grow,
} from "@mui/material";
import { ProblemView } from "./CodeEditorContainer/ProblemView";
import { CodeEditorView } from "./CodeEditorContainer/CodeEditorView";
import { InputOutputView } from "./CodeEditorContainer/InputOutputView";
import { EmptyState } from "./CodeEditorContainer/EmptyState";
import { adminPathRegex, colors } from "../../shared/constants";
import { useParams, useLocation } from "react-router-dom";

interface ProblemEditorURL {
  problemId?: string;
}

interface ProblemLocationState {
  moduleName?: string;
}

export const CodeEditorPage = () => {
  const params = useParams<ProblemEditorURL>();
  const locationState = useLocation<ProblemLocationState>();
  const location = locationState.state;
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.codeEditor.isLoading
  );
  const currentProblem = useSelector(
    (state: RootState) => state.codeEditor.currentProblem
  );
  const errorMessage = useSelector(
    (state: RootState) => state.codeEditor.runCodeError
  );
  const modules = useSelector((state: RootState) => {
    const sortedModules = state.codeEditor.navStructure;
    return sortedModules.map((value) => value.name);
  });
  const navigation = useSelector(
    (state: RootState) => state.codeEditor.navStructure
  );
  const isLoadingProblem = useSelector(
    (state: RootState) => state.codeEditor.isLoadingProblem
  );
  useEffect(() => {
    dispatch(
      requestModulesAndProblems({
        isAdmin: adminPathRegex.test(locationState.pathname),
      })
    );
    //disable exhaustive dependencies
    //eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (params && params["problemId"]) {
      dispatch(
        requestProblem({
          problemId: params["problemId"],
          isAdmin: adminPathRegex.test(locationState.pathname),
        })
      );
    }
    //disable exhaustive dependencies
    //eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    if (
      location &&
      location["moduleName"] !== undefined &&
      navigation &&
      navigation.length > 0
    ) {
      dispatch(
        requestFirstProblemFromModule({
          navigation,
          moduleName: location["moduleName"],
          isAdmin: adminPathRegex.test(locationState.pathname),
        })
      );
    }
    //disable exhaustive dependencies
    //eslint-disable-next-line
  }, [location]);

  if (isLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Box>
          <CircularProgress />
        </Box>
      </Grid>
    );
  } else {
    return (
      <Box
        minHeight="100%"
        display="flex"
        flexDirection="column"
        sx={{ bgcolor: colors.lightGray }}
      >
        <VerticalNavigation light={false} modules={modules} />
        {errorMessage.hasError && (
          <Grow in timeout={500}>
            <Alert
              severity="error"
              sx={{
                position: "absolute",
                left: "0",
                right: "0",
                width: "50%",
                marginTop: 5,
                marginRight: "auto",
                marginLeft: "auto",
              }}
              onClose={() => {
                dispatch(
                  setRunCodeError({ hasError: false, errorMessage: "" })
                );
              }}
            >
              {errorMessage.errorMessage}
            </Alert>
          </Grow>
        )}
        <Box
          sx={{
            height: "calc(100vh - 64px)",
            m: 0,
            display: "flex",
            flex: "1 1 auto",
          }}
        >
          <Box sx={{ height: "100%", width: 56, backgroundColor: "#2340a5" }} />
          <Box sx={{ height: "100%", width: 216, backgroundColor: "white" }}>
            <Sidenav />
          </Box>
          <Grid
            container
            spacing={2}
            sx={{
              margin: 0,
              pr: 4,
              height: "100%",
              maxWidth: "100%",
              overflowY: "auto",
            }}
          >
            {isLoadingProblem ? (
              <Grid
                container
                justifyContent="center"
                direction="column"
                alignItems="center"
                sx={{ height: "100vh" }}
              >
                <Box>
                  <CircularProgress />
                </Box>
              </Grid>
            ) : currentProblem === undefined ? (
              <EmptyState />
            ) : (
              <>
                <Grid item xs={12} lg={4}>
                  <ProblemView
                    problemTitle={currentProblem.title}
                    problemStatement={currentProblem.statement}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={8}
                  container
                  direction="column"
                  sx={{ pt: 4 }}
                >
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
      </Box>
    );
  }
};
