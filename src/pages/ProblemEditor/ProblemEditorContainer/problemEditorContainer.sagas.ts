import { select, takeEvery } from "redux-saga/effects";
import { RootState } from "../../../app/common/store";
import { IProblem } from "../../../shared/types";
import {
  ProblemEditorContainerState,
  requestAddProblem,
} from "./problemEditorContainerSlice";

function* handleAddProblemRequest() {
  const state: RootState = yield select();
  const problemState = state.problemEditorContainer;
  // preparing the payload

  const language = "C++";

  const newProblem: IProblem = {
    // moduleId : FIGURE THIS OUT
    ...problemState.metadata, // TODO configure date to iso
    language,
    ...problemState.problem,
    statement: problemState.problem.problemStatement,
    ...problemState.codeEditor,
    testCases: problemState.testCases,
    ...problemState.serverConfig,
  };
}

function* problemSaga() {
  yield takeEvery(requestAddProblem.type, handleAddProblemRequest);
}

export default problemSaga;
