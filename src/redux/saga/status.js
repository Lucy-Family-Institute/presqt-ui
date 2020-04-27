import {call, delay, put, takeEvery} from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import {getStatuses} from "../../api/status";

/** Service Collection **/
export function* watchLoadStatuses() {
  yield takeEvery(actionCreators.statuses.loadStatuses, loadStatuses);
}

function* loadStatuses() {
  while( true ) {
    try {
      const response = yield call(getStatuses);
      yield put(actionCreators.statuses.loadStatusesSuccess(response.data));
    } catch (e) {
      //todo
      console.log(e)
    }
    yield delay(60000);
  }
}
