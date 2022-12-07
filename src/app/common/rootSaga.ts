import { all } from "redux-saga/effects";
import codeEditorsaga from "../../pages/CodeEditor/CodeEditor.sagas";
import loginSaga from "../../pages/Login/LoginPage.sagas";
import modulesSaga from "../../pages/modules/ModulesPage.sagas";
import gradingSaga from "../../pages/grading/GradingDialog.sagas";
import accountManagerSaga from "../../pages/accounts/AdminAccountsPage.sagas";
import problemSaga from "../../pages/ProblemEditor/ProblemEditorContainer/problemEditorContainer.sagas";
import landingPageSaga from "../../pages/LandingPage/LandingPage.sagas";
import contentSaga from "../../pages/ContentEditor/contentEditorPage.sagas";

/** Place additional saga functions in the array */
export default function* rootSaga() {
  yield all([
    loginSaga(),
    codeEditorsaga(),
    modulesSaga(),
    gradingSaga(),
    accountManagerSaga(),
    landingPageSaga(),
    problemSaga(),
    contentSaga(),
  ]);
}
