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
  // The file on the backend doesn't update immediately, so if it's 'finished', we want to wait until
  // it's 'in_progress' again.
  while (status != "in_progress") {
    try {
      const response = yield call(
        getCollectionProgress,
        action.payload.targetToken
      );
      // Update the status
      status = response.data.status;
    } catch (error) {
      // Exit this loop
      status = 'in_progress';
      yield delay(1000)
    }
  }
  // Keep hitting the status endpoint until the percentage == 99, 
  // which indicates the process is complete (There's a bit of a lag as the FE builds resources)
  while (percentage != 99) {
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
      // Exit this process
      percentage = 99;
    }
    yield delay(1000);
  }
}
