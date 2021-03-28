import { all } from "redux-saga/effects";

/**
 * Import custom sagas
 */
import sampleSaga from "./sampleSaga";

/**
 * rootSaga
 */
export default function* () {
  yield all([sampleSaga()]);
}
