import { call, put, delay, takeEvery } from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import { postFairshareEvaluator } from "../../api/fairshare";

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

    yield put(actionCreators.fairshare.sendFairshareEvalutionSuccess(response.data));
  }
  catch (error) {
    yield put(
      actionCreators.fairshare.sendFairshareEvalutionFailure(
        error.response.data,
        error.response.status
      )
    );
  }
}
