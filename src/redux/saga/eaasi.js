import {call, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {postEaasiProposal} from "../../api/eaasi";

/** EaaSI Proposal **/
export function* watchEaasiProposal() {
  yield takeEvery(actionCreators.eaasi.sendEaasiProposal, sendEaasiProposal);
}

function* sendEaasiProposal(action) {
  try {
    const response = yield call(
      postEaasiProposal,
      action.payload.ticket_number
    );
    yield put(actionCreators.eaasi.sendEaasiProposalSuccess(response.data))
  }
  catch (error) {
    console.log(error.response.data);
    yield put(actionCreators.eaasi.sendEaasiProposalFailure(
      error.response.status,
      error.response.data.error)
    )
  }
}