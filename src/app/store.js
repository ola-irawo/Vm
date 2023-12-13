import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authentication/reducers/authSlice.js";
import postSlice from "../services/post/reducers/postSlice.js";
import userSlice from "../services/user/reducers/userSlice.js";
import societySlice from "../services/societies/reducers/societySlice.js";
import bioSlice from "../services/bio/reducers/bioSlice.js";
import societyPostSlice from "../services/societyPost/reducers/societyPostSlice.js";

const store = configureStore({
  reducer: {
    auths: authSlice,
    posts: postSlice,
    users: userSlice,
    societies: societySlice,
    societyPost: societyPostSlice,
    bio: bioSlice,
  },
});

export default store;
