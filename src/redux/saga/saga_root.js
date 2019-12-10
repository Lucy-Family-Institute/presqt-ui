import {all} from 'redux-saga/effects';

import {watchLoadTargets} from "./targets";
import {watchSelectSourceResource, watchSwitchSource} from "./resources";

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchLoadTargets(),
    watchSwitchSource(),
    watchSelectSourceResource(),
  ]);
}
