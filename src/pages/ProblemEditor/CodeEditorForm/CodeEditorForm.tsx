import { Stack } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

interface Props {
  formRef: any;
}

export const CodeEditorForm = ({ formRef }: Props) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(updateCodeEditor(values));
      }}
      innerRef={formRef}
      validate={validate}
    >
      {({ errors, values, handleChange, handleBlur, touched }) => (
        <Form style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Stack></Stack>
        </Form>
      )}
    </Formik>
  );
};
