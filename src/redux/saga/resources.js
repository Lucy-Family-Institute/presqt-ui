import {call, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {getResourceDetail, getTargetResources, getTargetResourcesSearch, getResourceDownload, resourceDownloadJob} from "../../api/resources";

/** Resource Collection **/
export function* watchSwitchSource() {
  yield takeEvery(actionCreators.resources.loadFromTarget, loadSourceTargetResources);
}

 /**
 * Make an Axios request to Resource Collection.
 * Dispatch either the success or failure actions accordingly.
 **/
function* loadSourceTargetResources(action) {
  try {
    const response = yield call(
    getTargetResources,
    action.payload.sourceTarget.name,
    action.payload.sourceTargetToken
    );
    yield put(actionCreators.resources.loadFromSourceTargetSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.resources.loadFromSourceTargetFailure(
      error.response.status,
      error.response.data.error)
    );
  }
}

/**
 * Make an Axios request to Resource Collection with search parameter.
 *  Dispatch either the success or failure actions accordingly.
 **/
export function* watchSearch() {
  yield takeEvery(actionCreators.resources.loadFromSourceTargetSearch, loadSourceTargetResourcesSearch);
}

function* loadSourceTargetResourcesSearch(action) {
  try {
    const response = yield call(
    getTargetResourcesSearch,
    action.payload.sourceTarget,
    action.payload.sourceTargetToken,
    action.payload.searchValue
    );
    yield put(actionCreators.resources.loadFromSourceTargetSearchSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.resources.loadFromSourceTargetSearchFailure(
      error.response.status,
      error.response.data.error)
    );
  }
}

/** Resource Detail **/
export function* watchSelectSourceResource() {
  yield takeEvery(actionCreators.resources.selectSourceResource, loadResourceDetail);
}

function* loadResourceDetail(action) {
  const response = yield call(
    getResourceDetail,
    action.payload.resource,
    action.payload.sourceTargetToken
  );

  yield put(
    actionCreators.resources.selectSourceResourceSuccess(response.data)
  );
}

/** Refresh Resource Collection **/
export function* watchRefreshSource() {
  yield takeEvery(actionCreators.resources.refreshSourceTarget, refreshTargetResources);
}

/**
 * Make an Axios request to Resource Collection.
 * Dispatch either the success or failure actions accordingly.
 **/
function* refreshTargetResources(action) {

  try {
    const response = yield call(
      getTargetResources,
      action.payload.sourceTarget.name,
      action.payload.sourceTargetToken
    );
    yield put(actionCreators.resources.refreshSourceTargetSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.resources.refreshSourceTargetFailure(
      error.response.status,
      error.response.data.error)
    );
  }
}