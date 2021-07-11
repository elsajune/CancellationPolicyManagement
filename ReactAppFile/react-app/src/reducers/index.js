import { combineReducers } from "redux";
import policyReducer from "./reducers"; //Check the working

const allReducers = combineReducers({policyReducer});

export default allReducers;