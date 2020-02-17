import { handleActions } from 'redux-actions';

import { actionCreators } from '../actionCreators';

const initialState = {
  leftTarget: null,
  rightTarget: null,
  available: [],
};

export default handleActions(
  {
    // Targets Actions
    [actionCreators.targets.switchTarget]: (state, action) => ({
      ...state,
      leftTarget: action.payload.side === 'left' ? action.payload.targetData : state.leftTarget,
      rightTarget: action.payload.side === 'right' ? action.payload.targetData : state.rightTarget,
    }),
    [actionCreators.targets.loadSuccess]: (state, action) => ({
      ...state,
      available: action.payload
    }),
  },
  initialState
);
