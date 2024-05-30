import React from "react";
import { useSelector } from "react-redux";
import useGetOtherUser from "../hooks/useGetOtherUser";
import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";

const OtherUserProfile = () => {
  const { id } = useParams();
  useGetOtherUser(id);
  const otherUser = useSelector((data) => data.user.otherUser);
  const user = useSelector((data) => data.user.user);
  const blogs = useSelector((state) => state.blog.blogs);

  const userBlogs = blogs.filter(
    (item) => item?.owner?._id === otherUser?.user?._id
  );
  return (
    <div className="min-h-screen w-full relative">
      <div className="h-[35%] md:h-[40%] w-full py-14 border-b-[1px] border-zinc-700">
        <div className="flex w-full items-center gap-5 md:gap-[3rem]">
          <div className="relative md:w-[8rem] md:h-[8rem] w-[5rem] h-[5rem] p-3 border-[1px] border-zinc-700 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-full"
              src={otherUser?.user?.avatar}
              alt="profile"
            />
          </div>
          <div className="my-2 ">
            <div>
              <h1 className="text-2xl">{otherUser?.user?.username}</h1>
              <p>posts {otherUser?.posts_lenght}</p>
            </div>
            {otherUser?.user?._id === user?.loggedInUser?._id && (
              <button
                className="py-1 mt-5 -ms-1 px-3 my-2 bg-zinc-800 rounded-md font-semibold"
                onClick={() => setShowModal(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl m-5 flex md:justify-center">Blogs</h1>
        {userBlogs.length ? (
          <div className="flex flex-wrap justify-center gap-10 w-full my-10">
            {userBlogs.map((item, index) => (
              <BlogCard key={index} blog={item} />
            ))}
          </div>
        ) : (
          <div className="flex h-screen justify-center items-center">
            <h1 className="text-2xl">NO BLOG HERE</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherUserProfile;
