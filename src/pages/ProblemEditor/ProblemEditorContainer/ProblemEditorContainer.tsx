import { Box, Button, Step, StepLabel, Stepper } from "@material-ui/core";
import React, { useState } from "react";
import { ExampleValidator } from "./ExampleValidator";

const steps = [
  "Metadata",
  "Problem Editor",
  "Code Editor",
  "Server Config",
  "Test Editor",
];

export const ProblemEditorContainer = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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
        flexDirection="Column"
      >
        <ExampleValidator />
        <Box marginTop="auto" display="flex" justifyContent="space-between">
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
