import {actionCreators} from "../actionCreators";

export const githubReducers = {
  initialState: {
    issueModalDisplay: false,
    githubIssueData: null,
    githubIssueError: null,
    pendingGithubResponse: false,
    githubStatus: null
  },
  reducers: {
    /**
     * Display the Issue Modal
     **/
    [actionCreators.github.displayIssueModal]: state => ({
      ...state,
      issueModalDisplay: true,
    }),
    /**
     * Hide the Issue Modal
     **/
    [actionCreators.github.hideIssueModal]: state => ({
      ...state,
      issueModalDisplay: false
    }),
    [actionCreators.github.submitGithubIssue]: state => ({
      ...state,
      pendingGithubResponse: true,
      githubStatus: 'pending'
    }),
    [actionCreators.github.submitGithubIssueSuccess]: (state, action) => ({
      ...state,
      pendingGithubResponse: false,
      githubIssueData: action.payload,
      githubStatus: 'success'
    }),
    [actionCreators.github.submitGithubIssueFailure]: (state, action) => ({
      ...state,
      pendingGithubResponse: false,
      githubIssueError: action.payload,
      githubStatus: 'failure'
    }),
    [actionCreators.github.clearGithubIssue]: state => ({
      ...state,
      pendingGithubResponse: false,
      githubIssueError: null,
      githubStatus: null,
      githubIssueData: null
    })
  }
};
