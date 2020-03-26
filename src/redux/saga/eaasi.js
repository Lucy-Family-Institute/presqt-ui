import {call, put, delay, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {postEaasiProposal, getEaasiProposal} from "../../api/eaasi";

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
    yield put(actionCreators.eaasi.sendEaasiProposalFailure(
      error.response.status,
      error.response.data.error)
    )
  }
}

/** Get EaaSI Stuff **/
export function* watchEaasiSuccess() {
  yield takeEvery(actionCreators.eaasi.getEaasiProposal, getEaasiProposalLink);

  function* getEaasiProposalLink(action) {
    try {
      let proposalFinished = false
      while (!proposalFinished) {
        const response = yield call(
          getEaasiProposal,
          action.payload.proposal_link
        )
        if (response.status === 200) {
          yield put(actionCreators.eaasi.getEaasiProposalSuccess(response.data));
          proposalFinished = true;
        }
        else {
          yield put(actionCreators.eaasi.getEaasiProposalSuccess(response.data));
          yield delay(5000);
        }
      }
    }
    catch (error) {
      yield put(actionCreators.eaasi.getEaasiProposalFailure(
        error.response.status,
        error.response.data.error)
      )
    }
  }
}