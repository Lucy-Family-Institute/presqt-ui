import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "./helpers/tracking";

export const keywordReducers = {
  initialState: {
    keywordModalDisplay: false,
    keywords: null,
    updatedKeywords: null,
    keywordStatus: null
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
     * Clear Keyword Modal data
     **/
    [actionCreators.keywords.clearKeywordData]: (state) => ({
      ...state,
      updatedKeywords: null,
      keywordStatus: null,
    })
  },
};
