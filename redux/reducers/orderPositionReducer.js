// Initial State
const initialState = {
  departurePosition: null,
  arrivalPosition: null
};

// Reducers (Modifies The State And Returns A New State)
const orderPositionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case "arrivalPositionSave": {
      return {
        // State
        ...state,
        // Redux Store
        arrivalPosition: action.arrivalPosition
      };
    }
    case "departurePositionSave": {
      return {
        // State
        ...state,
        // Redux Store
        departurePosition: action.departurePosition
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default orderPositionReducer;
