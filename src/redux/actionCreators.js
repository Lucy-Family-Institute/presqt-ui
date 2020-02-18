// TODO: Need something in here to handle pending operations.
import {createActions} from 'redux-actions';

export const actionCreators = createActions({
    AUTHORIZATION: {
        SAVE_TOKEN: (targetID, token) => ({targetID, token}),
        REMOVE_TOKEN: (target) => ({target: target}),
        DISPLAY_TOKEN_MODAL: undefined,
        HIDE_TOKEN_MODAL: undefined,
    },
    RESOURCES: {
        LOAD_FROM_TARGET: (side, target, targetToken) => ({side, target, targetToken,}),
        LOAD_FROM_TARGET_SUCCESS: (side, data) => ({side, data}),
        LOAD_FROM_TARGET_FAILURE: (side, status, data) => ({side, status, data}),
        LOAD_FROM_TARGET_SEARCH: (side, target, targetToken, searchValue) => ({
            side,
            target,
            targetToken,
            searchValue
        }),
        LOAD_FROM_TARGET_SEARCH_SUCCESS: (side, data) => ({side, data}),
        LOAD_FROM_TARGET_SEARCH_FAILURE: (side, status, data) => ({side, status, data}),
        REMOVE_FROM_ERROR_LIST: (actionToRemove) => ({actionToRemove}),
        OPEN_CONTAINER: (side, container) => ({side, container, open: true}),
        CLOSE_CONTAINER: (side, container) => ({side, container, open: false}),
        SELECT_RESOURCE: (side, resource, targetToken) => ({side, resource, targetToken}),
        SELECT_RESOURCE_SUCCESS: (side, data) => ({side, data}),
        CLEAR_RESOURCES: (side) => ({side}),
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
        REFRESH_TARGET: (side, target, targetToken) => ({side, target, targetToken}),
        REFRESH_TARGET_SUCCESS: (side, data) => ({side, data}),
        REFRESH_TARGET_FAILURE: (status, data) => ({status, data}),
        CLEAR_ACTIVE_TICKET_NUMBER: undefined,
        SWITCH_SIDE: (side) => ({side})
    },
    TARGETS: {
        LOAD: undefined,
        LOAD_SUCCESS: undefined,
        SWITCH_TARGET: (side, targetData) => ({side, targetData}),
    }
});
