import { combineReducers, configureStore } from "@reduxjs/toolkit";
import messageBar from "./models/messageBar";
import backDrop from "./models/backDrop";
import user from "./models/user";

export const store = configureStore({
  reducer: combineReducers({
    user: user,
    message: messageBar,
    backdrop: backDrop,
  }),
});
