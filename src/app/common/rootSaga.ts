import { all } from "redux-saga/effects";
import authSaga from "../Login/Login.sagas";

export default function* rootSaga() {
	yield all([authSaga()]);
}
