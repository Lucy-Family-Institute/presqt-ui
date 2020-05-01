import { call, put, delay, takeEvery } from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import { getInitialKeywords, sendEnhancedKeywords } from "../../api/keywords";

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

/** Get Keywords **/
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
    console.log(response.data)
    yield put(actionCreators.keywords.sendKeywordsSuccess(response.data));
  } catch (error) {
    yield put(
      actionCreators.keywords.sendKeywordsFailure(
        error.response.data,
        error.response.status
      )
    );
  }
}
