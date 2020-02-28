import {createActions} from 'redux-actions';

export const actionCreators = createActions({
    AUTHORIZATION: {
        SAVE_TOKEN: (targetID, token) => ({targetID, token}),
        REMOVE_TOKEN: (target) => ({target: target}),
        DISPLAY_TOKEN_MODAL: undefined,
        HIDE_TOKEN_MODAL: undefined,
    },
    RESOURCES: {
        /************ RESOURCES ************/
        LOAD_FROM_TARGET: (target, targetToken) => ({target, targetToken}),
        LOAD_FROM_TARGET_SUCCESS: undefined,
        LOAD_FROM_TARGET_FAILURE: (status, data) => ({status, data}),
        LOAD_FROM_TARGET_SEARCH: (target, targetToken, searchValue) => ({
            target,
            targetToken,
            searchValue
        }),
        LOAD_FROM_TARGET_SEARCH_SUCCESS: undefined,
        LOAD_FROM_TARGET_SEARCH_FAILURE: (status, data) => ({status, data}),
        REMOVE_FROM_ERROR_LIST: (actionToRemove) => ({actionToRemove}),
        OPEN_CONTAINER: container => ({container, open: true}),
        CLOSE_CONTAINER: container => ({container, open: false}),
        SELECT_RESOURCE: (resource, targetToken) => ({resource, targetToken}),
        SELECT_RESOURCE_SUCCESS: undefined,
        CLEAR_RESOURCES: undefined,
        REFRESH_TARGET: (target, targetToken) => ({target, targetToken}),
        REFRESH_TARGET_SUCCESS: undefined,
        REFRESH_TARGET_FAILURE: (status, data) => ({status, data}),
        CLEAR_ACTIVE_TICKET_NUMBER: undefined,
        /************ TRANSFER ************/
        DISPLAY_TRANSFER_MODAL: undefined,
        HIDE_TRANSFER_MODAL: undefined,
        LOAD_FROM_TRANSFER_TARGET: (target, targetToken) => ({target, targetToken}),
        LOAD_FROM_TRANSFER_TARGET_SUCCESS: undefined,
        LOAD_FROM_TRANSFER_TARGET_FAILURE: (status, data) => ({status, data}),
        SELECT_TRANSFER_RESOURCE: (resource, targetToken) => ({resource, targetToken}),
        SELECT_TRANSFER_RESOURCE_SUCCESS: undefined,
        OPEN_TRANSFER_CONTAINER: container => ({container, open: true}),
        CLOSE_TRANSFER_CONTAINER: container => ({container, open: false}),
        TRANSFER_RESOURCE: (
          destinationTarget, destinationToken, sourceResource, duplicateAction,
          resourceToTransferTo, sourceTarget, sourceTargetToken, ) => ({
            destinationTarget, destinationToken, sourceResource,
            duplicateAction, resourceToTransferTo, sourceTarget, sourceTargetToken}),
        TRANSFER_SUCCESS: (data) => ({data}),
        TRANSFER_FAILURE: (status, data) => ({ status, data }),
        TRANSFER_JOB: undefined,
        TRANSFER_JOB_SUCCESS: (data, status) => ({data, status}),
        TRANSFER_JOB_FAILURE: (status, data) => ({ status, data }),
        CANCEL_TRANSFER: (ticketNumber, sourceToken, destinationToken) =>
          ({ticketNumber, sourceToken, destinationToken}),
        CANCEL_TRANSFER_SUCCESS: undefined,
        CANCEL_TRANSFER_FAILURE: (status, data) => ({ status, data }),
        CLEAR_TRANSFER_MODAL_DATA: undefined,
        CLEAR_TRANSFER_DATA: undefined,
        REFRESH_TRANSFER_TARGET: (target, targetToken) => ({target, targetToken}),
        REFRESH_TRANSFER_TARGET_SUCCESS: undefined,
        REFRESH_TRANSFER_TARGET_FAILURE: (status, data) => ({status, data}),
    },
    DOWNLOAD: {
        DOWNLOAD_RESOURCE: (resource, targetToken) => ({resource, targetToken}),
        DOWNLOAD_FROM_TARGET_SUCCESS: (data) => ({data}),
        DOWNLOAD_FROM_TARGET_FAILURE: (status, data) => ({ status, data }),
        DOWNLOAD_JOB: undefined,
        DOWNLOAD_JOB_SUCCESS: (data, status) => ({data, status}),
        DOWNLOAD_JOB_FAILURE: (status, data) => ({status, data}),
        CANCEL_DOWNLOAD: (ticketNumber, targetToken) => ({ticketNumber, targetToken}),
        CANCEL_DOWNLOAD_SUCCESS: undefined,
        CANCEL_DOWNLOAD_FAILURE: (status, data) => ({ status, data }),
        CLEAR_DOWNLOAD_DATA: undefined,
        DISPLAY_DOWNLOAD_MODAL: undefined,
        HIDE_DOWNLOAD_MODAL: undefined,
    },
    UPLOAD: {
        UPLOAD_TO_TARGET: (target, file, duplicateAction, resourceToUploadTo, targetToken) =>
          ({target, file, duplicateAction, resourceToUploadTo, targetToken}),
        UPLOAD_TO_TARGET_SUCCESS: (data) => ({data}),
        UPLOAD_TO_TARGET_FAILURE: (status, data) => ({status, data}),
        UPLOAD_JOB: undefined,
        UPLOAD_JOB_SUCCESS: (data, status) => ({data, status}),
        UPLOAD_JOB_FAILURE: (status, data) => ({ status, data }),
        CANCEL_UPLOAD: (ticketNumber, targetToken) => ({ticketNumber, targetToken}),
        CANCEL_UPLOAD_SUCCESS: undefined,
        CANCEL_UPLOAD_FAILURE: (status, data) => ({ status, data }),
        CLEAR_UPLOAD_DATA: undefined,
        DISPLAY_UPLOAD_MODAL: (uploadType) => ({uploadType}),
        HIDE_UPLOAD_MODAL: undefined,
    },
    TARGETS: {
        LOAD: undefined,
        LOAD_SUCCESS: undefined,
        SWITCH_TARGET: undefined
    }
});
