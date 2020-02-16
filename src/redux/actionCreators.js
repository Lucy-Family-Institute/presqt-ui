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
        LOAD_FROM_TARGET: (target, targetToken) => ({target, targetToken,}),
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
        DOWNLOAD_RESOURCE: (resource, targetToken) => ({resource, targetToken}),
        DOWNLOAD_FROM_SOURCE_TARGET_SUCCESS: (data) => ({data}),
        DOWNLOAD_FROM_SOURCE_TARGET_FAILURE: (status, data) => ({ status, data }),
        DOWNLOAD_JOB: undefined,
        DOWNLOAD_JOB_SUCCESS: (data, status) => ({data, status}),
        DOWNLOAD_JOB_FAILURE: (status, data) => ({status, data}),
        CANCEL_DOWNLOAD: (ticketNumber, sourceTargetToken) => ({ticketNumber, sourceTargetToken}),
        CANCEL_DOWNLOAD_SUCCESS: undefined,
        CANCEL_DOWNLOAD_FAILURE: (status, data) => ({ status, data }),
        CLEAR_DOWNLOAD_DATA: undefined,
        DISPLAY_DOWNLOAD_MODAL: undefined,
        HIDE_DOWNLOAD_MODAL: undefined,
        UPLOAD_TO_SOURCE_TARGET: (sourceTarget, file, duplicateAction, resourceToUploadTo, sourceTargetToken) =>
          ({sourceTarget, file, duplicateAction, resourceToUploadTo, sourceTargetToken}),
        UPLOAD_TO_SOURCE_TARGET_SUCCESS: (data) => ({data}),
        UPLOAD_TO_SOURCE_TARGET_FAILURE: (status, data) => ({status, data}),
        UPLOAD_JOB: undefined,
        UPLOAD_JOB_SUCCESS: (data, status) => ({data, status}),
        UPLOAD_JOB_FAILURE: (status, data) => ({ status, data }),
        CANCEL_UPLOAD: (ticketNumber, sourceTargetToken) => ({ticketNumber, sourceTargetToken}),
        CANCEL_UPLOAD_SUCCESS: undefined,
        CANCEL_UPLOAD_FAILURE: (status, data) => ({ status, data }),
        CLEAR_UPLOAD_DATA: undefined,
        DISPLAY_UPLOAD_MODAL: (uploadType) => ({uploadType}),
        HIDE_UPLOAD_MODAL: undefined,
        REFRESH_SOURCE_TARGET: (sourceTarget, sourceTargetToken) => ({
            sourceTarget,
            sourceTargetToken,
        }),
        REFRESH_SOURCE_TARGET_SUCCESS: undefined,
        REFRESH_SOURCE_TARGET_FAILURE: (status, data) => ({status, data}),
        CLEAR_ACTIVE_TICKET_NUMBER: undefined
    },
    TARGETS: {
        LOAD: undefined,
        LOAD_SUCCESS: undefined,
        SWITCH_SOURCE: undefined,
        SWITCH_TARGET: undefined
    }
});
