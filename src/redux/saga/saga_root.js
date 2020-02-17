import {all} from 'redux-saga/effects';

import {watchLoadTargets} from "./targets";
import {
  watchRefreshSource,
  watchSearch,
  watchSelectResource,
  watchSwitchTarget
} from "./resources";
import {watchCancelDownload, watchSourceResourceDownload} from "./download";
import {watchCancelUpload, watchSourceResourceUpload} from "./upload";

// Notice how we now only export the rootSaga single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchLoadTargets(),
    watchSwitchTarget(),
    watchSelectResource(),
    watchSearch(),
    watchSourceResourceDownload(),
    watchSourceResourceUpload(),
    watchRefreshSource(),
    watchCancelDownload(),
    watchCancelUpload()
  ]);
}
