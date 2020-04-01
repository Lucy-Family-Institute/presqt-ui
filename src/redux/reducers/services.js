import { actionCreators } from "../actionCreators";

export const servicesReducers = {
  initialState: {
    selectedService: null,
    availableServices: []
  },
  reducers: {
    [actionCreators.services.selectServiceSuccess]: (state, action) => ({
      ...state,
      selectedService: action.payload
    }),
    [actionCreators.services.clearService]: state => ({
      ...state,
      selectedService: null
    }),
    [actionCreators.services.loadServicesSuccess]: (state, action) => ({
      ...state,
      availableServices: action.payload
    })
  }
};
