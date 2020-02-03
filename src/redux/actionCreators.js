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
        LOAD_FROM_SOURCE_TARGET: (sourceTarget, sourceTargetToken) => ({
            sourceTarget,
            sourceTargetToken,
        }),
        LOAD_FROM_SOURCE_TARGET_SEARCH: (sourceTarget, sourceTargetToken, searchValue) => ({
            sourceTarget,
            sourceTargetToken,
            searchValue
        }),
        LOAD_FROM_SOURCE_TARGET_SUCCESS: undefined,
        LOAD_FROM_SOURCE_TARGET_SEARCH_SUCCESS: undefined,
        LOAD_FROM_SOURCE_TARGET_FAILURE: (status, data) => ({status, data}),
        LOAD_FROM_SOURCE_TARGET_SEARCH_FAILURE: (status, data) => ({status, data}),
        REMOVE_FROM_ERROR_LIST: (actionToRemove) => ({actionToRemove}),
        OPEN_CONTAINER: container => ({container, open: true}),
        CLOSE_CONTAINER: container => ({container, open: false}),
        SELECT_SOURCE_RESOURCE: (resource, sourceTargetToken) => ({resource, sourceTargetToken}),
        SELECT_SOURCE_RESOURCE_SUCCESS: undefined,
        CLEAR_SOURCE_RESOURCES: undefined,
        DOWNLOAD_RESOURCE: (resource, sourceTargetToken) => ({resource, sourceTargetToken}),
        DOWNLOAD_FROM_SOURCE_TARGET_SUCCESS: undefined,
        DOWNLOAD_FROM_SOURCE_TARGET_FAILURE: (status, data) => ({ status, data }),
        DOWNLOAD_JOB: undefined,
        DOWNLOAD_JOB_SUCCESS: (data, status) => ({data, status}),
        CLEAR_DOWNLOAD_DATA: undefined,
        UPLOAD_TO_SOURCE_TARGET: (sourceTarget, file, duplicateAction, resourceToUploadTo, sourceTargetToken) =>
          ({sourceTarget, file, duplicateAction, resourceToUploadTo, sourceTargetToken}),
        UPLOAD_TO_SOURCE_TARGET_SUCCESS: undefined,
        UPLOAD_TO_SOURCE_TARGET_FAILURE: (status, data) => ({status, data}),
        UPLOAD_JOB: undefined,
        UPLOAD_JOB_SUCCESS: (data, status) => ({data, status}),
        CLEAR_UPLOAD_DATA: undefined,
        DISPLAY_UPLOAD_MODAL: (uploadType) => ({uploadType}),
        HIDE_UPLOAD_MODAL: undefined,
        REFRESH_SOURCE_TARGET: (sourceTarget, sourceTargetToken) => ({
            sourceTarget,
            sourceTargetToken,
        }),
        REFRESH_SOURCE_TARGET_SUCCESS: undefined,
        REFRESH_SOURCE_TARGET_FAILURE: (status, data) => ({status, data}),
    },
    TARGETS: {
        LOAD: undefined,
        LOAD_SUCCESS: undefined,
        SWITCH_SOURCE: undefined,
        SWITCH_TARGET: undefined
    },
});
