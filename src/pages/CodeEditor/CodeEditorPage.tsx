import React, { useEffect, useState } from "react";
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
  Alert,
  Grow,
} from "@mui/material";
import { ProblemView } from "./CodeEditorContainer/ProblemView";
import { CodeEditorView } from "./CodeEditorContainer/CodeEditorView";
import { InputOutputView } from "./CodeEditorContainer/InputOutputView";
import { EmptyState } from "./CodeEditorContainer/EmptyState";
import { adminPathRegex, colors } from "../../shared/constants";
import { useParams, useLocation } from "react-router-dom";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import TopicSidebar from '../../shared/TopicSidebar'

interface ProblemEditorURL {
  problemId?: string;
}

interface ProblemLocationState {
  moduleName?: string;
}

export const CodeEditorPage = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
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
        height="100vh"
        display="flex"
        flexDirection="row"
        sx={{ bgcolor: colors.lightGray, overflow: "hidden" }}
      >
        <TopicSidebar hidden={isHidden} setHidden={setIsHidden}/>
          
        <Box sx={{ height: "100%", width: "100%" }}>
          <VerticalNavigation
            light={true}
            modules={modules}
            codingPage={true}
          />
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
                  zIndex: 300,
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
              height: "100%",
              width: "100%",
              m: 0,
              display: "flex",
            }}
          >
            <Sidenav hidden={isHidden} />
            {isLoadingProblem ? (
              <Grid container direction="column" sx={{ height: "100vh" }}>
                <Box>
                  <CircularProgress />
                </Box>
              </Grid>
            ) : currentProblem === undefined ? (
              <EmptyState />
            ) : (
              <Allotment snap={true}>
                <Allotment.Pane minSize={310}>
                  <ProblemView
                    problemTitle={currentProblem.title}
                    problemStatement={currentProblem.statement}
                  />
                </Allotment.Pane>
                <Allotment.Pane minSize={350}>
                  <Allotment vertical snap={false}>
                    <Allotment.Pane minSize={100}>
                      <CodeEditorView
                        code={currentProblem.code.body}
                        templatePackage={currentProblem.templatePackage}
                      />
                    </Allotment.Pane>
                    <Allotment.Pane minSize={100}>
                      <InputOutputView />
                    </Allotment.Pane>
                  </Allotment>
                </Allotment.Pane>
              </Allotment>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
};
