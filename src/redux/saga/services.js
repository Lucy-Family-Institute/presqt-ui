import { call, put, takeEvery } from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import { getServices, getService } from "../../api/service";

/** Service Collection **/
export function* watchLoadServices() {
  yield takeEvery(actionCreators.services.loadServices, loadServices);
}

function* loadServices() {
  const response = yield call(getServices);
  yield put(actionCreators.services.loadServicesSuccess(response.data));
}

/** Service Detail **/
export function* watchLoadService() {
  yield takeEvery(actionCreators.services.selectService, loadService);
}

function* loadService(action) {
  const response = yield call(getService, action.payload.name);
  yield put(actionCreators.services.loadServiceSuccess(response.data));
}
