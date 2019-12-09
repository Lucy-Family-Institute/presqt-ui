/**
 * Add `element` to `array` if it is not already present.
 **/
export function trackAction(actionCreator, array) {
  return array.includes(actionCreator.toString())
    ? array
    : [...array, actionCreator.toString()];
}

/**
 * Remove 'element' from 'array'
 */
export function untrackAction(actionCreator, array) {
  return array.filter(arrayElement =>
    arrayElement === actionCreator.toString() ? false : true
  );
}

/**
 * Add error object to state.apiOperationErrors
 **/
export function trackError(actionCreator, actionName, array) {
  return  [...array, {
        'action': actionName,
        'status': actionCreator.payload.status,
        'data': actionCreator.payload.data,
      }]
}