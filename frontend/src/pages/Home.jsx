import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import { useSelector } from "react-redux";
import useGetBlog from "../hooks/useGetBlog";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  useGetBlog();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const blog = useSelector((data) => data?.blog?.blogs);
  
  const ownerBlogSearchHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/v2/Blog/owner-blog/${search}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setData(data);
      setSearch("")
    } catch (error) {
      console.log("error while fetch data", error);
    }
  };

  const displayProduct = data.length > 0 ? data :  blog

  return (
    <>
      <div className="md:px-14 flex my-10">
        <input
          className="text-zinc-300 py-2 px-3 rounded-ss-xl rounded-es-xl  bg-zinc-800 outline-none"
          type="text"
          name="ownerblog"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="get owner blog...."
        />
        <button
          onClick={ownerBlogSearchHandler}
          className="p-3 bg-blue-400 rounded-se-xl rounded-ee-xl"
        >
          <FaSearch/>
        </button>
      </div>
      {displayProduct?.length !== 0 ? (
        <div className="min-h-screen flex flex-wrap justify-center gap-10 w-full my-10">
          {displayProduct.map((item, index) => (
            <BlogCard key={index} blog={item} />
          ))}
        </div>
      ) : (
        <div className="flex h-screen justify-center items-center">
          <h1 className="text-2xl">Blog not found !! create your blog</h1>
        </div>
      )}
    </>
  );
};

export default Home;
