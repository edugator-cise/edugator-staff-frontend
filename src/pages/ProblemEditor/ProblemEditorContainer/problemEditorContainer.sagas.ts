import { select, takeEvery } from "redux-saga/effects";
import { RootState } from "../../../app/common/store";
import {
  ProblemEditorContainerState,
  requestAddProblem,
} from "./problemEditorContainerSlice";

function* handleAddProblemRequest() {
  const state: RootState = yield select();
  console.log("STATE SHOULD BE HERE", state.problemEditorContainer);
}

function* problemSaga() {
  yield takeEvery(requestAddProblem.type, handleAddProblemRequest);
}

export default problemSaga;
