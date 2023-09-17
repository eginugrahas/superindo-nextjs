import { combineReducers } from "redux";
import authReducer from "./features/authSlices";
import userRoleSlices from "./features/userRoleSlices";
import menuSlices from "./features/menuSlices";

const rootReducer = combineReducers({
  authReducer,
  userRoleSlices,
  menuSlices,
});


export default rootReducer;