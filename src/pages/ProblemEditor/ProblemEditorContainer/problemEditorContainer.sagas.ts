import { call, select, takeEvery } from "redux-saga/effects";
import { RootState } from "../../../app/common/store";
import { IProblem } from "../../../shared/types";
import { requestAddProblem } from "./problemEditorContainerSlice";
import apiClient from "../../../app/common/apiClient";

function* handleAddProblemRequest(): any {
  const state: RootState = yield select();
  const problemState = state.problemEditorContainer;

  // preparing the payload
  const language = "C++";

  const newProblem: IProblem = {
    //moduleId: "111111111111111111111111",
    ...problemState.metadata,
    language,
    dueDate: problemState.metadata.dueDate.toISOString(),
    ...problemState.problem,
    statement: problemState.problem.problemStatement,
    ...problemState.codeEditor,
    testCases: problemState.testCases,
    ...problemState.serverConfig,
  };

  const newProblemRequest = () =>
    apiClient.post("/v1/admin/problem/", newProblem);

  try {
    const response = yield call(newProblemRequest);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

function* problemSaga() {
  yield takeEvery(requestAddProblem.type, handleAddProblemRequest);
}

export default problemSaga;
