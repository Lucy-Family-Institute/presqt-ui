/**
 * Add `element` to `array` if it is not already present.
 **/
export function trackAction(action, array) {
  return array.includes(action)
    ? array
    : [...array, action];
}

/**
 * Remove 'element' from 'array'
 */
export function untrackAction(action, array) {
  return array.filter(arrayElement =>
    arrayElement === action ? false : true
  );
}

/**
 * Add error object to state.apiOperationErrors
 **/
export function trackError(actionCreator, action, array) {
  return  [...array, {
        'action': action.toString(),
        'status': actionCreator.payload.status,
        'data': actionCreator.payload.data,
      }]
}



