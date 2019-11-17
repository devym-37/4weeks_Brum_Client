// Imports: Dependencies
import { combineReducers } from "redux";

// Imports: Reducers
import authReducer from "./authReducer";
import counterReducer from "./counterReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
  counterReducer
});

// Exports
export default rootReducer;
