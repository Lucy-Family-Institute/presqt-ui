// TODO: Need something in here to handle pending operations.
import {createActions} from 'redux-actions';

export const actionCreators = createActions({
    AUTHORIZATION: {
        SAVE_TOKEN: (targetID, token) => ({targetID, token}),
        REMOVE_TOKEN: (target) => ({target: target}),
    },
    RESOURCES: {
        LOAD_FROM_SOURCE_TARGET: (sourceTarget, sourceTargetToken) => ({
            sourceTarget,
            sourceTargetToken
        }),
        LOAD_FROM_SOURCE_TARGET_SUCCESS: undefined,
        LOAD_FROM_SOURCE_TARGET_FAILURE: (status, data) => ({status, data}),
        REMOVE_FROM_ERROR_LIST: action => ({action: action}),
        OPEN_CONTAINER: container => ({container, open: true}),
        CLOSE_CONTAINER: container => ({container, open: false}),
        SELECT_SOURCE_RESOURCE: (resource, sourceTargetToken) => ({resource, sourceTargetToken}),
        SELECT_SOURCE_RESOURCE_SUCCESS: undefined,
        LOAD_FROM_SOURCE_TARGET_SEARCH: (sourceTarget, sourceTargetToken, searchValue) => (
          {sourceTarget, sourceTargetToken, searchValue})
    },
    TARGETS: {
        LOAD: undefined,
        LOAD_SUCCESS: undefined,
        SWITCH_SOURCE: undefined,
        SWITCH_TARGET: undefined
    }
});
