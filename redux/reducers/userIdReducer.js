// Initial State
const initialState = {
  phone: null
};

// Reducers (Modifies The State And Returns A New State)
const userIdReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case "SAVE": {
      return {
        // State
        ...state,
        // Redux Store
        phone: action.userId
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default userIdReducer;
