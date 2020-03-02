import {actionCreators} from "../actionCreators";
import {pick} from "lodash";

export const authorizationReducers = {
  initialState: {
    apiTokens: {},
    tokenModalDisplay: false,
    issueModalDisplay: false,
    githubIssueData: null,
    githubIssueError: null,
    pendingGithubResponse: false,
    githubStatus: null
  },
  reducers: {
    /**
     * Save the target token pair to apiTokens.
     **/
    [actionCreators.authorization.saveToken]: (state, action) => ({
      ...state,
      apiTokens: {
        ...state.apiTokens,
        [action.payload.targetID]: action.payload.token
      }
    }),
    /**
     * Remove the bad token from apiTokens.
     **/
    [actionCreators.authorization.removeToken]: (state, action) => {
      return {
        ...state,
        apiTokens: pick(state.apiTokens,
          Object.keys(state.apiTokens).filter(targetName => targetName !== action.payload.target))
      }
    },
    /**
     * Display the Token Modal
     **/
    [actionCreators.authorization.displayTokenModal]: state => ({
      ...state,
      tokenModalDisplay: true,
    }),
    /**
     * Hide the Token Modal
     **/
    [actionCreators.authorization.hideTokenModal]: state => ({
      ...state,
      tokenModalDisplay: false,
    }),
    /**
     * Display the Issue Modal
     **/
    [actionCreators.authorization.displayIssueModal]: state => ({
      ...state,
      issueModalDisplay: true,
    }),
    /**
     * Hide the Issue Modal
     **/
    [actionCreators.authorization.hideIssueModal]: state => ({
      ...state,
      issueModalDisplay: false
    }),
    [actionCreators.authorization.submitGithubIssue]: state => ({
      ...state,
      pendingGithubResponse: true,
      githubStatus: 'pending'
    }),
    [actionCreators.authorization.submitGithubIssueSuccess]: (state, action) => ({
      ...state,
      pendingGithubResponse: false,
      githubIssueData: action.payload,
      githubStatus: 'success'
    }),
    [actionCreators.authorization.submitGithubIssueFailure]: (state, action) => ({
      ...state,
      pendingGithubResponse: false,
      githubIssueError: action.payload,
      githubStatus: 'failure'
    }),
    [actionCreators.authorization.clearGithubIssue]: state => ({
      ...state,
      pendingGithubResponse: false,
      githubIssueError: null,
      githubStatus: null,
      githubIssueData: null
    }),
  }
};
