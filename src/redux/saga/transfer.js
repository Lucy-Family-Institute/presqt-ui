import {call, delay, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {
  getResourceDetail,
  getTargetResources
} from "../../api/resources";
import {
  cancelResourceTransferJob,
  postResourceTransfer,
  resourceTransferJob
} from "../../api/transfer";

/** Resource Collection For Transfer Resource Browser **/
export function* watchSwitchTransferTarget() {
  yield takeEvery(actionCreators.transfer.loadFromTransferTarget, loadTransferTargetResources);
}

/**
 * Make an Axios request to Resource Collection.
 * Dispatch either the success or failure actions accordingly.
 **/
function* loadTransferTargetResources(action) {
  try {
    const response = yield call(
      getTargetResources,
      action.payload.target,
      action.payload.targetToken
    );
    yield put(actionCreators.transfer.loadFromTransferTargetSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.transfer.loadFromTransferTargetFailure(
      error.response.status,
      error.response.data.error)
    );
  }
}

/** Refresh Resource Collection for transfer **/
export function* watchTransferRefreshSource() {
  yield takeEvery(actionCreators.transfer.refreshTransferTarget, refreshTransferTargetResources);
}

/**
 * Make an Axios request to Resource Collection for transfer.
 * Dispatch either the success or failure actions accordingly.
 **/
function* refreshTransferTargetResources(action) {

  try {
    const response = yield call(
      getTargetResources,
      action.payload.target,
      action.payload.targetToken
    );
    yield put(actionCreators.transfer.refreshTransferTargetSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.transfer.refreshTransferTargetFailure(
      error.response.status,
      error.response.data.error)
    );
  }
}

/** Resource Detail for transfer**/
export function* watchSelectTransferResource() {
  yield takeEvery(actionCreators.transfer.selectTransferResource, loadTransferResourceDetail);
}

function* loadTransferResourceDetail(action) {
  const response = yield call(
    getResourceDetail,
    action.payload.resource,
    action.payload.targetToken
  );

  yield put(
    actionCreators.transfer.selectTransferResourceSuccess(response.data)
  );
}

export function* watchResourceTransfer() {
  yield takeEvery(actionCreators.transfer.transferResource, transferTargetResource)
}

function* transferTargetResource(action) {
  try {
    const response = yield call(
      postResourceTransfer,
      action.payload.destinationTarget,
      action.payload.destinationToken,
      action.payload.sourceResource,
      action.payload.duplicateAction,
      action.payload.keywordAction,
      action.payload.keywordList,
      action.payload.resourceToTransferTo,
      action.payload.sourceTarget,
      action.payload.sourceTargetToken
    );

    yield put(actionCreators.transfer.transferSuccess(response.data));

    // Kick off the transfer job endpoint check-in
    try {
      let transferFinished = false;

      while (!transferFinished) {
        yield put(actionCreators.transfer.transferJob());

        const transferJobResponse = yield call(
          resourceTransferJob,
          response.data.transfer_job,
          action.payload.sourceTargetToken,
          action.payload.destinationToken
        );

        // transfer successful!
        if (transferJobResponse.status === 200) {
          yield put(actionCreators.transfer.transferJobSuccess(transferJobResponse.data, 'success'));
          transferFinished = true;
        }
        else {
          yield put(actionCreators.transfer.transferJobSuccess(null, 'pending'));
          yield delay(1000);
        }
      }
    }
    // Transfer failed because of target API error
    catch(error){
      if (error.response.status === 500) {
        if (error.response.data.status_code === '499'){
          yield put(actionCreators.transfer.transferJobSuccess(error.response.data, 'cancelSuccess'));
        }
        else {
          yield put(actionCreators.transfer.transferJobSuccess(error.response.data, 'failure'));
        }
      }
      else {
        yield put(actionCreators.transfer.transferJobFailure(
          error.response.status,
          error.response.data.error)
      )}
    }
  }
  // Transfer failed because of PresQT API error
  catch(error){
    yield put(actionCreators.transfer.transferFailure(
      error.response.status,
      error.response.data.error)
    )
  }
}

// Cancel Transfer
export function* watchCancelTransfer() {
  yield takeEvery(actionCreators.transfer.cancelTransfer, cancelTransfer)
}

function* cancelTransfer(action) {
  try {
    yield call(
      cancelResourceTransferJob,
      action.payload.ticketNumber,
      action.payload.sourceToken,
      action.payload.destinationToken
    );

    yield put(actionCreators.transfer.cancelTransferSuccess())

  }

  catch (error) {
    yield put(actionCreators.transfer.cancelTransferFailure(
      error.response.status,
      error.response.data.error)
    )
  }
}