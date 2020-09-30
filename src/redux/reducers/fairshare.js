import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "./helpers/tracking";

export const fairshareReducers = {
  initialState: {
    fairshareModalDisplay: false,
  },
  reducers: {
    /**
     * Display the FAIRshare Modal
     **/
    [actionCreators.fairshare.displayFairshareModal]: (state) => ({
      ...state,
      fairshareModalDisplay: true,
    }),
    /**`
     * Hide the FAIRshare Modal
     **/
    [actionCreators.fairshare.hideFairshareModal]: (state) => ({
      ...state,
      fairshareModalDisplay: false,
    }),
  },
};
