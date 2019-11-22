// Imports: Dependencies
import { combineReducers } from "redux";

// Imports: Reducers
import authReducer from "./authReducer";
import otpReducer from "./otpReducer";
import phoneReducer from "./phoneReducer";
import campusReducer from "./campusReducer";
// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
  otpReducer,
  phoneReducer,
  campusReducer
});

// Exports
export default rootReducer;
