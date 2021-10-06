import { Button, Box } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import {
  incrementActiveStep,
  decrementActiveStep,
} from "./problemEditorContainerSlice";

interface Props {}

export const ProblemEditorNavigator = ({}: Props) => {
  const dispatch = useDispatch();
  const activeStep = useAppSelector(
    (state) => state.problemEditorContainer.activeStep
  );

  //TODO put this logic in the reducer
  /* STEP SELECTORS */
  const metadataIsValid = useAppSelector(
    (state) => state.problemEditorContainer.metadataIsValid
  );
  const problemIsValid = useAppSelector(
    (state) => state.problemEditorContainer.problemIsValid
  );
  const codeIsValid = useAppSelector(
    (state) => state.problemEditorContainer.codeIsValid
  );
  const serverConfigIsValid = useAppSelector(
    (state) => state.problemEditorContainer.serverConfigIsValid
  );
  const testEditorIsValid = useAppSelector(
    (state) => state.problemEditorContainer.testEditorIsValid
  );

  /* Selects the correct member of state based on the current active step */
  const getValidationStatus = (): boolean => {
    switch (activeStep) {
      case 0:
        return metadataIsValid;
      case 1:
        return problemIsValid;
      case 2:
        return codeIsValid;
      case 3:
        return serverConfigIsValid;
      case 4:
        return testEditorIsValid;
      default:
        return false;
    }
  };

  const handleBack = () => {
    dispatch(decrementActiveStep());
  };

  const handleNext = () => {
    if (activeStep === 4) {
      console.log("Submitted!");
    } else {
      //formRef.current?.submitForm();
      dispatch(incrementActiveStep());
    }
  };

  return (
    <Box marginTop="auto" display="flex" justifyContent="space-between">
      <Button onClick={handleBack} disabled={activeStep === 0}>
        Back
      </Button>
      <Button
        onClick={handleNext}
        disabled={!getValidationStatus() /*&& !getOtherValidation()*/}
      >
        {activeStep === 4 ? "Submit" : "Next"}
      </Button>
    </Box>
  );
};
