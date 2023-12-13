import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { createBio } from "../actions/createBio";
import { updateBio } from "../actions/updateBio";
import { getUserBio } from "../actions/getUserBio";
import { getUserBioById } from "../actions/getBioByUserId";

const bioAdapater = createEntityAdapter({});

const initialState = bioAdapater.getInitialState({
  status: "idle",
  error: null,
});

const bioSlice = createSlice({
  name: "bio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBio.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createBio.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
        console.log(action.payload);
        bioAdapater.addOne(state, action.payload);
      })
      .addCase(createBio.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(updateBio.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        bioAdapater.updateOne(state, action.payload);
      })
      .addCase(getUserBio.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        bioAdapater.upsertOne(state, action.payload);
      })
      .addCase(getUserBioById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        bioAdapater.upsertOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectBio,
  selectById: selectBioById,
  selectIds: selectBioIds,
} = bioAdapater.getSelectors((state) => state.bio);

export const getBioStatus = (state) => state.bio.status;
export const getBioError = (state) => state.bio.error;
export default bioSlice.reducer;
