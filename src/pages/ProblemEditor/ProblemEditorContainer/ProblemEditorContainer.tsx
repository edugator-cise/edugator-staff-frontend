import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { FormikValues } from "formik";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import { ProblemEditorForm } from "../ProblemEditorForm/ProblemEditorForm";
import { ExampleValidator } from "./ExampleValidator";
import {
  validateCode,
  validateMetadata,
  validateProblem,
  validateServerConfig,
  validateTestEditor,
} from "./problemEditorContainerSlice";
import { ProblemEditorNavigator } from "./ProblemEditorNavigator";

const steps = [
  "Metadata",
  "Problem Editor",
  "Code Editor",
  "Server Config",
  "Test Editor",
];

export const ProblemEditorContainer = () => {
  const dispatch = useDispatch();

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

  const ActiveForm = () => {
    switch (activeStep) {
      case 10:
        return <ProblemEditorForm formRef={formRef} />;
      default:
        // TODO make this happen in the example validator using redux and remove the functions from this container
        return (
          <ExampleValidator
            handleValidation={(isValid: boolean) => handleValidation(isValid)}
            validationStatus={() => getValidationStatus()}
          />
        );
    }
  };

  const formRef = useRef<FormikValues>();

  const getOtherValidation = () => {
    return formRef.current?.isValid;
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
