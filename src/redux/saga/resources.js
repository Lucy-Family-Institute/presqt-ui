import {call, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {getResourceDetail, getTargetResources, getTargetResourcesSearch, getTargetResourcesPagination} from "../../api/resources";

/** Resource Collection **/
export function* watchSwitchTarget() {
  yield takeEvery(actionCreators.resources.loadFromTarget, loadTargetResources);
}

/**
 * Make an Axios request to Resource Collection.
 * Dispatch either the success or failure actions accordingly.
 **/
function* loadTargetResources(action) {
  try {
    const response = yield call(
      getTargetResources,
      action.payload.target.name,
      action.payload.targetToken
    );
    yield put(actionCreators.resources.loadFromTargetSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.resources.loadFromTargetFailure(
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
  yield takeEvery(actionCreators.resources.loadFromTargetSearch, loadTargetResourcesSearch);
}

function* loadTargetResourcesSearch(action) {
  try {
    const response = yield call(
      getTargetResourcesSearch,
      action.payload.target,
      action.payload.targetToken,
      action.payload.searchValue,
      action.payload.searchParameter
    );
    yield put(actionCreators.resources.loadFromTargetSearchSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.resources.loadFromTargetSearchFailure(
        error.response.status,
        error.response.data.error)
    );
  }
}

/** Resource Detail **/
export function* watchSelectResource() {
  yield takeEvery(actionCreators.resources.selectResource, loadResourceDetail);
}

function* loadResourceDetail(action) {
  const response = yield call(
    getResourceDetail,
    action.payload.resource,
    action.payload.targetToken
  );

  yield put(actionCreators.resources.selectResourceSuccess(response.data));
  yield put(actionCreators.resources.updateTargetResourcesWithChildren());
}

/** Refresh Resource Collection **/
export function* watchRefreshSource() {
  yield takeEvery(actionCreators.resources.refreshTarget, refreshTargetResources);
}

/**
 * Make an Axios request to Resource Collection.
 * Dispatch either the success or failure actions accordingly.
 **/
function* refreshTargetResources(action) {

  try {
    const response = yield call(
      getTargetResources,
      action.payload.target.name,
      action.payload.targetToken
    );
    yield put(actionCreators.resources.refreshTargetSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.resources.refreshTargetFailure(
        error.response.status,
        error.response.data.error)
    );
  }
}

/**
 * Make an Axios request to Resource Collection with page parameter.
 *  Dispatch either the success or failure actions accordingly.
 **/
export function* watchPage() {
  yield takeEvery(
    actionCreators.resources.loadFromTargetPagination,
    loadTargetResourcesPagination
  );
}

function* loadTargetResourcesPagination(action) {
  try {
    const response = yield call(
      getTargetResourcesPagination,
      action.payload.url,
      action.payload.pageNumber,
      action.payload.targetToken
    );
    yield put(actionCreators.resources.loadFromTargetPaginationSuccess(response.data));
  }
  catch (error) {
    yield put(
      actionCreators.resources.loadFromTargetPaginationFailure(
        error.response.status,
        error.response.data.error
      )
    );
  }
}
