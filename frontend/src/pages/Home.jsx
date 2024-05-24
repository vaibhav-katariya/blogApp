import React from "react";
import BlogCard from "../components/BlogCard";
import { useSelector } from "react-redux";
import useGetBlog from "../hooks/useGetBlog";

const Home = () => {
  useGetBlog();

  const blog = useSelector((data) => data.blog.blogs);

  return (
    <div className="">
      {blog.length !== 0 ? (
          <div className="min-h-screen flex flex-wrap justify-center gap-10 w-full my-10">
            {blog.map((item, index) => (
              <BlogCard key={index} blog={item} />
            ))}
          </div>
        ) : (
          <div className="flex h-screen justify-center items-center">
            <h1 className="text-2xl">Blog not found !! create your blog</h1>
          </div>
        )}
    </div>
  );
};

export default Home;
