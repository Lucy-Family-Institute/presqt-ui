import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "./helpers/tracking";
import ActionButton from "../../components/widgets/buttons/ActionButton";

export const keywordReducers = {
  initialState: {
    keywordModalDisplay: false,
    keywords: null,
    updatedKeywords: null,
    keywordStatus: null
  },
  reducers: {
    /**
     * Display the EaaSI Modal
     **/
    [actionCreators.keywords.displayKeywordModal]: (state) => ({
      ...state,
      keywordModalDisplay: true,
    }),
    /**
     * Hide the EaaSI Modal
     **/
    [actionCreators.keywords.hideKeywordModal]: (state) => ({
      ...state,
      keywordModalDisplay: false,
    }),
    [actionCreators.keywords.getKeywords]: (state) => ({
      ...state,
      pendingAPIResponse: true,
    }),
    [actionCreators.keywords.getKeywordsSuccess]: (state, action) => ({
      ...state,
      keywords: action.payload,
      pendingAPIResponse: false,
    }),
    [actionCreators.keywords.getKeywordsFailure]: (state) => ({
      ...state,
      keywords: null,
      pendingAPIResponse: false,
    }),
    [actionCreators.keywords.sendKeywords]: (state, action) => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.keywords.sendKeywords,
        state.pendingAPIOperations
      ),
    }),
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
    [actionCreators.keywords.clearKeywordData]: (state) => ({
      ...state,
      updatedKeywords: null,
      keywordStatus: null
    })
  },
};
