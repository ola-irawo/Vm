import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (payload) => {
    const data = await getFetch(`${API_URL}/post/createPost`, payload);
    console.log(payload);
    return data;
  }
);
