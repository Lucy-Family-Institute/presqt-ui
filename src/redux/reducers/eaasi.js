import { actionCreators } from "../actionCreators";
import {trackAction, trackError, untrackAction} from "./helpers/tracking";

export const eaasiReducers = {
  initialState: {
    eaasiModalDisplay: false,
    eaasiProposalStatus: null,
    eaasiProposalData: null
  },
  reducers: {
    /**
     * Display the EaaSI Modal
     **/
    [actionCreators.eaasi.displayEaasiModal]: state => ({
      ...state,
      eaasiModalDisplay: true,
    }),
    /**
     * Hide the EaaSI Modal
     **/
    [actionCreators.eaasi.hideEaasiModal]: state => ({
      ...state,
      eaasiModalDisplay: false,
    }),
    /**
     * Add API call to trackers.
     * Saga call to EaaSI Proposal occurs with this action.
     **/
    [actionCreators.eaasi.sendEaasiProposal]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.eaasi.sendEaasiProposal,
        state.pendingAPIOperations
      ),
    }),
    [actionCreators.eaasi.sendEaasiProposalSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.eaasi.sendEaasiProposal,
        state.pendingAPIOperations
      ),
      eaasiProposalData: action.payload
    }),
    [actionCreators.eaasi.sendEaasiProposalFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.eaasi.sendEaasiProposal,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.eaasi.sendEaasiProposal.toString(),
        state.apiOperationErrors
      ),
    })
  }
};
