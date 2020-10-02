import { call, put, delay, takeEvery } from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import { postFairshareEvaluator, getFairshareEvaluatorTests } from "../../api/fairshare";

/** FAIRshare Evaluation POST **/
export function* watchFairshareEvaluation() {
  yield takeEvery(actionCreators.fairshare.sendFairshareEvaluation, sendFairshareEvaluation);
}

function* sendFairshareEvaluation(action) {
  try {
    const response = yield call(
        postFairshareEvaluator,
        action.payload.doi
    );

    yield put(actionCreators.fairshare.sendFairshareEvaluationSuccess(response.data));
  }
  catch (error) {
    console.log(error);
    yield put(
      actionCreators.fairshare.sendFairshareEvaluationFailure(
        error.response.data,
        error.response.status
      )
    );
  }
}


/** Get FAIRshare tests list **/
export function* watchGetFairshareEvaluationTests() {
  yield takeEvery(actionCreators.fairshare.loadFairshareTests, loadFairshareTests);
}

function* loadFairshareTests() {
    const response = yield call(getFairshareEvaluatorTests);
    console.log(response.data);
    yield put(actionCreators.fairshare.loadFairshareTestsSuccess(response.data));
}