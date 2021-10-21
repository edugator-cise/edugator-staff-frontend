import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import {
  updateTestCases,
  validateTestEditor,
} from "../ProblemEditorContainer/problemEditorContainerSlice";
import { Stack } from "@mui/material";
import { TestCase } from "./TestCase";
import { generateDefaultTestCase } from "./TestCase.utils";

interface Props {
  formRef: any;
}

export const TestEditor = (props: Props) => {
  const dispatch = useDispatch();

  const initialValues = useAppSelector(
    (state) => state.problemEditorContainer.testCases
  );

  const validate = (values: TestCaseField[]) => {
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
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(updateTestCases(values));
      }}
      innerRef={props.formRef}
      validate={validate}
    >
      {({ errors, values: TestCaseField[], handleChange, handleBlur, touched }) => (
        <Form style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <FieldArray
            name="friends"
            render={(arrayHelpers) => (
              <Stack>
                {values && values.length > 0 ? (
                  values.map((testCase, index) => <TestCase index={index} />)
                ) : (
                  <button type="button" onClick={() => 
                  {
                    values.push(
                      generateDefaultTestCase()
                    );
                    dispatch(updatedTestCases())}>
                  }
                    
                    {/* show this when user has removed all friends from the list */}
                    Add a friend
                  </button>
                )}
              </Stack>
            )}
          />
        </Form>
      )}
    </Formik>
  );
};
