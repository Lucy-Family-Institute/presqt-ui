import { createActions } from 'redux-actions';

export const actionCreators = createActions({
  AUTHORIZATION: {
    SAVE_TOKEN: (targetID, token) => ({ targetID, token })
  },
  RESOURCES: {
    LOAD_FROM_SOURCE_TARGET: undefined,
    LOAD_FROM_SOURCE_TARGET_SUCCESS: undefined,
    OPEN_CONTAINER: container => ({ container, open: true }),
    CLOSE_CONTAINER: container => ({ container, open: false }),
    SELECT_SOURCE_RESOURCE: undefined
  },
  TARGETS: {
    LOAD: undefined,
    LOAD_SUCCESS: undefined,
    SWITCH_SOURCE: (sourceTarget, sourceTargetToken) => ({
      sourceTarget,
      sourceTargetToken
    }),
    SWITCH_TARGET: undefined
  }
});
