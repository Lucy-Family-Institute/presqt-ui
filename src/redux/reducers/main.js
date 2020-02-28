import { handleActions } from "redux-actions";
import {downloadReducers} from "./download";
import {uploadReducers} from "./upload";
import {transferReducers} from "./transfer";
import {resourceReducers} from "./resources";
import {targetsReducers} from "./targets";
import {authorizationReducers} from "./authorization";

const initialState = {
  pendingAPIResponse: false,
  pendingAPIOperations: [],
  apiOperationErrors: [],
  activeTicketNumber: null,
  ...authorizationReducers.initialState,
  ...targetsReducers.initialState,
  ...resourceReducers.initialState,
  ...downloadReducers.initialState,
  ...uploadReducers.initialState,
  ...transferReducers.initialState,
};


export default handleActions(
  {
    ...authorizationReducers.reducers,
    ...targetsReducers.reducers,
    ...resourceReducers.reducers,
    ...downloadReducers.reducers,
    ...uploadReducers.reducers,
    ...transferReducers.reducers,
  },
  initialState
);
