import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/v2/Blog/getAllBlog");
        const data = await res.json();
        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.log("data not found");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <h1 className="flex justify-center mt-10 h-screen">Loading...</h1>
  ) : (
    <div className="min-h-screen flex flex-wrap justify-center gap-10 w-full my-10">
      {blog &&
        blog.map((item, index) => {
          return <BlogCard key={index} blog={item} />;
        })}
    </div>
  );
};

export default Home;
