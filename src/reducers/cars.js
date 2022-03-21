import { ADD_CAR, DELETE_CAR, GET_CAR_INFO, GET_CARS } from '../actions/cars';

const initialState = {
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAR:
      return {
        ...state,
        addOutcome: action.outcome,
        addResponseTimestamp: Date.now(),
      }; 
    case DELETE_CAR:
      return {
        ...state,
        deleteOutcome: action.outcome,
        deleteResponseTimestamp: Date.now(),
      };
    case GET_CAR_INFO:
      return {
        ...state,
        car_info: action.car_info,
      };
    case GET_CARS:
      return {
        ...state,
        cars: action.cars,
        carsResponseTimestamp: Date.now(),
        addOutcome: undefined,
        deleteOutcome: undefined,
        deleteResponseTimestamp: undefined,
        addResponseTimestamp: undefined,
      };
  }
  return state;
};
