import {actionCreators} from "../actionCreators";
import {trackAction, trackError, untrackAction} from "./helpers/tracking";

export const bagitReducers = {
  initialState: {
    bagitModalDisplay: false,
    bagitData: null,
    bagitStatus: null
  },
  reducers: {
    /**
     * Display the BagIt Tool Modal
     **/
    [actionCreators.bagit.displayBagitModal]: state => ({
      ...state,
      bagitModalDisplay: true,
    }),
    /**
     * Hide the BagIt Tool Modal
     **/
    [actionCreators.bagit.hideBagitModal]: state => ({
      ...state,
      bagitModalDisplay: false
    }),
    /**
     * Send Post to bagit_and_zip endpoint
     **/
    [actionCreators.bagit.submitBagitFile]: (state, action) => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.bagit.submitBagitFile,
        state.pendingAPIOperations
      ),
      bagitStatus: 'pending'
    }),
    /**
     * On success, set bagitData and bagitStatus
     **/
    [actionCreators.bagit.submitBagitFileSuccess]: (state, action) => ({
      ...state,
      bagitData: action.payload.data,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.bagit.submitBagitFile,
        state.pendingAPIOperations
      ),
      bagitStatus: 'finished'
    }),
    /**
     * On failure, track error
     **/
    [actionCreators.bagit.submitBagitFileFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.bagit.submitBagitFile,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.bagit.submitBagitFile.toString(),
        state.apiOperationErrors
      ),
      bagitStatus: 'failure'
    }),
    /**
     * Clear bagit data from state
     **/
    [actionCreators.bagit.clearBagitData]: state => ({
      ...state,
      bagitModalDisplay: false,
      bagitData: null,
      bagitStatus: null
    })
  }
};
