import Editor from "@monaco-editor/react";
import { Box, InputLabel, Paper, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import { updateCodeEditor } from "../ProblemEditorContainer/problemEditorContainerSlice";

interface Props {
  formRef: any;
}

export const CodeEditorForm = ({ formRef }: Props) => {
  const dispatch = useDispatch();
  const initialValues = useAppSelector(
    (state) => state.problemEditorContainer.codeEditor
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(updateCodeEditor(values));
      }}
      innerRef={formRef}
      //validate={validate}
    >
      {({ errors, values, handleChange, handleBlur, touched }) => (
        <Form>
          <Paper elevation={0} variant="outlined">
            <Stack
              overflow="auto"
              spacing={5}
              maxHeight="50vh"
              pr={5}
              pl={5}
              pt={2}
            >
              <Box>
                <InputLabel>Header</InputLabel>
                <Paper elevation={0} variant="outlined">
                  <Editor language="cpp" height="250px" />
                </Paper>
              </Box>
              <Box>
                <InputLabel>Body</InputLabel>
                <Paper elevation={0} variant="outlined">
                  <Editor language="cpp" height="250px" />
                </Paper>
              </Box>
              <Box flexGrow={1} display="flex" flexDirection="column">
                <InputLabel>Footer</InputLabel>
                <Paper elevation={0} variant="outlined">
                  <Editor language="cpp" height="250px" />
                </Paper>
              </Box>
            </Stack>
          </Paper>
          <Box mt={3}>
            <TextField label="Codebox file extension" />
          </Box>
        </Form>
      )}
    </Formik>
  );
};
