import { Form, Formik } from "formik";
import React from "react";
import { useAppSelector } from "../../../app/common/hooks";

interface Props {
  formRef: any;
}

export const ServerConfigForm = (props: Props) => {
  const initialValues = useAppSelector(
    (state) => state.problemEditorContainer.serverConfig
  );
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {}}
      innerRef={props.formRef}
      //validate={validate}
    >
      {({ errors, values, handleChange, handleBlur, touched }) => (
        <Form
          style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        ></Form>
      )}
    </Formik>
  );
};
