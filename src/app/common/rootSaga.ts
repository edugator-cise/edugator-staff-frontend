import { all } from "redux-saga/effects";
import authSaga from "../Login/Login.sagas";

/** Place additional saga functions in the array */
export default function* rootSaga() {
  yield all([authSaga()]);
}
