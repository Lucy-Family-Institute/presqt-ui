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
import {
  watchCancelTransfer,
  watchResourceTransfer,
  watchSelectTransferResource,
  watchSwitchTransferTarget, watchTransferRefreshSource
} from "./transfer";
import { watchSubmitIssue } from "./github";
import { watchLoadServices, watchLoadService } from './services';

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
    watchSwitchTransferTarget(),
    watchResourceTransfer(),
    watchSelectTransferResource(),
    watchTransferRefreshSource(),
    watchCancelTransfer(),
    watchSubmitIssue(),
    watchLoadServices(),
    watchLoadService()
  ]);
}