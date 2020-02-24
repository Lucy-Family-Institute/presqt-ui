import {all} from 'redux-saga/effects';

import {watchLoadTargets} from "./targets";
import {
  watchRefreshSource,
  watchSearch,
  watchSelectResource,
  watchSwitchTarget
} from "./resources";
import {watchCancelDownload, watchResourceDownload} from "./download";
import {watchCancelUpload, watchResourceUpload} from "./upload";
import {watchSwitchTransferTarget} from "./transfer";

// Notice how we now only export the rootSaga single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchLoadTargets(),
    watchSwitchTarget(),
    watchSelectResource(),
    watchSearch(),
    watchResourceDownload(),
    watchResourceUpload(),
    watchRefreshSource(),
    watchCancelDownload(),
    watchCancelUpload(),
    watchSwitchTransferTarget()
  ]);
}
