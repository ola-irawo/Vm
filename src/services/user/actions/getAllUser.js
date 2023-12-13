import { getFetch } from "../../../libs/fetch";
import { getCurrentUser } from "../../../libs/getCurrentUser";
import { API_URL } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const currentUser = getCurrentUser();

const payload = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.userToken}`,
  },
};

export const getAllUser = createAsyncThunk("users/getAllUser", async () => {
  const data = await getFetch(`${API_URL}/user/getAllUser`, payload);
  return data;
});
