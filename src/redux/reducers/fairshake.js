import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "./helpers/tracking";

export const fairshakeReducers = {
    initialState: {
        fairshakeModalDisplay: false,
        fairshakeRubricStatus: null,
        fairshakeRubricData: null
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
        }),
        // Get the FAIRshake rubric
        [actionCreators.fairshake.getFairshakeRubric]: (state) => ({
            ...state,
            pendingAPIOperations: true,
            pendingAPIOperations: trackAction(
                actionCreators.fairshake.getFairshakeRubric,
                state.pendingAPIOperations
              ),
            fairshakeRubricStatus: "getPending",
        }),
        [actionCreators.fairshake.getFairshakeRubricSuccess]: (state, action) => ({
            ...state,
            pendingAPIResponse: false,
            pendingAPIOperations: untrackAction(
                actionCreators.fairshake.getFairshakeRubric,
                state.pendingAPIOperations
            ),
            fairshakeRubricData: action.payload,
            fairshakeRubricStatus: "getFinished",
        })
    }
}