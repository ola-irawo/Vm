import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../api";
import { getFetch } from "../../../../libs/fetch";

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ options, postId }) => {
    const data = await getFetch(
      `${API_URL}/post/deletePost/${postId}`,
      options
    );
    console.log(data);
    return data;
  }
);
