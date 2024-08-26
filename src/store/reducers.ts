import { combineReducers } from "@reduxjs/toolkit";

import { authenticationReducer } from "../modules/authentication/reducers";
import { notesReducer } from "../modules/notes/reducers";

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  notes: notesReducer,
});
