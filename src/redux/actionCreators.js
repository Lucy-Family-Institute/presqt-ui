import { SWITCH_SOURCE } from './actionTypes';

export function switchSource(source) {
  return {
    type: SWITCH_SOURCE,
    payload: {
      source
    }
  };
}
