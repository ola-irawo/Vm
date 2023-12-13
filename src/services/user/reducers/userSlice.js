import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getUserById } from "../actions/getUserById";
import { getAllUser } from "../actions/getAllUser";
import { followUser } from "../actions/folllowUser";
import { unfollowUser } from "../actions/unfollowUser";
import { muteUser } from "../actions/muteUser";
import { unmuteUser } from "../actions/unmuteUser";
import { blockUser } from "../actions/blockUser";
import { unblockUser } from "../actions/unblockUser";
import { reportUser } from "../actions/reportUser";

const userAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = userAdapter.getInitialState({
  status: "idle",
  error: null,
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        userAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload.error;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        console.log(action.payload);
        userAdapter.addOne(state, action.payload);
      })
      .addCase(followUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "fulfilled";
        userAdapter.updateOne(state, action.payload);
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "fulfilled";
        userAdapter.updateOne(state, action.payload);
      })
      .addCase(muteUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "fulfilled";
        userAdapter.updateOne(state, action.payload);
      })
      .addCase(unmuteUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "fulfilled";
        userAdapter.updateOne(state, action.payload);
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "fulfilled";
        userAdapter.updateOne(state, action.payload);
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "fulfilled";
        userAdapter.updateOne(state, action.payload);
      })
      .addCase(reportUser.fulfilled, (state, action) => {
        console.log(action.payload);
        userAdapter.updateOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllUser,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state) => state.users);

export default userSlice.reducer;
