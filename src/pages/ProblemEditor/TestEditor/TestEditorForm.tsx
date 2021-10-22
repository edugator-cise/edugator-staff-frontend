import React, { useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
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

  const validate = (values: { testCases: TestCaseField[] }) => {
    const errors: any = {};
    // for (let i = 0; i < values.length; i++)
    // {
    //   const error: any = {};

    //   if (values[i].expectedOutput === "")
    //   {
    //     error.expectedOutput = "Required";

    //   }
    //   if values[i]
    // }
    // if (values.title === "") {
    //   errors.title = "Required";
    // }

    // if (dateError.message) {
    //   errors.dueDate = dateError.message;
    // }

    dispatch(validateTestEditor(Object.entries(errors).length === 0));
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
      render={({ values, setFieldValue }) => (
        <Form>
          <FieldArray name="testCases">
            {(arrayHelpers) => {
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
