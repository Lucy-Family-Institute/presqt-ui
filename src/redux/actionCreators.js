import { createActions } from 'redux-actions';

export const actionCreators = createActions({
  TARGETS: {
    LOAD: undefined,
    LOAD_SUCCESS: undefined,
    SWITCH_SOURCE: (sourceTarget, sourceTargetToken) => ({
      sourceTarget,
      sourceTargetToken
    }),
    SWITCH_TARGET: undefined
  },
  RESOURCES: {
    LOAD: (sourceTarget, sourceTokenTarget) => ({
      sourceTarget,
      sourceTokenTarget
    }),
    LOAD_SUCCESS: undefined,
    OPEN_CONTAINER: container => ({ container, open: true }),
    CLOSE_CONTAINER: container => ({ container, open: false })
  }
});
