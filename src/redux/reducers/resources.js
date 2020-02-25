import { handleActions, combineActions } from "redux-actions";

import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "../utils";
import buildResourceHierarchy from "./helpers/resources";
import updateOpenClose from "./helpers/updateOpenClose";

const initialState = {
  pendingAPIResponse: false,
  pendingAPIOperations: [],
  apiOperationErrors: [],
  activeTicketNumber: null,
  /** Resources **/
  targetResources: null,
  selectedResource: null,
  searchValue: null,
  openResources: [],
  /** Download **/
  downloadStatus: null,
  downloadData: null,
  downloadModalDisplay: false,
  /** Upload **/
  uploadStatus: null,
  uploadData: null,
  uploadModalDisplay: false,
  uploadType: null,
  /** Transfer **/
  transferTargetResources: null,
  selectedTransferResource: null,
  openTransferResources: [],
  transferStatus: null,
  transferData: null,
  transferModalDisplay: false,

};

export default handleActions(
  {
    /**
     * Add API call to trackers.
     * Saga call to Resource-Collection occurs with this action.
     **/
    [actionCreators.resources.loadFromTarget]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.loadFromTarget,
        state.pendingAPIOperations
      ),
      targetResources: null
    }),
    /**
     * Add API call to trackers.
     * Saga call to Resource-Collection occurs with this action with search parameter.
     **/
    [actionCreators.resources.loadFromTargetSearch]: (state, action) => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.loadFromTargetSearch,
        state.pendingAPIOperations
      ),
      selectedResource: null,
      searchValue: action.payload.searchValue,
      openResources: []
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection call.
     **/
    [actionCreators.resources.loadFromTargetSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(state, action);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.loadFromTarget,
          state.pendingAPIOperations
        ),
        targetResources: resourceHierarchy
      };
    },
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection with search call.
     **/
    [actionCreators.resources.loadFromTargetSearchSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(state, action);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.loadFromTargetSearch,
          state.pendingAPIOperations
        ),
        targetResources: resourceHierarchy
      };
    },
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed Resource Collection call.
     **/
    [actionCreators.resources.loadFromTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.loadFromTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.loadFromTarget.toString(),
        state.apiOperationErrors
      ),
      targetResources: null
    }),
    /**
     * Untrack API search call and track failure that occurred.
     * Dispatched via Saga call on failed Resource Collection search call.
     **/
    [actionCreators.resources.loadFromTargetSearchFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.loadFromTargetSearch,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.loadFromTargetSearch,
        state.apiOperationErrors
      ),
      targetResources: null
    }),
    [combineActions(
      /**
       * Open/Close Container Resources in UX.
       **/
      actionCreators.resources.openContainer,
      actionCreators.resources.closeContainer
    )]: (state, action) => {
      const [newOpenResources, updatedSourceResources] =
        updateOpenClose(state.openResources, state.targetResources, action);

      return {
        ...state,
        openResources: newOpenResources,
        targetResources: updatedSourceResources
      };
    },
    /**
     * Add API call to trackers.
     * Saga call to Resource-Detail occurs with this action.
     **/
    [actionCreators.resources.selectResource]: (state, action) => {
      const updateTargetResources = targetResources => {
        let sourceResources = targetResources;
        sourceResources.map(resource => {
          resource.active = resource.id === action.payload.resource.id;
          if (resource.kind === "container") {
            if (resource.children) {
              updateTargetResources(resource.children);
            }
          }
        });
        return sourceResources;
      };

      return {
        ...state,
        pendingAPIResponse: true,
        pendingAPIOperations: trackAction(
          actionCreators.resources.selectResource,
          state.pendingAPIOperations
        ),
        targetResources: updateTargetResources(state.targetResources)
      };
    },
    /***
     * Untrack API call.
     * Add resource details to selectedResource.
     * Dispatched via Saga call on successful Resource Detail call.
     **/
    [actionCreators.resources.selectResourceSuccess]: (state, action) => {
      return {
        ...state,
        selectedResource: action.payload,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.selectResource,
          state.pendingAPIOperations
        )
      };
    },
    /**
     * Remove the error from apiOperationErrors
     **/
    [actionCreators.resources.removeFromErrorList]: (state, action) => {
      return {
        ...state,
        apiOperationErrors: state.apiOperationErrors.filter(
          item => item.action !== action.payload.actionToRemove
        )
      };
    },
    /**
     * Clear source list and detail data
     **/
    [actionCreators.resources.clearResources]: state => {
      return {
        ...state,
        targetResources: null,
        selectedResource: null,
        searchValue: null
      };
    },
    /**
     * Register resource download operation.
     **/
    [actionCreators.resources.downloadResource]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.downloadResource,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     * Dispatched via Saga call on successful download call.
     **/
    [actionCreators.resources.downloadFromTargetSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.downloadResource,
        state.pendingAPIOperations
      ),
      activeTicketNumber: action.payload.data.ticket_number
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed download call.
     **/
    [actionCreators.resources.downloadFromTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      downloadStatus: 'failure',
      pendingAPIOperations: untrackAction(
        actionCreators.resources.downloadResource,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.downloadResource.toString(),
        state.apiOperationErrors
      )
    }),
    /**
     * Register download job operation.
     **/
    [actionCreators.resources.downloadJob]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.downloadJob,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     * Add the download job status to downloadStatus.
     * Add the download job contents to downloadData.
     **/
    [actionCreators.resources.downloadJobSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.downloadJob,
        state.pendingAPIOperations
      ),
      downloadStatus: action.payload.status,
      downloadData: action.payload.data
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed download job call.
     **/
    [actionCreators.resources.downloadJobFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      downloadStatus: 'failure',
      pendingAPIOperations: untrackAction(
        actionCreators.resources.downloadJob,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.downloadJob.toString(),
        state.apiOperationErrors
      ),
    }),
    /**
     * Cancel the download
     **/
    [actionCreators.resources.cancelDownload]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.cancelDownload,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     **/
    [actionCreators.resources.cancelDownloadSuccess]: state => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.cancelDownload,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed cancel download call.
     **/
    [actionCreators.resources.cancelDownloadFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      downloadStatus: 'cancelled',
      pendingAPIOperations: untrackAction(
        actionCreators.resources.cancelDownload,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.cancelDownload.toString(),
        state.apiOperationErrors
      ),
    }),
    /**
     * Refresh the resources in the Resource Browser.
     * Saga call to Resource-Collection occurs with this action.
     **/
    /**
     * Clear the download data so a new download can be attempted.
     **/
    [actionCreators.resources.clearDownloadData]: state => ({
      ...state,
      downloadStatus: null,
      downloadData: null
    }),
    /**
     * Display the Download Modal
     **/
    [actionCreators.resources.displayDownloadModal]: state => ({
      ...state,
      downloadModalDisplay: true,
    }),
    /**
     * Hide the Download Modal
     **/
    [actionCreators.resources.hideDownloadModal]: state => ({
      ...state,
      downloadModalDisplay: false,
    }),
    /**
     * Register resource upload operation.
     **/
    [actionCreators.resources.uploadToTarget]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.uploadToTarget,
        state.pendingAPIOperations
      ),
      uploadStatus: 'pending'
    }),
    /**
     * Untrack API call.
     * Dispatched via Saga call on successful upload call.
     **/
    [actionCreators.resources.uploadToTargetSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.uploadToTarget,
        state.pendingAPIOperations
      ),
      activeTicketNumber: action.payload.data.ticket_number
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed upload call.
     **/
    [actionCreators.resources.uploadToTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.uploadToTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.uploadToTarget.toString(),
        state.apiOperationErrors
      ),
      uploadStatus: 'failure'
    }),
    /**
     * Register upload job operation.
     **/
    [actionCreators.resources.uploadJob]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.uploadJob,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     * Add the upload job status to uploadStatus.
     * Add the upload job contents to uploadData.
     **/
    [actionCreators.resources.uploadJobSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.uploadJob,
        state.pendingAPIOperations
      ),
      uploadStatus: action.payload.status,
      uploadData: action.payload.data
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed upload job call.
     **/
    [actionCreators.resources.uploadJobFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      uploadStatus: 'failure',
      pendingAPIOperations: untrackAction(
        actionCreators.resources.uploadJob,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.uploadJob.toString(),
        state.apiOperationErrors
      ),
    }),
    /**
     * Clear the upload data so a new upload can be attempted.
     **/
    [actionCreators.resources.clearUploadData]: state => ({
      ...state,
      uploadStatus: null,
      uploadData: null
    }),
    /**
     * Display the Upload Modal
     **/
    [actionCreators.resources.displayUploadModal]: (state, action) => ({
      ...state,
      uploadModalDisplay: true,
      uploadType: action.payload.uploadType
    }),
    /**
     * Hide the Upload Modal
     **/
    [actionCreators.resources.hideUploadModal]: state => ({
      ...state,
      uploadModalDisplay: false,
      uploadType: null
    }),
    /**
     * Cancel the upload
     **/
    [actionCreators.resources.cancelUpload]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.cancelUpload,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     **/
    [actionCreators.resources.cancelUploadSuccess]: state => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.cancelUpload,
        state.pendingAPIOperations
      ),
      uploadStatus: 'cancelSuccess',
    }),
    /** 
    * Untrack API call and track failure that occurred.
    * Dispatched via Saga call on failed cancel upload call.
    **/
    [actionCreators.resources.cancelUploadFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      uploadStatus: 'cancelled',
      pendingAPIOperations: untrackAction(
        actionCreators.resources.cancelUpload,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.cancelUpload.toString(),
        state.apiOperationErrors
      ),
    }),
    /**
     * Refresh the resources in the Resource Browser.
     * Saga call to Resource-Collection occurs with this action.
     **/
    [actionCreators.resources.refreshTarget]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.refreshTarget,
        state.pendingAPIOperations
      ),
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection Refresh call.
     **/
    [actionCreators.resources.refreshTargetSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(state, action);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.refreshTarget,
          state.pendingAPIOperations
        ),
        targetResources: resourceHierarchy,
        uploadStatus: state.uploadStatus === 'success' ? "finished" : 'cancelled'
      };
    },
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed Resource Collection Refresh call.
     **/
    [actionCreators.resources.refreshTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.refreshTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.refreshTarget.toString(),
        state.apiOperationErrors
      ),
      targetResources: null
    }),
    /**
     * Clear the ticket number
     **/
    [actionCreators.resources.clearActiveTicketNumber]: state => ({
      ...state,
      activeTicketNumber: null
    }),
    /**
     * Display the Transfer Modal
     **/
    [actionCreators.resources.displayTransferModal]: state => ({
      ...state,
      transferModalDisplay: true,
    }),
    /**
     * Hide the Transfer Modal
     **/
    [actionCreators.resources.hideTransferModal]: state => ({
      ...state,
      transferModalDisplay: false,
    }),
    /**
     * Add API call to trackers.
     * Saga call to Resource-Collection occurs with this action.
     **/
    [actionCreators.resources.loadFromTransferTarget]: state => ({
      ...state,
        pendingAPIResponse: true,
        pendingAPIOperations: trackAction(
        actionCreators.resources.loadFromTransferTarget,
        state.pendingAPIOperations
      )
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Transfer Resource Collection call.
     **/
    [actionCreators.resources.loadFromTransferTargetSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(state, action);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.loadFromTransferTarget,
          state.pendingAPIOperations
        ),
        transferTargetResources: resourceHierarchy
      };
    },
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed Transfer Resource Collection call.
     **/
    [actionCreators.resources.loadFromTransferTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.loadFromTransferTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.loadFromTransferTarget.toString(),
        state.apiOperationErrors
      ),
      transferTargetResources: null
    }),
    /**
     * Add API call to trackers.
     * Saga call to Resource-Detail occurs with this action for transfer.
     **/
    [actionCreators.resources.selectTransferResource]: (state, action) => {
      const updateTargetResources = transferTargetResources => {
        let sourceResources = transferTargetResources;
        sourceResources.map(resource => {
          resource.active = resource.id === action.payload.resource.id;
          if (resource.kind === "container") {
            if (resource.children) {
              updateTargetResources(resource.children);
            }
          }
        });
        return sourceResources;
      };

      return {
        ...state,
        pendingAPIResponse: true,
        pendingAPIOperations: trackAction(
          actionCreators.resources.selectTransferResource,
          state.pendingAPIOperations
        ),
        transferTargetResources: updateTargetResources(state.transferTargetResources)
      };
    },
    /***
     * Untrack API call.
     * Add resource details to selectedTransferResource.
     * Dispatched via Saga call on successful Resource Detail call for transfer.
     **/
    [actionCreators.resources.selectTransferResourceSuccess]: (state, action) => {
      return {
        ...state,
        selectedTransferResource: action.payload,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.selectTransferResource,
          state.pendingAPIOperations
        )
      };
    },
    [combineActions(
      /**
       * Open/Close Container Resources in UX for transfer.
       **/
      actionCreators.resources.openTransferContainer,
      actionCreators.resources.closeTransferContainer
    )]: (state, action) => {
      const [newOpenResources, updatedSourceResources] =
        updateOpenClose(state.openTransferResources, state.transferTargetResources, action);

      return {
        ...state,
        openTransferResources: newOpenResources,
        transferTargetResources: updatedSourceResources
      };
    },
    /**
     * Register resource transfer operation.
     **/
    [actionCreators.resources.transferResource]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.transferResource,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     * Dispatched via Saga call on successful transfer call.
     **/
    [actionCreators.resources.transferSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.transferResource,
        state.pendingAPIOperations
      ),
      activeTicketNumber: action.payload.data.ticket_number
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed transfer call.
     **/
    [actionCreators.resources.transferFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      transferStatus: 'failure',
      pendingAPIOperations: untrackAction(
        actionCreators.resources.transferResource,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.transferResource.toString(),
        state.apiOperationErrors
      )
    }),
    /**
     * Register transfer job operation.
     **/
    [actionCreators.resources.transferJob]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.transferJob,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     * Add the download job status to transferStatus.
     * Add the download job contents to transferData.
     **/
    [actionCreators.resources.transferJobSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.transferJob,
        state.pendingAPIOperations
      ),
      transferStatus: action.payload.status,
      transferData: action.payload.data
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed transfer job call.
     **/
    [actionCreators.resources.transferJobFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      transferStatus: 'failure',
      pendingAPIOperations: untrackAction(
        actionCreators.resources.transferJob,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.transferJob.toString(),
        state.apiOperationErrors
      ),
    }),
    /**
     * Cancel the transfer
     **/
    [actionCreators.resources.cancelTransfer]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.cancelTransfer,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     **/
    [actionCreators.resources.cancelTransferSuccess]: state => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.cancelTransfer,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed cancel transfer call.
     **/
    [actionCreators.resources.cancelTransferFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      transferStatus: 'cancelled',
      pendingAPIOperations: untrackAction(
        actionCreators.resources.cancelTransfer,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.cancelTransfer.toString(),
        state.apiOperationErrors
      ),
    }),
    /**
     * Clear the transfer data so a new transfer can be attempted.
     **/
    [actionCreators.resources.clearTransferData]: state => ({
      ...state,
      transferStatus: null,
      transferData: null
    }),
  },
  initialState
);
