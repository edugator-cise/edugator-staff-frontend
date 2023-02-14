import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { FormikValues } from "formik";
import React, { useRef } from "react";
import { useSelector } from "react-redux"
import { CodeEditorForm } from "../CodeEditorForm/CodeEditorForm";
import { MetadataForm } from "../MetadataForm/MetadataForm";
import { ProblemEditorForm } from "components/ProblemEditor/ProblemEditorForm/ProblemEditorForm";
import { ServerConfigForm } from "components/ProblemEditor/ServerConfigForm/ServerConfigForm";
import { FailureDialog } from "components/ProblemEditor/Dialogs/FailureDialog";
import { SuccessDialog } from "../Dialogs/SuccessDialog";
import { TestEditor } from "../TestEditor/TestEditorForm";
import { ExampleValidator } from "./ExampleValidator";
import { ProblemEditorNavigator } from "components/ProblemEditor/ProblemEditorContainer/ProblemEditorNavigator";
import { WarningDialog } from "components/ProblemEditor/Dialogs/WarningDialog";
import { RootState } from "lib/store/store";

const steps = [
  "Metadata",
  "Problem Editor",
  "Code Editor",
  "Server Config",
  "Test Editor",
];

export const ProblemEditorContainer = () => {
  const activeStep = useSelector(
    (state: RootState) => state.problemEditorContainer.activeStep
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

  const formRef = useRef<FormikValues>();

  return (
    <Box display="flex" flexDirection="column" flexGrow={1} textAlign="left">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
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
