import { Button, Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementActiveStep,
  decrementActiveStep,
} from "components/ProblemEditor/problemEditorContainerSlice";
import { RootState } from "lib/store/store";
import { validationResult } from "./ProblemEditorContainer";
interface Props {
  formRef: any;
  edit: boolean;
}

export const ProblemEditorNavigator = ({ formRef, edit }: Props) => {
  const dispatch = useDispatch();
  const activeStep = useSelector(
    (state: RootState) => state.problemEditorContainer.activeStep
  );
  const isSubmitting = useSelector(
    (state: RootState) => state.problemEditorContainer.isSubmitting
  );
  const problemId = useSelector(
    (state: RootState) => state.problemEditorContainer.problemId
  );

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

  const handleBackCreate = () => {
    // If we're creating a new problem, we do not want to save inputted data
    dispatch(decrementActiveStep());
  };

  const handleBackEdit = () => {
    // If we're editing a problem, we want to save inputted data when going back
    if (activeStep === 4) {
      formRef.current?.validateForm().then((res: validationResult) => {
        // If there is an error in the test cases, we do not want to go back
        if (res?.testCases?.length === 0 || !res?.testCases) {
          dispatch(decrementActiveStep());
        }
      });
    } else {
      formRef.current?.submitForm();
      if (currentStepIsValid) dispatch(decrementActiveStep());
    }
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
        onClick={edit ? handleBackEdit : handleBackCreate}
        disabled={activeStep === 0 || isSubmitting}
        variant="outlined"
      >
        Back
      </Button>
      <Button
        onClick={handleNext}
        variant={activeStep === 4 ? "contained" : "outlined"}
        color={activeStep === 4 ? "success" : "primary"}
        disabled={isSubmitting}
      >
        {activeStep === 4 ? (problemId ? "Save changes" : "Submit") : "Next"}
      </Button>
    </Box>
  );
};
