import { handleActions } from 'redux-actions';
import {pick} from "lodash";


import { actionCreators } from '../actionCreators';

const initialState = {
  apiTokens: {}
};

export default handleActions(
  {
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
    }
  },
  initialState
);
