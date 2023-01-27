import { all } from "redux-saga/effects";
import loginSaga from "../../pages/Login/LoginPage.sagas";
import modulesSaga from "../../pages/modules/ModulesPage.sagas";
import gradingSaga from "../../pages/grading/GradingDialog.sagas";
import accountManagerSaga from "../../pages/accounts/AdminAccountsPage.sagas";
import problemSaga from "../../pages/ProblemEditor/ProblemEditorContainer/problemEditorContainer.sagas";
import contentSaga from "../../pages/ContentEditor/contentEditorPage.sagas";

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
