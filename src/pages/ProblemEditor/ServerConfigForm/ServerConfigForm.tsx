import { TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import {
  ServerConfigFields,
  updateServerConfig,
  validateServerConfig,
} from "../ProblemEditorContainer/problemEditorContainerSlice";

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
  const initialValues = useAppSelector(
    (state) => state.problemEditorContainer.serverConfig
  );

  const validate = (values: ServerConfigFields) => {
    const errors: ServerConfigErrors = {};
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {}}
      innerRef={props.formRef}
      validate={validate}
    >
      {({ errors, values, handleChange, handleBlur, touched }) => (
        <Form style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <TextField
            name="timeLimit"
            label="Time limit"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.timeLimit}
            error={touched.timeLimit && Boolean(errors.timeLimit)}
          />
          <TextField
            name="memoryLimit"
            label="Memory limit"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.memoryLimit}
            error={touched.memoryLimit && Boolean(errors.memoryLimit)}
          />
          <TextField
            name="buildCommand"
            label="Build command"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.buildCommand}
            error={touched.buildCommand && Boolean(errors.buildCommand)}
          />
        </Form>
      )}
    </Formik>
  );
};
