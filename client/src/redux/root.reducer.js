import { combineReducers } from "redux";

// Reducers
import userReducer from "./user/user.reducer";
import setsReducer from "./sets/sets.reducer";

// Root Reducer
const rootReducer = combineReducers({
  user: userReducer,
  sets: setsReducer,
});

export default rootReducer;
