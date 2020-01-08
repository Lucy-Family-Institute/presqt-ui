import {call, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {postResourceUpload, resourceDownloadJob, resourceUploadJob} from "../../api/resources";

export function* watchSourceResourceUpload() {
  yield takeEvery(actionCreators.resources.uploadToSourceTarget, uploadSourceTargetResource)
}

function* uploadSourceTargetResource(action) {
  try {
    const response = yield call(
      postResourceUpload,
      action.payload.file,
      action.payload.resource,
      action.payload.sourceTargetToken
    );

    yield put(actionCreators.resources.uploadToSourceTargetSuccess());

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
          console.log('done!');
          yield put(actionCreators.resources.uploadJobSuccess(uploadJobResponse.data, 'success'));
          uploadFinished = true;
        }
        else {
          console.log('pending');
          yield put(actionCreators.resources.uploadJobSuccess(null, 'pending'));
          setTimeout(1);
        }
      }
    }
    // HANDLE 500 FROM UPLOAD JOB TO DISPLAY IN MODAL
    catch (error) {
      console.log('error1');
      console.log(error)
    }
  }
  // DISPATCH INITIAL UPLOAD FAILURE
  catch (error) {
    console.log('error2');
    console.log(error);
  }
}