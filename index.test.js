const { expectSaga } = require("redux-saga-test-plan");
const { someProcess, watchProcessCallAndEnforceUserSignedIn } = require("./index");

describe("saga signin test", () => {
  test("Calls on success", () => {
    return expectSaga(watchProcessCallAndEnforceUserSignedIn)
      .dispatch({type: "SOME_ACTION"})
      .withState({})
      .dispatch({ type: "SIGNUP_SUCCESS"})
      .call(someProcess)
      .silentRun();
  });
})
