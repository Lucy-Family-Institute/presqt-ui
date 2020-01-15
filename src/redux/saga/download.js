import {call, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {getResourceDownload, resourceDownloadJob} from "../../api/resources";

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
      let downloadFinished = false;

      // Keep checking in on the download job endpoint until the download finishes or fails
      while (!downloadFinished) {
        yield put(actionCreators.resources.downloadJob());

        const downloadJobResponse = yield call(
          resourceDownloadJob,
          response.data.download_job,
          action.payload.sourceTargetToken
        );

        // Download successful!
        if (downloadJobResponse.headers['content-type'] === 'application/zip') {
          const downloadJobResponseData = new Blob(
            [downloadJobResponse.data],
            {type : 'application/json'}
          );
          yield put(actionCreators.resources.downloadJobSuccess(downloadJobResponseData, 'success'));
          downloadFinished = true;
        }
        // Download pending!
        else {
          yield put(actionCreators.resources.downloadJobSuccess(null, 'pending'));
          setTimeout(1);
        }
      }
    }
    // Download failed!
    catch (error) {
      const downloadJobResponseData = new Blob(
        [error.response.data],
        {type : 'application/json'}
      );
      const errorData = yield call(getErrorData, downloadJobResponseData);
      yield put(actionCreators.resources.downloadJobSuccess(JSON.parse(errorData), 'failure'));
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
  return downloadJobResponseData.text();
}