import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { FormikValues } from "formik";
import React, { useRef } from "react";
import { useAppSelector } from "../../../app/common/hooks";
import { CodeEditorForm } from "../CodeEditorForm/CodeEditorForm";
import { MetadataForm } from "../MetadataForm/MetadataForm";
import { ProblemEditorForm } from "../ProblemEditorForm/ProblemEditorForm";
import { ServerConfigForm } from "../ServerConfigForm/ServerConfigForm";
import { FailureDialog } from "../Dialogs/FailureDialog";
import { SuccessDialog } from "../Dialogs/SuccessDialog";
import { TestEditor } from "../TestEditor/TestEditorForm";
import { ExampleValidator } from "./ExampleValidator";
import { ProblemEditorNavigator } from "./ProblemEditorNavigator";
import { WarningDialog } from "../Dialogs/WarningDialog";
import { useDispatch } from "react-redux";
import { changeActiveStep } from "./problemEditorContainerSlice";

const steps = [
  "Metadata",
  "Problem Editor",
  "Code Editor",
  "Server Config",
  "Test Editor",
];

export const ProblemEditorContainer = () => {
  const activeStep = useAppSelector(
    (state) => state.problemEditorContainer.activeStep
  );

  const ActiveForm = () => {
    switch (activeStep) {
      case 0:
        return <MetadataForm formRef={formRef} />;
      case 1:
        return <ProblemEditorForm formRef={formRef} />;
      case 2:
        return <CodeEditorForm formRef={formRef} />;
      case 3:
        return <ServerConfigForm formRef={formRef} />;
      case 4:
        return <TestEditor formRef={formRef} />;
      default:
        return <ExampleValidator />;
    }
  };

  const currentStepIsValid = useAppSelector((state) => {
    switch (state.problemEditorContainer.activeStep) {
      case 0:
        return state.problemEditorContainer.metadataIsValid;
      case 1:
        return state.problemEditorContainer.problemIsValid;
      case 2:
        return state.problemEditorContainer.codeIsValid;
      case 3:
        return state.problemEditorContainer.serverConfigIsValid;
      case 4:
        return state.problemEditorContainer.testEditorIsValid;
      default:
        return false;
    }
  });

  const dispatch = useDispatch();

  const formRef = useRef<FormikValues>();

  const handleChange = (index: number) => {
    if (currentStepIsValid) dispatch(changeActiveStep(index));
  };

  return (
    <Box display="flex" flexDirection="column" flexGrow={1} textAlign="left">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel onClick={handleChange.bind(this, index)}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box
        border="1px solid lightgray"
        borderRadius="10px"
        flexGrow={1}
        padding={3}
        display="flex"
        flexDirection="column"
        marginTop="1rem"
      >
        {/* https://stackoverflow.com/questions/49525057/react-formik-use-submitform-outside-formik */}
        <ActiveForm />
        <ProblemEditorNavigator formRef={formRef} />
        <SuccessDialog />
        <FailureDialog />
        <WarningDialog />
      </Box>
    </Box>
  );
};
