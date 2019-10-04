// TODO: Start to break this apart!
// TODO: Load Resource Details when resource is selected.
import { put, takeEvery, all, call } from 'redux-saga/effects';

import { getTargets } from '../api/target';
import { getTargetResources, getResourceDetail } from '../api/resources';
import { actionCreators } from './actionCreators';

function* watchLoadTargets() {
  yield takeEvery(actionCreators.targets.load, loadTargets);
}

function* watchSwitchSource() {
  yield takeEvery(
    actionCreators.resources.loadFromSourceTarget,
    loadSourceTargetResources
  );
}

function* watchSelectSourceResource() {
  yield takeEvery(
    actionCreators.resources.selectSourceResource,
    loadResourceDetail
  );
}

function* loadTargets() {
  const response = yield call(getTargets);
  yield put(actionCreators.targets.loadSuccess(response.data));
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

function* loadSourceTargetResources(action) {
  console.log(action);

  const response = yield call(
    getTargetResources,
    action.payload.sourceTarget.name,
    action.payload.sourceTargetToken
  );
  yield put(
    actionCreators.resources.loadFromSourceTargetSuccess(response.data)
  );
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchSelectSourceResource(),
    watchLoadTargets(),
    watchSwitchSource()
  ]);
}
