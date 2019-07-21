import { all } from "redux-saga/effects";

import samplesSaga from "./samples/samples";

export default function* rootSaga() {
  yield all([samplesSaga()]);
}
