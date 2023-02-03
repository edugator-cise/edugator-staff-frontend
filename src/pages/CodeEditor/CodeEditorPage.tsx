import { useEffect } from "react";
import { setRunCodeError } from "./CodeEditorSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { Grid, CircularProgress, Box, Alert, Grow } from "@mui/material";
import { ProblemView } from "./CodeEditorContainer/ProblemView";
import { CodeEditorView } from "./CodeEditorContainer/CodeEditorView";
import { InputOutputView } from "./CodeEditorContainer/InputOutputView";
import { EmptyState } from "./CodeEditorContainer/EmptyState";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

export const CodeEditorPage = () => {
  const dispatch = useDispatch();

  const currentProblem = useSelector(
    (state: RootState) => state.codeEditor.currentProblem
  );
  const errorMessage = useSelector(
    (state: RootState) => state.codeEditor.runCodeError
  );
  const isLoadingProblem = useSelector(
    (state: RootState) => state.codeEditor.isLoadingProblem
  );

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
                  fileName={
                    currentProblem.fileName
                      ? currentProblem.fileName
                      : "edugator-code.cpp"
                  }
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
};
