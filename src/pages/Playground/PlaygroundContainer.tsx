import React, { useEffect, useState } from "react";
import { Sidenav } from "../CodeEditor/SideNav";
import {
  requestFirstProblemFromModule,
  requestLesson,
  requestProblem,
  setRunCodeError,
} from "../CodeEditor/CodeEditorSlice";
import VerticalNavigation from "../../shared/VerticalNavigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { requestModulesAndProblems } from "../CodeEditor/CodeEditorSlice";
import { Grid, CircularProgress, Box, Alert, Grow } from "@mui/material";
import { ProblemView } from "../CodeEditor/CodeEditorContainer/ProblemView";
import { CodeEditorView } from "../CodeEditor/CodeEditorContainer/CodeEditorView";
import { InputOutputView } from "../CodeEditor/CodeEditorContainer/InputOutputView";
import { EmptyState } from "../CodeEditor/CodeEditorContainer/EmptyState";
import { adminPathRegex, colors } from "../../shared/constants";
import { useParams, useLocation } from "react-router-dom";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import TopicSidebar from "../../shared/TopicSidebar";
import { CodeEditorPage } from "../CodeEditor/CodeEditorPage";
import LearnPage from "../LearnPage/LearnPage";

interface ProblemEditorURL {
  problemId?: string;
  lessonId?: string;
}

interface ProblemLocationState {
  moduleName?: string;
}

const PlaygroundContainer = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [contentType, setContentType] = useState<"problem" | "lesson" | "">(
    "problem"
  );

  const params = useParams<ProblemEditorURL>();
  const locationState = useLocation<ProblemLocationState>();
  const location = locationState.state;
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state: RootState) => state.codeEditor.isLoading
  );

  const modules = useSelector((state: RootState) => {
    const sortedModules = state.codeEditor.navStructure;
    return sortedModules.map((value) => value.name);
  });

  const navigation = useSelector(
    (state: RootState) => state.codeEditor.navStructure
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
      setContentType("problem");
      dispatch(
        requestProblem({
          problemId: params["problemId"],
          isAdmin: adminPathRegex.test(locationState.pathname),
        })
      );
    } else if (params && params["lessonId"]) {
      setContentType("lesson");
      dispatch(
        requestLesson({
          lessonId: params["lessonId"],
        })
      );
      console.log("lessonId", params["lessonId"]);
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
        <TopicSidebar isHidden={isHidden} setIsHidden={setIsHidden} />

        <Box sx={{ height: "100%", width: "100%" }}>
          <VerticalNavigation
            light={true}
            modules={modules}
            codingPage={true}
          />
          <Box
            sx={{
              height: "100%",
              width: "100%",
              m: 0,
              display: "flex",
            }}
          >
            <Sidenav isHidden={isHidden} />
            {contentType === "problem" ? (
              <CodeEditorPage />
            ) : contentType === "lesson" ? (
              <LearnPage />
            ) : (
              <EmptyState />
            )}
          </Box>
        </Box>
      </Box>
    );
  }
};

export default PlaygroundContainer;
