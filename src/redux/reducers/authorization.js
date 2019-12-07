import { handleActions } from 'redux-actions';
import {pick} from "lodash";


import { actionCreators } from '../actionCreators';

const initialState = {
  apiTokens: {}
};

export default handleActions(
  {
    // Authorization Actions
    [actionCreators.authorization.saveToken]: (state, action) => ({
      ...state,
      apiTokens: {
        ...state.apiTokens,
        [action.payload.targetID]: action.payload.token
      }
    }),
    [actionCreators.authorization.removeBadToken]: (state, action) => {
      // const newTokens = {...state.apiTokens}
      // delete newTokens[action.payload.target];
      return {
        ...state,
        apiTokens: pick(state.apiTokens, Object.keys(state.apiTokens).filter(targetName => targetName !== action.payload.target))
        // apiTokens: Object.keys(state.apiTokens).reduce((newTokens, targetName) => {
        //   if (targetName !== action.payload.target) {
        //     newTokens[targetName] = state.apiTokens[targetName]
        //   }
        //   return newTokens
        // }, {})
      }
    }
  },
  initialState
);
