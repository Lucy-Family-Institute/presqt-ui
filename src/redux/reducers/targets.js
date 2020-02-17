import { handleActions } from 'redux-actions';

import { actionCreators } from '../actionCreators';

const initialState = {
  leftTarget: null,
  available: []
};

export default handleActions(
  {
    // Targets Actions
    [actionCreators.targets.switchTarget]: (state, action) => ({
      ...state,
      leftTarget: action.payload
    }),
    [actionCreators.targets.loadSuccess]: (state, action) => ({
      ...state,
      available: action.payload
    })
  },
  initialState
);
