import { all } from "redux-saga/effects";
import authSaga from "../Login/auth.sagas";

export default function* rootSaga() {
	yield all([authSaga()]);
}
