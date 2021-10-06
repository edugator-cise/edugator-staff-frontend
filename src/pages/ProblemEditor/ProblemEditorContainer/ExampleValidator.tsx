import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import {
  validateCode,
  validateMetadata,
  validateProblem,
  validateServerConfig,
  validateTestEditor,
} from "./problemEditorContainerSlice";

interface Props {
  validationStatus: () => boolean;
}

export const ExampleValidator = ({ validationStatus }: Props) => {
  const dispatch = useDispatch();
  const activeStep = useAppSelector(
    (state) => state.problemEditorContainer.activeStep
  );

  /* Dispatches the correct action based on the current active step */
  const handleValidation = (isValid: boolean): void => {
    switch (activeStep) {
      case 0:
        dispatch(validateMetadata(isValid));
        break;
      case 1:
        dispatch(validateProblem(isValid));
        break;
      case 2:
        dispatch(validateCode(isValid));
        break;
      case 3:
        dispatch(validateServerConfig(isValid));
        break;
      case 4:
        dispatch(validateTestEditor(isValid));
        break;
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
              checked={validationStatus()}
            />
          }
          label="Validated"
        />
      </FormGroup>
    </Box>
  );
};
