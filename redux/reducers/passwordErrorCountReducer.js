// Initial State
const initialState = {
  errorCount: 0
};

// Reducers (Modifies The State And Returns A New State)
const passwordErrorCountReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case "INCREASE_COUNTER": {
      return {
        // State
        ...state,
        // Redux Store
        errorCount: state.errorCount + 1
      };
    }
    case "RESET_COUNTER": {
      return {
        // State
        ...state,
        // Redux Store
        errorCount: 0
      };
    }

    default: {
      return state;
    }
  }
};

// Exports
export default passwordErrorCountReducer;
