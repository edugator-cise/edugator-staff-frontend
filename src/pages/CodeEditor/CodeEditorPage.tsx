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
import { Grid, CircularProgress, Box, Alert, Grow } from "@mui/material";
import { ProblemView } from "./CodeEditorContainer/ProblemView";
import { CodeEditorView } from "./CodeEditorContainer/CodeEditorView";
import { InputOutputView } from "./CodeEditorContainer/InputOutputView";
import { EmptyState } from "./CodeEditorContainer/EmptyState";
import { adminPathRegex, colors } from "../../shared/constants";
import { useParams, useLocation } from "react-router-dom";
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

  useEffect(() => {
    console.log(currentProblem);
  }, [currentProblem]);

  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    console.log(isLoadingProblem);
  }, [isLoadingProblem]);

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
};
