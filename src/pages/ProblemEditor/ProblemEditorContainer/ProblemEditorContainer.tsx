import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { FormikValues } from "formik";
import React, { useRef } from "react";
import { useAppSelector } from "../../../app/common/hooks";
import { ProblemEditorForm } from "../ProblemEditorForm/ProblemEditorForm";
import { ExampleValidator } from "./ExampleValidator";
import { ProblemEditorNavigator } from "./ProblemEditorNavigator";

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
      case 1:
        return <ProblemEditorForm formRef={formRef} />;
      default:
        return <ExampleValidator />;
    }
  };

  const formRef = useRef<FormikValues>();

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
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
        padding="1rem"
        display="flex"
        flexDirection="column"
        marginTop="1rem"
      >
        {/* https://stackoverflow.com/questions/49525057/react-formik-use-submitform-outside-formik */}
        <ActiveForm />
        <ProblemEditorNavigator />
      </Box>
    </Box>
  );
};
