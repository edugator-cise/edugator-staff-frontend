import { TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import {
  ProblemFields,
  updateProblem,
  validateProblem,
} from "../ProblemEditorContainer/problemEditorContainerSlice";

interface Props {
  formRef: any;
}

export const ProblemEditorForm = (props: Props) => {
  const dispatch = useDispatch();

  const initialValues = useAppSelector(
    (state) => state.problemEditorContainer.problem
  );

  const validate = (values: ProblemFields) => {
    const errors: any = {};
    if (!values.problemStatement) {
      errors.problemStatement = "Required";
    }

    if (!values.templatePackage) {
      errors.templatePackage = "Required";
    }

    dispatch(validateProblem(Object.entries(errors).length === 0));

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(updateProblem(values));
      }}
      innerRef={props.formRef}
      validate={validate}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <TextField
            name="problemStatement"
            label="Problem statement"
            value={values.problemStatement}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            name="templatePackage"
            label="Template package"
            value={values.templatePackage}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form>
      )}
    </Formik>
  );
};
