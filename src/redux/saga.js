import { put, takeEvery, all, call } from 'redux-saga/effects';

import { getTargets } from '../api/target';
import { getSourceTargetResources } from '../api/resources';
import { actionCreators } from './actionCreators';

function* watchLoadTargets() {
  yield takeEvery(actionCreators.targets.load, loadTargets);
}

function* loadTargets() {
  const response = yield call(getTargets);
  yield put(actionCreators.targets.loadSuccess(response.data));
}

function* watchSwitchSource() {
  yield takeEvery(
    actionCreators.targets.switchSource,
    loadSourceTargetResources
  );
}

function* loadSourceTargetResources(action) {
  const response = yield call(
    getSourceTargetResources,
    action.payload.sourceTarget,
    action.payload.sourceTargetToken // TODO: Convert to object destructuring.
  );
  yield put(actionCreators.resources.loadSuccess(response.data));
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchLoadTargets(), watchSwitchSource()]);
}
