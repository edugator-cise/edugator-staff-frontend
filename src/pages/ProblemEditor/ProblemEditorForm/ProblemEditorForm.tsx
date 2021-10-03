import { Button, TextField } from "@mui/material";
import { Form, Formik, FormikValues } from "formik";
import React, { Ref } from "react";

interface Props {
  formRef: any;
}

interface ProblemFields {
  problem: string;
  template: URL | string;
}

export const ProblemEditorForm = (props: Props) => {
  const initialValues: ProblemFields = {
    problem: "",
    template: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => console.log("submit problem")}
      innerRef={props.formRef}
    >
      {({ values }) => (
        <Form>
          <TextField name="problem" value={values.problem} />
        </Form>
      )}
    </Formik>
  );
};
