import {useSelector} from "react-redux";

export default function getError(reducer) {
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);
  return apiOperationErrors.find(element => element.action === reducer.toString());
}