import { handleActions } from 'redux-actions';

import { actionCreators } from '../actionCreators';

const initialState = {
  source: null,
  target: null,
  available: []
};

export default handleActions(
  {
    // Targets Actions
    [actionCreators.targets.switchSource]: (state, action) => ({
      ...state,
      source: action.payload.sourceTarget
    }),
    [actionCreators.targets.loadSuccess]: (state, action) => ({
      ...state,
      available: action.payload
    })
  },
  initialState
);
