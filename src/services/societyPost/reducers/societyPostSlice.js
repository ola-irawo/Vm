import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getSocietyPosts } from "../actions/getSocietyPosts";

const societyPostAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = societyPostAdapter.getInitialState({
  status: "idle",
  error: null,
});

const societyPostSlice = createSlice({
  name: "societyPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSocietyPosts.fulfilled, (state, action) => {
      state.status = "fulfilled";
      console.log(action.payload.posts, "societyPosts");
      console.log(action.payload, "societyPosts");
      societyPostAdapter.upsertMany(state, action.payload.posts);
    });
  },
});

export const {
  selectAll: selectSocietyPosts,
  selectById: selectSocietyPostById,
  selectIds: selectSocietyPostIds,
} = societyPostAdapter.getSelectors((state) => state.societyPost);

export default societyPostSlice.reducer;
