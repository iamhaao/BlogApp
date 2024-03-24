import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: null,
  totalComments: null,
  page: null,
  pages: null,
};

const comment = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getCommentSuccess: (state, action) => {
      state.comments = action.payload.comments;
      state.totalComments = action.totalComments;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    },
  },
});
export const { getCommentSuccess } = comment.actions;
export default comment.reducer;
