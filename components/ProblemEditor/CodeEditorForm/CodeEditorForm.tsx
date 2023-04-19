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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Form, Formik } from "formik";
import { RootState } from "lib/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isBlank } from "utils/CodeEditorUtils";
import {
  CodeEditorFields,
  updateCodeEditor,
  validateCode,
} from "components/ProblemEditor/problemEditorContainerSlice";
import { useCheckboxContext } from "components/CheckboxContext";

interface Props {
  formRef: any;
}

interface FlattenedCodeFields {
  code: {
    language: string,
    header: string;
    body: string;
    footer: string;
    fileExtension: string;
  }[];
  
}

interface Errors {
  code?: {
    language?: string,
    header?: string;
    body?: string;
    footer?: string;
    fileExtension?: string;
  }[];

  
}

const defaultCppHeader = `// If students import packages or use namespaces on their own, it shouldn't cause problems

#include <iostream>
#include <vector>
using namespace std;
`;

const defaultCppBody = `int addTwoNums(int x, int y) {
	// Your code here

}
`;

const defaultCppFooter = `// The main does not have to be in the footer.
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

const defaultPyHeader = `# If students import packages or use namespaces on their own, it shouldn't cause problems

import sys
import math
`;

const defaultPyBody = `def addTwoNums(x, y):
  # Your code here
  
`;

const defaultPyFooter = `# The main does not have to be in the footer.
# The main should remain in the footer if you don't want students to be able to see it nor change it.

if __name__ == '__main__':
  x, y = map(int, input().split())
  result = addTwoNums(x, y)
  # You should print out whatever the expected output should be.
  # Be careful about whitespace. Ex: only put end='' if you don't want to end the line.
  print(result)
`;

const defaultJavaHeader = `import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;
`;

const defaultJavaBody = `class Exercise {
  public static int addTwoNums(int x, int y) {
    // Your code here
    
  }
}
`;

const defaultJavaFooter = `public class Main {
  public static void main(String[] args) {
    Exercise e = new Exercise();
    Scanner input = new Scanner(System.in);
    int x = input.nextInt();
    int y = input.nextInt();
    int result = e.addTwoNums(x, y);
    System.out.println(result);
    input.close();
  }
}
`;


export const CodeEditorForm = ({ formRef }: Props) => {
  const dispatch = useDispatch();
  const { languages } = useCheckboxContext();

  const cpp = languages.find((lang) => lang.language === "C++")?.selected;
  const py = languages.find((lang) => lang.language === "Python")?.selected;
  const java = languages.find((lang) => lang.language === "Java")?.selected;

  const [touched, setTouched] = React.useState(false);

  const initialValues = useSelector((state: RootState) => {
    const formattedFields: CodeEditorFields =
      state.problemEditorContainer.codeEditor;
    const code = formattedFields.code;
    const flattenedFields: FlattenedCodeFields = {code: []};
    
    code.forEach(lang => {
      flattenedFields.code.push({
        language: lang.language,
        header: lang.header,
        body: lang.body,
        footer: lang.footer,
        fileExtension: lang.fileExtension,
      });
    });

    return flattenedFields;
  });

  for (const field of initialValues.code) {
    if (
      !touched &&
      isBlank(field.header) ||
      isBlank(field.body) ||
      isBlank(field.footer)
    ) {
      switch (field.language) {
        case "C++":
          field.header = defaultCppHeader;
          field.body = defaultCppBody;
          field.footer = defaultCppFooter;
          break;
        case "Python":
          field.header = defaultPyHeader;
          field.body = defaultPyBody;
          field.footer = defaultPyFooter;
          break;
        case "Java":
          field.header = defaultJavaHeader;
          field.body = defaultJavaBody;
          field.footer = defaultJavaFooter;
          break;
        default:
          break;
      }
    }
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
          
          code: values.code,
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
          {cpp && (
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>C++ Settings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <br/>
                  <Stack overflow="none" spacing={5}>
                  <Box>
                    <FormControl>
                      <InputLabel>Codebox file extension</InputLabel>
                      <Select
                        name="fileExtension"
                        value={values.code.find((lang) => lang.language === "cpp")?.fileExtension}
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
                        value={values.code.find((lang) => lang.language === "C++")?.header}
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
                        value={values.code.find((lang) => lang.language === "C++")?.body}
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
                        value={values.code.find((lang) => lang.language === "C++")?.footer}
                        onChange={(value) => {
                          setFieldValue("footer", value);
                          setTouched(true);
                        }}
                      />
                    </Paper>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}

          {py && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Python Settings</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <br/>
                  <Stack overflow="none" spacing={5}>
                  <Box>
                    <FormControl>
                      <InputLabel>Codebox file extension</InputLabel>
                      <Select
                        name="fileExtension"
                        value={values.code.find((lang) => lang.language === "Python")?.fileExtension}
                        label="fileExtension"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ minWidth: "10rem" }}
                        variant="filled"
                      >
                        <MenuItem value=".py">.py</MenuItem>
                        
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
                        language="python"
                        height="250px"
                        value={values.code.find((lang) => lang.language === "Python")?.header}
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
                        language="python"
                        height="250px"
                        value={values.code.find((lang) => lang.language === "Python")?.body}
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
                        language="python"
                        height="250px"
                        value={values.code.find((lang) => lang.language === "Python")?.footer}
                        onChange={(value) => {
                          setFieldValue("footer", value);
                          setTouched(true);
                        }}
                      />
                    </Paper>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}
          
          {java && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Java Settings</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <br/>
                  <Stack overflow="none" spacing={5}>
                  <Box>
                    <FormControl>
                      <InputLabel>Codebox file extension</InputLabel>
                      <Select
                        name="fileExtension"
                        value={values.code.find((lang) => lang.language === "Java")?.fileExtension}
                        label="fileExtension"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ minWidth: "10rem" }}
                        variant="filled"
                      >
                        <MenuItem value=".java">.java</MenuItem>
                        
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
                        language="java"
                        height="250px"
                        value={values.code.find((lang) => lang.language === "Java")?.header}
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
                        language="java"
                        height="250px"
                        value={values.code.find((lang) => lang.language === "Java")?.body}
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
                        language="java"
                        height="250px"
                        value={values.code.find((lang) => lang.language === "Java")?.footer}
                        onChange={(value) => {
                          setFieldValue("footer", value);
                          setTouched(true);
                        }}
                      />
                    </Paper>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}
          

        </Form>
      )}
    </Formik>
  );
};
