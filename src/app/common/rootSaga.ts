import { all } from "redux-saga/effects";
import loginSaga from "../../pages/Login/LoginPage.sagas";

/** Place additional saga functions in the array */
export default function* rootSaga() {
	yield all([loginSaga()]);
}
