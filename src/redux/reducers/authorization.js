import {actionCreators} from "../actionCreators";
import {pick} from "lodash";

export const authorizationReducers = {
  initialState: {
    apiTokens: {},
    tokenModalDisplay: false,
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
  }
};
