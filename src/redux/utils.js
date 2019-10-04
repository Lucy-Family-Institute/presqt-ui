/**
 * Add `element` to `array` if it is not already present.
 */
export function trackAction(actionCreator, array) {
  return array.includes(actionCreator.toString())
    ? array
    : [...array, actionCreator.toString()];
}

export function untrackAction(actionCreator, array) {
  return array.filter(arrayElement =>
    arrayElement === actionCreator.toString() ? false : true
  );
}
