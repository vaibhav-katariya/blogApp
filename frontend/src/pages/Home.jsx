import React from "react";
import BlogCard from "../components/BlogCard";
import { useSelector } from "react-redux";
import useGetBlog from "../hooks/useGetBlog";

const Home = () => {
  useGetBlog();

  const blog = useSelector((data) => data.blog.blogs);

  return (
    <div className="min-h-screen flex flex-wrap justify-center gap-10 w-full my-10">
      {blog &&
        blog.map((item, index) => {
          return <BlogCard key={index} blog={item} />;
        })}
    </div>
  );
};

export default Home;
