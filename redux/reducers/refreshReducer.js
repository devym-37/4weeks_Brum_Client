// Initial State
const initialState = {
  refresh: false
};

// Reducers (Modifies The State And Returns A New State)
const refreshReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case "SAVE": {
      return {
        // State
        ...state,
        // Redux Store
        refresh: !state.refresh
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default refreshReducer;
