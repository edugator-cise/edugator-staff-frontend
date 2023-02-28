import React, {
  ComponentType,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { adminPathRegex } from "constants/config";
import PlaygroundLayout from "components/PlaygroundLayout";
import {
  Grid,
  CircularProgress,
  Box,
  Alert,
  Grow,
  Typography,
} from "@mui/material";
import { ProblemView } from "components/CodeEditor/CodeEditorContainer/ProblemView";
import { CodeEditorView } from "components/CodeEditor/CodeEditorContainer/CodeEditorView/CodeEditorView";
import { InputOutputView } from "components/CodeEditor/CodeEditorContainer/InputOutputView/InputOutputView";
import "allotment/dist/style.css";
import { useFetchProblem } from "hooks/useFetchProblem";
import { FetchStatus } from "hooks/types";
import { useRunCode } from "hooks/useRunCode";
import dynamic from "next/dynamic";
import { LocalStorage } from "lib/auth/LocalStorage";
import { AllotmentProps } from "allotment";

const Allotment = dynamic<AllotmentProps>(
  () => import("allotment").then((mod) => mod.Allotment),
  { ssr: false }
);

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
    isAdmin: LocalStorage.getToken() !== null,
  });

  useEffect(() => {
    if (defaultStdin) {
      setStdin(defaultStdin);
    }
  }, [defaultStdin]);

  return (
    <>
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
        <Allotment sizes={[310, 350]} snap={true} minSize={460}>
          <ProblemView
            problemTitle={currentProblem?.title}
            problemStatement={currentProblem?.statement}
          />
          <Allotment sizes={[100, 100]} vertical snap={false} minSize={400}>
            <CodeEditorView
              isSubmissionRunning={isSubmissionRunning}
              runCode={runCode}
              submitCode={submitCode}
              code={currentProblem.code?.body}
              templatePackage={currentProblem?.templatePackage}
              currentProblem={currentProblem}
              stdin={stdin}
            />
            <InputOutputView
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              submissionOutput={submissionOutput}
              stdin={stdin}
              setStdin={setStdin}
              compilerOutput={compilerOutput}
              isAcceptedOutput={isAcceptedOutput}
            />
          </Allotment>
        </Allotment>
      )}
    </>
  );
}

CodeEditor.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};
