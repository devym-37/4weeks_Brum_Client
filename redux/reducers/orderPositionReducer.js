// Initial State
const initialState = {
  departure: null,
  arrival: null
};

// Reducers (Modifies The State And Returns A New State)
const orderPositionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case "arrivalPositionSAVE": {
      return {
        // State
        ...state,
        // Redux Store
        arrival: action.arrival
      };
    },
    case "departurePositionSAVE" : {
      return {
        // State
        ...state,
        // Redux Store
        departure: action.departure
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default orderPositionReducer;
