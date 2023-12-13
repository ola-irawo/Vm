import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const getSocietyPosts = createAsyncThunk(
  "societyPost/getSocietyPosts",
  async ({ options, societyId }) => {
    const data = await getFetch(
      `${API_URL}/society/getSocietyPosts/${societyId}`,
      options
    );
    return data;
  }
);
