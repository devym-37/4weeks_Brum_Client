// Initial State
const initialState = {
  campus: null
};

// Reducers (Modifies The State And Returns A New State)
const campusReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case "SAVE": {
      return {
        // State
        ...state,
        // Redux Store
        campus: action.campus
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default campusReducer;
