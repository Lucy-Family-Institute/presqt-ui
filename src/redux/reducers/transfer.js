import {actionCreators} from "../actionCreators";
import {trackAction, trackError, untrackAction} from "../utils";
import buildResourceHierarchy from "./helpers/resources";
import {combineActions} from "redux-actions";
import updateOpenClose from "./helpers/updateOpenClose";

export const transferReducers = {
  initialState: {
    transferTargetResources: null,
    selectedTransferResource: null,
    selectedTransferResourceName: null,
    openTransferResources: [],
    transferStatus: null,
    transferData: null,
    transferModalDisplay: false
  },
  reducers: {
    /**
     * Display the Transfer Modal
     **/
    [actionCreators.transfer.displayTransferModal]: state => ({
      ...state,
      transferModalDisplay: true,
    }),
    /**
     * Hide the Transfer Modal
     **/
    [actionCreators.transfer.hideTransferModal]: state => ({
      ...state,
      transferModalDisplay: false,
    }),
    /**
     * Add API call to trackers.
     * Saga call to Resource-Collection occurs with this action.
     **/
    [actionCreators.transfer.loadFromTransferTarget]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.transfer.loadFromTransferTarget,
        state.pendingAPIOperations
      )
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Transfer Resource Collection call.
     **/
    [actionCreators.transfer.loadFromTransferTargetSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(
        state.openTransferResources, state.selectedTransferResource, action);      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.transfer.loadFromTransferTarget,
          state.pendingAPIOperations
        ),
        transferTargetResources: resourceHierarchy
      };
    },
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed Transfer Resource Collection call.
     **/
    [actionCreators.transfer.loadFromTransferTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.loadFromTransferTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.transfer.loadFromTransferTarget.toString(),
        state.apiOperationErrors
      ),
      transferTargetResources: null
    }),
    /**
     * Add API call to trackers.
     * Saga call to Resource-Detail occurs with this action for transfer.
     **/
    [actionCreators.transfer.selectTransferResource]: (state, action) => {
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
          actionCreators.transfer.selectTransferResource,
          state.pendingAPIOperations
        ),
        selectedTransferResourceName: action.payload.resource.title,
        transferTargetResources: updateTargetResources(state.transferTargetResources)
      };
    },
    /***
     * Untrack API call.
     * Add resource details to selectedTransferResource.
     * Dispatched via Saga call on successful Resource Detail call for transfer.
     **/
    [actionCreators.transfer.selectTransferResourceSuccess]: (state, action) => {
      return {
        ...state,
        selectedTransferResource: action.payload,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.transfer.selectTransferResource,
          state.pendingAPIOperations
        )
      };
    },
    [combineActions(
      /**
       * Open/Close Container Resources in UX for transfer.
       **/
      actionCreators.transfer.openTransferContainer,
      actionCreators.transfer.closeTransferContainer
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
    [actionCreators.transfer.transferResource]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.transfer.transferResource,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     * Dispatched via Saga call on successful transfer call.
     **/
    [actionCreators.transfer.transferSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.transferResource,
        state.pendingAPIOperations
      ),
      activeTicketNumber: action.payload.data.ticket_number
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed transfer call.
     **/
    [actionCreators.transfer.transferFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      transferStatus: 'failure',
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.transferResource,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.transfer.transferResource.toString(),
        state.apiOperationErrors
      )
    }),
    /**
     * Register transfer job operation.
     **/
    [actionCreators.transfer.transferJob]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.transfer.transferJob,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     * Add the download job status to transferStatus.
     * Add the download job contents to transferData.
     **/
    [actionCreators.transfer.transferJobSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.transferJob,
        state.pendingAPIOperations
      ),
      transferStatus: action.payload.status,
      transferData: action.payload.data
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed transfer job call.
     **/
    [actionCreators.transfer.transferJobFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      transferStatus: 'failure',
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.transferJob,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.transfer.transferJob.toString(),
        state.apiOperationErrors
      ),
    }),
    /**
     * Cancel the transfer
     **/
    [actionCreators.transfer.cancelTransfer]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.transfer.cancelTransfer,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     **/
    [actionCreators.transfer.cancelTransferSuccess]: state => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.cancelTransfer,
        state.pendingAPIOperations
      ),
      transferStatus: 'cancelSuccess',
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed cancel transfer call.
     **/
    [actionCreators.transfer.cancelTransferFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      transferStatus: 'failure',
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.cancelTransfer,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.transfer.cancelTransfer.toString(),
        state.apiOperationErrors
      ),
    }),
    /**
     * Clear all the transfer modal data so the modal starts fresh.
     **/
    [actionCreators.transfer.clearTransferModalData]: state => ({
      ...state,
      transferStatus: null,
      transferData: null,
      selectedTransferResourceName: null,
      selectedTransferResource: null,
      openTransferResources: [],
      transferTargetResources: null
    }),
    /**
     * Clear the transfer data so a transfer can retried
     **/
    [actionCreators.transfer.clearTransferData]: state => ({
      ...state,
      transferStatus: null,
      transferData: null
    }),
    /**
     * Refresh the resources in the Transfer Resource Browser.
     * Saga call to Resource-Collection occurs with this action.
     **/
    [actionCreators.transfer.refreshTransferTarget]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.transfer.refreshTransferTarget,
        state.pendingAPIOperations
      ),
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Transfer Resource Collection Refresh call.
     **/
    [actionCreators.transfer.refreshTransferTargetSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(
        state.openTransferResources, state.selectedTransferResource, action);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.transfer.refreshTransferTarget,
          state.pendingAPIOperations
        ),
        transferTargetResources: resourceHierarchy,
        transferStatus: state.transferStatus === 'success' ? "finished" : 'cancelled'
      };
    },
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed Transfer Resource Collection Refresh call.
     **/
    [actionCreators.transfer.refreshTransferTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.refreshTransferTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.transfer.refreshTransferTarget.toString(),
        state.apiOperationErrors
      ),
      transferTargetResources: null
    }),
  }

};
