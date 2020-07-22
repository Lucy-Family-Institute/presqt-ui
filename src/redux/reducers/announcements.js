import {actionCreators} from "../actionCreators";

export const announcementsReducers = {
  initialState: {
    announcement: null
  },
  reducers: {
    [actionCreators.announcements.getAnnouncementsSuccess]: (state, action) => ({
      ...state,
      announcement: action.payload.data
    })
  }
};
