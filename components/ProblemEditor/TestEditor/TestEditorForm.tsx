import { Formik, Form, FieldArray, ArrayHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  requestAddProblem,
  requestUpdateProblem,
  updateTestCases,
} from "components/ProblemEditor/problemEditorContainerSlice";
import { Stack, Button, Alert } from "@mui/material";
import { TestCase } from "./TestCase";
import { generateDefaultTestCase, TestCaseField } from "./TestCase.utils";
import { RootState } from "lib/store/store";

interface Props {
  formRef: any;
}

//https://formik.org/docs/api/fieldarray
export const TestEditor = (props: Props) => {
  const dispatch = useDispatch();

  const testCases = useSelector(
    (state: RootState) => state.problemEditorContainer.testCases
  );
  if (testCases.length === 0) {
    dispatch(updateTestCases([generateDefaultTestCase()]));
  }

  const problemId = useSelector(
    (state: RootState) => state.problemEditorContainer.problemId
  );

  return (
    <Formik
      initialValues={{ testCases: testCases }}
      onSubmit={(values: { testCases: TestCaseField[] }) => {
        dispatch(updateTestCases(values.testCases));

        if (problemId) {
          dispatch(requestUpdateProblem());
        } else {
          dispatch(requestAddProblem());
        }
      }}
      validate={(values: { testCases: TestCaseField[] }) => {
        dispatch(updateTestCases(values.testCases));
        if (!values || !values.testCases || values.testCases.length === 0)
          return { testCases: "empty" };
        return {};
      }}
      innerRef={props.formRef}
      validateOnBlur={false}
      validateOnSubmit
      validateOnChange
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
                    minHeight: "500px",
                    height: "100%",
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
