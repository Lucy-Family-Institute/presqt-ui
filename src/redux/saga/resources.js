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

    try {
      let download_finished = false;

      while (!download_finished) {
        yield put(actionCreators.resources.downloadJob());

        const downloadJobResponse = yield call(
          resourceDownloadJob,
          response.data.download_job,
          action.payload.sourceTargetToken
        );

        if (downloadJobResponse.headers['content-type'] === 'application/zip') {
          console.log('done!');
          const downloadJobResponseData = new Blob(
            [downloadJobResponse.data],
            {type : 'application/json'}
          );
          yield put(actionCreators.resources.downloadJobSuccess(downloadJobResponseData));
          download_finished = true;
        }
        else {
          console.log('failure or pending!!!');
          yield put(actionCreators.resources.downloadJobPending());
          setTimeout(1);
        }
      }

    }
    catch (error) {
      console.log('download job failure');

      const downloadJobResponseData = new Blob(
        [error.response.data],
        {type : 'application/json'}
      );

      const reader = new FileReader();
      reader.readAsText(downloadJobResponseData);
      reader.onloadend = (event) => {
        console.log(JSON.parse(reader.result))
      };
      // ONLY MOVE ON TO THIS AFTER THE FILEREADER IS DONE AND HAVE THE CONTENTS OF THE BLOBBOI!!
      // yield put(actionCreators.resources.downloadJobFailure('hi'));
    }
  }
  catch (error) {
    yield put(actionCreators.resources.downloadFromSourceTargetFailure(
      error.response.status,
      error.response.data.error)
    );
  }
}