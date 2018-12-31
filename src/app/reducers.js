import { combineReducers } from "redux";
import homeReducer from "./home/duck";
import generalReducer from "./duck";

//For redux properties needed by all pages
export const INITIAL_STATE = {};

const rootReducer = combineReducers({
  home: homeReducer,
  general: generalReducer
});

export default rootReducer;
