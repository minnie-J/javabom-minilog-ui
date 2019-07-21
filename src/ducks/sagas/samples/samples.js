import { all, call } from "redux-saga/effects";

import { logger } from "../../../logger";

// Workers

// Watchers

export default function* samplesSaga() {
  try {
    yield all([]);
  } catch (error) {
    logger.error(`[ducks.sagas.samples.samplesSaga] ${error.toString()}`);
    yield call(samplesSaga);
  }
}
