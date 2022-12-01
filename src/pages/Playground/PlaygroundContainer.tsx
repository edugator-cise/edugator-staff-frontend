import React, { useEffect, useState } from "react";
import { Sidenav } from "../CodeEditor/SideNav";
import VerticalNavigation from "../../shared/VerticalNavigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
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
import { useCodeEditorStore } from "../../stores/CodeEditor/codeEditorStore";

interface ProblemEditorURL {
  problemId?: string;
  lessonId?: string;
}

interface ProblemLocationState {
  moduleName?: string;
}

const PlaygroundContainer = () => {
  const {
    isLoading,
    navStructure,
    requestModulesAndProblems,
    requestProblem,
    requestFirstProblemFromModule,
    requestLesson,
  } = useCodeEditorStore();

  const [isHidden, setIsHidden] = useState(false);
  const [contentType, setContentType] = useState<"problem" | "lesson" | "">(
    "problem"
  );

  const params = useParams<ProblemEditorURL>();
  const locationState = useLocation<ProblemLocationState>();
  const location = locationState.state;

  useEffect(() => {
    requestModulesAndProblems({
      isAdmin: adminPathRegex.test(locationState.pathname),
    });
  }, []);

  useEffect(() => {
    if (params && params["problemId"]) {
      setContentType("problem");
      requestProblem(
        params["problemId"],
        adminPathRegex.test(locationState.pathname)
      );
    } else if (params && params["lessonId"]) {
      setContentType("lesson");
      requestLesson(params["lessonId"]);
      console.log("lessonId", params["lessonId"]);
    }
    //disable exhaustive dependencies
    //eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    if (
      location &&
      location["moduleName"] !== undefined &&
      navStructure &&
      navStructure.length > 0
    ) {
      requestFirstProblemFromModule(
        navStructure,
        location["moduleName"],
        adminPathRegex.test(locationState.pathname)
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
          <VerticalNavigation light={true} codingPage={true} />
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
