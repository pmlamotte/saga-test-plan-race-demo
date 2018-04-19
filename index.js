const { call, put, take, select, race } = require("redux-saga/effects");

function toggleModal(modalName, show) {
	return { type: "TOGGLE_MODAL", payload: { modalName, show } }
}

function userSelector(state) {
	return state.user;
}

const SOME_ACTION = "SOME_ACTION";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
const SIGNUP_ABORT = "SIGNUP_ABORT";
const SIGNIN_ABORT = "SIGNIN_ABORT";

function someProcess() {
	return true;
}

function* watchProcessCallAndEnforceUserSignedIn() {
  while (true) { //eslint-disable-line
    yield take(SOME_ACTION);
    const user = yield select(userSelector);
    if (user) {
      yield call(someProcess);
    } else {
      // opens a signin modal (that can be switched to a signup) and wait for user signin or signup
      yield put(toggleModal('signin', true)); 

      const { success, abort } = yield race({
        success: take([
          SIGNUP_SUCCESS,
          SIGNIN_SUCCESS
        ]),
        abort: take([
          SIGNUP_ABORT,
          SIGNIN_ABORT
        ])
      });

      if (success) {
        yield call(someProcess);
      }
    }
  }
}

module.exports = {
	someProcess,
	watchProcessCallAndEnforceUserSignedIn
};
