import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import { validateCurrentStep } from "./problemEditorContainerSlice";

export const ExampleValidator = () => {
  const dispatch = useDispatch();
  const activeStep = useAppSelector(
    (state) => state.problemEditorContainer.activeStep
  );

  /* STEP SELECTORS */ //TODO put this logic in the reducer
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

  /* Dispatches the correct action based on the current active step */
  const handleValidation = (isValid: boolean): void => {
    dispatch(validateCurrentStep(isValid));
  };

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

  return (
    <Box mt="auto" ml="auto" mr="auto">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              onChange={(event) => handleValidation(event.target.checked)}
              checked={getValidationStatus()}
            />
          }
          label="Validated"
        />
      </FormGroup>
    </Box>
  );
};
