import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const payload = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWQ1NjljZDk4MmE5ZmYxZmU5ZWIwYyIsInVzZXJuYW1lIjoiSXJhd28iLCJpYXQiOjE3MDEyODc1ODQsImV4cCI6MTcwMTMzMDc4NH0.-3ZUYvJum7z7UHpu3ABFuLQLPbLkNnr5xMLNrRpnXH0`,
  },
};

export const getUserById = createAsyncThunk("user/getUserById", async () => {
  const data = await getFetch(
    `${API_URL}/user/getUserById/655d569cd982a9ff1fe9eb0c`,
    payload
  );
  return data;
});
// 655d569cd982a9ff1fe9eb0c
