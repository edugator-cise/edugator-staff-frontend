import { Formik, Form, FieldArray, ArrayHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  ProblemEditorContainerState,
  requestUpdateProblemSuccess,
  requestUpdateProblemFailure,
  requestAddProblemFailure,
  updateTestCases,
  requestAddProblemSuccess,
} from "state/problemEditorContainerSlice";
import { Stack, Button, Alert } from "@mui/material";
import { TestCase } from "./TestCase";
import { generateDefaultTestCase, TestCaseField } from "./TestCase.utils";
import { RootState } from "lib/store/store";
import { IProblem } from "lib/shared/types";
import apiClient from "lib/api/apiClient";
import { apiRoutes } from "constants/apiRoutes";

interface Props {
  formRef: any;
}

const requestAddOrEditProblem = async (
  value: ProblemEditorContainerState,
  type: "add" | "edit"
) => {
  const problemState = value;

  // preparing the payload
  const language = "C++";

  let problem: IProblem = {
    ...problemState.metadata,
    language,
    dueDate: problemState.metadata.dueDate,
    templatePackage: problemState.problem.templatePackage,
    statement: problemState.problem.problemStatement,
    ...problemState.codeEditor,
    testCases: problemState.testCases,
    ...problemState.serverConfig,
  };
  if (type == "add") {
    const newProblem = { moduleId: problemState.moduleId, ...problem };
    await apiClient.post(apiRoutes.admin.createProblem, newProblem);
  } else {
    await apiClient.put(
      apiRoutes.admin.editProblem(problemState.problemId as string),
      problem
    );
  }
};

//https://formik.org/docs/api/fieldarray
export const TestEditor = (props: Props) => {
  const dispatch = useDispatch();
  const problemEditorContainer = useSelector(
    (state: RootState) => state.problemEditorContainer
  );
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
      onSubmit={async (values: { testCases: TestCaseField[] }) => {
        dispatch(updateTestCases(values.testCases));

        if (problemId) {
          try {
            requestAddOrEditProblem(problemEditorContainer, "edit");
            dispatch(requestUpdateProblemSuccess());
          } catch (e) {
            dispatch(requestUpdateProblemFailure(e));
          }
        } else {
          try {
            await requestAddOrEditProblem(problemEditorContainer, "add");
            dispatch(requestAddProblemSuccess());
          } catch (e) {
            dispatch(requestAddProblemFailure());
          }
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
