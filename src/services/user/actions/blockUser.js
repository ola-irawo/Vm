import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const blockUser = createAsyncThunk(
  "user/blockUser",
  async ({ options, userUid }) => {
    const data = await getFetch(
      `${API_URL}/user/blockUser/${userUid}`,
      options
    );
    return data;
  }
);
