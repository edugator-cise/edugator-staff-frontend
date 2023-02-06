import { all } from "redux-saga/effects";
import gradingSaga from "../../src/pages/grading/GradingDialog.sagas";
import contentSaga from "../../src/pages/ContentEditor/contentEditorPage.sagas";

/** Place additional saga functions in the array */
export default function* rootSaga() {
  yield all([
    gradingSaga(),
    contentSaga(),
  ]);
}
