import { handleActions, combineActions } from "redux-actions";

import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "../utils";
import buildResourceHierarchy from "./helpers/resources";

const initialState = {
  pendingAPIResponse: false,
  pendingAPIOperations: [],
  inSourceTarget: null,
  inDestinationTarget: null,
  selectedInSource: null,
  apiOperationErrors: [],
  sourceSearchValue: null,
  sourceDownload: null
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
      inSourceTarget: null
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
      selectedInSource: null,
      sourceSearchValue: action.payload.searchValue
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection call.
     **/
    [actionCreators.resources.loadFromSourceTargetSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(action);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.loadFromSourceTarget,
          state.pendingAPIOperations
        ),
        inSourceTarget: resourceHierarchy
      };
    },
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection with search call.
     **/
    [actionCreators.resources.loadFromSourceTargetSearchSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(action);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.loadFromSourceTargetSearch,
          state.pendingAPIOperations
        ),
        inSourceTarget: resourceHierarchy
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
      inSourceTarget: null
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
      inSourceTarget: null
    }),
    [combineActions(
      /**
       * Open/Close Container Resources in UX.
       **/
      actionCreators.resources.openContainer,
      actionCreators.resources.closeContainer
    )]: (state, action) => {
      const searchForResourceInArray = (
        desiredContainer,
        openContainer,
        possibleMatches
      ) => {
        const updatedNode = possibleMatches;

        if (updatedNode.id === desiredContainer.id) {
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

      const updatedSourceResources = state.inSourceTarget.map(topLevelNode => {
        return searchForResourceInArray(
          action.payload.container,
          action.payload.open,
          topLevelNode
        );
      });

      return {
        ...state,
        inSourceTarget: updatedSourceResources
      };
    },
    /**
     * Add API call to trackers.
     * Saga call to Resource-Detail occurs with this action.
     **/
    [actionCreators.resources.selectSourceResource]: (state, action) => {
      const updateInSourceTarget = inSourceTarget => {
        let sourceResources = inSourceTarget;
        sourceResources.map(resource => {
          resource.active = resource.id === action.payload.resource.id;
          if (resource.kind === "container") {
            if (resource.children) {
              updateInSourceTarget(resource.children);
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
        inSourceTarget: updateInSourceTarget(state.inSourceTarget)
      };
    },
    /***
     * Untrack API call.
     * Add resource details to selectedInSource.
     * Dispatched via Saga call on successful Resource Detail call.
     **/
    [actionCreators.resources.selectSourceResourceSuccess]: (state, action) => {
      return {
        ...state,
        selectedInSource: action.payload,
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
        inSourceTarget: null,
        selectedInSource: null,
        sourceSearchValue: null
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
    [actionCreators.resources.downloadFromSourceTargetSuccess]: state => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.downloadResource,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed download call.
     **/
    [actionCreators.resources.downloadFromSourceTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.downloadResource,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.downloadFromSourceTargetFailure.toString(),
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
     * Add the download job status to sourceDownloadStatus.
     * Add the download job contents to sourceDownloadContents.
     **/
    [actionCreators.resources.downloadJobSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.downloadJob,
        state.pendingAPIOperations
      ),
      sourceDownloadStatus: action.payload.status,
      sourceDownloadContents: action.payload.data
    }),
    /**
     * Clear the download data so a new download can be attempted.
     **/
    [actionCreators.resources.clearDownloadData]: state => ({
      ...state,
      sourceDownloadStatus: null,
      sourceDownloadContents: null
    }),
    /**
     * Register resource upload operation.
     **/
    [actionCreators.resources.uploadToSourceTarget]: (state, action) => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.uploadToSourceTarget,
        state.pendingAPIOperations
      )
    })
  },
  initialState
);
