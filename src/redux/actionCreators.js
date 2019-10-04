// TODO: Need something in here to handle pending operations.
import { createActions } from 'redux-actions';

export const actionCreators = createActions({
  AUTHORIZATION: {
    SAVE_TOKEN: (targetID, token) => ({ targetID, token })
  },
  RESOURCES: {
    LOAD_FROM_SOURCE_TARGET: (sourceTarget, sourceTargetToken) => ({
      sourceTarget,
      sourceTargetToken
    }),
    LOAD_FROM_SOURCE_TARGET_SUCCESS: undefined,
    OPEN_CONTAINER: container => ({ container, open: true }),
    CLOSE_CONTAINER: container => ({ container, open: false }),
    SELECT_SOURCE_RESOURCE: (resource, sourceTargetToken) => ({
      resource,
      sourceTargetToken
    }),
    SELECT_SOURCE_RESOURCE_SUCCESS: undefined
  },
  TARGETS: {
    LOAD: undefined,
    LOAD_SUCCESS: undefined,
    SWITCH_SOURCE: undefined,
    SWITCH_TARGET: undefined
  }
});
