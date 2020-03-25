import { actionCreators } from "../actionCreators";
import {trackAction} from "./helpers/tracking";

export const eaasiReducers = {
  initialState: {
    eaasiModalDisplay: false,
    eaasiProposalStatus: null
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
    [actionCreators.eaasi.sendEaasiProposalSuccess]: (state, action) => ({}),
    [actionCreators.eaasi.sendEaasiProposalFailure]: (state, action) => ({})
  }
};
