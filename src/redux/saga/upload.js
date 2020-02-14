import {call, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {
  cancelResourceDownloadJob, cancelResourceUploadJob,
  postResourceUpload,
  resourceUploadJob
} from "../../api/resources";

export function* watchSourceResourceUpload() {
  yield takeEvery(actionCreators.resources.uploadToSourceTarget, uploadSourceTargetResource)
}

function* uploadSourceTargetResource(action) {
  try {
    const response = yield call(
      postResourceUpload,
      action.payload.sourceTarget,
      action.payload.file,
      action.payload.duplicateAction,
      action.payload.resourceToUploadTo,
      action.payload.sourceTargetToken
    );
    yield put(actionCreators.resources.uploadToSourceTargetSuccess(response.data));

    // Kick off the upload job endpoint check-in
    try {
      let uploadFinished = false;

      while (!uploadFinished) {
        yield put(actionCreators.resources.uploadJob());

        const uploadJobResponse = yield call(
          resourceUploadJob,
          response.data.upload_job,
          action.payload.sourceTargetToken
        );

        // Upload successful!
        if (uploadJobResponse.status === 200) {
          yield put(actionCreators.resources.uploadJobSuccess(uploadJobResponse.data, 'success'));
          uploadFinished = true;
        }
        else {
          yield put(actionCreators.resources.uploadJobSuccess(null, 'pending'));
          setTimeout(1);
        }
      }
    }
    // Upload failed because of target API error
    catch (error) {
      if (error.response.status === 500) {
        if (error.response.data.status_code === '499'){
          yield put(actionCreators.resources.uploadJobSuccess(error.response.data, 'cancelSuccess'));
        }
        else {
          yield put(actionCreators.resources.uploadJobSuccess(error.response.data, 'failure'));
        }
      }
      else {
        yield put(actionCreators.resources.uploadJobFailure(
          error.response.status,
          error.response.data.error)
      )}
    }
  }
  // Upload failed because of PresQT API error
  catch (error) {
    yield put(actionCreators.resources.uploadToSourceTargetFailure(
      error.response.status,
      error.response.data.error)
    )}
}

// Cancel Upload
export function* watchCancelUpload() {
  yield takeEvery(actionCreators.resources.cancelUpload, cancelUpload)
}

function* cancelUpload(action) {
  try {
    yield call(
      cancelResourceUploadJob,
      action.payload.ticketNumber,
      action.payload.sourceTargetToken
    );

    yield put(actionCreators.resources.cancelUploadSuccess())

  }

  catch (error) {
    yield put(actionCreators.resources.cancelUploadFailure(
      error.response.status,
      error.response.data.error)
    )
  }
}