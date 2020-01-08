import {call, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {postResourceUpload} from "../../api/resources";

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
    console.log(response);
  }
  catch (error) {
    console.log(error.response.data);
  }
}