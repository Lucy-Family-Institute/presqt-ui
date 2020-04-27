import {actionCreators} from "../actionCreators";

export const statusesReducers = {
  initialState: {
    statuses: []
  },
  reducers: {
    [actionCreators.statuses.loadStatusesSuccess]: (state, action) => ({
      ...state,
      statuses: action.payload
    })
  }
};
