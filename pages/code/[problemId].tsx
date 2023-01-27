import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { adminPathRegex } from "constants/config";
import PlaygroundLayout from "components/PlaygroundLayout";
import { setRunCodeError } from "components/CodeEditor/CodeEditorSlice";
import {
  Grid,
  CircularProgress,
  Box,
  Alert,
  Grow,
  Typography,
} from "@mui/material";
import { ProblemView } from "components/CodeEditor/CodeEditorContainer/ProblemView";
import { CodeEditorView } from "components/CodeEditor/CodeEditorContainer/CodeEditorView";
import { InputOutputView } from "components/CodeEditor/CodeEditorContainer/InputOutputView";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useFetchProblem } from "hooks/useFetchProblem";
import { FetchStatus } from "hooks/types";
import { useRunCode } from "hooks/useRunCode";

export default function CodeEditor() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = router.query;
  const locationState = router.asPath;

  const [stdin, setStdin] = useState<string>("");

  const {
    compilerOutput,
    isAcceptedOutput,
    runCode,
    isSubmissionRunning,
    submissionOutput,
    submitCode,
    activeTab,
    setActiveTab,
  } = useRunCode(locationState);

  const {
    status,
    problem: currentProblem,
    stdin: defaultStdin,
    error,
  } = useFetchProblem({
    id: params && params.problemId ? (params.problemId as string) : "",
    isAdmin: adminPathRegex.test(locationState),
  });

  useEffect(() => {
    if (defaultStdin) {
      setStdin(defaultStdin);
    }
  }, [defaultStdin]);

  return (
    <>
      {error && (
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
            {error.message}
          </Alert>
        </Grow>
      )}
      {status === FetchStatus.loading ? (
        <Grid container direction="column" sx={{ height: "100vh" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        </Grid>
      ) : currentProblem === undefined ? (
        <Grid container direction="column" sx={{ height: "100vh" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Problem not found</Typography>
          </Box>
        </Grid>
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
                  isSubmissionRunning={isSubmissionRunning}
                  runCode={runCode}
                  submitCode={submitCode}
                  code={currentProblem.code.body}
                  templatePackage={currentProblem.templatePackage}
                  currentProblem={currentProblem}
                  stdin={stdin}
                />
              </Allotment.Pane>
              <Allotment.Pane minSize={100}>
                <InputOutputView
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  submissionOutput={submissionOutput}
                  stdin={stdin}
                  setStdin={setStdin}
                  compilerOutput={compilerOutput}
                  isAcceptedOutput={isAcceptedOutput}
                />
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
