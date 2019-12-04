import {call, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {getTargets} from "../../api/target";

/** Target Collection **/
export function* watchLoadTargets() {
  yield takeEvery(actionCreators.targets.load, loadTargets);
}

function* loadTargets() {
  const response = yield call(getTargets);
  yield put(actionCreators.targets.loadSuccess(response.data));
}

