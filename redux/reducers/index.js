// Imports: Dependencies
import { combineReducers } from "redux";

// Imports: Reducers
import authReducer from "./authReducer";
import otpReducer from "./otpReducer";
import phoneReducer from "./phoneReducer";
import campusReducer from "./campusReducer";
import orderReducer from "./orderReducer";
import orderPositionReducer from "./orderPositionReducer";
import destinationReducer from "./destinationReducer";
// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
  otpReducer,
  phoneReducer,
  campusReducer,
  orderReducer,
  orderPositionReducer,
  destinationReducer
});

// Exports
export default rootReducer;
