import { all } from "redux-saga/effects";
import modulesSaga from "../../pages/modules/ModulesPage.sagas";
import loginSaga from "../Login/Login.sagas";

/** Place additional saga functions in the array */
export default function* rootSaga() {
  yield all([loginSaga(), modulesSaga(),]);
}
