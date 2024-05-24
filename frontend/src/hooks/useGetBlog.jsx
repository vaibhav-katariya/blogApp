import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../store/blogSlice";

const useGetBlog = () => {
  const refresh = useSelector((state) => state.blog.refresh);
  const dispatch = useDispatch();
  useEffect(() => {
    const getblog = async () => {
      const res = await fetch("/api/v2/Blog/getAllBlog");
      const data = await res.json();
      dispatch(getBlogs(data));
    };
    getblog();
  }, [refresh]);
};

export default useGetBlog;
