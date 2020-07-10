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
      yield put(actionCreators.statuses.loadStatusesSuccess([{
        service: "presqt",
        readable_name: "PresQT",
        status: e.name,
        detail: e.message,
      }]));
    }
    yield delay(300000);
  }
}
