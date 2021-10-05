import { all } from "redux-saga/effects";
import loginSaga from "../Login/Login.sagas";
import codeEditorsaga from "../../pages/CodeEditor/CodeEditor.sagas"

/** Place additional saga functions in the array */
export default function* rootSaga() {
  yield all([loginSaga(), codeEditorsaga()]);
}
