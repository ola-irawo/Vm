import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const unblockUser = createAsyncThunk(
  "user/unblockUser",
  async ({ options, _id }) => {
    const data = await getFetch(`${API_URL}/user/unblockUser/${_id}`, options);
    return data;
  }
);
