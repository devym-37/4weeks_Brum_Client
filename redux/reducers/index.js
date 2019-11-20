// Imports: Dependencies
import { combineReducers } from "redux";

// Imports: Reducers
import authReducer from "./authReducer";
import otpReducer from "./otpReducer";
import phoneReducer from "./phoneReducer";
// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
  otpReducer,
  phoneReducer
});

// Exports
export default rootReducer;
