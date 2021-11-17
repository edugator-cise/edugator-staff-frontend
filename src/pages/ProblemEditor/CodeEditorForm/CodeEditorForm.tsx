import Editor from "@monaco-editor/react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import {
  CodeEditorFields,
  updateCodeEditor,
  validateCode,
} from "../ProblemEditorContainer/problemEditorContainerSlice";

interface Props {
  formRef: any;
}

interface FlattenedCodeFields {
  fileExtension: string;
  header: string;
  body: string;
  footer: string;
}

interface Errors {
  fileExtension?: string;
  header?: string;
  body?: string;
  footer?: string;
}

export const CodeEditorForm = ({ formRef }: Props) => {
  const dispatch = useDispatch();

  const initialValues = useAppSelector((state) => {
    const formattedFields: CodeEditorFields =
      state.problemEditorContainer.codeEditor;
    const fileExtension = formattedFields.fileExtension;
    const code = formattedFields.code;
    const flattenedFields: FlattenedCodeFields = {
      fileExtension,
      ...code,
    };
    return flattenedFields;
  });

  const validation = (values: FlattenedCodeFields) => {
    const errors: Errors = {};
    dispatch(validateCode(Object.entries(errors).length === 0));
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const formattedFields: CodeEditorFields = {
          fileExtension: values.fileExtension,
          code: {
            header: values.header,
            body: values.body,
            footer: values.footer,
          },
        };
        dispatch(updateCodeEditor(formattedFields));
      }}
      innerRef={formRef}
      validate={validation}
    >
      {({
        errors,
        values,
        handleChange,
        handleBlur,
        touched,
        setFieldValue,
      }) => (
        <Form>
          <Stack overflow="auto" spacing={5}>
            <Box>
              <InputLabel>Header</InputLabel>
              <FormHelperText>
                This code precedes the body and is not visible to students.
              </FormHelperText>
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ marginTop: 1, paddingTop: 1 }}
              >
                <Editor
                  language="cpp"
                  height="250px"
                  value={values.header}
                  onChange={(value) => setFieldValue("header", value)}
                />
              </Paper>
            </Box>
            <Box>
              <InputLabel>Body</InputLabel>
              <FormHelperText>This code is visible to students.</FormHelperText>
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ marginTop: 1, paddingTop: 1 }}
              >
                <Editor
                  language="cpp"
                  height="250px"
                  value={values.body}
                  onChange={(value) => setFieldValue("body", value)}
                />
              </Paper>
            </Box>
            <Box flexGrow={1} display="flex" flexDirection="column">
              <InputLabel>Footer</InputLabel>
              <FormHelperText>
                This code follows the body and is not visible to students.
              </FormHelperText>
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ marginTop: 1, paddingTop: 1 }}
              >
                <Editor
                  language="cpp"
                  height="250px"
                  value={values.footer}
                  onChange={(value) => setFieldValue("footer", value)}
                />
              </Paper>
            </Box>
            <Box>
              <FormControl>
                <InputLabel>Codebox file extension</InputLabel>
                <Select
                  name="fileExtension"
                  value={values.fileExtension}
                  label="fileExtension"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ minWidth: "10rem" }}
                  variant="filled"
                >
                  <MenuItem value=".h">.h</MenuItem>
                  <MenuItem value=".cpp">.cpp</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
