import {actionCreators} from "../actionCreators";
import buildResourceHierarchy from "./helpers/resources";
import {combineActions} from "redux-actions";
import updateOpenClose from "./helpers/updateOpenClose";
import {trackAction, trackError, untrackAction} from "./helpers/tracking";
import removeDuplicateResources from "./helpers/removeDuplicateResources";

export const resourceReducers = {
  initialState: {
    targetResources: null,
    targetResourcesPages: null,
    selectedResource: null,
    searchValue: null,
    openResources: [],
    collectionProgress: 0,
    allTargetResources: null
  },
  reducers: {
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
      targetResources: null,
      targetResourcesPages: null,
      allTargetResources: null
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection call.
     **/
    [actionCreators.resources.loadFromTargetSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(
          state.openResources, state.selectedResource, action.payload.resources);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.loadFromTarget,
          state.pendingAPIOperations
        ),
        targetResources: resourceHierarchy,
        targetResourcesPages: action.payload.pages,
        allTargetResources: action.payload.resources
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
      targetResources: null,
      targetResourcesPages: null,
      collectionProgress: 0,
      allTargetResources: null
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
      targetResourcesPages: null,
      searchValue: action.payload.searchValue,
      openResources: [],
      collectionProgress: 0,
      allTargetResources: null
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection with search call.
     **/
    [actionCreators.resources.loadFromTargetSearchSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(
        state.openResources, state.selectedResource, action.payload.resources);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.loadFromTargetSearch,
          state.pendingAPIOperations
        ),
        targetResources: resourceHierarchy,
        targetResourcesPages: action.payload.pages,
        collectionProgress: 0,
        allTargetResources: action.payload.resources
      };
    },
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
      targetResources: null,
      targetResourcesPages: null,
      collectionProgress: 0,
      allTargetResources: null
    }),
    [actionCreators.resources.loadFromTargetPagination]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.resources.loadFromTargetPagination,
        state.pendingAPIOperations
      ),
      selectedResource: null,
      openResources: [],
      collectionProgress: 0,
      allTargetResources: null
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Resource Collection with pagination call.
     **/
    [actionCreators.resources.loadFromTargetPaginationSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(
        state.openResources, state.selectedResource, action.payload.resources);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.loadFromTargetPagination,
          state.pendingAPIOperations
        ),
        targetResources: resourceHierarchy,
        targetResourcesPages: action.payload.pages,
        allTargetResources: action.payload.resources
      };
    },
    /**
     * Untrack API search call and track failure that occurred.
     * Dispatched via Saga call on failed Resource Collection pagination call.
     **/
    [actionCreators.resources.loadFromTargetPaginationFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.resources.loadFromTargetPagination,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.resources.loadFromTargetPagination,
        state.apiOperationErrors
      ),
      targetResources: null,
      targetResourcesPages: null,
      collectionProgress: 0,
      allTargetResources: null
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
      const newAllTargetResources = removeDuplicateResources(
        state.allTargetResources, action.payload.children)
      return {
        ...state,
        selectedResource: action.payload,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.selectResource,
          state.pendingAPIOperations
        ),
        allTargetResources: newAllTargetResources
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
        targetResourcesPages: null,
        selectedResource: null,
        searchValue: null,
        openResources: [],
        allTargetResources: null
      };
    },

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
      const resourceHierarchy = buildResourceHierarchy(
        state.openResources, state.selectedResource, action.payload.resources);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.resources.refreshTarget,
          state.pendingAPIOperations
        ),
        targetResources: resourceHierarchy,
        targetResourcesPages: action.payload.pages,
        uploadStatus: state.uploadStatus === 'success' || state.uploadStatus === 'finished' ? "finished" : 'cancelled',
        allTargetResources: action.payload.resources
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
      targetResources: null,
      targetResourcesPages: null,
      collectionProgress: 0,
      allTargetResources: null
    }),
    [actionCreators.resources.loadCollectionProgress]: (state, action) => ({
      ...state,
      collectionProgress: 0
    }),
    [actionCreators.resources.loadCollectionProgressSuccess]: (state, action) => ({
      ...state,
      collectionProgress: action.payload.job_percentage
    }),
    [actionCreators.resources.updateTargetResourcesWithChildren]: state => {
      const resourceHierarchy = buildResourceHierarchy(
        state.openResources, state.selectedResource, state.allTargetResources);
      return {
        ...state,
        targetResources: resourceHierarchy
      }
    }
  }
};
