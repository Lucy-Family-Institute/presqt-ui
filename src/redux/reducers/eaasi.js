import { actionCreators } from "../actionCreators";

export const eaasiReducers = {
  initialState: {
    eaasiModalDisplay: false
  },
  reducers: {
    /**
     * Display the EaaSI Modal
     **/
    [actionCreators.eaasi.displayEaasiModal]: state => ({
      ...state,
      eaasiModalDisplay: true,
    }),
    /**
     * Hide the EaaSI Modal
     **/
    [actionCreators.eaasi.hideEaasiModal]: state => ({
      ...state,
      eaasiModalDisplay: false,
    })
  }
};
