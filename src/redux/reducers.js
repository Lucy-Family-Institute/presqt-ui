import { SWITCH_SOURCE } from './actionTypes';

const initialState = {
  source: null,
  target: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SWITCH_SOURCE:
      return { ...state, source: payload.source };

    default:
      return state;
  }
};
