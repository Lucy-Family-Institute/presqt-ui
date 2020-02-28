import {actionCreators} from "../actionCreators";

export const targetsReducers = {
  initialState: {
    selectedTarget: null,
    available: []
  },
  reducers: {
      // Targets Actions
      [actionCreators.targets.switchTarget]: (state, action) => ({
        ...state,
        selectedTarget: action.payload
      }),
      [actionCreators.targets.loadSuccess]: (state, action) => ({
        ...state,
        available: action.payload
      })
    }
};
