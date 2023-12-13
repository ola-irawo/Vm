import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, getFetch } from "../index";

export const signupAction = createAsyncThunk(
  "auth/signupAuth",
  async (payload) => {
    const data = await getFetch(`${API_URL}/user/signup`, payload);
    return data;
  }
);

export const loginAction = createAsyncThunk(
  "auth/loginAuth",
  async (payload) => {
    const data = await getFetch(`${API_URL}/user/login`, payload);
    console.log(data);
    return data;
  }
);

export const logoutAction = createAsyncThunk("auth/logoutAuth", async () => {
  const data = await getFetch(`${API_URL}/user/logout`);
  return data;
});

export const verifyOTPAction = createAsyncThunk(
  "auth/OTPAuth",
  async (payload) => {
    const data = await getFetch(`${API_URL}/user/verifyEmail`, payload);
    console.log(data);
    return data;
  }
);

export const useAsyncThunk = (typePrefix, url, payload) => {
  const asyncThunk = createAsyncThunk(typePrefix, async (payload) => {
    const data = await getFetch(`${url}`, payload);
    return data;
  });
};
