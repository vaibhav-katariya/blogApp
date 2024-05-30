import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    profile: null,
    otherUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
    getOtherProfile: (state, action) => {
      state.otherUser = action.payload;
    },
  },
});

export const { setUser, getMyProfile, getOtherProfile } = userSlice.actions;
export default userSlice;
