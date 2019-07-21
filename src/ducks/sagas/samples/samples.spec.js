import { all } from "redux-saga/effects";

import samplesSaga from "./samples";

describe("samples saga", () => {
  test("samples saga", () => {
    const saga = samplesSaga();

    expect(saga.next().value).toEqual(all([]));
  });
});
