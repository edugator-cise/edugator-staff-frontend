import React, { useEffect, useState } from "react";
import { Sidenav } from "components/CodeEditor/SideNav";
import {
  requestFirstProblemFromModule,
  requestLesson,
  requestProblem,
  requestModulesAndProblems,
} from "components/CodeEditor/CodeEditorSlice";
import VerticalNavigation from "src/shared/VerticalNavigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/common/store";
import { Grid, CircularProgress, Box, Alert, Grow } from "@mui/material";
import { EmptyState } from "components/CodeEditor/CodeEditorContainer/EmptyState";
import { adminPathRegex, colors } from "src/shared/constants";
import "allotment/dist/style.css";
import TopicSidebar from "src/shared/TopicSidebar";
import { CodeEditorPage } from "components/CodeEditor/CodeEditorPage";
import { useRouter } from "next/router";

interface ProblemEditorURL {
  problemId?: string;
  lessonId?: string;
}

interface ProblemLocationState {
  moduleName?: string;
}

const PlaygroundLayout = ({ children }: { children: React.ReactNode }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [contentType, setContentType] = useState<"problem" | "lesson" | "">(
    "problem"
  );

  const router = useRouter();

  const params = router.query;
  const locationState = router.asPath;
  const location = router.pathname;

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
        isAdmin: adminPathRegex.test(locationState),
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (
      location &&
      location !== undefined &&
      navigation &&
      navigation.length > 0
    ) {
      dispatch(
        requestFirstProblemFromModule({
          navigation,
          moduleName: location,
          isAdmin: adminPathRegex.test(locationState),
        })
      );
    }
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
            {children}
            {/* {contentType === "problem" ? (
              <CodeEditorPage />
            ) : contentType === "lesson" ? (
              <LearnPage />
            ) : (
              <EmptyState />
            )} */}
          </Box>
        </Box>
      </Box>
    );
  }
};

export default PlaygroundLayout;
