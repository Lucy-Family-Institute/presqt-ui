import {call, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {getTargetResources} from "../../api/resources";

/** Resource Collection For Transfer Resource Browser **/
export function* watchSwitchTransferTarget() {
  yield takeEvery(actionCreators.resources.loadFromTransferTarget, loadTransferTargetResources);
}

/**
 * Make an Axios request to Resource Collection.
 * Dispatch either the success or failure actions accordingly.
 **/
function* loadTransferTargetResources(action) {
  try {
    const response = yield call(
      getTargetResources,
      action.payload.target,
      action.payload.targetToken
    );
    yield put(actionCreators.resources.loadFromTransferTargetSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.resources.loadFromTransferTargetFailure(
      error.response.status,
      error.response.data.error)
    );
  }
}