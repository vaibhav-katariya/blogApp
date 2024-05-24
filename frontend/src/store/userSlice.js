import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    profile: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setUser, getMyProfile } = userSlice.actions;
export default userSlice;
