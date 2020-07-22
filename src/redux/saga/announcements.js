import {call, delay, put, takeEvery} from "@redux-saga/core/effects";
import { actionCreators } from "../actionCreators";
import {fetchAnnouncements} from "../../api/announcements";

/** Service Collection **/
export function* watchGetAnnouncements() {
  yield takeEvery(actionCreators.announcements.getAnnouncements, getAnnouncements);
}

function* getAnnouncements() {
  while( true ) {

    try {
      const response = yield call(fetchAnnouncements);
      yield put(actionCreators.announcements.getAnnouncementsSuccess(response.data));
    } catch (e) {
      console.log(e)
    }
    yield delay(300000)
  }
}
