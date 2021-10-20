import { Paper, TextField } from "@mui/material";
import { Field, Form, Formik, FieldProps } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import { MarkdownEditor } from "../MarkdownEditor/MarkdownEditor";
import {
  ProblemFields,
  updateProblem,
  validateProblem,
} from "../ProblemEditorContainer/problemEditorContainerSlice";

interface Props {
  formRef: any;
}

//interface MarkdownFieldProps extends FieldProps {}

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

    console.log(values);

    dispatch(validateProblem(Object.entries(errors).length === 0));

    return errors;
  };

  const MarkdownField = ({
    field, // { name, value, onChange, onBlur }
    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  }: FieldProps) => {
    return <MarkdownEditor form={form} />;
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
          {/* <Paper elevation={0} variant="outlined">
            <MarkdownEditor />
          </Paper> */}
          <Field name="problemStatement" component={MarkdownField} />
          <TextField
            id="template-package"
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
