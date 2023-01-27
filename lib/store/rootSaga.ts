import { all } from "redux-saga/effects";
import loginSaga from "../../src/pages/Login/LoginPage.sagas";
import modulesSaga from "../../src/pages/modules/ModulesPage.sagas";
import gradingSaga from "../../src/pages/grading/GradingDialog.sagas";
import accountManagerSaga from "../../src/pages/accounts/AdminAccountsPage.sagas";
import problemSaga from "../../src/pages/ProblemEditor/ProblemEditorContainer/problemEditorContainer.sagas";
import contentSaga from "../../src/pages/ContentEditor/contentEditorPage.sagas";

/** Place additional saga functions in the array */
export default function* rootSaga() {
  yield all([
    loginSaga(),
    modulesSaga(),
    gradingSaga(),
    accountManagerSaga(),
    problemSaga(),
    contentSaga(),
  ]);
}
