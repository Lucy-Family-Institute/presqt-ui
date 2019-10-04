import { handleActions } from 'redux-actions';

import { actionCreators } from '../actionCreators';

const initialState = {
  source: null,
  destination: null,
  available: []
};

export default handleActions(
  {
    // Targets Actions
    [actionCreators.targets.switchSource]: (state, action) => ({
      ...state,
      source: action.payload
    }),
    [actionCreators.targets.loadSuccess]: (state, action) => ({
      ...state,
      available: action.payload
    })
  },
  initialState
);
