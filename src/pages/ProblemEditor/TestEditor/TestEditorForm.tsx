import { Formik, Form, FieldArray, ArrayHelpers } from "formik";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import {
  updateTestCases,
  validateTestEditor,
} from "../ProblemEditorContainer/problemEditorContainerSlice";
import { Stack, Button } from "@mui/material";
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

  const testEditorIsValid = useAppSelector(
    (state) => state.problemEditorContainer.testEditorIsValid
  );

  const validate = (values: { testCases: TestCaseField[] }) => {
    const errors: any = {};
    if (values.testCases?.length === 0) {
      errors.lengthError = "There must be at least one test case.";
    } else {
      for (let i = 0; i < values.testCases.length; i++) {
        if (values.testCases[i].expectedOutput === "") {
          errors.expectedOutput = "Required";
        }
        if (values.testCases[i].input === "") {
          errors.input = "Required";
        }
        if (
          !!!values.testCases[i].visibility ||
          values.testCases[i].visibility < 0 ||
          values.testCases[i].visibility > 2
        ) {
          errors.visibility = "Visibility must be validly selected";
        }
      }
    }
    console.log(errors);
    dispatch(validateTestEditor(Object.entries(errors).length === 0));
    return errors;
  };

  return (
    <Formik
      initialValues={{ testCases: testCases }}
      onSubmit={(values: { testCases: TestCaseField[] }) => {
        if (testEditorIsValid) {
          console.log("submitted actually");
          dispatch(updateTestCases(values.testCases));
        }
      }}
      innerRef={props.formRef}
      validate={validate}
      render={({ values, setFieldValue }) => (
        <Form>
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
                      console.log(values);
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
