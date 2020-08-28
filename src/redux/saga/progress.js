import { call, put, delay, takeEvery } from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import { getCollectionProgress, getDownloadProgress, getUploadProgress, getTransferProgress } from "../../api/progress";

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
      yield delay(2000)
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


export function* watchUploadProgress() {
  yield takeEvery(
    actionCreators.upload.loadUploadProgress,
    loadUploadProgress
  );
}

/**
 * Make an Axios request to Upload job.
 * Dispatch either the success or failure actions accordingly.
 **/
function* loadUploadProgress(action) {
  let percentage = 0;
  let status = "";
  let message = "Upload is being processed on the server";
  // The file on the backend doesn't update immediately, so if it's 'finished', we want to wait until
  // it's 'in_progress' again.
  while (status != "in_progress") {
    try {
      const response = yield call(
        getUploadProgress,
        action.payload.destinationToken
      );
      // Update the status
      status = response.data.status;
    } catch (error) {
      // Exit this loop
      status = 'in_progress';
      yield delay(2000)
    }
  }
  // Keep hitting the status endpoint until the percentage == 99, 
  // which indicates the process is complete (There's a bit of a lag as the FE builds resources)
  while (percentage != 99 && !message.includes('successful')) {
    try {
      const response = yield call(
        getUploadProgress,
        action.payload.destinationToken
      );
      // Update the percentage to the current percentage.....percentage
      percentage = response.data.job_percentage;
      message = response.data.message
      yield put(
        actionCreators.upload.loadUploadProgressSuccess(response.data)
      );
    } catch (error) {
      // Exit this process
      message = 'successful'
      percentage = 99;
    }
    yield delay(1000);
  }
}


export function* watchTransferProgress() {
  yield takeEvery(
    actionCreators.transfer.loadTransferProgress,
    loadTransferProgress
  );
}

/**
 * Make an Axios request to Transfer job.
 * Dispatch either the success or failure actions accordingly.
 **/
function* loadTransferProgress(action) {
  let percentage = 0;
  let status = "";
  let message = "Transfer is being processed on the server";
  // The file on the backend doesn't update immediately, so if it's 'finished', we want to wait until
  // it's 'in_progress' again.
  while (status != "in_progress") {
    try {
      const response = yield call(
        getTransferProgress,
        action.payload.destinationToken,
        action.payload.targetToken
      );
      // Update the status
      status = response.data.status;
    } catch (error) {
      // Exit this loop
      status = 'in_progress';
      yield delay(2000)
    }
  }
  // Keep hitting the status endpoint until the percentage == 99, 
  // which indicates the process is complete (There's a bit of a lag as the FE builds resources)
  while (percentage != 99 && !message.includes('successful')) {
    try {
      const response = yield call(
        getTransferProgress,
        action.payload.destinationToken,
        action.payload.targetToken
      );
      // Update the percentage to the current percentage.....percentage
      percentage = response.data.job_percentage;
      message = response.data.message
      yield put(
        actionCreators.transfer.loadTransferProgressSuccess(response.data)
      );
    } catch (error) {
      // Exit this process
      message = 'successful'
      percentage = 99;
    }
    yield delay(1000);
  }
}


export function* watchTransferCollectionProgress() {
  yield takeEvery(
    actionCreators.transfer.loadFromTransferTargetProgress,
    loadTransferCollectionProgress
  );
}

/**
 * Make an Axios request to Collection job.
 * Dispatch either the success or failure actions accordingly.
 **/
function* loadTransferCollectionProgress(action) {
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
      yield delay(2000)
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
        actionCreators.transfer.loadFromTransferTargetProgressSuccess(response.data)
      );
    } catch (error) {
      // Exit this process
      percentage = 99;
    }
    yield delay(1000);
  }
}