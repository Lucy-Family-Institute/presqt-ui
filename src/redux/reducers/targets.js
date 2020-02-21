import { handleActions } from 'redux-actions';

import { actionCreators } from '../actionCreators';

const initialState = {
  selectedTarget: null,
  available: []
};

export default handleActions(
  {
    // Targets Actions
    [actionCreators.targets.switchTarget]: (state, action) => ({
      ...state,
      selectedTarget: action.payload
    }),
    [actionCreators.targets.loadSuccess]: (state, action) => ({
      ...state,
      available: action.payload
    })
  },
  initialState
);
