import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [blog, setBlog] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/v2/Blog/getAllBlog");
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.log("data not found");
      }
    };
    fetchData();
  }, []);

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
