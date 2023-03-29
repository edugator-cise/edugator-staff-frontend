import { Step, StepLabel, Stepper } from "@mui/material";
import React, { MutableRefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormikValues } from "formik";
import { validationResult } from "./ProblemEditorContainer";
import { RootState } from "lib/store/store";

const ProblemEditorStepper = ({
  activeStep,
  steps,
  edit,
  formRef,
  setActiveStep,
}: {
  activeStep: number;
  steps: string[];
  edit: boolean;
  formRef: MutableRefObject<FormikValues | undefined>;
  setActiveStep: (index: number) => void;
}) => {
  const dispatch = useDispatch();

  const currentStepIsValid = useSelector((state: RootState) => {
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

  const setIndex = (index: number) => {
    if (activeStep === index) {
      // do nothing
    } else if (activeStep === 4) {
      formRef.current?.validateForm().then((res: validationResult) => {
        // If there is an error in the test cases, we do not want to go back
        if (res?.testCases?.length === 0 || !res?.testCases) {
          dispatch(setActiveStep(index));
        }
      });
    } else {
      formRef.current?.submitForm();
      if (currentStepIsValid) dispatch(setActiveStep(index));
    }
  };
  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        return (
          <Step
            sx={
              edit
                ? {
                    "& .MuiStepLabel-label, & .MuiStepIcon-root": {
                      cursor: "pointer",
                    },
                    "&:hover .MuiStepIcon-root": {
                      color: "#1976d2",
                    },
                    "&:hover .MuiStepLabel-label": {
                      color: "#000",
                    },
                  }
                : {}
            }
            key={index}
          >
            <StepLabel onClick={edit ? () => setIndex(index) : () => {}}>
              {label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default ProblemEditorStepper;
