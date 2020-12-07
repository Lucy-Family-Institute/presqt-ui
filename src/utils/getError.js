export default function getError(reducer, apiOperationErrors) {
  return apiOperationErrors.find(element => element.action === reducer.toString());
}