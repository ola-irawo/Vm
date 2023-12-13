import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const unmuteUser = createAsyncThunk(
  "user/unmuteUser",
  async ({ options, _id }) => {
    const data = await getFetch(`${API_URL}/user/unmuteUser/${_id}`, options);
    return data;
  }
);
