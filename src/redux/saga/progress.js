import { call, put, delay, takeEvery } from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import { getCollectionProgress } from "../../api/progress";

export function* watchCollectionProgress() {
  yield takeEvery(
    actionCreators.resources.loadCollectionProgress,
    loadCollectionProgress
  );
}

/**
 * Make an Axios request to Collection job.
 * Dispatch either the success or failure actions accordingly.
 **/
function* loadCollectionProgress(action) {
  let percentage = 0;
  let status = "";
  while (status != "in_progress") {
    try {
      const response = yield call(
        getCollectionProgress,
        action.payload.targetToken
      );
      // Update the status
      status = response.data.status;
    } catch (error) {
      console.log(error);
    }
  }

  while (percentage != 100) {
    try {
      const response = yield call(
        getCollectionProgress,
        action.payload.targetToken
      );
      // Update the percentage to the current percentage.....percentage
      percentage = response.data.job_percentage;
      yield put(
        actionCreators.resources.loadCollectionProgressSuccess(response.data)
      );
    } catch (error) {
      console.log(error);
    }
    yield delay(2000);
  }
}
