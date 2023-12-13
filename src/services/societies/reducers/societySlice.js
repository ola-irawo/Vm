import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getAllSociety } from "../action/getAllSociety";
import { joinSociety } from "../action/joinSociety";
import { getSocietyById } from "../action/getSocietyById";
import { getUserSocieties } from "../action/getUserSocieties";
import { getSocietyPosts } from "../../societyPost/actions/getSocietyPosts";

const societyAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = societyAdapter.getInitialState({
  status: "idle",
  error: null,
  joinedSocieties: [],
  societyPosts: [],
});

const societySlice = createSlice({
  name: "society",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSociety.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllSociety.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        societyAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllSociety.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload.error;
      })
      .addCase(joinSociety.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        societyAdapter.addOne(state, action.payload);
      })
      .addCase(getSocietyById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        societyAdapter.upsertMany(state, action.payload);
      })
      .addCase(getUserSocieties.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload, "get");
        state.joinedSocieties = [...action.payload];
      });
  },
});

export const {
  selectAll: selectAllSociety,
  selectById: selectSocietyById,
  selectIds: selectSocietyIds,
} = societyAdapter.getSelectors((state) => state.societies);

export const getSoceityStatus = (state) => state.societies.status;
export const getUserJoinedSocieties = (state) =>
  state.societies.joinedSocieties;
export default societySlice.reducer;
