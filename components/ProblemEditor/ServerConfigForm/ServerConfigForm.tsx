import { InputAdornment, Stack, TextField, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ServerConfigFields,
  updateServerConfig,
  validateServerConfig,
} from "components/ProblemEditor/problemEditorContainerSlice";
import { RootState } from "lib/store/store";
import { useCheckboxContext } from "components/CheckboxContext";


interface Props {
  formRef: any;
}

interface ServerConfigErrors {
  buildCommand?: string;
  timeLimit?: string;
  memoryLimit?: string;
}

export const ServerConfigForm = (props: Props) => {
  const dispatch = useDispatch();
  const { cpp, py } = useCheckboxContext();

  const initialValues = useSelector(
    (state: RootState) => state.problemEditorContainer.serverConfig
  );

  const validate = (values: ServerConfigFields) => {
    const errors: ServerConfigErrors = {};
    if (!values.memoryLimit.toString().match(/^[0-9]+$/)) {
      errors.memoryLimit = "Must contain digits only";
    }
    if (!values.timeLimit.toString().match(/^[0-9]+$/)) {
      errors.timeLimit = "Must contain digits only";
    }

    dispatch(validateServerConfig(Object.entries(errors).length === 0));

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(updateServerConfig(values));
      }}
      innerRef={props.formRef}
      validate={validate}
    >
      {({ errors, values, handleChange, handleBlur, touched }) => (
        <Form style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {cpp && (
            <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>C++ Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <br/>
            <Stack spacing={5}>
              <TextField
                id="time-limit"
                name="timeLimit"
                label="Time limit"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">s</InputAdornment>,
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.timeLimit}
                error={touched.timeLimit && Boolean(errors.timeLimit)}
                helperText={touched.timeLimit && errors.timeLimit}
                sx={{ width: "25%" }}
              />
              <TextField
                id="memory-limit"
                name="memoryLimit"
                label="Memory limit"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">KB</InputAdornment>
                  ),
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.memoryLimit}
                error={touched.memoryLimit && Boolean(errors.memoryLimit)}
                helperText={touched.memoryLimit && errors.memoryLimit}
                sx={{ width: "25%" }}
              />
              <TextField
                id="build-command"
                name="buildCommand"
                label="Build command"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.buildCommand}
                error={touched.buildCommand && Boolean(errors.buildCommand)}
                helperText="Add compiler flags here e.g. '-Wall'"
              />
            </Stack>
            </AccordionDetails>
            </Accordion>
          )}
          {py && (
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Python Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <br/>
            <Stack spacing={5}>
              <TextField
                id="time-limit"
                name="timeLimit"
                label="Time limit"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">s</InputAdornment>,
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.timeLimit}
                error={touched.timeLimit && Boolean(errors.timeLimit)}
                helperText={touched.timeLimit && errors.timeLimit}
                sx={{ width: "25%" }}
              />
              <TextField
                id="memory-limit"
                name="memoryLimit"
                label="Memory limit"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">KB</InputAdornment>
                  ),
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.memoryLimit}
                error={touched.memoryLimit && Boolean(errors.memoryLimit)}
                helperText={touched.memoryLimit && errors.memoryLimit}
                sx={{ width: "25%" }}
              />
              <TextField
                id="build-command"
                name="buildCommand"
                label="Build command"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.buildCommand}
                error={touched.buildCommand && Boolean(errors.buildCommand)}
                helperText="Add compiler flags here e.g. '-Wall'"
              />
            </Stack>
            </AccordionDetails>
            </Accordion>
          )}
        </Form>
      )}
    </Formik>
  );
};
