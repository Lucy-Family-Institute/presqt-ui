// TODO: Load Resource Details when resource is selected.
import {call, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {getResourceDetail, getTargetResources, getTargetResourcesSearch} from "../../api/resources";

/** Resource Collection **/
export function* watchSwitchSource() {
  yield takeEvery(actionCreators.resources.loadFromSourceTarget, loadSourceTargetResources);
}

 /**
 * Make an Axios request to Resource Collection.
 * Dispatch either the success or failure actions accordingly.
 **/
function* loadSourceTargetResources(action) {
  try {
    const response = yield call(
    getTargetResources,
    action.payload.sourceTarget.name,
    action.payload.sourceTargetToken,
    action.payload.searchValue
    );
    yield put(actionCreators.resources.loadFromSourceTargetSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.resources.loadFromSourceTargetFailure(
      error.response.status,
      error.response.data.error)
    );
  }
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