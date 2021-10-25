import { all } from "redux-saga/effects";
import codeEditorsaga from "../../pages/CodeEditor/CodeEditor.sagas";
import loginSaga from "../../pages/Login/LoginPage.sagas";
import modulesSaga from "../../pages/modules/ModulesPage.sagas";

/** Place additional saga functions in the array */
export default function* rootSaga() {
  yield all([loginSaga(), codeEditorsaga(), modulesSaga()]);
}
