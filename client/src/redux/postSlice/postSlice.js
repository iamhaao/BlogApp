import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  posts: null,
  totalPost: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostSuccess: (state, action) => {
      state.post = action.payload;
    },
  },
});
export const { getPostSuccess } = postSlice.actions;
export default postSlice.reducer;
