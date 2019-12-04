// TODO: Load Resource Details when resource is selected.
import {call, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {getResourceDetail, getTargetResources} from "../../api/resources";

/** Resource Collection **/
export function* watchSwitchSource() {
  yield takeEvery(actionCreators.resources.loadFromSourceTarget, loadSourceTargetResources);
}

function* loadSourceTargetResources(action) {
  const response = yield call(
    getTargetResources,
    action.payload.sourceTarget.name,
    action.payload.sourceTargetToken
  );
  yield put(actionCreators.resources.loadFromSourceTargetSuccess(response.data));
}

/** Resource Detail **/
export function* watchSelectSourceResource() {
  yield takeEvery(actionCreators.resources.selectSourceResource, loadResourceDetail);
}

function* loadResourceDetail(action) {
  const response = yield call(
    getResourceDetail,
    action.payload.resource,
    action.payload.sourceTargetToken
  );

  yield put(
    actionCreators.resources.selectSourceResourceSuccess(response.data)
  );
}