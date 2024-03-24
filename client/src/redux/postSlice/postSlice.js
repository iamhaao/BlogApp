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
    getAllPost: (state, action) => {
      state.posts = action.payload.posts;
      state.totalPost = action.payload.totalPost;
    },
    getPostSuccess: (state, action) => {
      state.post = action.payload;
    },
    getRecentsPostSuccess: (state, action) => {
      state.recentPosts = action.payload;
    },
  },
});
export const { getPostSuccess, getRecentsPostSuccess, getAllPost } =
  postSlice.actions;
export default postSlice.reducer;
