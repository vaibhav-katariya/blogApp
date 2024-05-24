import React from "react";
import { useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import BlogCard from "../components/BlogCard";
import {Link} from 'react-router-dom'
const Profile = () => {
  useGetProfile();
  const profile = useSelector((state) => state.user.profile);
  const blog = useSelector((blog) => blog.blog.blogs);

  const userBlog = blog.filter((item) => item?.owner?._id === profile?.user?._id);

  return (
    <div className="min-h-screen w-full relative">
      <div className="h-[35%] md:h-[40%] w-full py-14 border-b-[1px] border-zinc-700">
        <div className="flex w-full items-center gap-5 md:gap-[3rem]">
          <div className="md:w-[8rem] md:h-[8rem] w-[5rem] h-[5rem] p-3 border-[1px] border-zinc-700 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-full"
              src={profile?.user?.avatar}
              alt="profile"
            />
          </div>
          <div className="my-2">
            <h1 className="text-2xl">{profile?.user?.username}</h1>
            <p>post {profile?.posts_lenght}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl m-5 flex  md:justify-center">Blogs</h1>
        {userBlog?.length !== 0 ? (
          <div className="flex flex-wrap justify-center gap-10 w-full my-10">
            {userBlog.map((item, index) => (
              <BlogCard key={index} blog={item} />
            ))}
          </div>
        ) : (
          <div className="flex h-screen justify-center items-center">
            <h1 className="text-2xl">create your blog</h1>
          </div>
        )}
      </div>
      <div className="h-10 py-2 flex justify-center items-center w-20 bg-zinc-800 rounded-full fixed right-6 bottom-5">
          <h1 className="text-white font-semibold text-xl"><Link to={'/create'}>create</Link></h1>
      </div>
    </div>
  );
};

export default Profile;
