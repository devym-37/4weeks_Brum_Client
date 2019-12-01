// Initial State
const initialState = {
  avatar: null
};

// Reducers (Modifies The State And Returns A New State)
const avatarReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case "SAVE": {
      return {
        // State
        ...state,
        // Redux Store
        avatar: action.avatar
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default avatarReducer;
