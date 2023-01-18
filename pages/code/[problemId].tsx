import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/common/store";
import { requestProblem } from "components/CodeEditor/CodeEditorSlice";
import { adminPathRegex } from "src/shared/constants";
import PlaygroundLayout from "components/PlaygroundLayout";
import { setRunCodeError } from "components/CodeEditor/CodeEditorSlice";
import { Grid, CircularProgress, Box, Alert, Grow } from "@mui/material";
import { ProblemView } from "components/CodeEditor/CodeEditorContainer/ProblemView";
import { CodeEditorView } from "components/CodeEditor/CodeEditorContainer/CodeEditorView";
import { InputOutputView } from "components/CodeEditor/CodeEditorContainer/InputOutputView";
import { EmptyState } from "components/CodeEditor/CodeEditorContainer/EmptyState";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

export default function CodeEditor() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = router.query;
  const locationState = router.asPath;

  const currentProblem = useSelector(
    (state: RootState) => state.codeEditor.currentProblem
  );
  const errorMessage = useSelector(
    (state: RootState) => state.codeEditor.runCodeError
  );
  const isLoadingProblem = useSelector(
    (state: RootState) => state.codeEditor.isLoadingProblem
  );

  useEffect(() => {
    if (params && params.problemId) {
      dispatch(
        requestProblem({
          problemId: params.problemId as string,
          isAdmin: adminPathRegex.test(locationState),
        })
      );
    }
    //disable exhaustive dependencies
    //eslint-disable-next-line
  }, [params]);

  return (
    <>
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
              dispatch(setRunCodeError({ hasError: false, errorMessage: "" }));
            }}
          >
            {errorMessage.errorMessage}
          </Alert>
        </Grow>
      )}
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
    </>
  );
}

CodeEditor.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};
