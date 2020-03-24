import { call, put, takeEvery } from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import { getServices } from "../../api/service";

/** Service Collection **/
export function* watchLoadServices() {
  yield takeEvery(actionCreators.services.loadServices, loadServices);
}

function* loadServices() {
  const response = yield call(getServices);
  yield put(actionCreators.services.loadServicesSuccess(response.data));
}
