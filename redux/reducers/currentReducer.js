// Initial State
const initialState = {
  currentLocation: null
};

// Reducers (Modifies The State And Returns A New State)
const currentReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case "currentLocationSave": {
      return {
        // State
        ...state,
        // Redux Store
        currentLocation: action.currentLocation
      };
    }
    default: {
      return state;
    }
  }
};

// Exports
export default currentReducer;
