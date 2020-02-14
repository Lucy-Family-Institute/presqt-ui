import { handleActions, combineActions } from "redux-actions";

import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "../utils";
import buildResourceHierarchy from "./helpers/resources";

const initialState = {
  pendingAPIResponse: false,
  pendingAPIOperations: [],
  leftTargetResources: null,
  selectedLeftResource: null,
  apiOperationErrors: [],
  leftSearchValue: null,
  downloadStatus: null,
  downloadData: null,
  downloadModalDisplay: false,
  sourceUploadStatus: null,
  sourceUploadData: null,
  uploadModalDisplay: false,
  uploadType: null,
  openResources: [],
  activeTicketNumber: null
};

export default handleActions(
  {
    /**
     * Add API call to trackers.
     * Saga call to Resource-Collection occurs with this action.
     **/
    [actionCreators.resources.loadFromSourceTarget]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.loadFromSourceTarget,
        state.pendingAPIOperations
      ),
      leftTargetResources: null
    }),
    /**
     * Add API call to trackers.
     * Saga call to Resource-Collection occurs with this action with search parameter.
     **/
    [actionCreators.resources.loadFromSourceTargetSearch]: (state, action) => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.loadFromSourceTargetSearch,
        state.pendingAPIOperations
      ),
      selectedLeftResource: null,
      leftSearchValue: action.payload.searchValue,
      openResources: []
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection call.
     **/
    [actionCreators.resources.loadFromSourceTargetSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(state, action);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.loadFromSourceTarget,
          state.pendingAPIOperations
        ),
        leftTargetResources: resourceHierarchy
      };
    },
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection with search call.
     **/
    [actionCreators.resources.loadFromSourceTargetSearchSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(state, action);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.loadFromSourceTargetSearch,
          state.pendingAPIOperations
        ),
        leftTargetResources: resourceHierarchy
      };
    },
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed Resource Collection call.
     **/
    [actionCreators.resources.loadFromSourceTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.loadFromSourceTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.loadFromSourceTarget.toString(),
        state.apiOperationErrors
      ),
      leftTargetResources: null
    }),
    /**
     * Untrack API search call and track failure that occurred.
     * Dispatched via Saga call on failed Resource Collection search call.
     **/
    [actionCreators.resources.loadFromSourceTargetSearchFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.loadFromSourceTargetSearch,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.loadFromSourceTargetSearch,
        state.apiOperationErrors
      ),
      leftTargetResources: null
    }),
    [combineActions(
      /**
       * Open/Close Container Resources in UX.
       **/
      actionCreators.resources.openContainer,
      actionCreators.resources.closeContainer
    )]: (state, action) => {
      let newOpenResources = state.openResources;

      const searchForResourceInArray = (
        desiredContainer,
        openContainer,
        possibleMatches
      ) => {
        const updatedNode = possibleMatches;

        if (updatedNode.id === desiredContainer.id) {
          if (openContainer) {
            newOpenResources.push(desiredContainer.id)
          }
          else{
            newOpenResources = newOpenResources.filter(element => element !== desiredContainer.id)
          }
          return {
            ...updatedNode,
            open: openContainer
          };
        } else if (updatedNode.children) {
          // Somehow we need to consider each of the children...
          const updatedChildren = updatedNode.children.map(childNode =>
            searchForResourceInArray(desiredContainer, openContainer, childNode)
          );
          updatedNode.children = updatedChildren;
        }

        return updatedNode;
      };

      const updatedSourceResources = state.leftTargetResources.map(topLevelNode => {
        return searchForResourceInArray(
          action.payload.container,
          action.payload.open,
          topLevelNode
        );
      });

      return {
        ...state,
        leftTargetResources: updatedSourceResources,
        openResources: newOpenResources
      };
    },
    /**
     * Add API call to trackers.
     * Saga call to Resource-Detail occurs with this action.
     **/
    [actionCreators.resources.selectSourceResource]: (state, action) => {
      const updateleftTargetResources = leftTargetResources => {
        let sourceResources = leftTargetResources;
        sourceResources.map(resource => {
          resource.active = resource.id === action.payload.resource.id;
          if (resource.kind === "container") {
            if (resource.children) {
              updateleftTargetResources(resource.children);
            }
          }
        });
        return sourceResources;
      };

      return {
        ...state,
        pendingAPIResponse: true,
        pendingAPIOperations: trackAction(
          actionCreators.resources.selectSourceResource,
          state.pendingAPIOperations
        ),
        leftTargetResources: updateleftTargetResources(state.leftTargetResources)
      };
    },
    /***
     * Untrack API call.
     * Add resource details to selectedLeftResource.
     * Dispatched via Saga call on successful Resource Detail call.
     **/
    [actionCreators.resources.selectSourceResourceSuccess]: (state, action) => {
      return {
        ...state,
        selectedLeftResource: action.payload,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.selectSourceResource,
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
    [actionCreators.resources.clearSourceResources]: state => {
      return {
        ...state,
        leftTargetResources: null,
        selectedLeftResource: null,
        leftSearchValue: null
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
    [actionCreators.resources.downloadFromSourceTargetSuccess]: (state, action) => ({
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
    [actionCreators.resources.downloadFromSourceTargetFailure]: (state, action) => ({
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
    [actionCreators.resources.uploadToSourceTarget]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.uploadToSourceTarget,
        state.pendingAPIOperations
      ),
      sourceUploadStatus: 'pending'
    }),
    /**
     * Untrack API call.
     * Dispatched via Saga call on successful upload call.
     **/
    [actionCreators.resources.uploadToSourceTargetSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.uploadToSourceTarget,
        state.pendingAPIOperations
      ),
      activeTicketNumber: action.payload.data.ticket_number
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed upload call.
     **/
    [actionCreators.resources.uploadToSourceTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.uploadToSourceTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.uploadToSourceTarget.toString(),
        state.apiOperationErrors
      ),
      sourceUploadStatus: 'failure'
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
     * Add the upload job status to sourceUploadStatus.
     * Add the upload job contents to sourceUploadData.
     **/
    [actionCreators.resources.uploadJobSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.uploadJob,
        state.pendingAPIOperations
      ),
      sourceUploadStatus: action.payload.status,
      sourceUploadData: action.payload.data
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed upload job call.
     **/
    [actionCreators.resources.uploadJobFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      sourceUploadStatus: 'failure',
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
      sourceUploadStatus: null,
      sourceUploadData: null
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
      )
    }),
    /** 
    * Untrack API call and track failure that occurred.
    * Dispatched via Saga call on failed cancel upload call.
    **/
    [actionCreators.resources.cancelUploadFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      sourceUploadStatus: 'cancelled',
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
    [actionCreators.resources.refreshSourceTarget]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.refreshSourceTarget,
        state.pendingAPIOperations
      ),
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection Refresh call.
     **/
    [actionCreators.resources.refreshSourceTargetSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(state, action);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.refreshSourceTarget,
          state.pendingAPIOperations
        ),
        leftTargetResources: resourceHierarchy,
        sourceUploadStatus: state.sourceUploadStatus === 'success' ? "finished" : 'cancelled'
      };
    },
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed Resource Collection Refresh call.
     **/
    [actionCreators.resources.refreshSourceTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.refreshSourceTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.refreshSourceTarget.toString(),
        state.apiOperationErrors
      ),
      leftTargetResources: null
    }),
    /**
     * Clear the ticket number
     **/
    [actionCreators.resources.clearActiveTicketNumber]: state => ({
      ...state,
      activeTicketNumber: null
    })
  },
  initialState
);
