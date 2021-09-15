import { all } from "redux-saga/effects";
import authSaga from "../auth/auth.sagas";

export default function* rootSaga() {
	yield all([authSaga()]);
}
