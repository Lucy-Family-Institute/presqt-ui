// TODO: Load Resource Details when resource is selected.
import {call, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {getResourceDetail, getTargetResources, getTargetResourcesSearch, getResourceDownload, resourceDownloadJob} from "../../api/resources";

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
    action.payload.sourceTargetToken
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

/**
 * Make an Axios request to Resource Collection with search parameter.
 *  Dispatch either the success or failure actions accordingly.
 **/
export function* watchSearch() {
  yield takeEvery(actionCreators.resources.loadFromSourceTargetSearch, loadSourceTargetResourcesSearch);
}

function* loadSourceTargetResourcesSearch(action) {
  try {
    const response = yield call(
    getTargetResourcesSearch,
    action.payload.sourceTarget,
    action.payload.sourceTargetToken,
    action.payload.searchValue
    );
    yield put(actionCreators.resources.loadFromSourceTargetSearchSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.resources.loadFromSourceTargetSearchFailure(
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

// Resource Download
export function* watchSourceResourceDownload() {
  yield takeEvery(actionCreators.resources.downloadResource, downloadSourceTargetResource)
}

function* downloadSourceTargetResource(action) {
  try {
    const response = yield call(
    getResourceDownload,
    action.payload.resource,
    action.payload.sourceTargetToken
    );

    yield put(actionCreators.resources.downloadFromSourceTargetSuccess(response.data));

    // Kick off the download job endpoint check-in
    try {
      let download_finished = false;

      // Keep checking in on the download job endpoint until the download finishes or fails
      while (!download_finished) {
        yield put(actionCreators.resources.downloadJob());

        const downloadJobResponse = yield call(
          resourceDownloadJob,
          response.data.download_job,
          action.payload.sourceTargetToken
        );

        // Download successful!
        if (downloadJobResponse.headers['content-type'] === 'application/zip') {
          console.log('Done!');
          const downloadJobResponseData = new Blob(
            [downloadJobResponse.data],
            {type : 'application/json'}
          );

          yield put(actionCreators.resources.downloadJobSuccess(downloadJobResponseData));
          download_finished = true;
        }
        // Download pending!
        else {
          console.log('Pending!!!');
          yield put(actionCreators.resources.downloadJobPending());
          setTimeout(1);
        }
      }
    }
    // Download failed!
    catch (error) {
      console.log('Failure');
      const downloadJobResponseData = new Blob(
        [error.response.data],
        {type : 'application/json'}
      );
      const errorData = yield call(getErrorData, downloadJobResponseData);
      yield put(actionCreators.resources.downloadJobFailure(errorData));
    }
  }
  catch (error) {
    yield put(actionCreators.resources.downloadFromSourceTargetFailure(
      error.response.status,
      error.response.data.error)
    );
  }
}

function getErrorData(downloadJobResponseData) {
  return JSON.parse(downloadJobResponseData.text());
}