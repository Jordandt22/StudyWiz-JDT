import { combineReducers } from "redux";

// Reducers
import globalReducer from "./global/global.reducer";
import userReducer from "./user/user.reducer";
import setsReducer from "./sets/sets.reducer";

// Root Reducer
const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  sets: setsReducer,
});

export default rootReducer;
