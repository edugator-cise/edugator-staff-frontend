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
import { RootState } from "lib/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isBlank } from "utils/CodeEditorUtils";
import {
  CodeEditorFields,
  updateCodeEditor,
  validateCode,
} from "state/problemEditorContainerSlice";

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

const defaultHeader = `//If students import packages or use namespaces on their own, it shouldn't cause problems
#include <iostream>
#include <vector>
using namespace std;
`;

const defaultBody = `int addTwoNums(int x, int y) {
	// Your code here
}
`;

const defaultFooter = `// The main does not have to be in the footer.
// The main should remain in the footer if you don't want students to be able to see it nor change it.
int main()
{
    int x = 0, y = 0;
    cin >> x >> y;
    int result = addTwoNums(x, y);
    // You should print out whatever the expected output should be. 
    // Be careful about whitespace. Ex: only put endl if you add an endline in your expected output.
    cout << result;
    return 0;
}
`;

export const CodeEditorForm = ({ formRef }: Props) => {
  const dispatch = useDispatch();

  const [touched, setTouched] = React.useState(false);

  const initialValues = useSelector((state: RootState) => {
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

  if (
    !touched &&
    isBlank(initialValues.header) &&
    isBlank(initialValues.body) &&
    isBlank(initialValues.footer)
  ) {
    initialValues.header = defaultHeader;
    initialValues.body = defaultBody;
    initialValues.footer = defaultFooter;
  }

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
          <Stack overflow="none" spacing={5}>
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
                  onChange={(value) => {
                    setFieldValue("header", value);
                    setTouched(true);
                  }}
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
                  onChange={(value) => {
                    setFieldValue("body", value);
                    setTouched(true);
                  }}
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
                  onChange={(value) => {
                    setFieldValue("footer", value);
                    setTouched(true);
                  }}
                />
              </Paper>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
