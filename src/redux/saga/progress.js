import { call, put, delay, takeEvery } from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import { getCollectionProgress, getDownloadProgress, getUploadProgress } from "../../api/progress";

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
  // which indicates the process is complete (There's a bit of a lag as the FE builds re)
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


export function* watchDownloadProgress() {
  yield takeEvery(
    actionCreators.download.loadDownloadProgress,
    loadDownloadProgress
  );
}

/**
 * Make an Axios request to Download job.
 * Dispatch either the success or failure actions accordingly.
 **/
function* loadDownloadProgress(action) {
  let percentage = 0;
  let status = "";
  let message = "Download is being processed on the server";
  // The file on the backend doesn't update immediately, so if it's 'finished', we want to wait until
  // it's 'in_progress' again.
  while (status != "in_progress") {
    try {
      const response = yield call(
        getDownloadProgress,
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
  // which indicates the process is complete (There's a bit of a lag as the FE builds re)
  while (percentage != 99 && !message.includes('successful')) {
    try {
      const response = yield call(
        getDownloadProgress,
        action.payload.targetToken
      );
      // Update the percentage to the current percentage.....percentage
      percentage = response.data.job_percentage;
      message = response.data.message
      yield put(
        actionCreators.download.loadDownloadProgressSuccess(response.data)
      );
    } catch (error) {
      // Exit this process
      message = 'successful'
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
 * Make an Axios request to Download job.
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
      console.log(action.payload.destinationToken);
      const response = yield call(
        getUploadProgress,
        action.payload.destinationToken
      );
      // Update the status
      status = response.data.status;
      console.log(status)
    } catch (error) {
      // Exit this loop
      console.log('error1', error)
      status = 'in_progress';
      yield delay(2000)
    }
  }
  // Keep hitting the status endpoint until the percentage == 99, 
  // which indicates the process is complete (There's a bit of a lag as the FE builds re)
  while (percentage != 99 && !message.includes('successful')) {
    try {
      const response = yield call(
        getUploadProgress,
        action.payload.destinationToken
      );
      // Update the percentage to the current percentage.....percentage
      percentage = response.data.job_percentage;
      message = response.data.message
      console.log(message);
      yield put(
        actionCreators.upload.loadUploadProgressSuccess(response.data)
      );
    } catch (error) {
      console.log('error2', error)
      // Exit this process
      message = 'successful'
      percentage = 99;
    }
    yield delay(1000);
  }
}