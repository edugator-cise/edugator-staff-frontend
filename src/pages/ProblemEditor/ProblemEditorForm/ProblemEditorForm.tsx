import { Button, TextField } from "@mui/material";
import { Form, Formik, FormikValues } from "formik";
import React, { Ref, useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateProblem } from "../ProblemEditorContainer/problemEditorContainerSlice";

interface Props {
  formRef: any;
}

interface ProblemFields {
  problem: string;
  template: URL | string;
}

export const ProblemEditorForm = (props: Props) => {
  const dispatch = useDispatch();

  const initialValues: ProblemFields = {
    problem: "",
    template: "",
  };

  const validate = (values: ProblemFields) => {
    const errors: any = {};
    if (!values.problem) {
      errors.problem = "Required";
    }

    console.log("errors!!!", errors);

    dispatch(validateProblem(Object.entries(errors).length === 0));

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => console.log("submit problem")}
      innerRef={props.formRef}
      validate={validate}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <TextField
            name="problem"
            value={values.problem}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form>
      )}
    </Formik>
  );
};
