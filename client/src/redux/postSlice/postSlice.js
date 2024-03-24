import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  posts: null,
  totalPost: null,
  recentPosts: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostSuccess: (state, action) => {
      state.post = action.payload;
    },
    getRecentsPostSuccess: (state, action) => {
      state.recentPosts = action.payload;
    },
  },
});
export const { getPostSuccess, getRecentsPostSuccess } = postSlice.actions;
export default postSlice.reducer;
