// Initial State
const initialState = {
  destination: null
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
        destination: action.destination
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
