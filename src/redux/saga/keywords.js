import { call, put, delay, takeEvery } from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import { getInitialKeywords, sendEnhancedKeywords, sendEnhancedTransferKeywords } from "../../api/keywords";

/** Get Keywords **/
export function* watchGetKeywords() {
  yield takeEvery(actionCreators.keywords.getKeywords, getKeywords);
}

function* getKeywords(action) {
  try {
    const response = yield call(
      getInitialKeywords,
      action.payload.resource,
      action.payload.targetToken
    );
    yield put(actionCreators.keywords.getKeywordsSuccess(response.data));
  } catch (error) {
    yield put(
      actionCreators.keywords.getKeywordsFailure(
        error.response.data,
        error.response.status
      )
    );
  }
}

/** Post Keywords **/
export function* watchSendKeywords() {
  yield takeEvery(actionCreators.keywords.sendKeywords, sendKeywords);
}

function* sendKeywords(action) {
  try {
    const response = yield call(
      sendEnhancedKeywords,
      action.payload.resource,
      action.payload.targetToken,
      action.payload.keywords
    );
    yield put(actionCreators.keywords.sendKeywordsSuccess(response.data));
  }
  catch (error) {
    yield put(
      actionCreators.keywords.sendKeywordsFailure(
        error.response.data,
        error.response.status
      )
    );
  }
}

/** Post Keywords After Transfer**/
export function* watchSendTransferKeywords() {
  yield takeEvery(actionCreators.keywords.sendTransferKeywords, sendTransferKeywords);
}

function* sendTransferKeywords(action) {
  try {
    const response = yield call(
      sendEnhancedTransferKeywords,
      action.payload.resource_id,
      action.payload.targetName,
      action.payload.targetToken,
      action.payload.keywords
    );
    yield put(actionCreators.keywords.sendTransferKeywordsSuccess(response.data, action.payload.targetType));
  }
  catch (error) {
    yield put(
      actionCreators.keywords.sendTransferKeywordsFailure(
        error.response.data,
        error.response.status,
        action.payload.targetType
      )
    );
  }
}


