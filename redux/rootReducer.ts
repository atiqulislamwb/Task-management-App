import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./feature/auth/authSlice";
import tasksReducer from "./feature/task/tasksSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer, // 👈 do NOT persist this
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
