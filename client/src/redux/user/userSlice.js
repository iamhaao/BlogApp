import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  users: null,
  page: null,
  pages: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
    },
    getUsersSuccess: (state, action) => {
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.users = action.payload.users;
    },
  },
});
export const {
  signInSuccess,
  updateUserSuccess,
  deleteUserSuccess,
  signOutSuccess,
  getUsersSuccess,
} = userSlice.actions;
export default userSlice.reducer;
