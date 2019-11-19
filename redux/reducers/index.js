// Imports: Dependencies
import { combineReducers } from "redux";

// Imports: Reducers
import authReducer from "./authReducer";
import counterReducer from "./counterReducer";
import otpReducer from "./otpReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
  counterReducer,
  otpReducer
});

// Exports
export default rootReducer;
