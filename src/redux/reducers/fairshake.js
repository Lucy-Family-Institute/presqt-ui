import { actionCreators } from "../actionCreators";
import {trackAction, trackError, untrackAction} from "./helpers/tracking";

export const fairshakeReducers = {
    initialState: {
        fairshakeModalDisplay: false,
        fairshakeRubricStatus: null,
        fairshakeRubricData: null,
        fairshakeAssessmentStatus: null,
        fairshakeAssessmentResults: null,
        fairshakeRubric: null
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
        [actionCreators.fairshake.getFairshakeRubric]: (state, action) => ({
            ...state,
            pendingAPIResponse: true,
            pendingAPIOperations: trackAction(
                actionCreators.fairshake.getFairshakeRubric,
                state.pendingAPIOperations
              ),
            fairshakeRubricStatus: "getPending",
            fairshakeRubric: action.payload.rubric_id
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
        }),
        [actionCreators.fairshake.getFairshakeRubricFailure]: (state, action) => ({
            ...state,
            pendingAPIResponse: false,
            pendingAPIOperations: untrackAction(
                actionCreators.fairshake.getFairshakeRubric,
                state.pendingAPIOperations
            ),
            apiOperationErrors: trackError(
                action,
                actionCreators.fairshake.getFairshakeRubric.toString(),
                state.apiOperationErrors
            ),
            fairshakeRubricStatus: "getFailure",
        }),
        [actionCreators.fairshake.submitFairshakeAssessment]: (state) => ({
            ...state,
            pendingAPIOperations: trackAction(
                actionCreators.fairshake.submitFairshakeAssessment,
                state.pendingAPIOperations
            ),
            fairshakeAssessmentStatus: "postPending"
        }),
        [actionCreators.fairshake.submitFairshakeAssessmentSuccess]: (state, action) => ({
            ...state,
            pendingAPIResponse: false,
            pendingAPIOperations: untrackAction(
              actionCreators.fairshake.submitFairshakeAssessment,
              state.pendingAPIOperations
            ),
            fairshakeAssessmentResults: action.payload,
            fairshakeAssessmentStatus: "postFinished",
        }),
        [actionCreators.fairshake.submitFairshakeAssessmentFailure]: (state, action) => ({
            ...state,
            pendingAPIResponse: false,
            pendingAPIOperations: untrackAction(
              actionCreators.fairshake.submitFairshakeAssessment,
              state.pendingAPIOperations
            ),
            apiOperationErrors: trackError(
              action,
              actionCreators.fairshake.submitFairshakeAssessment.toString(),
              state.apiOperationErrors
            ),
            fairshakeAssessmentStatus: "postFailure",
        }),
        [actionCreators.fairshake.clearFairshakeData]: (state) => ({
            ...state,
            fairshakeRubricStatus: null,
            fairshakeRubricData: null,
            fairshakeAssessmentStatus: null,
            fairshakeAssessmentResults: null,
            fairshakeRubric: null
          })
    }
}