import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const joinSociety = createAsyncThunk(
  "society/joinSociety",
  async (options) => {
    const data = await getFetch(`${API_URL}/society/joinSociety`, options);
    return data;
  }
);
