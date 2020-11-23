import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "./helpers/tracking";

export const fairshakeReducers = {
    initialState: {
        fairshakeModalDisplay: false,
    },
    reducers: {
        /**
         * Display the FAIRshake Modal
         **/
        [actionCreators.fairshake.displayFairshakeModal]: (state) => ({
            ...state,
            fairshakeModalDisplay: true,
        }),
        /**`
         * Hide the FAIRshake Modal
         **/
        [actionCreators.fairshake.hideFairshakeModal]: (state) => ({
            ...state,
            fairshakeModalDisplay: false,
        })
    }
}