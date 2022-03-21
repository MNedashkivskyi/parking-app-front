import { GET_PARKING, GET_PARKINGS_LIST, OCCUPY_PLACE } from '../actions/parking';

const initialState = {
  places: [],
  parkings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PARKING:
      return {
        ...state,
        places: action.places,
      };
      case GET_PARKINGS_LIST:
        {
            return {
              ...state,
              parkings: action.parkings,
            };
        }
      case OCCUPY_PLACE:
        {
            return {
              ...state,
              occupyOutcome: action.outcome,
              occupyResponseTimestamp: Date.now(),
            };
        }
  }
  return state;
};
