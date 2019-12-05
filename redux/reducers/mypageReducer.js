// Initial State
const initialState = {
  nickname: null,
  major: null,
  introduction: null
};

// Reducers (Modifies The State And Returns A New State)
const mypageReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case "SAVE_NICKNAME": {
      return {
        // State
        ...state,
        // Redux Store
        nickname: action.nickname
      };
    }
    case "SAVE_MAJOR": {
      return {
        // State
        ...state,
        // Redux Store

        major: action.major
      };
    }
    case "SAVE_INTRODUCTION": {
      return {
        ...state,
        introduction: action.introduction
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default mypageReducer;
