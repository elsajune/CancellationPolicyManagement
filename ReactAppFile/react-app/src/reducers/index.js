import { combineReducers } from "redux";
import policyReducer from "./reducers"; 

const allReducers = combineReducers({policyReducer});

export default allReducers;