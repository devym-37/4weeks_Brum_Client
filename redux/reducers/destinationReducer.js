// Initial State
const initialState = {
  destination: null,
  departureLocation: null
};

// Reducers (Modifies The State And Returns A New State)
const destinationReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case "SAVE": {
      return {
        // State
        ...state,
        // Redux Store
        destination: action.destination,
        departureLocation: action.departureLocation
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default destinationReducer;
