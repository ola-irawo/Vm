import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  signupAction,
  verifyOTPAction,
} from "../actions/authAction";

const authAdapter = createEntityAdapter({});

const initialState = authAdapter.getInitialState({
  status: "idle",
  error: null,
  isLoggedIn: false,
  userData: [],
});

const authSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAction.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(signupAction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.isLoggedIn = true;
      })
      .addCase(signupAction.rejected, (state, action) => {
        state.status = "idle";
        state.isLoggedIn = false;
        state.error = action.payload.data;
      })
      .addCase(verifyOTPAction.fulfilled, (state, action) => {
        // authAdapter.upsertMany(state, action.payload);
        console.log(action.payload);
      })
      .addCase(loginAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.isLoggedIn = true;
        localStorage.setItem(
          "token",
          JSON.stringify({
            userUid: action.payload.id,
            userToken: action.payload.token,
          })
        );
        authAdapter.upsertMany(state, [action.payload]);
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.status = "idle";
        state.isLoggedIn = false;
        state.error = action.payload.data;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoggedIn = false;
        state.userData = {};
      });
  },
});

export const {
  selectAll: selectAuthenticatedUser,
  selectById: selectAuthenticatedById,
  selectIds: selectAuthenticatedIds,
} = authAdapter.getSelectors((state) => state.auths);

export const loggedIn = (state) => state.auths.isLoggedIn;
export const getLoginStaus = (state) => state.auths.status;
export const userData = (state) => state.auths.userData;

export default authSlice.reducer;
