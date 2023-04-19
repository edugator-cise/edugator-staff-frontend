import { Button, Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementActiveStep,
  decrementActiveStep,
} from "state/problemEditorContainerSlice";
import { RootState } from "lib/store/store";
interface Props {
  formRef: any;
}

export const ProblemEditorNavigator = ({ formRef }: Props) => {
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

  const handleBack = () => {
    if (activeStep === 4) {
      formRef.current?.validateForm();
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
      <button
        onClick={handleBack}
        className={`${
          activeStep === 0
            ? "bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
            : "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        }`}
        disabled={activeStep === 0 || isSubmitting}
      >
        Back
      </button>

      <button
        onClick={handleNext}
        className={`${
          activeStep === 4
            ? "bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            : "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        }`}
        disabled={isSubmitting}
      >
        {activeStep === 4 ? (problemId ? "Save changes" : "Submit") : "Next"}
      </button>
    </Box>
  );
};
