import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice/AuthSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
