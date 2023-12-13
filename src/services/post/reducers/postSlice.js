import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchPosts } from "../actions/crud/fetchPosts";
import { createPost } from "../actions/crud/createPost";
import { deletePost } from "../actions/crud/deletePost";
import { updatePost } from "../actions/crud/updatePost";
import { upvotePost } from "../actions/interactions/upvote";
import { downvotePost } from "../actions/interactions/downvote";
import { sharePost } from "../actions/interactions/share";
import { getPostsByUser } from "../../user/actions/getPostsByUser";
import { getPostUserUpvoted } from "../actions/interactions/getPostUserUpvoted";
import { getPostsUserDownvoted } from "../actions/interactions/getPostsUserDownvoted";
import { getPostsBySearch } from "../actions/crud/getPostsBySearch";
import { bookmarkPost } from "../actions/crud/bookmarkPost";

const postAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = postAdapter.getInitialState({
  status: "idle",
  error: null,
  userPost: "My first post",
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        postAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload.error;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log("Action Payload:", action.payload);
        if (action.payload) {
          postAdapter.addOne(state, action.payload);
        } else {
          console.error("createPost.fulfilled payload is null or undefined");
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        postAdapter.removeOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "fulilled";
        postAdapter.updateOne(state, action.payload);
      })
      .addCase(upvotePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        postAdapter.updateOne(state, action.payload);
      })
      .addCase(downvotePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        postAdapter.updateOne(state, action.payload);
      })
      .addCase(sharePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        postAdapter.updateOne(state, action.payload);
      })
      .addCase(getPostsByUser.fulfilled, (state, action) => {
        postAdapter.upsertMany(state, action.payload);
      })
      .addCase(getPostUserUpvoted.fulfilled, (state, action) => {
        console.log(action.payload);
        postAdapter.upsertMany(state, action.payload);
      })
      .addCase(getPostsUserDownvoted.fulfilled, (state, action) => {
        postAdapter.upsertMany(state, action.payload);
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload, "search");
        postAdapter.upsertMany(state, action.payload);
      })
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        postAdapter.upsertMany(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postAdapter.getSelectors((state) => state.posts);

export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export default postsSlice.reducer;
