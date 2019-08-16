import { handleActions } from 'redux-actions';

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
    })
  },
  initialState
);
