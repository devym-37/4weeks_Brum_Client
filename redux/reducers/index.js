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
import passwordErrorCountReducer from "./passwordErrorCountReducer";
import avatarReducer from "./avatarReducer";
import refreshReducer from "./refreshReducer";
import currentReducer from "./currentReducer";
import mypageReducer from "./mypageReducer";
import contactReducer from "./contactReducer"
// Redux: Root Reducer
const rootReducer = combineReducers({
  passwordErrorCountReducer,
  authReducer,
  otpReducer,
  phoneReducer,
  campusReducer,
  orderReducer,
  orderPositionReducer,
  destinationReducer,
  refreshReducer,
  mypageReducer,
  avatarReducer,
  currentReducer,
  contactReducer
});

// Exports
export default rootReducer;
