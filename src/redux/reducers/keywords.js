import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "./helpers/tracking";

export const keywordReducers = {
  initialState: {
    keywordModalDisplay: false,
    keywords: null,
    updatedKeywords: null,
    keywordStatus: null,
    sourceKeywordStatus: null,
    destinationKeywordStatus: null
  },
  reducers: {
    /**
     * Display the Keyword Modal
     **/
    [actionCreators.keywords.displayKeywordModal]: (state) => ({
      ...state,
      keywordModalDisplay: true,
    }),
    /**
     * Hide the Keyword Modal
     **/
    [actionCreators.keywords.hideKeywordModal]: (state) => ({
      ...state,
      keywordModalDisplay: false,
    }),
    /**
     * Make getKeywords Request
     **/
    [actionCreators.keywords.getKeywords]: (state) => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.keywords.getKeywords,
        state.pendingAPIOperations
      ),
    }),
    /**
     * Successful getKeywords Request
     **/
    [actionCreators.keywords.getKeywordsSuccess]: (state, action) => ({
      ...state,
      keywords: action.payload,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.keywords.getKeywords,
        state.pendingAPIOperations
      )
    }),
    /**
     * Unsuccessful getKeywords Request
     **/
    [actionCreators.keywords.getKeywordsFailure]: (state) => ({
      ...state,
      keywords: null,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.keywords.getKeywords,
        state.pendingAPIOperations
      )
    }),
    /**
     * Make sendKeywords Request
     **/
    [actionCreators.keywords.sendKeywords]: state => ({
      ...state,
      pendingAPIResponse: true,
      keywordStatus: 'postPending',
      pendingAPIOperations: trackAction(
        actionCreators.keywords.sendKeywords,
        state.pendingAPIOperations
      ),
    }),
    /**
     * Successful sendKeywords Request
     **/
    [actionCreators.keywords.sendKeywordsSuccess]: (state, action) => ({
      ...state,
      updatedKeywords: action.payload,
      keywordStatus: 'postSuccess',
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.keywords.sendKeywords,
        state.pendingAPIOperations
      )
    }),
    /**
     * Unsuccessful sendKeywords Request
     **/
    [actionCreators.keywords.sendKeywordsFailure]: (state, action) => ({
      ...state,
      updatedKeywords: null,
      keywordStatus: 'postFailure',
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.keywords.sendKeywords,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.keywords.sendKeywords.toString(),
        state.apiOperationErrors
      ),
    }),
    /**
     * Make sendTransferKeywords Request
     **/
    [actionCreators.keywords.sendTransferKeywords]: state => ({
      ...state,
      pendingAPIResponse: true,
      sourceKeywordStatus: 'postPending',
      destinationKeywordStatus: 'postPending',
      pendingAPIOperations: trackAction(
        actionCreators.keywords.sendTransferKeywords,
        state.pendingAPIOperations
      ),
    }),
    /**
     * Successful sendTransferKeywords Request
     **/
    [actionCreators.keywords.sendTransferKeywordsSuccess]: (state, action) => ({
      ...state,
      updatedKeywords: action.payload.data,
      sourceKeywordStatus: action.payload.targetType === 'source' ? 'postSuccess' : state.sourceKeywordStatus,
      destinationKeywordStatus: action.payload.targetType === 'destination' ? 'postSuccess' : state.destinationKeywordStatus,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.keywords.sendTransferKeywords,
        state.pendingAPIOperations
      )
    }),
    /**
     * Unsuccessful sendTransferKeywords Request
     **/
    [actionCreators.keywords.sendTransferKeywordsFailure]: (state, action) => ({
      ...state,
      updatedKeywords: null,
      sourceKeywordStatus: action.payload.targetType === 'source' ? 'postFailure' : state.sourceKeywordStatus,
      destinationKeywordStatus: action.payload.targetType === 'destination' ? 'postFailure' : state.destinationKeywordStatus,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.keywords.sendTransferKeywords,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        `${action.payload.targetType}-${actionCreators.keywords.sendTransferKeywords.toString()}`,
        state.apiOperationErrors
      ),
    }),
    /**
     * Clear Keyword Modal data
     **/
    [actionCreators.keywords.clearKeywordData]: (state) => ({
      ...state,
      updatedKeywords: null,
      keywordStatus: null,
      sourceKeywordStatus: null,
      destinationKeywordStatus: null
    })
  },
};
