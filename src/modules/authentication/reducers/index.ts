import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthenticationState } from "../@types";

const initialState: AuthenticationState = {
  user: null,
  access: null,
  refresh: null,
  authenticationStatus: "notAuthenticated",
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticateAction: (
      state,
      action: PayloadAction<Omit<AuthenticationState, "authenticationStatus">>
    ) => {
      state.user = action.payload.user;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.authenticationStatus = "authenticated";
    },
    signOutAction: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.authenticationStatus = "notAuthenticated";
    },
  },
});

export const { authenticateAction, signOutAction } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
