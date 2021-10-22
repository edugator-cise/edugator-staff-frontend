import { Formik, Form, FieldArray, ArrayHelpers } from "formik";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import {
  updateTestCases,
  validateTestEditor,
} from "../ProblemEditorContainer/problemEditorContainerSlice";
import { Stack, Button, Alert } from "@mui/material";
import { TestCase } from "./TestCase";
import {
  generateDefaultTestCase,
  TestCaseError,
  TestCaseField,
  TestCaseFormError,
} from "./TestCase.utils";

interface Props {
  formRef: any;
}

//https://formik.org/docs/api/fieldarray
export const TestEditor = (props: Props) => {
  const dispatch = useDispatch();

  const testCases = useAppSelector(
    (state) => state.problemEditorContainer.testCases
  );

  const validate = (values: {
    testCases: TestCaseField[];
  }): TestCaseFormError => {
    const errors: TestCaseFormError = {
      testCases: [],
    };
    let hasError = false;
    if (values.testCases?.length === 0) {
      hasError = true;
    } else {
      for (let i = 0; i < values.testCases.length; i++) {
        const error: TestCaseError = {
          expectedOutput: false,
          input: false,
        };
        if (values.testCases[i].expectedOutput === "") {
          error.expectedOutput = true;
          hasError = true;
        }
        if (values.testCases[i].input === "") {
          error.input = true;
          hasError = true;
        }
        errors.testCases.push(error);
      }
    }
    dispatch(validateTestEditor(hasError));
    return errors;
  };

  return (
    <Formik
      initialValues={{ testCases: testCases }}
      onSubmit={(values: { testCases: TestCaseField[] }) => {
        dispatch(updateTestCases(values.testCases));
      }}
      innerRef={props.formRef}
      validate={validate}
      render={({ values, setFieldValue, touched, errors }) => (
        <Form>
          {values.testCases.length === 0 && (
            <Alert severity="error">
              There needs to be at least one test case.
            </Alert>
          )}
          <FieldArray name="testCases">
            {(arrayHelpers: ArrayHelpers) => {
              const testCaseComponents = values.testCases.map(
                (testCase, index) => {
                  return (
                    <TestCase
                      key={`TestCase${index}`}
                      index={index}
                      testCase={testCase}
                      deleteFn={() => {
                        arrayHelpers.remove(index);
                      }}
                      setFieldValue={setFieldValue}
                      error={errors.testCases}
                      touched={touched.testCases}
                    />
                  );
                }
              );
              return (
                <Stack
                  direction="column"
                  spacing={4}
                  overflow="auto"
                  style={{
                    maxHeight: "500px",
                  }}
                >
                  <Stack direction="column" spacing={4}>
                    {testCaseComponents}
                  </Stack>
                  <Button
                    onClick={() => {
                      arrayHelpers.push(generateDefaultTestCase());
                    }}
                    variant="contained"
                  >
                    Add test case
                  </Button>
                </Stack>
              );
            }}
          </FieldArray>
        </Form>
      )}
    />
  );
};
