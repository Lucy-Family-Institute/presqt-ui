import { handleActions } from 'redux-actions';

import { actionCreators } from '../actionCreators';

const initialState = {
  leftTarget: null,
  rightTarget: null,
  available: [],
  sideSelected: null
};

export default handleActions(
  {
    // Targets Actions
    [actionCreators.targets.switchTarget]: (state, action) => ({
      ...state,
      leftTarget: state.sideSelected === 'left' ? action.payload.targetData : state.leftTarget,
      rightTarget: state.sideSelected === 'right' ? action.payload.targetData : state.rightTarget,
    }),
    [actionCreators.targets.loadSuccess]: (state, action) => ({
      ...state,
      available: action.payload
    }),
    [actionCreators.targets.switchSide]: (state, action) => ({
      ...state,
      sideSelected: action.payload.side
    })
  },
  initialState
);
