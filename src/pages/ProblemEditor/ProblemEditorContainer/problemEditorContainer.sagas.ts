import { select, takeEvery } from "redux-saga/effects";
import {
  ProblemEditorContainerState,
  requestAddProblem,
} from "./problemEditorContainerSlice";

function* handleAddProblemRequest() {
  const state: ProblemEditorContainerState = yield select();
  console.log("STATE SHOULD BE HERE", state);
}

function* problemSaga() {
  yield takeEvery(requestAddProblem.type, handleAddProblemRequest);
}

export default problemSaga;
