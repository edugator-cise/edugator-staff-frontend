import { FormHelperText, Paper, Stack, TextField } from "@mui/material";
import { Field, Form, Formik, FieldProps } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MarkdownEditor } from "../MarkdownEditor/MarkdownEditor";
import {
  ProblemFields,
  updateProblem,
  validateProblem,
} from "state/problemEditorContainerSlice";
import { RootState } from "lib/store/store";

interface Props {
  formRef: any;
}

export const ProblemEditorForm = (props: Props) => {
  const dispatch = useDispatch();

  const initialValues = useSelector(
    (state: RootState) => state.problemEditorContainer.problem
  );

  const templatePackageHelperText =
    "This should be a link to a downloadable file with starter/template code.";

  const validate = (values: ProblemFields) => {
    const errors: any = {};
    if (!values.problemStatement) {
      errors.problemStatement = "Required";
    } else if (values.problemStatement.trim() === "") {
      errors.problemStatement = "Must contain non-whitespace characters";
    }

    if (!values.templatePackage) {
      errors.templatePackage = "Required";
    } else if (
      !values.templatePackage.match(
        /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g //https://tutorial.eyehunts.com/js/url-regex-validation-javascript-example-code/
      )
    ) {
      errors.templatePackage =
        "Must be a valid uri starting with http:// or https://";
    }

    dispatch(validateProblem(Object.entries(errors).length === 0));

    return errors;
  };

  const MarkdownField = ({
    field, // { name, value, onChange, onBlur }
    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  }: FieldProps) => {
    const invalid =
      form.touched.problemStatement && Boolean(form.errors.problemStatement);
    return (
      <div>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            borderColor: invalid
              ? (theme) => `${theme.palette.error.main}`
              : null,
          }}
        >
          <MarkdownEditor form={form} />
        </Paper>
        <FormHelperText
          sx={{
            marginLeft: 2,
            color: invalid ? (theme) => `${theme.palette.error.main}` : null,
          }}
        >
          {form.touched.problemStatement && form.errors.problemStatement}
        </FormHelperText>
      </div>
    );
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
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form>
          <Stack spacing={2}>
            <Field
              id="problem-statement"
              name="problemStatement"
              component={MarkdownField}
            />
            <TextField
              id="template-package"
              name="templatePackage"
              label="Template package"
              value={values.templatePackage}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.templatePackage && Boolean(errors.templatePackage)}
              helperText={
                (touched.templatePackage && errors.templatePackage) ||
                templatePackageHelperText
              }
              required
            />
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
