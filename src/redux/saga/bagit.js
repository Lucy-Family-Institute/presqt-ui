import {call, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {submitBagit} from "../../api/bagit";

export function* watchSubmitBagitFile() {
  yield takeEvery(actionCreators.bagit.submitBagitFile, submitBagitFile)
}

function* submitBagitFile(action) {
  try {
    const response = yield call(
      submitBagit,
      action.payload.file
    );
    // Get the zip file
    const bagitResponseData = new Blob(
      [response.data],
      { type: 'application/json' }
    );

    yield put(actionCreators.bagit.submitBagitFileSuccess(bagitResponseData))
  }
  catch (error) {
    const bagitResponseData = new Blob(
      [error.response.data],
      {type : 'application/json'}
    );
    const errorData = yield call(getErrorData, bagitResponseData);

    yield put(actionCreators.bagit.submitBagitFileFailure(JSON.parse(errorData).error, error.response.status))
  }
}

function getErrorData(downloadJobResponseData) {
  return downloadJobResponseData.text();
}