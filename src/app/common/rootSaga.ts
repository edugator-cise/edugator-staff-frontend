import { all } from "redux-saga/effects";
import loginSaga from "../Login/Login.sagas";

/** Place additional saga functions in the array */
export default function* rootSaga() {
  yield all([loginSaga()]);
}
