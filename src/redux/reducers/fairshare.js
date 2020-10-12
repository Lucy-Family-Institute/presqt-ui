import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "./helpers/tracking";

export const fairshareReducers = {
  initialState: {
    fairshareModalDisplay: false,
    fairshareTransferModalDisplay: false,
    fairshareEvaluationStatus: null,
    fairshareResultsData: null,
    fairshareTests: null
  },
  reducers: {
    /**
     * Display the FAIRshare Modal
     **/
    [actionCreators.fairshare.displayFairshareModal]: (state) => ({
      ...state,
      fairshareModalDisplay: true,
    }),
    /**`
     * Hide the FAIRshare Modal
     **/
    [actionCreators.fairshare.hideFairshareModal]: (state) => ({
      ...state,
      fairshareModalDisplay: false,
    }),
    /**
     * Display the FAIRshare Transfer Modal
     **/
    [actionCreators.fairshare.displayFairshareTransferModal]: (state) => ({
      ...state,
      fairshareTransferModalDisplay: true,
    }),
    /**`
     * Hide the FAIRshare Transfer Modal
     **/
    [actionCreators.fairshare.hideFairshareTransferModal]: (state) => ({
      ...state,
      fairshareTransferModalDisplay: false,
    }),
    // Send the evaluation request
    [actionCreators.fairshare.sendFairshareEvaluation]: (state) => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.fairshare.sendFairshareEvaluation,
        state.pendingAPIOperations
      ),
      fairshareEvaluationStatus: "postPending",
    }),
    //SUCCESS
    [actionCreators.fairshare.sendFairshareEvaluationSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.fairshare.sendFairshareEvaluation,
        state.pendingAPIOperations
      ),
      fairshareResultsData: action.payload,
      fairshareEvaluationStatus: "postFinished",
    }),
    // FAILURE
    [actionCreators.fairshare.sendFairshareEvaluationFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.fairshare.sendFairshareEvaluation,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.fairshare.sendFairshareEvaluation.toString(),
        state.apiOperationErrors
      ),
      fairshareEvaluationStatus: "postFailure",
    }),
    // CLEANUP
    [actionCreators.fairshare.clearFairshareData]: (state) => ({
      ...state,
      fairshareEvaluationStatus: null,
      fairshareResultsData: null,
    }),
    [actionCreators.fairshare.loadFairshareTestsSuccess]: (state, action) => ({
      ...state,
      fairshareTests: action.payload,
  }),
  },
};
