import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    refresh:false,
  },
  reducers: {
    getBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    getRefresh:(state)=>{
        state.refresh = !state.refresh;
    },
  },
});

export const { getBlogs , getRefresh } = blogSlice.actions;
export default blogSlice;
