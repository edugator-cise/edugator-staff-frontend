import { Formik, Form, FieldArray, ArrayHelpers } from "formik";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import {
  requestAddProblem,
  updateTestCases,
  validateTestEditor,
} from "../ProblemEditorContainer/problemEditorContainerSlice";
import { Stack, Button, Alert } from "@mui/material";
import { TestCase } from "./TestCase";
import { generateDefaultTestCase, TestCaseField } from "./TestCase.utils";

interface Props {
  formRef: any;
}

//https://formik.org/docs/api/fieldarray
export const TestEditor = (props: Props) => {
  const dispatch = useDispatch();

  const testCases = useAppSelector(
    (state) => state.problemEditorContainer.testCases
  );

  return (
    <Formik
      initialValues={{ testCases: testCases }}
      onSubmit={(values: { testCases: TestCaseField[] }) => {
        dispatch(updateTestCases(values.testCases));
        dispatch(requestAddProblem());
      }}
      validate={(values: { testCases: TestCaseField[] }) => {
        dispatch(updateTestCases(values.testCases));
      }}
      innerRef={props.formRef}
      validateOnBlur={false}
      validateOnSubmit
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ values, setFieldValue, errors }) => (
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
                      error={errors}
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
    </Formik>
  );
};
