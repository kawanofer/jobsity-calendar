import { all } from "redux-saga/effects";

import reminder from "./reminder/sagas";

export default function* rootSaga() {
	return yield all([reminder]);
}
