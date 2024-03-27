import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  posts: null,
  totalPost: null,
  recentPosts: null,
  postsSearch: null,
  pagePostSearch: null,
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
    getSearchPost: (state, action) => {
      state.postsSearch = action.payload.posts;
    },
  },
});
export const {
  getPostSuccess,
  getRecentsPostSuccess,
  getAllPost,
  getSearchPost,
} = postSlice.actions;
export default postSlice.reducer;
