import { all, call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { SAGA_ACTION, action } from "actions"; // // replace with your path/to/actions

export function* handler() {
  try {
    const config = {
      method: "GET",
      url: `url`
    };
    const { data } = yield call(axios, config);
    yield put(action(data));
  } catch (error) {
    // console.error(error);
  }
}

export default function*() {
  yield all([takeLatest(SAGA_ACTION, handler)]);
}
