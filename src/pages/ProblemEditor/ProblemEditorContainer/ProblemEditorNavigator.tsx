import { Button, Box } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import {
  incrementActiveStep,
  decrementActiveStep,
} from "./problemEditorContainerSlice";

interface Props {
  formRef: any;
}

export const ProblemEditorNavigator = ({ formRef }: Props) => {
  const dispatch = useDispatch();
  const activeStep = useAppSelector(
    (state) => state.problemEditorContainer.activeStep
  );

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

  const handleBack = () => {
    if (activeStep === 4) {
      formRef.current?.submitForm();
    }
    dispatch(decrementActiveStep());
  };

  const handleNext = () => {
    if (activeStep === 4) {
      formRef.current?.submitForm();
    } else {
      formRef.current?.submitForm();
      if (currentStepIsValid) dispatch(incrementActiveStep());
    }
  };

  return (
    <Box
      marginTop="auto"
      display="flex"
      justifyContent="space-between"
      paddingTop={3}
    >
      <Button
        onClick={handleBack}
        disabled={activeStep === 0}
        variant="outlined"
      >
        Back
      </Button>
      <Button
        onClick={handleNext}
        variant={activeStep === 4 ? "contained" : "outlined"}
        color={activeStep === 4 ? "success" : "primary"}
      >
        {activeStep === 4 ? "Submit" : "Next"}
      </Button>
    </Box>
  );
};
