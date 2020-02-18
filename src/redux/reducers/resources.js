import { handleActions, combineActions } from "redux-actions";

import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "../utils";
import buildResourceHierarchy from "./helpers/resources";

const initialState = {
  pendingAPIResponse: false,
  pendingAPIOperations: [],
  leftTargetResources: null,
  rightTargetResources: null,
  selectedLeftResource: null,
  selectedRightResource: null,
  apiOperationErrors: [],
  leftSearchValue: null,
  rightSearchValue: null,
  downloadStatus: null,
  downloadData: null,
  downloadModalDisplay: false,
  uploadStatus: null,
  uploadData: null,
  uploadModalDisplay: false,
  uploadType: null,
  openLeftResources: [],
  openRightResources: [],
  activeTicketNumber: null,
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
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection call.
     **/
    [actionCreators.resources.loadFromTargetSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(state, action.payload.data);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.loadFromTarget,
          state.pendingAPIOperations
        ),
        leftTargetResources: action.payload.side === 'left' ? resourceHierarchy : state.leftTargetResources,
        rightTargetResources: action.payload.side === 'right' ? resourceHierarchy : state.rightTargetResources
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
      leftTargetResources: action.payload.side === 'left' ? null : state.leftTargetResources,
      rightTargetResources: action.payload.side === 'right' ? null : state.rightTargetResources
    }),
    /**
     * Add API call to trackers.
     * Saga call to Resource-Collection occurs with this action with search parameter.
     **/
    [actionCreators.resources.loadFromTargetSearch]: (state, action) => {
      const side = action.payload.side;
      return {
        ...state,
        pendingAPIResponse: true,
        pendingAPIOperations: trackAction(
          actionCreators.resources.loadFromTargetSearch,
          state.pendingAPIOperations
        ),
        selectedLeftResource: side === 'left' ? null : state.selectedLeftResource,
        selectedRightResource: side === 'right' ? null : state.selectedRightResource,

        leftSearchValue: side === 'left' ? action.payload.searchValue: state.leftSearchValue,
        rightSearchValue: side === 'right' ? action.payload.searchValue: state.rightSearchValue,

        openLeftResources: side === 'left' ? [] : state.openLeftResources,
        openRightResources: side === 'right' ? [] : state.openRightResources
      }
    },
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection with search call.
     **/
    [actionCreators.resources.loadFromTargetSearchSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(state, action.payload.data);
      const side = action.payload.side;

      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.loadFromTargetSearch,
          state.pendingAPIOperations
        ),
        leftTargetResources: side === 'left' ? resourceHierarchy : state.leftTargetResources,
        rightTargetResources: side === 'right' ? resourceHierarchy : state.rightTargetResources
      };
    },
    /**
     * Untrack API search call and track failure that occurred.
     * Dispatched via Saga call on failed Resource Collection search call.
     **/
    [actionCreators.resources.loadFromTargetSearchFailure]: (state, action) => {
      const side = action.payload.side;

      return {
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
        leftTargetResources: side === 'left' ? null : state.leftTargetResources,
        rightTargetResources: side === 'right' ? null : state.rightTargetResources
      }
    },
    [combineActions(
      /**
       * Open/Close Container Resources in UX.
       **/
      actionCreators.resources.openContainer,
      actionCreators.resources.closeContainer
    )]: (state, action) => {

      let newOpenResources = state.openLeftResources;
      let targetResources = state.leftTargetResources;
      if (state.sideSelected === 'right') {
        newOpenResources = state.openRightResources;
        targetResources =  state.rightTargetResources;
      }

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

      const updatedResources = targetResources.map(topLevelNode => {
        return searchForResourceInArray(
          action.payload.container,
          action.payload.open,
          topLevelNode
        );
      });

      return {
        ...state,
        leftTargetResources: state.sideSelected === 'left' ? updatedResources : state.leftTargetResources,
        rightTargetResources: state.sideSelected === 'right' ? updatedResources : state.rightTargetResources,
        openLeftResources: state.sideSelected === 'left' ?  newOpenResources : state.openLeftResources,
        openRightResources: state.sideSelected === 'right' ?  newOpenResources : state.openRightResources
      };
    },
    /**
     * Add API call to trackers.
     * Saga call to Resource-Detail occurs with this action.
     **/
    [actionCreators.resources.selectResource]: (state, action) => {
      const updateTargetResources = targetResources => {
        let resources = targetResources;

        resources.map(resource => {
          resource.active = resource.id === action.payload.resource.id;
          if (resource.kind === "container") {
            if (resource.children) {
              updateTargetResources(resource.children);
            }
          }
        });
        return resources;
      };

      return {
        ...state,
        pendingAPIResponse: true,
        pendingAPIOperations: trackAction(
          actionCreators.resources.selectResource,
          state.pendingAPIOperations
        ),
        leftTargetResources: state.sideSelected === 'left' ? updateTargetResources(state.leftTargetResources) : state.leftTargetResources,
        rightTargetResources: state.sideSelected === 'right' ? updateTargetResources(state.rightTargetResources) : state.rightTargetResources
      };
    },
    /***
     * Untrack API call.
     * Add resource details to selectedLeftResource.
     * Dispatched via Saga call on successful Resource Detail call.
     **/
    [actionCreators.resources.selectResourceSuccess]: (state, action) => {
      return {
        ...state,
        selectedLeftResource: state.sideSelected === 'left' ? action.payload : state.selectedLeftResource,
        selectedRightResource: state.sideSelected === 'right' ? action.payload : state.selectedRightResource,
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
        leftTargetResources: state.sideSelected === 'left' ? null : state.leftTargetResources,
        rightTargetResources: state.sideSelected === 'right' ? null : state.rightTargetResources,
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
      sourceUploadStatus: 'cancelSuccess',
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
        leftTargetResources: resourceHierarchy,
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
      leftTargetResources: null
    }),
    /**
     * Clear the ticket number
     **/
    [actionCreators.resources.clearActiveTicketNumber]: state => ({
      ...state,
      activeTicketNumber: null
    }),
    /**
     * Switch which side is being handled
     **/
    [actionCreators.resources.switchSide]: (state, action) => ({
      ...state,
      sideSelected: action.payload.side
    })
  },
  initialState
);
