// Initial State
const initialState = {
  isAllowed: null
};

// Reducers (Modifies The State And Returns A New State)
const permissionsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Permissions
    case "PERMISSIONS": {
      return {
        // State
        ...state,
        // Redux Store
        isAllowed: action.trueFalse
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default permissionsReducer;
