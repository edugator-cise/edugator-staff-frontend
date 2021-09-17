import { Box, Card, Step, StepLabel, Stepper } from "@material-ui/core";
import React, { useState } from "react";

const steps = [
  "Metadata",
  "Problem Editor",
  "Code Editor",
  "Server Config",
  "Test Editor",
];

export const ProblemEditorContainer = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box border="1px solid lightgray" borderRadius="10px" flexGrow={1}>
        Content
      </Box>
    </Box>
  );
};
