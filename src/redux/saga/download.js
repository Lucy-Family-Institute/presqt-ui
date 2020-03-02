import {call, delay, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {
  cancelResourceDownloadJob,
  getResourceDownload,
  resourceDownloadJob
} from "../../api/download";

export function* watchResourceDownload() {
  yield takeEvery(actionCreators.download.downloadResource, downloadTargetResource)
}

function* downloadTargetResource(action) {
  try {
    const response = yield call(
      getResourceDownload,
      action.payload.resource,
      action.payload.targetToken
    );

    yield put(actionCreators.download.downloadFromTargetSuccess(response.data));

    // Kick off the download job endpoint check-in
    try {
      let downloadFinished = false;

      // Keep checking in on the download job endpoint until the download finishes or fails
      while (!downloadFinished) {
        yield put(actionCreators.download.downloadJob());

        const downloadJobResponse = yield call(
          resourceDownloadJob,
          response.data.download_job,
          action.payload.targetToken
        );

        // Download successful!
        if (downloadJobResponse.headers['content-type'] === 'application/zip') {
          const downloadJobResponseData = new Blob(
            [downloadJobResponse.data],
            {type : 'application/json'}
          );
          yield put(actionCreators.download.downloadJobSuccess(downloadJobResponseData, 'success'));
          downloadFinished = true;
        }
        // Download pending!
        else {
          yield put(actionCreators.download.downloadJobSuccess(null, 'pending'));
          yield delay(1000);
        }
      }
    }
    // Download failed!
    catch (error) {
      if (error.response.status === 500) {
        const downloadJobResponseData = new Blob(
          [error.response.data],
          {type : 'application/json'}
        );
        const errorData = yield call(getErrorData, downloadJobResponseData);
        if (JSON.parse(errorData).status_code === '499') {
          yield put(actionCreators.download.downloadJobSuccess(JSON.parse(errorData), 'cancelled'));
        }
        else {
          yield put(actionCreators.download.downloadJobSuccess(JSON.parse(errorData), 'failure'));
        }
      }
      else {
        const downloadJobResponseData = new Blob(
          [error.response.data],
          {type : 'application/json'}
        );
        const errorData = yield call(getErrorData, downloadJobResponseData);
        yield put(actionCreators.download.downloadJobFailure(
          error.response.status,
          JSON.parse(errorData).error));
      }
    }
  }
  catch (error) {
    yield put(actionCreators.download.downloadFromTargetFailure(
      error.response.status,
      error.response.data.error)
    );
  }
}

function getErrorData(downloadJobResponseData) {
  return downloadJobResponseData.text();
}

// Cancel Download
export function* watchCancelDownload() {
  yield takeEvery(actionCreators.download.cancelDownload, cancelDownload)
}

function* cancelDownload(action) {
  try {
    yield call(
      cancelResourceDownloadJob,
      action.payload.ticketNumber,
      action.payload.targetToken
    );

    yield put(actionCreators.download.cancelDownloadSuccess())

  }

  catch (error) {
    yield put(actionCreators.download.cancelDownloadFailure(
      error.response.status,
      error.response.data.error)
    )
  }

}