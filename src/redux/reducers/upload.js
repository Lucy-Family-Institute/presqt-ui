import {actionCreators} from "../actionCreators";
import {trackAction, trackError, untrackAction} from "./helpers/tracking";

export const uploadReducers = {
  initialState: {
    uploadStatus: null,
    uploadData: null,
    uploadModalDisplay: false,
    uploadType: null
  },
  reducers: {
    /**
     * Register resource upload operation.
     **/
    [actionCreators.upload.uploadToTarget]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.upload.uploadToTarget,
        state.pendingAPIOperations
      ),
      uploadStatus: 'pending'
    }),
    /**
     * Untrack API call.
     * Dispatched via Saga call on successful upload call.
     **/
    [actionCreators.upload.uploadToTargetSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.upload.uploadToTarget,
        state.pendingAPIOperations
      ),
      activeTicketNumber: action.payload.data.ticket_number
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed upload call.
     **/
    [actionCreators.upload.uploadToTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.upload.uploadToTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.upload.uploadToTarget.toString(),
        state.apiOperationErrors
      ),
      uploadStatus: 'failure'
    }),
    /**
     * Register upload job operation.
     **/
    [actionCreators.upload.uploadJob]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.upload.uploadJob,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     * Add the upload job status to uploadStatus.
     * Add the upload job contents to uploadData.
     **/
    [actionCreators.upload.uploadJobSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.upload.uploadJob,
        state.pendingAPIOperations
      ),
      uploadStatus: state.uploadStatus === 'cancelPending' && action.payload.status === 'pending'
        ? 'cancelPending'
        : action.payload.status,
      uploadData: action.payload.data
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed upload job call.
     **/
    [actionCreators.upload.uploadJobFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      uploadStatus: 'failure',
      pendingAPIOperations: untrackAction(
        actionCreators.upload.uploadJob,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.upload.uploadJob.toString(),
        state.apiOperationErrors
      ),
    }),
    /**
     * Clear the upload data so a new upload can be attempted.
     **/
    [actionCreators.upload.clearUploadData]: state => ({
      ...state,
      uploadStatus: null,
      uploadData: null
    }),
    /**
     * Display the Upload Modal
     **/
    [actionCreators.upload.displayUploadModal]: (state, action) => ({
      ...state,
      uploadModalDisplay: true,
      uploadType: action.payload.uploadType
    }),
    /**
     * Hide the Upload Modal
     **/
    [actionCreators.upload.hideUploadModal]: state => ({
      ...state,
      uploadModalDisplay: false,
      uploadType: null
    }),
    /**
     * Cancel the upload
     **/
    [actionCreators.upload.cancelUpload]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.upload.cancelUpload,
        state.pendingAPIOperations
      ),
      uploadStatus: 'cancelPending'
    }),
    /**
     * Untrack API call.
     **/
    [actionCreators.upload.cancelUploadSuccess]: state => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.upload.cancelUpload,
        state.pendingAPIOperations
      ),
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed cancel upload call.
     **/
    [actionCreators.upload.cancelUploadFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      uploadStatus: 'cancelFailure',
      pendingAPIOperations: untrackAction(
        actionCreators.upload.cancelUpload,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.upload.cancelUpload.toString(),
        state.apiOperationErrors
      ),
    }),
  }
};
