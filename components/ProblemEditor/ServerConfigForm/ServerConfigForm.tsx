import { InputAdornment, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ServerConfigFields,
  updateServerConfig,
  validateServerConfig,
} from "state/problemEditorContainerSlice";
import { RootState } from "lib/store/store";

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
        </Form>
      )}
    </Formik>
  );
};
