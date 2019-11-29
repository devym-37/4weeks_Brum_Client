// Initial State
const initialState = {
  departure: null,
  departureAddress: null,
  arrival: null
};

// Reducers (Modifies The State And Returns A New State)
const orderPositionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case "SAVE": {
      return {
        // State
        ...state,
        // Redux Store
        departure: action.departure,
        departureAddress: action.departureAddress,
        arrival: action.arrival
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
