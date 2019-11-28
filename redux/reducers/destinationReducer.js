// Initial State
const initialState = {
  arrivalLocation: null,
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
        arrivalLocation: action.arrivalLocation,
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
