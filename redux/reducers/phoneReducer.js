// Initial State
const initialState = {
  phone: ""
};

// Reducers (Modifies The State And Returns A New State)
const phoneReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case "SAVE": {
      return {
        // State
        ...state,
        // Redux Store
        phone: action.phone
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default phoneReducer;
